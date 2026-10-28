/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, forwardRef, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { ControlIdService } from '../../abstract-form-component/control-id.service';
import { ClrMultilingualAbstract } from '../abstract-multilingual';
import { ClarityIcons, ClrIcon, exclamationCircleIcon } from '@clr/angular';
import { NgClass } from '@angular/common';
import { ClrMultilingualSelector } from '../multilingual-selector';

ClarityIcons.addIcons(exclamationCircleIcon);

@Component({
  selector: 'clr-multilingual-input',
  templateUrl: './multilingual-input.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ClrMultilingualInput),
      multi: true,
    },
    ControlIdService,
  ],
  imports: [NgClass, ClrMultilingualSelector, FormsModule, ClrIcon],
})
export class ClrMultilingualInput extends ClrMultilingualAbstract {
  constructor(injector: Injector) {
    super(injector);
  }
}
