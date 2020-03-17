/*
 * Copyright (c) 2018-2020 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Class to provide validators for the Clr Data List.
 */
export class ClrDataListValidators {
  /**
   * @description
   * Validator that requires the control's value to be found in a possible values array.
   * This prohibits the user from entering custom values.
   *
   * @usageNotes
   *
   * ### Validate against an array of possible values
   *
   * ```typescript
   * const control = new FormControl('1234', ClrDataListValidators.predefined(['ASDF', 'QWER']));
   *
   * console.log(control.errors); // {predefined: {predefined: ['ASDF', 'QWER'], actual: '1234'}}
   * ```
   *
   * @returns A validator function that returns an error map with the
   * `predefined` property if the validation check fails, otherwise `null`.
   *
   */
  static predefined(possibleValues: string[]): ValidatorFn {
    const validatorFn: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null; // don't validate empty values to allow optional controls
      }
      const value: string = possibleValues.find(v => v === control.value);

      return !value ? { predefined: { predefined: possibleValues, actual: control.value } } : null;
    };
    return validatorFn;
  }
}
