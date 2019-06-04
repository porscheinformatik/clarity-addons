/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

export class ClrMultilingualInputValidators {
  /**
   * @description
   * Validator that requires that at least one text is entered.
   *
   * @usageNotes
   * ```typescript
   *  const control = new FormControl(this.data, ClrMultilingualInputValidators.requiredOne());
   * ```
   *
   * @returns A validator function that returns an error map with the
   * `requiredOne` property if the validation check fails, otherwise `null`.
   */
  static requiredOne(): ValidatorFn {
    const validatorFn = (control: AbstractControl): ValidationErrors | null => {
      const texts = <Map<string, string>>control.value;

      if (!texts) {
        return null;
      }

      for (const text of Array.from(texts.values())) {
        if (!!text) {
          return null;
        }
      }
      return { requiredOne: false };
    };

    return validatorFn;
  }

  /**
   * @description
   * Validator that requires that all texts are entered.
   *
   * @usageNotes
   * ```typescript
   *  const control = new FormControl(this.data, ClrMultilingualInputValidators.requiredAll());
   * ```
   *
   * @returns A validator function that returns an error map with the
   * `requiredAll` property if the validation check fails, otherwise `null`.
   */
  static requiredAll(): ValidatorFn {
    const validatorFn = (control: AbstractControl): ValidationErrors | null => {
      const texts = <Map<string, string>>control.value;

      if (!!texts) {
        for (const text of Array.from(texts.values())) {
          if (!text) {
            return { requiredAll: false };
          }
        }
      }
      return null;
    };

    return validatorFn;
  }
}

@Directive({
  selector: '[clrRequiredOneMultilang]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ClrRequiredOneMultilang, multi: true }],
})
export class ClrRequiredOneMultilang implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    return ClrMultilingualInputValidators.requiredOne()(control);
  }
}

@Directive({
  selector: '[clrRequiredAllMultilang]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ClrRequiredAllMultilang, multi: true }],
})
export class ClrRequiredAllMultilang implements Validator {
  validate(control: AbstractControl): { [key: string]: any } | null {
    return ClrMultilingualInputValidators.requiredAll()(control);
  }
}
