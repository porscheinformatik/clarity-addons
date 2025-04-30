/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';

import { DatagridHighlightDemo } from './datagrid-highlight.demo';
import { RouterModule } from '@angular/router';
import { ClrAddonsModule } from '@porscheinformatik/clr-addons';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    ClrAddonsModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: DatagridHighlightDemo }]),
  ],
  declarations: [DatagridHighlightDemo],
  exports: [DatagridHighlightDemo],
})
export class DatagridHighlightDemoModule {}
