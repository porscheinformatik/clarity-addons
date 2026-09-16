import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { toChartColor } from '../utils';

export interface ChartLegendItem {
  label: string;
  color: string;
  key?: string;
  value?: number;
}

@Component({
  selector: 'cng-chart-legend',
  template: `
    <div class="chart-legend" data-testid="chart-legend">
      @for (item of items(); track item.label; let i = $index) {
        <div
          class="legend-item has-more-info"
          [attr.data-testid]="'chart-legend-item-' + item.label"
          (mouseenter)="onLegendHover(item, i, true)"
          (mouseleave)="onLegendHover(item, i, false)"
          (click)="clicked.emit(item)"
        >
          <span class="legend-color-square" [style.background-color]="toChartColor(item.color)"></span>
          <span
            class="legend-label"
            [class.legend-label-hover]="hoveredIndex() === i"
            [attr.data-testid]="'chart-legend-label-' + item.label"
            >{{ item.label }}</span
          >
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
        color: var(--cds-global-color-construction-400, #666);
      }

      .legend-item {
        display: flex;
        align-items: center;
      }

      .legend-label {
        margin-left: 4px;
        max-width: 85px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 11px;
        line-height: 16px;
        font-weight: 500;
        color: var(--clr-color-neutral-900, #222);
        transition: font-weight 0.15s;
      }

      .legend-color-square {
        width: 10px;
        height: 10px;
        border-radius: 2px;
        flex-shrink: 0;
      }

      .legend-label-hover {
        font-weight: 700;
        color: var(--clr-color-neutral-1000, #000);
      }

      .legend-item:hover .legend-label {
        font-weight: 700;
        color: var(--clr-color-neutral-1000, #000);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartLegendComponent {
  public readonly items = input.required<ChartLegendItem[]>();
  public readonly hoveredIndex = input<number>(-1);
  public readonly loading = input(false);
  public readonly orientation = input<'vertical' | 'horizontal'>('horizontal');
  public readonly itemHover = output<{ item: ChartLegendItem; index: number; hover: boolean }>();
  public readonly clicked = output<ChartLegendItem>();

  protected readonly toChartColor = toChartColor;

  public onLegendHover(item: ChartLegendItem, index: number, hover: boolean) {
    this.itemHover.emit({ item, index, hover });
  }
}
