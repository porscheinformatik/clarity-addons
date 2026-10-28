/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ClrNumericFieldValidators,
  ClrAddonsLabel,
  ClrAutocompleteOff,
  ClrNumericField,
  ClrMinNumeric,
  ClrMaxNumeric,
} from '@porscheinformatik/clr-addons';
import { ClrCommonFormsModule, ClrInputModule, ClrModalModule } from '@clr/angular';

@Component({
  selector: 'clr-numericfield-demo',
  templateUrl: './numericfield.demo.html',
  imports: [
    FormsModule,
    ClrCommonFormsModule,
    ReactiveFormsModule,
    ClrInputModule,
    ClrAddonsLabel,
    ClrAutocompleteOff,
    ClrNumericField,
    ClrMinNumeric,
    ClrMaxNumeric,
    ClrModalModule,
  ],
})
export class NumericFieldDemo {
  input = 123.99999;
  modalOpen = false;

  exampleForm = new FormGroup({
    sample: new FormControl('', {
      validators: [
        Validators.required,
        ClrNumericFieldValidators.min(0, '.', ','),
        ClrNumericFieldValidators.max(100, '.', ','),
      ],
    }),
  });

  submitForm(): void {
    console.log(this.exampleForm);
  }
}
