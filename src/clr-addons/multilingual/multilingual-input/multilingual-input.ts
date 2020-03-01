/*
 * Copyright (c) 2018-2020 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, forwardRef, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ClrMultilingualAbstract } from '../abstract-multilingual';
import { ɵz as ControlIdService } from '@clr/angular';

@Component({
  selector: 'clr-multilingual-input',
  templateUrl: '../multilingual.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ClrMultilingualInput),
      multi: true,
    },
    ControlIdService,
  ],
})
export class ClrMultilingualInput extends ClrMultilingualAbstract {
  constructor(injector: Injector) {
    super(injector);
  }
}
