/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quick-list.demo',
  templateUrl: './quick-list.demo.component.html',
  styleUrls: ['./quick-list.demo.component.css'],
})
export class QuickListDemoComponent implements OnInit {
  label = 'Activity result';
  values = [
    { s: 'Test Drive' },
    { s: 'Walk in the park' },
    { s: 'Fly to the moon' },
    { s: 'Coffee with Zeus' },
    { s: 'Going to Mars with Elon Musk' },
    { s: 'Going to Mars with Elon Musk Going to Mars with Elon Musk' },
  ];
  stringValues = [
    'Test Drive',
    'Walk in the park',
    'Fly to the moon',
    'Coffee with Zeus',
    'Going to Mars with Elon Musk',
    'Going to Mars with Elon Musk Going to Mars with Elon Musk',
  ];
  selectedValues;
  selectedValues2;
  selectedValues3;
  selectedValues4;

  constructor() {}

  ngOnInit() {}

  setValues(a) {
    this.selectedValues = a;
  }

  setValues2(a) {
    this.selectedValues2 = a;
  }

  setValues3(a) {
    this.selectedValues3 = a;
  }

  setValues4(a) {
    this.selectedValues4 = a;
  }

  getStringValue(value) {
    return JSON.stringify(value);
  }
}
