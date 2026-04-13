/*
 * Copyright (c) 2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClrAlertModule } from '@clr/angular';
import {
  ClrChartsModule,
  ComboBarSeries,
  ComboChartValue,
  ComboLineSeries,
} from '@porscheinformatik/clr-addons/charts';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

@Component({
  selector: 'clr-combo-chart-demo',
  templateUrl: './combo-chart.demo.html',
  imports: [CommonModule, FormsModule, ClrAlertModule, ClrChartsModule],
})
export class ComboChartDemo {
  protected readonly loading = signal(false);
  protected readonly showLegend = signal(true);
  protected readonly showExportButton = signal(false);
  protected readonly exportFilename = signal('combo-chart');
  protected readonly lastClicked = signal<ComboChartValue | undefined>(undefined);

  // ── Data ─────────────────────────────────────────────────────────────────────

  protected readonly barSeries: ComboBarSeries[] = [
    {
      key: 'revenue',
      label: 'Revenue',
      color: '#e57200',
      data: MONTHS.map((x, i) => ({
        x,
        xLabel: x,
        value: 80 + Math.round(Math.sin(i / 2) * 60 + i * 8),
      })),
    },
    {
      key: 'costs',
      label: 'Costs',
      color: '#00828b',
      data: MONTHS.map((x, i) => ({
        x,
        xLabel: x,
        value: 40 + Math.round(Math.cos(i / 2) * 30 + i * 4),
      })),
    },
  ];

  protected readonly lineSeries: ComboLineSeries[] = [
    {
      key: 'target',
      label: 'Target',
      color: '#c1326e',
      data: MONTHS.map((x, i) => ({ x, value: 100 + i * 10 })),
    },
    {
      key: 'average',
      label: '3-Month Average',
      color: '#5b40b2',
      data: MONTHS.map((x, i) => ({
        x,
        value: Math.round(
          [0, 1, 2].reduce((s, o) => {
            const idx = Math.max(0, i - o);
            return s + 80 + Math.round(Math.sin(idx / 2) * 60 + idx * 8);
          }, 0) / 3
        ),
      })),
    },
  ];

  // ── RTT Monitoring data (maps the Chart.js numSuccess / numErrors / RTT config) ──

  private readonly rttHours = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
  ];

  // Raw counters per hour
  private readonly rawSuccess = [
    120, 98, 76, 54, 43, 61, 150, 210, 280, 310, 295, 275, 260, 285, 300, 320, 305, 290, 270, 240, 210, 180, 155, 130,
  ];
  private readonly rawErrors = [2, 1, 0, 1, 0, 0, 3, 5, 8, 4, 6, 3, 2, 4, 3, 5, 4, 2, 3, 2, 1, 2, 1, 1];
  // RTT values in ms
  private readonly rawMin = [
    12, 11, 10, 10, 9, 10, 13, 14, 16, 18, 17, 16, 15, 16, 17, 18, 17, 16, 15, 14, 13, 12, 12, 11,
  ];
  private readonly rawAvg = [
    28, 25, 22, 21, 20, 22, 30, 35, 42, 48, 44, 40, 38, 41, 44, 47, 45, 43, 40, 36, 33, 30, 28, 27,
  ];
  private readonly rawMax = [
    95, 80, 68, 64, 60, 65, 105, 130, 165, 190, 175, 158, 150, 162, 175, 188, 178, 168, 155, 140, 125, 108, 98, 92,
  ];

  protected readonly rttBarSeries: ComboBarSeries[] = [
    {
      key: 'numSuccess',
      label: 'numSuccess',
      color: '#63AB78',
      data: this.rttHours.map((x, i) => ({ x, xLabel: x, value: this.rawSuccess[i] })),
    },
    {
      key: 'numErrors',
      label: 'numErrors',
      color: '#EC3733',
      data: this.rttHours.map((x, i) => ({ x, xLabel: x, value: this.rawErrors[i] })),
    },
  ];

  protected readonly rttLineSeries: ComboLineSeries[] = [
    {
      key: 'minRoundTripTime',
      label: 'minRoundTripTime',
      color: '#5A84C7',
      data: this.rttHours.map((x, i) => ({ x, value: this.rawMin[i] })),
    },
    {
      key: 'avgRoundTripTime',
      label: 'avgRoundTripTime',
      color: '#D59A64',
      data: this.rttHours.map((x, i) => ({ x, value: this.rawAvg[i] })),
    },
    {
      key: 'maxRoundTripTime',
      label: 'maxRoundTripTime',
      color: '#B05782',
      data: this.rttHours.map((x, i) => ({ x, value: this.rawMax[i] })),
    },
  ];

  /** Only bars, no line overlay */
  protected readonly barsOnlyLineSeries: ComboLineSeries[] = [];

  /** Only lines, no bars */
  protected readonly linesOnlyBarSeries: ComboBarSeries[] = [];

  protected emptyBarSeries: ComboBarSeries[] = [];
  protected emptyLineSeries: ComboLineSeries[] = [];

  // ── Clipping demo data (values intentionally exceed yBarMax=200 / yLineMax=100) ──

  protected readonly clippingBarSeries: ComboBarSeries[] = [
    {
      key: 'clipping-a',
      label: 'Series A',
      color: '#e57200',
      data: [
        { x: 'Jan', xLabel: 'Jan', value: 120 },
        { x: 'Feb', xLabel: 'Feb', value: 250 }, // exceeds max (200)
        { x: 'Mar', xLabel: 'Mar', value: 80 },
        { x: 'Apr', xLabel: 'Apr', value: 340 }, // strongly exceeds max
        { x: 'May', xLabel: 'May', value: 190 },
        { x: 'Jun', xLabel: 'Jun', value: 60 },
      ],
    },
    {
      key: 'clipping-b',
      label: 'Series B',
      color: '#00828b',
      data: [
        { x: 'Jan', xLabel: 'Jan', value: 60 },
        { x: 'Feb', xLabel: 'Feb', value: 40 },
        { x: 'Mar', xLabel: 'Mar', value: 90 },
        { x: 'Apr', xLabel: 'Apr', value: 30 },
        { x: 'May', xLabel: 'May', value: 50 },
        { x: 'Jun', xLabel: 'Jun', value: 110 },
      ],
    },
  ];

  protected readonly clippingLineSeries: ComboLineSeries[] = [
    {
      key: 'clipping-line',
      label: 'Rate',
      color: '#c1326e',
      data: [
        { x: 'Jan', value: 40 },
        { x: 'Feb', value: 150 }, // exceeds yLineMax=100
        { x: 'Mar', value: 70 },
        { x: 'Apr', value: 220 }, // strongly exceeded
        { x: 'May', value: 90 },
        { x: 'Jun', value: 55 },
      ],
    },
  ];

  // ── Actions ───────────────────────────────────────────────────────────────────

  public toggleLoading(): void {
    this.loading.set(!this.loading());
  }

  public toggleLegend(): void {
    this.showLegend.set(!this.showLegend());
  }

  public toggleExportButton(): void {
    this.showExportButton.set(!this.showExportButton());
  }

  public onValueClicked(value: ComboChartValue): void {
    this.lastClicked.set(value);
  }
}
