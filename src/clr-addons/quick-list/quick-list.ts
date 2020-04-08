/*
 * Copyright (c) 2018-2019 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, EventEmitter, Input, OnInit, Output, ViewChildren, QueryList } from '@angular/core';
import { CLR_BLANK_OPTION, ClrQuickListValue } from './add-option.service';
import { ClrAddOption } from './add-option';

@Component({
  selector: 'clr-quick-list',
  host: { '[class.quick-list]': 'true' },
  templateUrl: './quick-list.html',
})
export class ClrQuickList<T> implements OnInit {
  @Input('clrBlankOption') blankOption: ClrQuickListValue<T> = CLR_BLANK_OPTION;
  @Input('clrAllValues') allValues: Array<ClrQuickListValue<T>> = [this.blankOption];
  @Input('clrMandatory') mandatory = false;
  @Input('clrValues') values: Array<ClrQuickListValue<T>> = [];
  @Input('clrAddLabel') addLabel = 'ADD';
  @Input('clrControlClasses') controlClasses = 'clr-col-md-10';
  @Output('clrValuesChanged') valuesChanged = new EventEmitter<Array<ClrQuickListValue<T>>>();
  @Output('clrEmptyOptionAdded') emptyOptionAdded = new EventEmitter<void>();

  @ViewChildren(ClrAddOption) options: QueryList<ClrAddOption<T>>;

  ngOnInit(): void {
    if (this.values.length === 0 && this.mandatory) {
      this.values.push(this.blankOption);
    }
  }

  onValueChanged(value: ClrQuickListValue<T>, i: number): void {
    if (value) {
      this.values[i] = value;
      this.valuesChanged.emit(this.values);
      this.focusOption(value);
    }
  }

  onRemoveValue(i: number): void {
    this.values.splice(i, 1);
    this.valuesChanged.emit(this.values);
  }

  addBlankOption(): void {
    if (!this.hasBlankOption()) {
      this.values.push(this.blankOption);
      this.valuesChanged.emit(this.values);
      this.emptyOptionAdded.emit();
      this.focusOption(this.blankOption);
    }
  }

  focusOption(option: ClrQuickListValue<T>): void {
    setTimeout(() => {
      const opt = this.options.find(o => o.value.id === option.id);
      if (opt) {
        opt.focusComponent();
      }
    });
  }

  hasBlankOption(): boolean {
    return this.values.map(val => val.id).includes(this.blankOption.id);
  }

  addNotPossible(): boolean {
    return this.hasBlankOption() || this.values.length === this.allValues.length;
  }
}
