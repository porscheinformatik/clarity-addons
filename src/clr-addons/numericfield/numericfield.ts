/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Directive, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';

const NEGATIVE = '-';
const BACK_KEYCODE = 8;
const CONTROL_KEYCODES_UPPER_BORDER = 46;
const OTHER_CONTROL_KEYS = new Set([224, 91, 93]);
const NUMBERS = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);

@Directive({
  selector: '[clrNumeric]',
  host: {
    '[class.text-right]': 'textAlign === "right"',
  },
})
export class ClrNumericField implements OnInit {
  @Input('clrTextAlign') textAlign = 'left';
  @Input('clrDecimalPlaces') decimalPlaces = 2;
  @Input('clrDecimalSep') decimalSeparator = ',';
  @Input('clrGroupingSep') groupingSeparator = '.';
  @Input('clrNumericValue') numericValue = '';
  @Input('clrUnit') unit: string = null;
  @Input('clrUnitPosition') unitPosition: string = 'right';
  @Output('clrNumericValueChange') numericValueChanged = new EventEmitter<number>();

  displayValue: string;

  private allowedKeys = new Set(NUMBERS);

  constructor(private renderer: Renderer2, private inputEl: ElementRef) {}

  ngOnInit() {
    this.injectUnitSymbol();

    this.displayValue = this.numericValue || '';
    this.inputEl.nativeElement.value = this.displayValue;

    /* needs to be parsed as number explicitly as it comes as string from user input */
    this.decimalPlaces = Number.parseInt(this.decimalPlaces.toString(), 10);
    this.allowedKeys.add(NEGATIVE);
    this.allowedKeys.add(this.decimalSeparator);

    this.renderer.listen(this.inputEl.nativeElement, 'change', event => {
      this.formatInput(event.target);
    });

    this.renderer.listen(this.inputEl.nativeElement, 'keyup', event => {
      if (
        event.keyCode === BACK_KEYCODE ||
        (event.keyCode >= CONTROL_KEYCODES_UPPER_BORDER && !OTHER_CONTROL_KEYS.has(event.keyCode))
      ) {
        this.formatInput(event.target);
      }
    });

    this.renderer.listen(this.inputEl.nativeElement, 'keydown', event => {
      const value = event.target.value;
      if (
        this.allowedKeys.has(event.key) ||
        (event.keyCode <= CONTROL_KEYCODES_UPPER_BORDER && event.keyCode > 0) ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      ) {
        /* toggle negative sign */
        if (event.key === NEGATIVE) {
          let cursorPos = event.target.selectionStart;
          if (value.startsWith(NEGATIVE)) {
            this.updateInput(value.substring(1));
            cursorPos -= 1;
          } else {
            this.updateInput(NEGATIVE + value);
            cursorPos += 1;
          }
          event.target.selectionStart = event.target.selectionEnd = cursorPos;
          return false;
        }

        /* no duplicate decimal separators */
        const indexDecimalSep = value.indexOf(this.decimalSeparator);
        if (event.key === this.decimalSeparator && indexDecimalSep > -1) {
          return false;
        }

        /* prevent too many decimal places */
        if (
          NUMBERS.has(event.key) &&
          indexDecimalSep > -1 &&
          indexDecimalSep < event.target.selectionStart &&
          value.length > indexDecimalSep + this.decimalPlaces
        ) {
          return false;
        }
      } else {
        return false;
      }
    });
  }

  formatInput(element: any) {
    const value = element.value;
    const cursorPos = element.selectionStart;
    const length = value.length;

    this.updateInput(this.formatNumber(value));

    element.selectionStart = element.selectionEnd = cursorPos + element.value.length - length;
  }

  formatNumber(value: string): string {
    let result = this.strip(value);

    /* add grouping separator */
    const decimalIndex = result.indexOf(this.decimalSeparator);
    const isNegative = result[0] === NEGATIVE;
    let i = decimalIndex > -1 ? decimalIndex : result.length;
    while (i > (isNegative ? 4 : 3)) {
      i -= 3;
      result = result.substring(0, i) + this.groupingSeparator + result.substring(i, result.length);
    }

    return result;
  }

  strip(value: string): string {
    let result: string = '';

    let indexDecimalSep = -1;
    let j = -1;
    for (const char of value) {
      j++;
      if (this.allowedKeys.has(char)) {
        if (char === this.decimalSeparator) {
          if (indexDecimalSep > -1) {
            /* ignore subsequent decimal separators */
            continue;
          }
          indexDecimalSep = j;
        }
        if (char === NEGATIVE && j > 0) {
          /* dismiss content after a negative sign not on first position */
          break;
        }
        if (indexDecimalSep > -1 && result.length > indexDecimalSep + this.decimalPlaces) {
          /* dismiss content after maximum decimal places reached */
          break;
        }
        result += char;
      } else if (char !== this.groupingSeparator) {
        /* dismiss content after a invalid character */
        break;
      }
    }

    return result;
  }

  updateInput(value: string) {
    this.inputEl.nativeElement.value = value;
    this.displayValue = value;
    const numValue: number = parseFloat(this.strip(value).replace(',', '.'));
    if (!isNaN(numValue)) {
      this.numericValueChanged.emit(numValue);
    } else {
      // emit undefined if value can not be parsed to a number
      this.numericValueChanged.emit(undefined);
    }
  }

  private injectUnitSymbol(): void {
    if (!!this.unit) {
      // Create the span with unit symbol and apply necessary styles
      const unitSpan = this.renderer.createElement('span');
      const unitSymbol = this.renderer.createText(this.unit);
      this.renderer.appendChild(unitSpan, unitSymbol);
      this.renderer.addClass(unitSpan, 'unit');

      // Get the input wrapper and apply necessary styles
      const inputWrapper = this.inputEl.nativeElement.parentNode;
      this.renderer.addClass(inputWrapper, 'numeric-input-wrapper');

      // Set the input width to the current width in css, so it won't extend when adding padding later on
      const inputWidth = this.inputEl.nativeElement.offsetWidth;
      this.renderer.setStyle(this.inputEl.nativeElement, 'width', inputWidth + 'px');
      // Also set the input wrapper width to same width to support horizontal form layout
      this.renderer.setStyle(inputWrapper, 'width', inputWidth + 'px');

      // Add the span to the DOM
      this.renderer.appendChild(inputWrapper, unitSpan);

      // Add padding to the input element, depending on the width of the unit symbol + 12px
      const paddingOnInput = unitSpan.offsetWidth + 12;
      if (this.unitPosition === 'left') {
        this.renderer.addClass(unitSpan, 'unit-left');
        this.renderer.setStyle(this.inputEl.nativeElement, 'padding-left', paddingOnInput + 'px');
      } else {
        this.renderer.addClass(unitSpan, 'unit-right');
        this.renderer.setStyle(this.inputEl.nativeElement, 'padding-right', paddingOnInput + 'px');
      }
    }
  }
}
