/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, forwardRef, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ClrMultilingualAbstract } from '../abstract-multilingual';
import { ɵbe as ControlIdService } from '@clr/angular';

@Component({
  selector: 'clr-multilingual-textarea',
  templateUrl: '../multilingual.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ClrMultilingualTextarea),
      multi: true,
    },
    ControlIdService,
  ],
})
export class ClrMultilingualTextarea extends ClrMultilingualAbstract {
  constructor(injector: Injector) {
    super(injector);
    this.textarea = true;
  }
}
