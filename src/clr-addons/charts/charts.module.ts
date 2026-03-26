/*
 * Copyright (c) 2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ClrAlertModule, ClrIconModule, ClrSignpostModule } from '@clr/angular';

import { AreaChartComponent } from './area-chart/area-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { ComboChartComponent } from './combo-chart/combo-chart.component';
import { FunnelChartComponent } from './funnel-chart/funnel-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';

import { ChartAlertOverlayComponent } from './chart-alert-overlay/chart-alert-overlay.component';
import { ChartExportButtonComponent } from './chart-export/chart-export-button.component';
import { ChartLegendComponent } from './chart-legend/chart-legend.component';
import { ChartSkeletonComponent } from './shared/chart-skeleton.component';
import { ChartTooltipComponent } from './chart-tooltip/chart-tooltip.component';
import { OutsideClickDirective, WindowResizeDirective } from './directives';

const CLR_CHARTS_DECLARATIONS = [
  AreaChartComponent,
  BarChartComponent,
  ComboChartComponent,
  FunnelChartComponent,
  LineChartComponent,
  PieChartComponent,
];

@NgModule({
  imports: [
    CommonModule,
    DecimalPipe,
    ClrAlertModule,
    ClrIconModule,
    ClrSignpostModule,
    // standalone helpers consumed by the non-standalone chart components
    ChartAlertOverlayComponent,
    ChartExportButtonComponent,
    ChartLegendComponent,
    ChartSkeletonComponent,
    ChartTooltipComponent,
    OutsideClickDirective,
    WindowResizeDirective,
  ],
  declarations: [...CLR_CHARTS_DECLARATIONS],
  exports: [...CLR_CHARTS_DECLARATIONS],
})
export class ClrChartsModule {}
