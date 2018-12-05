/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClrNumericFieldValidators } from '../../../../clr-addons/numericfield/numeric-field-validators';

@Component({
  selector: 'clr-numericfield-demo',
  templateUrl: './numericfield.demo.html',
})
export class NumericFieldDemo {
  input: number;
  amount: string;
  modalOpen = false;

  exampleForm = new FormGroup({
    sample: new FormControl(this.amount, {
      validators: [
        Validators.required,
        ClrNumericFieldValidators.min(0, '.', ','),
        ClrNumericFieldValidators.max(100, '.', ','),
      ],
      updateOn: 'blur',
    }),
  });
}
