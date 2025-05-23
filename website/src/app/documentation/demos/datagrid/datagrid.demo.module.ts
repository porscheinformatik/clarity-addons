/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ClarityModule } from '@clr/angular';

import { DatagridDemo } from './datagrid.demo';
import { DocWrapperModule } from '../_doc-wrapper/doc-wrapper.module';
import { RouterModule } from '@angular/router';
import { UtilsModule } from '../../../utils/utils.module';
import { ClrAddonsModule } from '@porscheinformatik/clr-addons';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    ClrAddonsModule,
    DocWrapperModule,
    UtilsModule,
    RouterModule.forChild([{ path: '', component: DatagridDemo }]),
    DatePipe,
  ],
  declarations: [DatagridDemo],
  exports: [DatagridDemo],
})
export class DatagridDemoModule {}
