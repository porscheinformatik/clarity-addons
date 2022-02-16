/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { AfterViewInit, Directive, HostBinding, Injector, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { ClrForm } from '@clr/angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ControlIdService } from './control-id.service';

let instanceCount = 0;
let origMarkAsTouched: () => void;
const markedAsTouch = new Subject<void>();

@Directive()
export abstract class ClrAbstractFormComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
  @HostBinding('class.clr-form-control') formControl = true;
  @HostBinding('class.clr-error') get showError() {
    return this.invalid && this.control.touched;
  }

  control: FormControl;
  inputId: string;
  disabled = false;
  invalid = false;
  destroyed = new Subject<void>();

  constructor(private injector: Injector) {
    instanceCount++;
    this.patchMarkAsTouched();
  }

  ngOnInit(): void {
    const controlIdService = this.injector.get(ControlIdService, null);
    if (controlIdService) {
      this.inputId = controlIdService.id;
    }
  }

  ngAfterViewInit(): void {
    // get the form control to know invalid state in angular
    const ngControl: NgControl = this.injector.get(NgControl, null);
    if (ngControl) {
      this.control = ngControl.control as FormControl;
      this.control.statusChanges.pipe(takeUntil(this.destroyed)).subscribe(status => {
        this.invalid = status === 'INVALID';
      });
    }

    markedAsTouch.pipe(takeUntil(this.destroyed)).subscribe(() => {
      this.control.markAsTouched();
      this.control.updateValueAndValidity();
    });
  }

  abstract writeValue(value: unknown): void;

  onChange = (_: unknown): void => {
    /* empty default */
  };

  registerOnChange(fn: (_: unknown) => void): void {
    this.onChange = fn;
  }

  onTouch = (): void => {
    /* empty default */
  };

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
    instanceCount--;
    this.unpatchMarkAsTouched();
  }

  /**
   * Patch markAsTouched method of ClrForm to get recognized when touched programmatically.
   * No other way found to accomplish the same thing.
   */
  patchMarkAsTouched() {
    if (instanceCount === 1) {
      origMarkAsTouched = ClrForm.prototype.markAsTouched;
      ClrForm.prototype.markAsTouched = function () {
        markedAsTouch.next();
        origMarkAsTouched.call(this);
      };
    }
  }

  unpatchMarkAsTouched() {
    if (instanceCount === 0 && origMarkAsTouched) {
      ClrForm.prototype.markAsTouched = origMarkAsTouched;
    }
  }
}
