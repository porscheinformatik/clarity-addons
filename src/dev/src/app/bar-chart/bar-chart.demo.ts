/*
 * Copyright (c) 2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClrAlertModule } from '@clr/angular';
import { BarChartData, BarChartValue, ClrChartsModule } from '@porscheinformatik/clr-addons/charts';
import { BarChartLabel } from '../../../../clr-addons/charts';

const COLORS = ['--cds-global-color-lavender-400', '#00828b', '#c1326e', '#5b40b2', '#007cba', '#006b4a', '#9e3b00'];

@Component({
  selector: 'clr-bar-chart-demo',
  templateUrl: './bar-chart.demo.html',
  imports: [CommonModule, FormsModule, ClrAlertModule, ClrChartsModule],
})
export class BarChartDemo {
  protected readonly orientation = signal<'horizontal' | 'vertical'>('vertical');
  protected readonly exportFilename = signal('bar-chart');
  protected readonly loading = signal(false);
  protected readonly showStacked = signal(false);
  protected readonly showLegend = signal(true);
  protected readonly showExportButton = signal(false);
  protected readonly lastClicked = signal<BarChartValue | undefined>(undefined);

  /** Simple (non-stacked) data */
  protected readonly simpleData: BarChartData[] = [
    { key: 'jan', label: 'January', value: 120, color: COLORS[0] },
    { key: 'feb', label: 'February', value: 85, color: COLORS[1] },
    { key: 'mar', label: 'March', value: 210, color: COLORS[2] },
    { key: 'apr', label: 'AprilAprilAprilAprilAprilApril', value: 165, color: COLORS[3] },
    { key: 'may', label: 'May', value: 95, color: COLORS[4] },
    { key: 'jun', label: 'June', value: 310, color: COLORS[5] },
    { key: 'jul', label: 'July', value: 240, color: COLORS[6] },
  ];

  /** Stacked data – each item has a stackKey grouping it into a stack */
  protected readonly stackedData: BarChartData[] = [
    { key: 'jan-a', label: 'Revenue', value: 120, color: COLORS[0], stackKey: 'jan' },
    { key: 'jan-b', label: 'Costs', value: 60, color: COLORS[1], stackKey: 'jan' },
    { key: 'feb-a', label: 'Revenue', value: 85, color: COLORS[0], stackKey: 'feb' },
    { key: 'feb-b', label: 'Costs', value: 40, color: COLORS[1], stackKey: 'feb' },
    { key: 'mar-a', label: 'Revenue', value: 210, color: COLORS[0], stackKey: 'mar' },
    { key: 'mar-b', label: 'Costs', value: 90, color: COLORS[1], stackKey: 'mar' },
    { key: 'apr-a', label: 'Revenue', value: 165, color: COLORS[0], stackKey: 'apr' },
    { key: 'apr-b', label: 'Costs', value: 75, color: COLORS[1], stackKey: 'apr' },
  ];

  protected readonly stacks: BarChartLabel[] = [
    { stackKey: 'jan', label: 'January' },
    { stackKey: 'feb', label: 'February' },
    { stackKey: 'mar', label: 'March' },
    { stackKey: 'apr', label: 'April' },
  ];

  /** Multiple values per month – 3 series × 12 months stacked */
  protected readonly allMonthsStacks: BarChartLabel[] = [
    { stackKey: 'jan', label: 'January' },
    { stackKey: 'feb', label: 'February' },
    { stackKey: 'mar', label: 'March' },
    { stackKey: 'apr', label: 'April' },
    { stackKey: 'may', label: 'May' },
    { stackKey: 'jun', label: 'June' },
    { stackKey: 'jul', label: 'July' },
    { stackKey: 'aug', label: 'August' },
    { stackKey: 'sep', label: 'September' },
    { stackKey: 'oct', label: 'October' },
    { stackKey: 'nov', label: 'November' },
    { stackKey: 'dec', label: 'December' },
  ];

  protected readonly multiValueData: BarChartData[] = this.allMonthsStacks.flatMap((m, i) => [
    {
      key: `${m}-revenue`,
      label: 'Revenue',
      value: 80 + Math.round(Math.sin(i / 2) * 50 + i * 8),
      color: COLORS[0],
      stackKey: m.stackKey,
    },
    {
      key: `${m}-costs`,
      label: 'Costs',
      value: 40 + Math.round(Math.cos(i / 2) * 25 + i * 4),
      color: COLORS[1],
      stackKey: m.stackKey,
    },
    {
      key: `${m}-profit`,
      label: 'Profit',
      value: 20 + Math.round(Math.sin(i / 3) * 20 + i * 2),
      color: COLORS[2],
      stackKey: m.stackKey,
    },
  ]);

  /** Empty data → triggers the "no items" info alert */
  protected emptyData: BarChartData[] = [];

  /** 30 items → triggers the "too many items" warning alert (chart can only display a subset) */
  protected manyData: BarChartData[] = Array.from({ length: 60 }, (_, i) => ({
    key: `item-${i}`,
    label: `Item ${i + 1}`,
    value: 50 + ((i * 17) % 200),
    color: COLORS[i % COLORS.length],
  }));

  protected readonly activeData = computed<BarChartData[]>(() =>
    this.showStacked() ? this.stackedData : this.simpleData
  );

  protected readonly activeStacks = computed<BarChartLabel[] | undefined>(() =>
    this.showStacked() ? this.stacks : undefined
  );

  protected toggleOrientation(): void {
    this.orientation.set(this.orientation() === 'vertical' ? 'horizontal' : 'vertical');
  }

  protected toggleLoading(): void {
    this.loading.set(!this.loading());
  }

  protected toggleStacked(): void {
    this.showStacked.set(!this.showStacked());
  }

  protected toggleLegend(): void {
    this.showLegend.set(!this.showLegend());
  }

  protected toggleExportButton(): void {
    this.showExportButton.set(!this.showExportButton());
  }

  protected onValueClicked(value: BarChartValue): void {
    this.lastClicked.set(value);
  }
}
