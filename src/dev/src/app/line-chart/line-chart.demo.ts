/*
 * Copyright (c) 2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClrAlertModule } from '@clr/angular';
import { ClrChartsModule, LineChartSeries, LineChartValue } from '@porscheinformatik/clr-addons';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

@Component({
  selector: 'clr-line-chart-demo',
  templateUrl: './line-chart.demo.html',
  imports: [CommonModule, FormsModule, ClrAlertModule, ClrChartsModule],
})
export class LineChartDemo {
  protected readonly loading = signal(false);
  protected readonly exportFilename = signal('line-chart');
  protected readonly showArea = signal(false);
  protected readonly showLegend = signal(true);
  protected readonly showValues = signal(false);
  protected readonly showExportButton = signal(false);
  protected readonly lastClicked = signal<LineChartValue | undefined>(undefined);

  protected singleSeries: LineChartSeries[] = [
    {
      key: 'revenue',
      label: 'Revenue',
      color: '#e57200',
      data: MONTHS.map((x, i) => ({ x, value: 80 + Math.round(Math.sin(i / 2) * 60 + i * 8) })),
    },
  ];

  protected multiSeries: LineChartSeries[] = [
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

  public emptySeries: LineChartSeries[] = [];

  public toggleLoading(): void {
    this.loading.set(!this.loading());
  }

  public toggleArea(): void {
    this.showArea.set(!this.showArea());
  }

  public toggleLegend(): void {
    this.showLegend.set(!this.showLegend());
  }

  public toggleValues(): void {
    this.showValues.set(!this.showValues());
  }

  public toggleExportButton(): void {
    this.showExportButton.set(!this.showExportButton());
  }

  public onValueClicked(value: LineChartValue): void {
    this.lastClicked.set(value);
  }
}
