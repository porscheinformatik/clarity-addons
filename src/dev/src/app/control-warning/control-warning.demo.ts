/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { AfterViewInit, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'clr-control-warning-demo',
  templateUrl: './control-warning.demo.html',
  styleUrl: './control-warning.demo.scss',
  standalone: false,
})
export class ControlWarningDemo implements AfterViewInit {
  values$ = of([
    'Option 4',
    '<na> Option 5',
    'Option 6 (test)Option 6 (test)Option 6 (test)Option 6 (test)',
    'Option 7',
  ]).pipe(delay(500));

  date: any;
  time: any;
  showingInputWarnings = false;
  isInputFormValidating = false;
  comboBoxWarningString = ' This warning icon was displayed before the error';

  inputForm: FormGroup = new FormGroup<any>({
    input: new FormControl(),
    textArea: new FormControl(),
    select: new FormControl(),
    date: new FormControl(),
    time: new FormControl(),
    comboSingle: new FormControl(),
    checkbox: new FormControl(),
  });

  ngAfterViewInit(): void {
    this.isInputFormValidating = true;
    this.inputForm.reset();
  }

  validateInputForm() {
    this.inputForm.markAllAsTouched();
  }

  toggleInputFormValidation() {
    this.isInputFormValidating = !this.isInputFormValidating;
    if (!this.isInputFormValidating) {
      if (!this.showingInputWarnings) {
        this.comboBoxWarningString = ' This warning icon was displayed after the error';
      }
      this.validateInputForm();
    } else {
      this.comboBoxWarningString = ' This warning icon was displayed before the error';

      this.inputForm.reset();
    }
  }

  showTextInputWarnings() {
    this.showingInputWarnings = !this.showingInputWarnings;
  }
}
