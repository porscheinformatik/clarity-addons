/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClrNumericFieldValidators } from '@porscheinformatik/clr-addons';

@Component({
  selector: 'clr-numericfield-demo',
  templateUrl: './numericfield.demo.html',
})
export class NumericFieldDemo {
  input: number = 123456789;
  modalOpen = false;

  exampleForm = new FormGroup({
    sample: new FormControl(this.input, {
      validators: [
        Validators.required,
        ClrNumericFieldValidators.min(0, '.', ','),
        ClrNumericFieldValidators.max(100, '.', ','),
      ],
      updateOn: 'blur',
    }),
  });

  firstName: number;
  firstNameObject: number = 100000;
  sectionTitle = 'Test';
  exampleForm2: FormGroup;

  editable: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.exampleForm2 = this.fb.group({
      firstName: ['', Validators.required],
    });
    this.firstName = this.firstNameObject;
  }

  sectionSubmitted() {
    if (this.exampleForm2.valid) {
      this.firstNameObject = this.firstName;
    }
  }

  sectionCancelled() {
    this.firstName = this.firstNameObject;
    this.exampleForm2.patchValue({
      firstName: this.firstName,
    });
  }
}
