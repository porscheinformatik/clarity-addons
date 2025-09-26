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
import { ClrAddonsModule, ClrExportDatagridButtonModule } from '@porscheinformatik/clr-addons';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    ClrAddonsModule,
    ClrExportDatagridButtonModule,
    DocWrapperModule,
    UtilsModule,
    RouterModule.forChild([{ path: '', component: DatagridDemo }]),
    DatePipe,
    CdkDropList,
    CdkDrag,
  ],
  declarations: [DatagridDemo],
  exports: [DatagridDemo],
})
export class DatagridDemoModule {}
