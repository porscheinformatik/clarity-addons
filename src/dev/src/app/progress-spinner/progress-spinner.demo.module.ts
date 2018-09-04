/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSpinnerDemo } from './progress-spinner.demo';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { ClrAddonsModule } from '@porscheinformatik/clr-addons';

@NgModule({
  imports: [CommonModule, ClarityModule, ClrAddonsModule, FormsModule],
  declarations: [ProgressSpinnerDemo],
  exports: [ProgressSpinnerDemo],
})
export class ProgressSpinnerDemoModule {}
