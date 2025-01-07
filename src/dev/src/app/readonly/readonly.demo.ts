/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';

@Component({
  selector: 'clr-readonly-demo',
  templateUrl: './readonly.demo.html',
})
export class ReadonlyDemo {
  radioValue = 1;
  checkValue1 = true;
  checkValue2: boolean;
  checkValue3 = true;

  inputValue = 'Test Value 1';
  selectValue = 'one';
  textareaText =
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam volu';
  comboBoxValue = 'Option 1';
  numericValue = 1234456456;

  states = states;
  selection: State[] = [
    {
      name: 'Alabama',
      abbreviation: 'AL',
    },
    {
      name: 'Alaska',
      abbreviation: 'AK',
    },
  ];

  selectionReadOnly: State[] = [
    {
      name: 'Alabama',
      abbreviation: 'AL',
    },
    {
      name: 'Alaska',
      abbreviation: 'AK',
    },
  ];

  date = new Date().toLocaleDateString('de-DE');
  time = '11:00';
}

export interface State {
  name: string;
  abbreviation: string;
}

export const states: State[] = [
  {
    name: 'Alabama',
    abbreviation: 'AL',
  },
  {
    name: 'Alaska',
    abbreviation: 'AK',
  },
];
