import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ClrForm } from '@clr/angular';

@Component({
  selector: 'app-control-warning',
  templateUrl: './control-warning.component.html',
  styleUrl: './control-warning.component.css',
})
export class ControlWarningComponent {
  @ViewChild(ClrForm) form: ClrForm;

  exampleForm: FormGroup;
  values$ = of([
    'Option 4',
    '<na> Option 5',
    'Option 6 (test)Option 6 (test)Option 6 (test)Option 6 (test)',
    'Option 7',
  ]).pipe(delay(500));
  values2$ = of([
    'Option 4',
    '<na> Option 5',
    'Option 6 (test)Option 6 (test)Option 6 (test)Option 6 (test)',
    'Option 7',
    'Option 41',
    '<na> Option 51',
    'Option 61 (test)',
    'Option 71',
    'Option 42',
    '<na> Option 52',
    'Option 62 (test)',
    'Option 72',
    'Option 43',
    '<na> Option 53',
    'Option 63 (test)',
    'Option 73',
  ]).pipe(delay(500));

  inputText: string;
  textareaText: string;
  passwordText: string;
  selectedOption: any;
  comboboxOption: string;
  comboboxOptions: string[];
  radioOption: any;
  date: any;
  time: any;
  money: any;
  checkboxValue: any;
  toggleValue: any;
  dataList: any;
  showWarnings = true;
  isValidating = false;

  showWarning() {
    this.showWarnings = !this.showWarnings;
  }

  toggleValidation() {
    if (!this.isValidating) {
      this.validateForm();
    } else {
    }
  }

  validateForm() {
    this.form.markAsTouched();
  }
}
