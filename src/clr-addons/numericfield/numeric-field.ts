/*
 * Copyright (c) 2018-2021 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import {
  AfterViewChecked,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const NEGATIVE = '-';
const BACK_KEYCODE = 8;
const DEL_KEYCODE = 46;
const CONTROL_KEYCODES_UPPER_BORDER = 46;
const OTHER_CONTROL_KEYS = new Set([224, 91, 93]);
const NUMBERS = new Set(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);

@Directive({
  selector: '[clrNumeric]',
  host: {
    '[class.text-right]': 'textAlign === "right"',
    '(change)': 'onChange(getValueForFormControl())',
    '(input)': 'onChange(getValueForFormControl())',
    '(blur)': 'onTouched()',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ClrNumericField),
      multi: true,
    },
  ],
})
export class ClrNumericField implements OnInit, OnDestroy, AfterViewChecked, ControlValueAccessor {
  @Input('clrTextAlign') textAlign = 'right';
  @Input('clrDecimalPlaces') decimalPlaces = 2;
  @Input('clrRoundDisplayValue') roundValue = false;
  @Input('clrAutofillDecimals') autofillDecimals = false;
  @Input('clrDecimalSep') decimalSeparator = ',';
  @Input('clrGroupingSep') groupingSeparator = '.';
  @Input('clrUnit') unit: string = null;
  @Input('clrUnitPosition') unitPosition = 'right';
  @Output('clrNumericValueChange') numericValueChanged = new EventEmitter<number>();

  private displayValue = '';
  private originalValue = NaN;
  private _numericValue: number;
  private inputChangeListener: () => void;
  private keyupListener: () => void;
  private keydownListener: () => void;

  @Input('clrNumericValue')
  set numericValue(value: number) {
    if (this._numericValue !== value && !(isNaN(this._numericValue) && (isNaN(value) || value === null))) {
      this.originalValue = value;
      this._numericValue = this.roundOrTruncate(value);
      this.handleInputChanged();
    }
  }

  private unitSpan: HTMLSpanElement;
  private allowedKeys = new Set(NUMBERS);

  /* Control Values Accessor Stuff below */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange = (_: number): void => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched = (): void => {};

  registerOnChange(fn: (_: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(this.inputEl.nativeElement, 'disabled', isDisabled);
  }

  writeValue(value: number): void {
    this.numericValue = value;
  }

  constructor(private renderer: Renderer2, private inputEl: ElementRef) {}

  ngOnInit(): void {
    /* needs to be parsed as number explicitly as it comes as string from user input */
    this.decimalPlaces = Number.parseInt(this.decimalPlaces.toString(), 10);
    this.allowedKeys.add(NEGATIVE);
    this.allowedKeys.add(this.decimalSeparator);

    this.inputChangeListener = this.renderer.listen(this.inputEl.nativeElement, 'blur', event => {
      this.formatInput(event.target, true);
    });

    this.keyupListener = this.renderer.listen(this.inputEl.nativeElement, 'keyup', event => {
      if (
        event.keyCode === BACK_KEYCODE ||
        (event.keyCode >= CONTROL_KEYCODES_UPPER_BORDER && !OTHER_CONTROL_KEYS.has(event.keyCode))
      ) {
        this.formatInput(event.target, false);
      }
    });

    this.keydownListener = this.renderer.listen(this.inputEl.nativeElement, 'keydown', event => {
      const value: string = event.target.value;
      if (
        this.allowedKeys.has(event.key) ||
        (event.keyCode <= CONTROL_KEYCODES_UPPER_BORDER && event.keyCode > 0) ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      ) {
        /* allow negative sign only as first character and none exists outside of text selection */
        const indexNegativeSign = value.indexOf(NEGATIVE);
        if (
          event.key === NEGATIVE &&
          (event.target.selectionStart > 0 || indexNegativeSign > -1) &&
          (event.target.selectionStart === event.target.selectionEnd ||
            !(indexNegativeSign >= event.target.selectionStart && indexNegativeSign <= event.target.selectionEnd))
        ) {
          return false;
        }

        /* no duplicate decimal separators */
        const indexDecimalSep = value.indexOf(this.decimalSeparator);
        if (
          event.key === this.decimalSeparator &&
          (indexDecimalSep > -1 || this.decimalPlaces === 0) &&
          (event.target.selectionStart === event.target.selectionEnd ||
            !(indexDecimalSep >= event.target.selectionStart && indexDecimalSep <= event.target.selectionEnd))
        ) {
          return false;
        }

        /* prevent too many decimal places */
        if (
          NUMBERS.has(event.key) &&
          indexDecimalSep > -1 &&
          indexDecimalSep < event.target.selectionStart &&
          event.target.selectionStart === event.target.selectionEnd &&
          value.length > indexDecimalSep + this.decimalPlaces
        ) {
          return false;
        }

        /* when deleting thousand separator, remove the digit before or after it */
        const cursorStart = event.target.selectionStart;

        if (cursorStart === event.target.selectionEnd) {
          if (event.keyCode === BACK_KEYCODE && value.substr(cursorStart - 1, 1) === this.groupingSeparator) {
            event.target.value = value.substring(0, cursorStart - 2) + value.substring(cursorStart - 1, value.length);
            event.target.selectionStart = event.target.selectionEnd = cursorStart - 1;
            return false;
          } else if (event.keyCode === DEL_KEYCODE && value.substr(cursorStart, 1) === this.groupingSeparator) {
            event.target.value = value.substring(0, cursorStart + 1) + value.substring(cursorStart + 2, value.length);
            event.target.selectionStart = event.target.selectionEnd = cursorStart + 1;
            return false;
          }
        }
        this.originalValue = NaN;
      } else {
        return false;
      }
      return true;
    });
  }

  ngOnDestroy(): void {
    this.detachListener();
  }

  ngAfterViewChecked(): void {
    this.injectUnitSymbol();
  }

  handleInputChanged(): void {
    this.updateInput(
      this.formatNumber(this._numericValue.toString().replace(new RegExp('[.]', 'g'), this.decimalSeparator), true)
    );
  }

  formatInput(element: HTMLInputElement, finalFormatting: boolean): void {
    const cursorPos = element.selectionStart;
    const length = element.value.length;
    const setCursor = this.displayValue !== element.value;
    this.updateInput(this.formatNumber(element.value, finalFormatting));
    if (setCursor) {
      element.selectionStart = element.selectionEnd = Math.max(cursorPos + element.value.length - length, 0);
    }
  }

  formatNumber(value: string, finalFormatting: boolean): string {
    let result = this.strip(value, finalFormatting);

    /* add grouping separator */
    const decimalIndex = result.indexOf(this.decimalSeparator);
    const isNegative = result[0] === NEGATIVE;
    let i = decimalIndex > -1 ? decimalIndex : result.length;
    while (i > (isNegative ? 4 : 3)) {
      i -= 3;
      result = result.substring(0, i) + this.groupingSeparator + result.substring(i, result.length);
    }

    if (finalFormatting) {
      if (this.decimalPlaces > 0 && !!result) {
        /* autofill decimal places */
        let actualDecimalIndex = result.indexOf(this.decimalSeparator);
        if (this.autofillDecimals) {
          if (actualDecimalIndex === -1) {
            actualDecimalIndex = result.length;
            result += this.decimalSeparator;
          }

          result = this.addMissingLeadingZero(result, actualDecimalIndex);
          actualDecimalIndex = result.indexOf(this.decimalSeparator);

          const actualDecimalPlaces = result.length - actualDecimalIndex - 1;
          for (let j = 0; j < this.decimalPlaces - actualDecimalPlaces; j++) {
            result += '0';
          }
        } else {
          result = this.addMissingLeadingZero(result, actualDecimalIndex);
        }
      }
    }

    return result;
  }

  addMissingLeadingZero(result: string, actualDecimalIndex: number): string {
    const isNegative = result[0] === NEGATIVE;
    /* autoadd a zero before decimal separator, when it's missing */
    if (actualDecimalIndex === 0) {
      result = '0' + result;
    }
    /* autoadd a zero before decimal separator, when it's missing, for negative values */
    if (actualDecimalIndex === 1 && isNegative) {
      result = result[0] + '0' + result.substring(1, result.length);
    }
    return result;
  }

  strip(value: string, removeLeadingZeros = false): string {
    let result = '';
    let indexDecimalSep = -1;
    let j = -1;
    let ignoredChars = 0;
    for (const char of value) {
      j++;
      if (this.allowedKeys.has(char)) {
        if (char === this.decimalSeparator) {
          if (this.decimalPlaces === 0) {
            /* dismiss content after a decimal separator, when no places allowed */
            break;
          } else if (indexDecimalSep > -1) {
            /* ignore subsequent decimal separators */
            continue;
          }
          indexDecimalSep = j;
        }
        if (char === '0' && removeLeadingZeros) {
          /* remove leading zero only if it's not the only zero in the 'value' string */
          if ((result.length === 0 && j + 1 !== value.length) || result === NEGATIVE) {
            ignoredChars++;
            continue;
          }
        }
        if (char === NEGATIVE && j > 0) {
          /* dismiss content after a negative sign not on first position */
          break;
        }
        if (indexDecimalSep > -1 && result.length + ignoredChars > indexDecimalSep + this.decimalPlaces) {
          /* dismiss content after maximum decimal places reached */
          break;
        }
        result += char;
      } else if (char === this.groupingSeparator) {
        if (indexDecimalSep === -1) {
          ignoredChars++;
        }
      } else {
        /* dismiss content after a invalid character */
        break;
      }
    }

    return result;
  }

  updateInput(value: string): void {
    this.displayValue = value;
    this.inputEl.nativeElement.value = value;
    this._numericValue = parseFloat(this.strip(value).replace(this.decimalSeparator, '.'));
    if (this._numericValue !== this.roundOrTruncate(this.originalValue)) {
      this.originalValue = this._numericValue;
      // Call in setTimeout to avoid Expression has changed after it has been checked error.
      // This happens for example if the initial input has more decimal places than allowed
      setTimeout(() => this.numericValueChanged.emit(this._numericValue));
    }
  }

  public getValueForFormControl(): number {
    this.formatInput(this.inputEl.nativeElement, false);
    if (isNaN(this._numericValue)) {
      // Return undefined instead of NaN to support the default required validator.
      return undefined;
    }
    return this._numericValue;
  }

  private injectUnitSymbol(): void {
    // Need to inject the unit symbol when the input element width is set to its actual value,
    // otherwise the icon wont show in the correct position
    if (!!this.unit && !this.unitSpan && this.inputEl.nativeElement.offsetWidth !== 0) {
      // Get the input wrapper and apply necessary styles
      const inputWrapper = this.inputEl.nativeElement.parentNode;
      this.renderer.addClass(inputWrapper, 'numeric-input-wrapper');

      // Create the span with unit symbol and apply necessary styles
      if (!this.unitSpan) {
        this.unitSpan = this.renderer.createElement('span');
        this.renderer.addClass(this.unitSpan, 'unit');
        const unitSymbol = this.renderer.createText(this.unit);
        this.renderer.appendChild(this.unitSpan, unitSymbol);
        this.renderer.appendChild(inputWrapper, this.unitSpan);
      }

      // Add padding to the input element, depending on the width of the unit symbol + 12px
      const paddingOnInput = this.unitSpan.offsetWidth + 12;
      if (this.unitPosition === 'left') {
        this.renderer.addClass(this.unitSpan, 'unit-left');
        this.renderer.setStyle(this.inputEl.nativeElement, 'padding-left', paddingOnInput + 'px');
      } else {
        this.renderer.addClass(this.unitSpan, 'unit-right');
        this.renderer.setStyle(this.inputEl.nativeElement, 'padding-right', paddingOnInput + 'px');
      }
    }
  }

  private detachListener(): void {
    if (this.inputChangeListener) {
      this.inputChangeListener();
      delete this.inputChangeListener;
    }
    if (this.keydownListener) {
      this.keydownListener();
      delete this.keydownListener;
    }
    if (this.keyupListener) {
      this.keyupListener();
      delete this.keyupListener;
    }
  }

  private roundOrTruncate(value: number): number {
    const method = this.roundValue ? 'round' : value < 0 ? 'ceil' : 'floor';
    return Math[method](value * Math.pow(10, this.decimalPlaces)) / Math.pow(10, this.decimalPlaces);
  }
}
