/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'add-option',
  templateUrl: './add-option.component.html',
  styleUrls: ['./add-option.component.scss'],
})
export class AddOptionComponent implements OnInit {
  @Input() defaultValue: any;
  @Input() listOfValues: Array<any>;
  @Input() placeholder: string;
  @Input() required = false;
  @Input() displayField: string;
  @Output() selectedValueChanged = new EventEmitter();
  @Output() delete = new EventEmitter();
  selectedValue: any;

  constructor() {}

  ngOnInit() {
    if (!!this.defaultValue) {
      this.selectedValue = this.defaultValue;
      this.selectedValueChanged.emit(this.selectedValue);
    }
  }

  getValue(value: any) {
    return !!this.displayField ? value[this.displayField] : value;
  }
}
