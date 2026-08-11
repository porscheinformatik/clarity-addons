/*
 * Copyright (c) 2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, signal } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ClrAlertModule } from '@clr/angular';
import {
  ClrChartsModule,
  GroupedBarChartData,
  GroupedBarChartGroup,
  GroupedBarChartValue,
} from '@porscheinformatik/clr-addons/charts';

const COLORS = ['--cds-global-color-lavender-400', '#00828b', '#c1326e', '#5b40b2'];

@Component({
  selector: 'clr-grouped-bar-chart-demo',
  templateUrl: './grouped-bar-chart.demo.html',
  imports: [FormsModule, ClrAlertModule, ClrChartsModule],
})
export class GroupedBarChartDemo {
  protected readonly orientation = signal<'horizontal' | 'vertical'>('horizontal');
  protected readonly barSizePx = signal(12);
  protected readonly exportFilename = signal('grouped-bar-chart');
  protected readonly loading = signal(false);
  protected readonly showLegend = signal(true);
  protected readonly showExportButton = signal(false);
  protected readonly lastClicked = signal<GroupedBarChartValue | undefined>(undefined);

  protected readonly groups: GroupedBarChartGroup[] = [
    { key: 'q1', label: 'Q1' },
    { key: 'q2', label: 'Q2' },
    { key: 'q3', label: 'Q3' },
    { key: 'q4', label: 'Q4' },
  ];

  protected readonly data: GroupedBarChartData[] = [
    { key: 'q1-revenue', groupKey: 'q1', label: 'Revenue', value: 120, color: COLORS[0] },
    { key: 'q1-costs', groupKey: 'q1', label: 'Costs', value: 60, color: COLORS[1] },
    { key: 'q1-profit', groupKey: 'q1', label: 'Profit', value: 35, color: COLORS[2] },
    { key: 'q2-revenue', groupKey: 'q2', label: 'Revenue', value: 165, color: COLORS[0] },
    { key: 'q2-costs', groupKey: 'q2', label: 'Costs', value: 80, color: COLORS[1] },
    { key: 'q2-profit', groupKey: 'q2', label: 'Profit', value: 55, color: COLORS[2] },
    { key: 'q3-revenue', groupKey: 'q3', label: 'Revenue', value: 140, color: COLORS[0] },
    { key: 'q3-costs', groupKey: 'q3', label: 'Costs', value: 90, color: COLORS[1] },
    { key: 'q3-profit', groupKey: 'q3', label: 'Profit', value: 42, color: COLORS[2] },
    { key: 'q4-revenue', groupKey: 'q4', label: 'Revenue', value: 220, color: COLORS[0] },
    { key: 'q4-costs', groupKey: 'q4', label: 'Costs', value: 130, color: COLORS[1] },
    { key: 'q4-profit', groupKey: 'q4', label: 'Profit', value: 75, color: COLORS[2] },
  ];

  protected readonly emptyData: GroupedBarChartData[] = [];

  protected readonly manyGroups: GroupedBarChartGroup[] = Array.from({ length: 25 }, (_, i) => ({
    key: `country-${i}`,
    label: `Country ${i + 1}`,
  }));

  protected readonly manyData: GroupedBarChartData[] = this.manyGroups.flatMap((group, i) => [
    { key: `${group.key}-revenue`, groupKey: group.key, label: 'Revenue', value: 80 + i * 8, color: COLORS[0] },
    { key: `${group.key}-costs`, groupKey: group.key, label: 'Costs', value: 40 + i * 4, color: COLORS[1] },
    { key: `${group.key}-profit`, groupKey: group.key, label: 'Profit', value: 20 + i * 2, color: COLORS[2] },
  ]);

  protected toggleLoading(): void {
    this.loading.set(!this.loading());
  }

  protected toggleOrientation(): void {
    this.orientation.set(this.orientation() === 'horizontal' ? 'vertical' : 'horizontal');
  }

  protected toggleLegend(): void {
    this.showLegend.set(!this.showLegend());
  }

  protected toggleExportButton(): void {
    this.showExportButton.set(!this.showExportButton());
  }

  protected onValueClicked(value: GroupedBarChartValue): void {
    this.lastClicked.set(value);
  }
}
