/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'clr-quick-list',
  templateUrl: './quick-list.component.html',
  styleUrls: ['./quick-list.component.scss'],
})
export class ClrQuickListComponent implements OnInit {
  @Input() label: string;
  @Input() defaultValue: any;
  @Input() listOfValues: Array<any>;
  @Input() onCard = false;
  @Input() required = false;
  @Input() displayField: string;
  @Input() placeholder = '-Select an option-';
  @Output() selectedValuesChanged = new EventEmitter();
  selectedValuesMap = new Map();
  index = 0;

  constructor() {}

  ngOnInit() {
    this.selectedValuesMap.set(this.index, this.defaultValue);
    this.index++;
  }

  createComponent() {
    this.selectedValuesMap.set(this.index, this.defaultValue);
    this.index++;
  }

  emitValuesChanged() {
    this.selectedValuesChanged.emit(Array.from(this.selectedValuesMap.values()));
  }

  delete(key: number) {
    this.selectedValuesMap.delete(key);
    this.emitValuesChanged();
  }

  selectedValuesChangedEmitter(key: number, value: any) {
    this.selectedValuesMap.set(key, value);
    this.emitValuesChanged();
  }

  public resetState() {
    this.selectedValuesMap.clear();
    this.createComponent();
  }
}
