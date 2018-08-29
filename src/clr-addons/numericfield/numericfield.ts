/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { OnInit, Renderer2, Input, Component, ViewChild, EventEmitter, Output } from '@angular/core';

const NEGATIVE = '-';
const BACK_KEYCODE = 8;
const CONTROL_KEYCODES_UPPER_BORDER = 46;
const OTHER_CONTROL_KEYS = new Set([224, 91, 93]);
const NUMBERS = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);

@Component({
  selector: 'clr-numeric',
  template: '<input #input clrInput [(ngModel)]="displayValue">',
})
export class ClrNumericField implements OnInit {
  @ViewChild('input') inputEl;

  constructor(private renderer: Renderer2) {}

  @Input('clrDecimalPlaces') decimalPlaces = 2;
  @Input('clrDecimalSep') decimalSeparator = ',';
  @Input('clrGroupingSep') groupingSeparator = '.';
  @Input('clrNumericValue') numericValue = '';
  @Output('clrNumericValueChange') numericValueChanged = new EventEmitter<number>();

  displayValue: string;

  private allowedKeys = new Set(NUMBERS);

  ngOnInit() {
    this.displayValue = this.numericValue || '';

    /* needs to be parsed as number explicitly as it comes as string from user input */
    this.decimalPlaces = Number.parseInt(this.decimalPlaces.toString());
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
          if (this.displayValue.startsWith(NEGATIVE)) {
            this.updateInput(this.displayValue.substring(1));
            cursorPos -= 1;
          } else {
            this.updateInput(NEGATIVE + this.displayValue);
            cursorPos += 1;
          }
          event.target.selectionStart = event.target.selectionEnd = cursorPos;
          return false;
        }

        /* no duplicate decimal separators */
        const indexDecimalSep = this.displayValue.indexOf(this.decimalSeparator);
        if (event.key === this.decimalSeparator && indexDecimalSep > -1) {
          return false;
        }

        /* prevent too many decimal places */
        if (
          NUMBERS.has(event.key) &&
          indexDecimalSep > -1 &&
          indexDecimalSep < event.target.selectionStart &&
          this.displayValue.length > indexDecimalSep + this.decimalPlaces
        ) {
          return false;
        }
      } else {
        return false;
      }
    });
  }

  formatInput(element: any) {
    const cursorPos = element.selectionStart;
    const length = this.displayValue.length;

    this.updateInput(this.formatNumber(this.displayValue));

    element.selectionStart = element.selectionEnd = cursorPos + this.displayValue.length - length;
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
    this.displayValue = value;
    this.numericValueChanged.emit(parseFloat(this.strip(value).replace(',', '.')));
  }
}
