/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import {
  ClrCommonFormsModule,
  ClrLoadingButtonModule,
  ClrLoadingModule,
  ClrLoadingState,
  ClrPasswordModule,
} from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { ClrAddonsLabel, ClrAutocompleteOff } from '@porscheinformatik/clr-addons';

@Component({
  selector: 'clr-kitchen-sink',
  templateUrl: './kitchen-sink.html',
  imports: [
    ClrLoadingButtonModule,
    ClrLoadingModule,
    FormsModule,
    ClrCommonFormsModule,
    ClrPasswordModule,
    ClrAddonsLabel,
    ClrAutocompleteOff,
  ],
})
export class KitchenSink {
  validateBtnState = ClrLoadingState.DEFAULT;

  validateDemo() {
    this.validateBtnState = ClrLoadingState.LOADING;
    setTimeout(() => (this.validateBtnState = ClrLoadingState.SUCCESS), 2000);
  }
}
