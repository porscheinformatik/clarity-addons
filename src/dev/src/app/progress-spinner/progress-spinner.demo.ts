/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { ClrProgressSpinnerComponent } from '@porscheinformatik/clr-addons';

@Component({
  selector: 'app-progress-spinner.demo',
  templateUrl: './progress-spinner.demo.html',
  imports: [ClrProgressSpinnerComponent],
})
export class ProgressSpinnerDemo {
  loadingState = false;

  startLoading(): void {
    this.loadingState = true;
  }

  endLoading(): void {
    this.loadingState = false;
  }
}
