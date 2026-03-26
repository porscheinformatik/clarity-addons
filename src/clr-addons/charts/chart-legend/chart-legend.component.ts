import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { toChartColor } from '../utils';

export interface ChartLegendItem {
  label: string;
  color: string;
}

@Component({
  selector: 'cng-chart-legend',
  template: `
    <div class="chart-legend">
      @for (item of items(); track item.label) {
      <div class="legend-item">
        <span class="legend-color-square" [style.background-color]="toChartColor(item.color)"></span>
        <span class="legend-label">{{ item.label }}</span>
      </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .chart-legend {
        display: flex;
        flex-wrap: wrap;
        gap: 0.25rem 1rem;
        padding: 0.5rem 0 0.25rem;
        font-size: 11px;
        color: var(--clr-color-neutral-600, #666);
      }

      .legend-item {
        display: flex;
        align-items: center;
        gap: 0.35rem;
      }

      .legend-color-square {
        width: 10px;
        height: 10px;
        border-radius: 2px;
        flex-shrink: 0;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartLegendComponent {
  public readonly items = input.required<ChartLegendItem[]>();
  protected readonly toChartColor = toChartColor;
}
