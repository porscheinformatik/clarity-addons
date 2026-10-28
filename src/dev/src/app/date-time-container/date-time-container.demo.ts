/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import {
  ClrCheckboxModule,
  ClrComboboxModule,
  ClrCommonFormsModule,
  ClrDatalistModule,
  ClrDatepickerModule,
  ClrInputModule,
  ClrPasswordModule,
  ClrRadioModule,
  ClrSelectModule,
  ClrTextareaModule,
} from '@clr/angular';
import { AsyncPipe } from '@angular/common';
import {
  ClrAddonsLabel,
  ClrAutocompleteOff,
  ClrDateTimeContainer,
  ClrTimeInput,
  ClrNumericField,
  ClrViewEditSection,
} from '@porscheinformatik/clr-addons';

@Component({
  selector: 'clr-pager-demo',
  templateUrl: './date-time-container.demo.html',
  imports: [
    FormsModule,
    ClrCommonFormsModule,
    ClrInputModule,
    ClrAddonsLabel,
    ClrAutocompleteOff,
    ClrTextareaModule,
    ClrPasswordModule,
    ClrSelectModule,
    ClrRadioModule,
    ClrDatepickerModule,
    ClrDateTimeContainer,
    ClrTimeInput,
    ClrNumericField,
    ClrCheckboxModule,
    ClrComboboxModule,
    ClrDatalistModule,
    ClrViewEditSection,
    AsyncPipe,
  ],
})
export class DateTimeContainerDemo {
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
}
