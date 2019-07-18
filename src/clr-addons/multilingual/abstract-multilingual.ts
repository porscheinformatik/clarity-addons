/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { AfterViewInit, HostBinding, Injector, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export abstract class ClrMultilingualAbstract implements ControlValueAccessor, AfterViewInit, OnDestroy {
  @HostBinding('class.clr-form-control') formControl = true;
  @HostBinding('class.clr-multilingual') multi = true;
  @HostBinding('class.clr-error') invalid = false;

  @Input('clrControlClasses') controlClasses = 'clr-col-md-10';
  @Input('clrSelectedLang') selectedLang: string;

  @ViewChild('input', { static: false }) inputElement: ElementRef;

  disabled = false;
  textarea = false;
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

  changeLanguage(key: string) {
    // need as the click for closing the menu is registered on a single item
    // if the language change destroys it immediately, the click won't get fired
    setTimeout(() => {
      this.selectedLang = key;
      this.inputElement.nativeElement.focus();
    }, 0);
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
