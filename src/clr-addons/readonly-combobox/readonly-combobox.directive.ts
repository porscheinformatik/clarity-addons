/*
 * Copyright (c) 2018-2020 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: 'clr-combobox-container[readOnly], clr-datalist-container[readOnly], clr-select-container[readOnly]',
})
export class ClrReadonlyCombobox{
  constructor (private elRef: ElementRef, private renderer: Renderer2) {

  }

  @Input() set readOnly(value: boolean) {
    const inputElement = this.elRef.nativeElement.querySelector('input, select');
    console.log(inputElement);
    if (value) {
      setTimeout(()=>{
        this.renderer.setAttribute(inputElement, 'disabled', 'true');
        this.renderer.setAttribute(this.elRef.nativeElement, 'readonly', 'true');
      })
    } else {
      this.renderer.removeAttribute(inputElement, 'disabled');
      this.renderer.removeAttribute(this.elRef.nativeElement, 'readonly');
    }
  }

}
