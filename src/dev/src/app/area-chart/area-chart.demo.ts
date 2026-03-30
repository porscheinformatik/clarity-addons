/*
 * Copyright (c) 2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClrAlertModule } from '@clr/angular';
import { AreaChartSeries, AreaChartValue, ClrChartsModule } from '@porscheinformatik/clr-addons/charts';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

@Component({
  selector: 'clr-area-chart-demo',
  templateUrl: './area-chart.demo.html',
  imports: [CommonModule, FormsModule, ClrAlertModule, ClrChartsModule],
})
export class AreaChartDemo {
  protected readonly loading = signal(false);
  protected readonly exportFilename = signal('area-chart');
  protected readonly showLegend = signal(true);
  protected readonly showExportButton = signal(false);
  protected readonly lastClicked = signal<AreaChartValue | undefined>(undefined);

  protected singleSeries: AreaChartSeries[] = [
    {
      key: 'revenue',
      label: 'Revenue',
      color: '#e57200',
      data: MONTHS.map((x, i) => ({ x, value: 80 + Math.round(Math.sin(i / 2) * 60 + i * 8) })),
    },
  ];

  protected multiSeries: AreaChartSeries[] = [
    {
      key: 'revenue',
      label: 'Revenue',
      color: '#e57200',
      data: MONTHS.map((x, i) => ({ x, value: 80 + Math.round(Math.sin(i / 2) * 60 + i * 8) })),
    },
    {
      key: 'costs',
      label: 'Costs',
      color: '#00828b',
      data: MONTHS.map((x, i) => ({ x, value: 50 + Math.round(Math.cos(i / 2) * 30 + i * 4) })),
    },
    {
      key: 'profit',
      label: 'Profit',
      color: '#5b40b2',
      data: MONTHS.map((x, i) => ({ x, value: Math.max(0, 20 + Math.round(Math.sin(i) * 25 + i * 3)) })),
    },
  ];

  protected emptySeries: AreaChartSeries[] = [];

  public toggleLoading(): void {
    this.loading.set(!this.loading());
  }

  public toggleLegend(): void {
    this.showLegend.set(!this.showLegend());
  }

  public toggleExportButton(): void {
    this.showExportButton.set(!this.showExportButton());
  }

  public onValueClicked(value: AreaChartValue): void {
    this.lastClicked.set(value);
  }
}
