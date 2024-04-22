import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ClrForm } from '@clr/angular';

@Component({
  selector: 'app-control-warning',
  templateUrl: './control-warning.demo.html',
  styleUrl: './control-warning.demo.css',
})
export class ControlWarningDemo implements AfterViewInit {
  ngAfterViewInit(): void {
    this.isValidating = true;
    this.exampleForm.reset();
  }

  @ViewChild(ClrForm) form: ClrForm;

  exampleForm: FormGroup = new FormGroup({
    input: new FormControl(),
    password: new FormControl(),
    textArea: new FormControl(),
    money: new FormControl(),
    date: new FormControl(),
    time: new FormControl(),
    dateTime: new FormControl(),
    select: new FormControl(),
    dataList: new FormControl(),
    comboSingle: new FormControl(),
    comboMulti: new FormControl(),
    radio: new FormControl(),
    checkbox: new FormControl(),
    toggle: new FormControl(),
  });
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

  date: any;
  time: any;
  money: any;
  showWarnings = false;
  isValidating = false;

  showWarning() {
    this.showWarnings = !this.showWarnings;
  }

  toggleValidation() {
    this.isValidating = !this.isValidating;
    if (!this.isValidating) {
      this.validateForm();
    } else {
      this.exampleForm.reset();
    }
  }

  validateForm() {
    this.form.markAsTouched();
  }
}
