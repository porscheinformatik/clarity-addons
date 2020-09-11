/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { AfterViewInit, HostBinding, Injector, OnDestroy, Directive } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { ɵbb as ControlIdService, ɵbg as MarkControlService } from '@clr/angular';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive()
export abstract class ClrAbstractFormComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
  @HostBinding('class.clr-form-control') formControl = true;
  @HostBinding('class.clr-error') showError = false;

  control: FormControl;
  inputId: string;
  disabled = false;
  invalid = false;
  destroyed = new Subject();

  constructor(private injector: Injector) {}

  ngAfterViewInit(): void {
    // get the form control to know invalid state in angular
    const ngControl: NgControl = this.injector.get(NgControl, null);
    if (ngControl) {
      this.control = ngControl.control as FormControl;
      this.control.statusChanges.pipe(takeUntil(this.destroyed)).subscribe(status => {
        this.invalid = status === 'INVALID';
        this.showError = this.invalid && this.control.touched;
      });
    }

    const markControlService = this.injector.get(MarkControlService, null);
    if (markControlService) {
      markControlService.touchedChange.subscribe(() => {
        this.control.markAsTouched();
        this.control.updateValueAndValidity();
      });
    }

    const controlIdService = this.injector.get(ControlIdService, null);
    if (controlIdService) {
      // timeout to prevent ExpressionChangedAfterItHasBeenCheckedError
      setTimeout(() => (this.inputId = controlIdService.id));
    }
  }

  abstract writeValue(value: any): void;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: any = () => {};
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  onTouch: any = () => this.defaultOnTouch();
  registerOnTouched(fn: any): void {
    this.onTouch = (): void => {
      fn();
      this.defaultOnTouch();
    };
  }

  defaultOnTouch(): void {
    this.showError = this.invalid && this.control.touched;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
