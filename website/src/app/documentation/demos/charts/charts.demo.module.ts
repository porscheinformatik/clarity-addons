/*
 * Copyright (c) 2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { ClrChartsModule } from '@porscheinformatik/clr-addons/charts';
import { DocWrapperModule } from '../_doc-wrapper/doc-wrapper.module';
import { UtilsModule } from '../../../utils/utils.module';
import { ChartsDemo } from './charts.demo';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    DocWrapperModule,
    UtilsModule,
    RouterModule.forChild([{ path: '', component: ChartsDemo }]),
    ClrChartsModule,
  ],
  declarations: [ChartsDemo],
  exports: [ChartsDemo],
})
export class ChartsDemoModule {}
