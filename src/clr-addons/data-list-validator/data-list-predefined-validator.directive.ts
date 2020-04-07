/*
 * Copyright (c) 2018-2020 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { ClrDataListValidators } from './data-list.validator';

/**
 * Directive which validates data list values, to be used in template driven forms.
 * @see {@link ClrDataListValidators#predefined}
 */
@Directive({
  selector: '[clrDataListPredefined]',
  providers: [{ provide: NG_VALIDATORS, useExisting: ClrDataListPredefinedValidatorDirective, multi: true }],
})
export class ClrDataListPredefinedValidatorDirective implements Validator {
  @Input() clrDataListPredefined: string[] = [];

  validate(control: AbstractControl): { [key: string]: any } | null {
    return ClrDataListValidators.predefined(this.clrDataListPredefined)(control);
  }
}
