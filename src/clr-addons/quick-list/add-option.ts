/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ClrQuickListValue } from './add-option.service';

@Component({
  selector: 'clr-add-option',
  templateUrl: './add-option.html',
  host: { '[class.quick-list-option]': 'true' },
})
export class ClrAddOption<T> implements AfterViewInit {
  @Input() blankOption: ClrQuickListValue<T>;
  @Input() value: ClrQuickListValue<T>;
  @Input() mandatory: boolean = false;
  @Input() allValues: Array<ClrQuickListValue<T>> = [];
  @Input() excludedValues: Array<ClrQuickListValue<T>> = [];

  @Output() valueChanged = new EventEmitter<ClrQuickListValue<T>>();
  @Output() remove = new EventEmitter<void>();

  @ViewChild('select', { static: true }) select: ElementRef;

  set selectedValue(id: string) {
    this.value = this.allValues.find(val => val.id === id);
    this.valueChanged.emit(this.value);
  }

  get selectedValue(): string {
    return this.value.id;
  }

  getValues() {
    const excludedIds = this.excludedValues.filter(val => val.id !== this.value.id).map(val => val.id);
    return this.allValues.filter(val => !excludedIds.includes(val.id));
  }

  trashDisabled(): boolean {
    return this.mandatory && this.excludedValues.length === 1;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      (this.select.nativeElement as HTMLInputElement).focus();
    });
  }
}
