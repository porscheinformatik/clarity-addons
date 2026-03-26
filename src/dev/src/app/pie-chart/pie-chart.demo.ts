/*
 * Copyright (c) 2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClrAlertModule } from '@clr/angular';
import { ClrChartsModule, PieChartData, PieChartValue } from '@porscheinformatik/clr-addons';

const COLORS = ['#e57200', '#00828b', '#c1326e', '#5b40b2', '#007cba', '#006b4a', '#9e3b00'];

@Component({
  selector: 'clr-pie-chart-demo',
  templateUrl: './pie-chart.demo.html',
  imports: [CommonModule, FormsModule, ClrAlertModule, ClrChartsModule],
})
export class PieChartDemo {
  protected readonly loading = signal(false);
  protected readonly exportFilename = signal('pie-demo');
  protected readonly donut = signal(true);
  protected readonly showLegend = signal(true);
  protected readonly showExportButton = signal(false);
  protected readonly lastClicked = signal<PieChartValue | undefined>(undefined);

  protected simpleData: PieChartData[] = [
    { key: 'jan', label: 'January', value: 120, color: COLORS[0] },
    { key: 'feb', label: 'February', value: 85, color: COLORS[1] },
    { key: 'mar', label: 'March', value: 210, color: COLORS[2] },
    { key: 'apr', label: 'April', value: 165, color: COLORS[3] },
    { key: 'may', label: 'May', value: 95, color: COLORS[4] },
    { key: 'jun', label: 'June', value: 310, color: COLORS[5] },
  ];

  protected emptyData: PieChartData[] = [];

  public toggleLoading(): void {
    this.loading.set(!this.loading());
  }

  public toggleDonut(): void {
    this.donut.set(!this.donut());
  }

  public toggleLegend(): void {
    this.showLegend.set(!this.showLegend());
  }

  public toggleExportButton(): void {
    this.showExportButton.set(!this.showExportButton());
  }

  public onValueClicked(value: PieChartValue): void {
    this.lastClicked.set(value);
  }
}
