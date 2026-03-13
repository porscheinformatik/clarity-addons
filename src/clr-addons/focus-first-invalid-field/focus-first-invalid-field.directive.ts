/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: 'form[clrFocusFirstInvalidField]',
})
export class ClrFocusFirstInvalidFieldDirective {
  private readonly elementRef = inject(ElementRef);

  @HostListener('ngSubmit')
  onFormSubmit() {
    const parentElement = this.elementRef.nativeElement.querySelector('.ng-invalid');
    //do nothing if there is nothing is invalid
    if (!parentElement) {
      return;
    }
    const childElement =
      parentElement.querySelector('input') ||
      parentElement.querySelector('textarea') ||
      parentElement.querySelector('select');
    if (childElement) {
      childElement.focus();
    } else {
      parentElement.focus();
    }
  }
}
