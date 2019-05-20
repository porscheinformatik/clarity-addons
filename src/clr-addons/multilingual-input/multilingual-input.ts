/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { AfterViewInit, Component, forwardRef, HostBinding, Injector, Input, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ɵs as NgControlService } from '@clr/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'clr-multilingual-input',
  templateUrl: './multilingual-input.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ClrMultilingualInput),
      multi: true,
    },
    NgControlService,
  ],
})
export class ClrMultilingualInput implements ControlValueAccessor, AfterViewInit, OnDestroy {
  @HostBinding('class.clr-form-control') formControl = true;
  @HostBinding('class.clr-multilingual-input') multi = true;
  @HostBinding('class.clr-error') invalid = false;

  @Input('clrControlClasses') controlClasses = 'clr-col-md-10';

  disabled = false;
  private _selectedLang: string;
  private _texts: Map<string, string>;
  onChange: any = () => {};
  onTouch: any = () => {};

  destroyed = new Subject();

  constructor(private injector: Injector) {}

  ngAfterViewInit(): void {
    // get the form control to know invalid state in angular
    const ngControl: NgControl = this.injector.get(NgControl, null);
    if (ngControl) {
      const control = ngControl.control as FormControl;
      control.statusChanges.pipe(takeUntil(this.destroyed)).subscribe(status => (this.invalid = status === 'INVALID'));
    }
  }

  @Input('clrSelectedLang')
  set selectedLang(lang: string) {
    this._selectedLang = lang;
  }

  get selectedLang() {
    return this._selectedLang;
  }

  setText(key: string, value: string) {
    this._texts.set(key, value);
    this.onChange(new Map(this._texts));
  }

  get texts() {
    return this._texts;
  }

  writeValue(value: Map<string, string>): void {
    if (!!value) {
      this._texts = new Map(value);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
