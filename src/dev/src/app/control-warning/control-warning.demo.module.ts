/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ClarityModule, ClrCommonFormsModule } from '@clr/angular';

import { ControlWarningDemo } from './control-warning.demo';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    ClrCommonFormsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: ControlWarningDemo }]),
    ControlWarningDemo,
  ],
  exports: [ControlWarningDemo],
})
export class ControlWarningDemoModule {}
