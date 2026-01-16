/*
 * Copyright (c) 2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  ClrAddonsModule,
  ClrSummaryArea,
  ClrSummaryAreaStateService,
  ClrSummaryAreaToggle,
  ClrSummaryItem,
  ClrSummaryItemValue,
} from '@porscheinformatik/clr-addons';
import { ClarityModule } from '@clr/angular';
import { NgModule } from '@angular/core';
import { UtilsModule } from '../../../utils/utils.module';
import { FormsModule } from '@angular/forms';
import { DocWrapperModule } from '../_doc-wrapper/doc-wrapper.module';
import { SummaryAreaDemo } from './summary-area.demo';

@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
    DocWrapperModule,
    RouterModule.forChild([{ path: '', component: SummaryAreaDemo }]),
    FormsModule,
    ClarityModule,
    ClrAddonsModule,
    ClrSummaryArea,
    ClrSummaryItem,
    ClrSummaryItemValue,
    ClrSummaryAreaToggle,
  ],
  declarations: [SummaryAreaDemo],
  exports: [SummaryAreaDemo],
  providers: [ClrSummaryAreaStateService],
})
export class SummaryAreaDemoModule {}
