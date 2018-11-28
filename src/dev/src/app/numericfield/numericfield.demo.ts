/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'clr-numericfield-demo',
  templateUrl: './numericfield.demo.html',
})
export class NumericFieldDemo {
  input: number;

  exampleForm = new FormGroup({
    sample: new FormControl(this.input, {
      validators: [Validators.min(0), Validators.max(100), Validators.required],
      updateOn: 'blur',
    }),
  });
}
