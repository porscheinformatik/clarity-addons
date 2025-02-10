/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';

@Component({
  selector: 'app-progress-spinner.demo',
  templateUrl: './progress-spinner.demo.html',
  standalone: false,
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
