/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {
  ClrComboboxModule,
  ClrCommonFormsModule,
  ClrDatagridModule,
  ClrInputModule,
  ClrSelectModule,
  ClrTextareaModule,
} from '@clr/angular';
import { ClrFocusFirstInvalidFieldDirective } from '@porscheinformatik/clr-addons';

@Component({
  selector: 'clr-focus-first-invalid-field-demo',
  templateUrl: './focus-first-invalid-field.demo.html',
  imports: [
    FormsModule,
    ClrCommonFormsModule,
    ClrFocusFirstInvalidFieldDirective,
    ClrInputModule,
    ClrCommonFormsModule,
    ClrTextareaModule,
    ClrSelectModule,
    ClrComboboxModule,
    ClrDatagridModule,
  ],
})
export class FocusFirstInvalidFieldDemo {
  @ViewChild('form') private readonly form: NgForm;
  dataDatagrid = [{ text: 'Cell' }];
  // Input fields
  inputField1: string;
  inputField2: string;
  inputField3: string;

  // Textarea fields
  textAreaInput1: string;
  textAreaInput2: string;
  textAreaInput3: string;

  // Select field
  selectField1 = '';

  selectFieldDataGrid = '';

  // Custom control
  customControlValue: string;

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    console.log('submitted');
  }
}
