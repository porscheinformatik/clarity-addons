/*
 * Copyright (c) 2018-2023 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, EventEmitter, forwardRef, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { CLR_BLANK_OPTION, ClrQuickListValue } from './add-option.service';
import { ClrAddOption } from './add-option';
import { ClrAbstractFormComponent } from '../abstract-form-component/abstract-form-component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ClarityIcons, plusIcon } from '@cds/core/icon';

ClarityIcons.addIcons(plusIcon);

@Component({
  selector: 'clr-quick-list',
  host: { '[class.quick-list]': 'true' },
  templateUrl: './quick-list.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ClrQuickList),
      multi: true,
    },
  ],
})
export class ClrQuickList<T> extends ClrAbstractFormComponent implements OnInit {
  @Input('clrBlankOption') blankOption: ClrQuickListValue<T> = CLR_BLANK_OPTION;
  @Input('clrAllValues') allValues: ClrQuickListValue<T>[] = [this.blankOption];
  @Input('clrMandatory') mandatory = false;
  @Input('clrValues') values: ClrQuickListValue<T>[] = [];
  @Input('clrAddLabel') addLabel = 'ADD';
  @Input('clrControlClasses') controlClasses = 'clr-col-md-10';
  @Input() readonly: string;
  @Input() compactMode = false;
  @Output('clrValuesChanged') valuesChanged = new EventEmitter<ClrQuickListValue<T>[]>();
  @Output('clrEmptyOptionAdded') emptyOptionAdded = new EventEmitter<void>();

  @ViewChildren(ClrAddOption) options: QueryList<ClrAddOption<T>>;

  ngOnInit(): void {
    if (this.values.length === 0) {
      this.values.push(...this.getEmptyValues());
    }
  }

  writeValue(value: ClrQuickListValue<T>[]): void {
    this.values = value?.length ? [...value] : this.getEmptyValues();
  }

  getEmptyValues(): ClrQuickListValue<T>[] {
    return this.mandatory ? [this.blankOption] : [];
  }

  onValueChanged(value: ClrQuickListValue<T>, i: number): void {
    if (value) {
      this.values[i] = value;
      this.emitValueChanged();
      this.focusOption(value);
    }
  }

  onRemoveValue(i: number): void {
    this.values.splice(i, 1);
    this.emitValueChanged();
  }

  addBlankOption(): void {
    if (!this.hasBlankOption()) {
      this.values.push(this.blankOption);
      this.emitValueChanged();
      this.emptyOptionAdded.emit();
      this.focusOption(this.blankOption);
    }
  }

  emitValueChanged(): void {
    this.valuesChanged.emit(this.values);
    this.onChange(this.values);
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
