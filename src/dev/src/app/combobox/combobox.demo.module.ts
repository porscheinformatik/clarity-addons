/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';

import { ComboboxDemo } from './combobox.demo';
import { ClrAddonsModule } from '@porscheinformatik/clr-addons';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    RouterModule.forChild([{ path: '', component: ComboboxDemo }]),
    ClrAddonsModule,
    FormsModule,
  ],
  declarations: [ComboboxDemo],
  exports: [ComboboxDemo],
})
export class ComboboxDemoModule {}
