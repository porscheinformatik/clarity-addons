/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ClarityModule, ClrFormsModule } from '@clr/angular';

import { FocusFirstInvalidFieldDemo } from './focus-first-invalid-field.demo';
import { ClrAddonsModule } from '@porscheinformatik/clr-addons';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule,
    ClrFormsModule,
    ClrAddonsModule,
    RouterModule.forChild([{ path: '', component: FocusFirstInvalidFieldDemo }]),
    ReactiveFormsModule,
  ],
  declarations: [],
  exports: [],
})
export class FocusFirstInvalidFieldDemoModule {}
