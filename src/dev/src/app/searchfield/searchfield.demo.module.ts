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

import { SearchFieldDemo } from './searchfield.demo';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    ClrFormsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: SearchFieldDemo }]),
    SearchFieldDemo,
  ],
  exports: [SearchFieldDemo],
})
export class SearchFieldDemoModule {}
