/*
 * Copyright (c) 2018-2022 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';

@Component({
  selector: 'clr-kitchen-sink',
  templateUrl: './kitchen-sink.html',
})
export class KitchenSink {
  validateBtnState = ClrLoadingState.DEFAULT;

  validateDemo() {
    this.validateBtnState = ClrLoadingState.LOADING;
    setTimeout(() => (this.validateBtnState = ClrLoadingState.SUCCESS), 2000);
  }
}
