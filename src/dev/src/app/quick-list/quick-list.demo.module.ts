/*
 * Copyright (c) 2018-2022 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickListDemo } from './quick-list.demo';
import { ClrAddonsModule } from '@porscheinformatik/clr-addons';
import { ClrInputModule } from '@clr/angular';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ClrAddonsModule,
    ClrInputModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: QuickListDemo }]),
  ],
  declarations: [QuickListDemo],
  exports: [QuickListDemo],
})
export class QuickListModule {}
