/*
 * Copyright (c) 2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { share } from 'rxjs';
import { ClarityDocComponent } from '../clarity-doc';
import {
  BarChartData,
  ComboBarSeries,
  ComboLineSeries,
  FunnelChartData,
  PieChartData,
  XYChartSeries,
} from '@porscheinformatik/clr-addons/charts';

// ── Code snippets ──────────────────────────────────────────────────────────────

const BAR_CHART_TS = `barData: BarChartData[] = [
  { key: 'jan', label: 'January',  value: 120, color: '#e57200' },
  { key: 'feb', label: 'February', value: 85,  color: '#00828b' },
  { key: 'mar', label: 'March',    value: 210, color: '#c1326e' },
];`;

const BAR_CHART_HTML = `<clr-bar-chart
  [data]="barData"
  orientation="vertical"
  [showLegend]="true"
  [showExportButton]="true"
  exportFilename="bar-chart"
  style="display:block;width:100%;height:300px;"
></clr-bar-chart>`;

const STACKED_BAR_TS = `stackedData: BarChartData[] = [
  { key: 'jan-a', label: 'Revenue', value: 120, color: '#e57200', stackKey: 'jan' },
  { key: 'jan-b', label: 'Costs',   value:  60, color: '#00828b', stackKey: 'jan' },
  { key: 'feb-a', label: 'Revenue', value:  85, color: '#e57200', stackKey: 'feb' },
  { key: 'feb-b', label: 'Costs',   value:  40, color: '#00828b', stackKey: 'feb' },
];
stackLabels = ['jan', 'feb'];`;

const STACKED_BAR_HTML = `<clr-bar-chart
  [data]="stackedData"
  [stackLabels]="stackLabels"
  orientation="vertical"
  [showLegend]="true"
  style="display:block;width:100%;height:300px;"
></clr-bar-chart>`;

const LINE_CHART_TS = `lineSeries: XYChartSeries[] = [
  {
    key: 'revenue', label: 'Revenue', color: '#e57200',
    data: [{ x: 'Jan', value: 80 }, { x: 'Feb', value: 120 }, { x: 'Mar', value: 95 }],
  },
  {
    key: 'costs', label: 'Costs', color: '#00828b',
    data: [{ x: 'Jan', value: 50 }, { x: 'Feb', value: 70 }, { x: 'Mar', value: 60 }],
  },
];`;

const LINE_CHART_HTML = `<clr-line-chart
  [series]="lineSeries"
  [showLegend]="true"
  [showExportButton]="true"
  exportFilename="line-chart"
  style="display:block;width:100%;height:300px;"
></clr-line-chart>`;

const AREA_CHART_TS = `// Same XYChartSeries[] shape as the line chart
areaSeries: XYChartSeries[] = [
  {
    key: 'revenue', label: 'Revenue', color: '#e57200',
    data: [{ x: 'Jan', value: 80 }, { x: 'Feb', value: 120 }, { x: 'Mar', value: 95 }],
  },
];`;

const AREA_CHART_HTML = `<clr-area-chart
  [series]="areaSeries"
  [areaOpacity]="0.2"
  [showLegend]="true"
  style="display:block;width:100%;height:300px;"
></clr-area-chart>`;

const COMBO_CHART_TS = `comboBarSeries: ComboBarSeries[] = [
  {
    key: 'revenue', label: 'Revenue', color: '#e57200',
    data: [{ x: 'Jan', xLabel: 'January', value: 120 },
           { x: 'Feb', xLabel: 'February', value: 85 }],
  },
];
comboLineSeries: ComboLineSeries[] = [
  {
    key: 'target', label: 'Target', color: '#c1326e',
    data: [{ x: 'Jan', value: 100 }, { x: 'Feb', value: 110 }],
  },
];`;

const COMBO_CHART_HTML = `<clr-combo-chart
  [barSeries]="comboBarSeries"
  [lineSeries]="comboLineSeries"
  [showLegend]="true"
  style="display:block;width:100%;height:320px;"
></clr-combo-chart>`;

const PIE_CHART_TS = `pieData: PieChartData[] = [
  { key: 'a', label: 'Category A', value: 120, color: '#e57200' },
  { key: 'b', label: 'Category B', value: 85,  color: '#00828b' },
  { key: 'c', label: 'Category C', value: 210, color: '#c1326e' },
];`;

const PIE_CHART_HTML = `<clr-pie-chart
  [data]="pieData"
  [donut]="true"
  [showLegend]="true"
  style="display:block;width:100%;height:300px;"
></clr-pie-chart>`;

const FUNNEL_CHART_TS = `funnelData: FunnelChartData[] = [
  {
    key: 'leads', label: 'Leads', value: 1000,
    sections: [
      { key: 'active', label: 'Active', value: 600, color: '#009ADB' },
      { key: 'lost',   label: 'Lost',   value: 400, color: '#D9D9D9', textColor: '#555' },
    ],
  },
  { key: 'qualified', label: 'Qualified', value: 600,
    sections: [
      { key: 'active', label: 'Active', value: 400, color: '#009ADB' },
      { key: 'lost',   label: 'Lost',   value: 200, color: '#D9D9D9', textColor: '#555' },
    ],
  },
  { key: 'closed', label: 'Closed', value: 250,
    sections: [{ key: 'won', label: 'Won', value: 250, color: '#48960C' }],
  },
];`;

const FUNNEL_CHART_HTML = `<clr-funnel-chart
  [data]="funnelData"
  style="display:block;width:100%;height:320px;"
></clr-funnel-chart>`;

// ── Month labels ───────────────────────────────────────────────────────────────

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// ── Color Handling ─────────────────────────────────────────────────────────────

const COLOR_TS = `colorData: BarChartData[] = [
  // Hex color – passed through as-is
  { key: 'a', label: 'Hex #e57200',                    value: 120, color: '#e57200' },
  { key: 'b', label: 'Hex #00828b',                    value:  85, color: '#00828b' },

  // CSS custom property – automatically wrapped in var(…)
  { key: 'c', label: '--clr-color-action-600',          value: 160, color: '--clr-color-action-600' },
  { key: 'd', label: '--cds-global-color-lavender-1000',value: 110, color: '--cds-global-color-lavender-1000' },
  { key: 'e', label: '--cds-global-color-green-800',    value: 200, color: '--cds-global-color-green-800' },
];`;

const COLOR_HTML = `<clr-bar-chart
  [data]="colorData"
  orientation="vertical"
  [showLegend]="true"
  style="display:block;width:100%;height:300px;"
></clr-bar-chart>`;

@Component({
  selector: 'clr-charts-demo',
  templateUrl: './charts.demo.html',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
  standalone: false,
})
export class ChartsDemo extends ClarityDocComponent {
  // ── Code snippets ──────────────────────────────────────────────────────────
  barChartTs = BAR_CHART_TS;
  barChartHtml = BAR_CHART_HTML;
  stackedBarTs = STACKED_BAR_TS;
  stackedBarHtml = STACKED_BAR_HTML;
  lineChartTs = LINE_CHART_TS;
  lineChartHtml = LINE_CHART_HTML;
  areaChartTs = AREA_CHART_TS;
  areaChartHtml = AREA_CHART_HTML;
  comboChartTs = COMBO_CHART_TS;
  comboChartHtml = COMBO_CHART_HTML;
  pieChartTs = PIE_CHART_TS;
  pieChartHtml = PIE_CHART_HTML;
  funnelChartTs = FUNNEL_CHART_TS;
  funnelChartHtml = FUNNEL_CHART_HTML;
  colorTs = COLOR_TS;
  colorHtml = COLOR_HTML;

  // ── Color Handling ─────────────────────────────────────────────────────────
  colorData: BarChartData[] = [
    { key: 'a', label: 'Hex #e57200', value: 120, color: '#e57200' },
    { key: 'b', label: 'Hex #00828b', value: 85, color: '#00828b' },
    { key: 'c', label: '--clr-color-action-600', value: 160, color: '--clr-color-action-600' },
    { key: 'd', label: '--cds-global-color-lavender-1000', value: 110, color: '--cds-global-color-lavender-1000' },
    { key: 'e', label: '--cds-global-color-green-800', value: 200, color: '--cds-global-color-green-800' },
  ];

  // ── Bar Chart ──────────────────────────────────────────────────────────────
  barData: BarChartData[] = [
    { key: 'jan', label: 'January', value: 120, color: '#e57200' },
    { key: 'feb', label: 'February', value: 85, color: '#00828b' },
    { key: 'mar', label: 'March', value: 210, color: '#c1326e' },
    { key: 'apr', label: 'April', value: 165, color: '#5b40b2' },
    { key: 'may', label: 'May', value: 95, color: '#007cba' },
    { key: 'jun', label: 'June', value: 310, color: '#006b4a' },
  ];

  stackedData: BarChartData[] = [
    { key: 'jan-a', label: 'Revenue', value: 120, color: '#e57200', stackKey: 'jan' },
    { key: 'jan-b', label: 'Costs', value: 60, color: '#00828b', stackKey: 'jan' },
    { key: 'feb-a', label: 'Revenue', value: 85, color: '#e57200', stackKey: 'feb' },
    { key: 'feb-b', label: 'Costs', value: 40, color: '#00828b', stackKey: 'feb' },
    { key: 'mar-a', label: 'Revenue', value: 210, color: '#e57200', stackKey: 'mar' },
    { key: 'mar-b', label: 'Costs', value: 90, color: '#00828b', stackKey: 'mar' },
  ];

  stackLabels = ['jan', 'feb', 'mar'];

  // ── Line / Area Chart ──────────────────────────────────────────────────────
  lineSeries: XYChartSeries[] = [
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
  ];

  // ── Combo Chart ────────────────────────────────────────────────────────────
  comboBarSeries: ComboBarSeries[] = [
    {
      key: 'revenue',
      label: 'Revenue',
      color: '#e57200',
      data: MONTHS.map((x, i) => ({ x, xLabel: x, value: 80 + Math.round(Math.sin(i / 2) * 60 + i * 8) })),
    },
    {
      key: 'costs',
      label: 'Costs',
      color: '#00828b',
      data: MONTHS.map((x, i) => ({ x, xLabel: x, value: 40 + Math.round(Math.cos(i / 2) * 30 + i * 4) })),
    },
  ];

  comboLineSeries: ComboLineSeries[] = [
    {
      key: 'target',
      label: 'Target',
      color: '#c1326e',
      data: MONTHS.map((x, i) => ({ x, value: 100 + i * 10 })),
    },
  ];

  // ── Pie Chart ──────────────────────────────────────────────────────────────
  pieData: PieChartData[] = [
    { key: 'a', label: 'Category A', value: 120, color: '#e57200' },
    { key: 'b', label: 'Category B', value: 85, color: '#00828b' },
    { key: 'c', label: 'Category C', value: 210, color: '#c1326e' },
    { key: 'd', label: 'Category D', value: 165, color: '#5b40b2' },
    { key: 'e', label: 'Category E', value: 95, color: '#007cba' },
  ];

  // ── Funnel Chart ───────────────────────────────────────────────────────────
  funnelData: FunnelChartData[] = [
    {
      key: 'leads',
      label: 'Leads',
      value: 1000,
      sections: [
        { key: 'active', label: 'Active', value: 600, color: '#009ADB' },
        { key: 'lost', label: 'Lost', value: 400, color: '#D9D9D9', textColor: '#555' },
      ],
    },
    {
      key: 'qualified',
      label: 'Qualified',
      value: 600,
      sections: [
        { key: 'active', label: 'Active', value: 400, color: '#009ADB' },
        { key: 'lost', label: 'Lost', value: 200, color: '#D9D9D9', textColor: '#555' },
      ],
    },
    {
      key: 'proposal',
      label: 'Proposal',
      value: 350,
      sections: [
        { key: 'active', label: 'Active', value: 220, color: '#009ADB' },
        { key: 'lost', label: 'Lost', value: 130, color: '#D9D9D9', textColor: '#555' },
      ],
    },
    {
      key: 'closed',
      label: 'Closed',
      value: 150,
      sections: [{ key: 'won', label: 'Won', value: 150, color: '#48960C' }],
    },
  ];

  activeFragment;

  constructor(public route: ActivatedRoute) {
    super('charts');
    this.activeFragment = this.route.fragment.pipe(share());
  }
}
