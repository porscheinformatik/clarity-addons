/*
 * Copyright (c) 2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { NgModule } from '@angular/core';

import { AreaChartComponent } from './area-chart/area-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { ComboChartComponent } from './combo-chart/combo-chart.component';
import { FunnelChartComponent } from './funnel-chart/funnel-chart.component';
import { GroupedBarChartComponent } from './grouped-bar-chart/grouped-bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';

export const CLR_CHARTS_DECLARATIONS = [
  AreaChartComponent,
  BarChartComponent,
  ComboChartComponent,
  FunnelChartComponent,
  GroupedBarChartComponent,
  LineChartComponent,
  PieChartComponent,
] as const;

/**
 * @deprecated Compatibility wrapper for NgModule-based consumers. Import the standalone chart components (`BarChartComponent`, `LineChartComponent`, ...) directly instead.
 */
@NgModule({
  imports: [...CLR_CHARTS_DECLARATIONS],
  exports: [...CLR_CHARTS_DECLARATIONS],
})
export class ClrChartsModule {}
