/*
 * Copyright (c) 2018-2020 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'clr-pager-demo',
  templateUrl: './date-time-container.demo.html',
})
export class DateTimeContainerDemo {
  values$ = of(['Option 4', '<na> Option 5', 'Option 6 (test)', 'Option 7']).pipe(delay(500));

  inputText: string;
  textareaText: string;
  passwordText: string;
  selectedOption: any;
  comboboxOption = 'Option 7';
  radioOption: any;
  date: any;
  time: any;
  money: any;
  checkboxValue: any;
  toggleValue: any;
  dataList: any;
}
