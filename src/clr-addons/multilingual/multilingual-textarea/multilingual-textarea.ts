/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, forwardRef, Injector, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ɵs as NgControlService, ClrDropdown } from '@clr/angular';
import { ClrMultilingualAbstract } from '../abstract-multilingual';

@Component({
  selector: 'clr-multilingual-textarea',
  templateUrl: '../multilingual.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ClrMultilingualTextarea),
      multi: true,
    },
    NgControlService,
  ],
})
export class ClrMultilingualTextarea extends ClrMultilingualAbstract {
  @ViewChild(ClrDropdown, { read: ElementRef })
  dropdown: ElementRef;

  constructor(injector: Injector, private renderer: Renderer2) {
    super(injector);
    this.textarea = true;
  }

  onScroll(event) {
    this.renderer.setStyle(this.dropdown.nativeElement, 'transform', 'translateY(-' + event.target.scrollTop + 'px)');
  }
}
