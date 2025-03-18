/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
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
import { formatNumber, strip } from '../util';

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
  standalone: false,
})
export class ClrNumericField implements OnInit, OnDestroy, AfterViewChecked, ControlValueAccessor {
  @Input('clrTextAlign') textAlign = 'right';
  @Input('clrDecimalPlaces') decimalPlaces = 2;
  @Input('clrRoundDisplayValue') roundValue = false;
  @Input('clrAutofillDecimals') autofillDecimals = false;
  @Input('clrDecimalSep') decimalSeparator = ',';
  @Input('clrGroupingSep') groupingSeparator = '.';

  /**
   * @deprecated Use {@link clrInputSuffix} or {@link clrInputPrefix} from Clarity instead.
   */
  @Input('clrUnitPosition') unitPosition = 'right';
  @Output('clrNumericValueChange') numericValueChanged = new EventEmitter<number>();

  private displayValue = '';
  private originalValue = NaN;
  private _numericValue: number;
  private _unit: string = null;
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

  /**
   * @deprecated Use {@link clrInputSuffix} or {@link clrInputPrefix} from Clarity instead.
   */
  @Input('clrUnit')
  set unit(value: string) {
    if (value != this._unit) {
      this._unit = value;
      if (this.unitSpan != null) {
        this.unitSpan.innerHTML = '';
        const newUnitText = this.renderer.createText(value);
        this.renderer.appendChild(this.unitSpan, newUnitText);
      }
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
      formatNumber(
        this._numericValue.toString().replace(new RegExp('[.]', 'g'), this.decimalSeparator),
        true,
        this.decimalSeparator,
        this.groupingSeparator,
        this.decimalPlaces,
        this.autofillDecimals
      ),
      true
    );
  }

  formatInput(element: HTMLInputElement, finalFormatting: boolean): void {
    const cursorPos = element.selectionStart;
    const length = element.value.length;
    const setCursor = this.displayValue !== element.value;
    this.updateInput(
      formatNumber(
        element.value,
        finalFormatting,
        this.decimalSeparator,
        this.groupingSeparator,
        this.decimalPlaces,
        this.autofillDecimals
      ),
      false
    );
    if (setCursor) {
      element.selectionStart = element.selectionEnd = Math.max(cursorPos + element.value.length - length, 0);
    }
  }

  updateInput(value: string, updateAsync: boolean): void {
    this.displayValue = value;
    this.inputEl.nativeElement.value = value;
    this._numericValue = parseFloat(
      strip(value, false, this.decimalSeparator, this.groupingSeparator, this.decimalPlaces).replace(
        this.decimalSeparator,
        '.'
      )
    );
    if (this._numericValue !== this.roundOrTruncate(this.originalValue)) {
      this.originalValue = this._numericValue;
      if (updateAsync) {
        // Call in setTimeout to avoid Expression has changed after it has been checked error.
        // This happens for example if the initial input has more decimal places than allowed
        setTimeout(() => this.numericValueChanged.emit(this._numericValue));
      } else {
        this.numericValueChanged.emit(this._numericValue);
      }
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
    if (!!this._unit && !this.unitSpan && this.inputEl.nativeElement.offsetWidth !== 0) {
      // Get the input wrapper and apply necessary styles
      const inputWrapper = this.inputEl.nativeElement.parentNode;
      this.renderer.addClass(inputWrapper, 'numeric-input-wrapper');

      // Create the span with unit symbol and apply necessary styles
      if (!this.unitSpan) {
        this.unitSpan = this.renderer.createElement('span');
        this.renderer.addClass(this.unitSpan, 'unit');
        const unitSymbol = this.renderer.createText(this._unit);
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
    // 16 is the highest precision before numbers have weird behaviour. see https://stackoverflow.com/q/21472828/15120942
    return Math[method](+(value * Math.pow(10, this.decimalPlaces)).toPrecision(15)) / Math.pow(10, this.decimalPlaces);
  }
}
