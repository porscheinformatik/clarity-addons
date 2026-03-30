/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClrAlertModule } from '@clr/angular';
import { ClrChartsModule, FunnelChartData, FunnelValue } from '@porscheinformatik/clr-addons/charts';

const PIPELINE_DATA: FunnelChartData[] = [
  {
    key: 'leads',
    label: 'Leads',
    fullLabel: 'All Leads',
    description: 'Total number of leads entering the pipeline.',
    value: 10000,
    sections: [
      { key: 'passed', label: 'Passed Through', value: 5000, color: '#009ADB' },
      { key: 'active', label: 'Active', value: 3000, color: '#66D1FF' },
      { key: 'lost', label: 'Lost', value: 1500, color: '#D9D9D9', textColor: '#555' },
      { key: 'rejected', label: 'Rejected', value: 500, color: '#A6A6A6' },
    ],
  },
  {
    key: 'qualified',
    label: 'Qualified',
    fullLabel: 'Qualified Leads',
    description: 'Leads that passed the qualification criteria.',
    value: 5000,
    sections: [
      { key: 'passed', label: 'Passed Through', value: 2500, color: '#009ADB' },
      { key: 'active', label: 'Active', value: 1500, color: '#66D1FF' },
      { key: 'lost', label: 'Lost', value: 800, color: '#D9D9D9', textColor: '#555' },
      { key: 'rejected', label: 'Rejected', value: 200, color: '#A6A6A6' },
    ],
  },
  {
    key: 'proposal',
    label: 'Proposal',
    fullLabel: 'Proposal Sent',
    value: 2500,
    sections: [
      { key: 'passed', label: 'Passed Through', value: 1400, color: '#009ADB' },
      { key: 'active', label: 'Active', value: 600, color: '#66D1FF' },
      { key: 'lost', label: 'Lost', value: 400, color: '#D9D9D9', textColor: '#555' },
      { key: 'rejected', label: 'Rejected', value: 100, color: '#A6A6A6' },
    ],
  },
  {
    key: 'negotiation',
    label: 'Negotiation',
    fullLabel: 'In Negotiation',
    value: 1400,
    sections: [
      { key: 'passed', label: 'Passed Through', value: 800, color: '#009ADB' },
      { key: 'active', label: 'Active', value: 350, color: '#66D1FF' },
      { key: 'lost', label: 'Lost', value: 200, color: '#D9D9D9', textColor: '#555' },
      { key: 'rejected', label: 'Rejected', value: 50, color: '#A6A6A6' },
    ],
  },
  {
    key: 'closed',
    label: 'Closed Won',
    fullLabel: 'Closed Won',
    value: 800,
    sections: [
      { key: 'passed', label: 'Passed Through', value: 550, color: '#009ADB' },
      { key: 'active', label: 'Active', value: 150, color: '#66D1FF' },
      { key: 'lost', label: 'Lost', value: 80, color: '#D9D9D9', textColor: '#555' },
      { key: 'rejected', label: 'Rejected', value: 20, color: '#A6A6A6' },
    ],
  },
];

const MINIMAL_DATA: FunnelChartData[] = [
  { key: 'a', label: 'Step A', value: 500 },
  { key: 'b', label: 'Step B', value: 350 },
  { key: 'c', label: 'Step C', value: 200 },
  { key: 'd', label: 'Step D', value: 80 },
];

@Component({
  selector: 'clr-funnel-chart-demo',
  templateUrl: './funnel-chart.demo.html',
  imports: [CommonModule, ClrAlertModule, ClrChartsModule],
})
export class FunnelChartDemo {
  protected readonly loading = signal(false);
  protected readonly showExportButton = signal(false);
  protected readonly lastClicked = signal<FunnelValue | undefined>(undefined);

  protected readonly pipelineData = PIPELINE_DATA;
  protected readonly minimalData = MINIMAL_DATA;
  protected readonly emptyData: FunnelChartData[] = [];

  /** Override colors by section key via sectionColors input. */
  protected readonly customSectionColors: Record<string, string> = {
    passed: '#006b4a',
    active: '#5b40b2',
    lost: '#e8e8e8',
    rejected: '#9e3b00',
  };

  /** CSS custom property overrides by section key. */
  protected readonly cssVarColors: Record<string, string> = {
    passed: '--cds-global-color-blue-800',
    active: '--cds-global-color-blue-400',
    lost: '--cds-global-color-warm-gray-300',
    rejected: '--cds-global-color-warm-gray-600',
  };

  /** German chart labels for total / all tooltip rows. */
  protected readonly germanChartLabels = {
    total: 'Gesamt',
    all: 'Alle',
  };

  public toggleLoading(): void {
    this.loading.set(!this.loading());
  }

  public toggleExportButton(): void {
    this.showExportButton.set(!this.showExportButton());
  }

  public onValueClicked(value: FunnelValue): void {
    this.lastClicked.set(value);
  }
}
