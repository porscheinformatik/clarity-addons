/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

function isEmptyInputValue(value: any): boolean {
  // we don't check for string here so it also works with arrays
  return value == null || value.length === 0;
}

// TODO maybe create directives for it aswell? to not only support reactive forms?
export class ClrNumericFieldValidators {
  /**
   * @description
   * Validator that requires the control's value to be greater than or equal to the provided number.
   * The validator exists only as a function and not as a directive.
   *
   * @usageNotes
   *
   * ### Validate against a minimum of 3
   *
   * ```typescript
   * const control = new FormControl(2, ClrNumericFieldValidators.min(3, '.', ','));
   *
   * console.log(control.errors); // {min: {min: 3, actual: 2}}
   * ```
   *
   * @returns A validator function that returns an error map with the
   * `min` property if the validation check fails, otherwise `null`.
   *
   */
  static min(min: number, groupingSeparator: string = '.', decimalSeparator: string = ','): ValidatorFn {
    const validatorFn: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value) || isEmptyInputValue(min)) {
        return null; // don't validate empty values to allow optional controls
      }
      const value: number = this.parseInputString(control.value, groupingSeparator, decimalSeparator);
      // Controls with NaN values after parsing should be treated as not having a
      // minimum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-min
      return !isNaN(value) && value < min ? { min: { min: min, actual: value } } : null;
    };
    return validatorFn;
  }

  /**
   * @description
   * Validator that requires the control's value to be less than or equal to the provided number.
   * The validator exists only as a function and not as a directive.
   *
   * @usageNotes
   *
   * ### Validate against a maximum of 15
   *
   * ```typescript
   * const control = new FormControl(16, ClrNumericFieldValidators.max(15, '.', ','));
   *
   * console.log(control.errors); // {max: {max: 15, actual: 16}}
   * ```
   *
   * @returns A validator function that returns an error map with the
   * `max` property if the validation check fails, otherwise `null`.
   *
   */
  static max(max: number, groupingSeparator: string = '.', decimalSeparator: string = ','): ValidatorFn {
    const validatorFn: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value) || isEmptyInputValue(max)) {
        return null; // don't validate empty values to allow optional controls
      }
      const value: number = this.parseInputString(control.value, groupingSeparator, decimalSeparator);
      // Controls with NaN values after parsing should be treated as not having a
      // minimum, per the HTML forms spec: https://www.w3.org/TR/html5/forms.html#attr-input-min
      return !isNaN(value) && value > max ? { max: { max: max, actual: value } } : null;
    };
    return validatorFn;
  }

  private static parseInputString(value: string, groupingSeparator: string, decimalSeparator: string): number {
    const notGroupedNumber: string = value.replace(new RegExp('[' + groupingSeparator + ']', 'g'), '');
    const formattedNumber: string = notGroupedNumber.replace(new RegExp('[' + decimalSeparator + ']', 'g'), '.');
    return parseFloat(formattedNumber);
  }
}
