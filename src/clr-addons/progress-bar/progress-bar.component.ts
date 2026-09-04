import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

const GAP_RATIO = 0.4;
const CORNER_RADIUS_DIVISOR = 2;
const LABEL_MIN_WIDTH_RATIO = 4;

export enum ProgressBarPositionStrategy {
  HORIZONTAL_STACKED = 'horizontal-stacked',
  HORIZONTAL_MULTILINE = 'horizontal-multiline',
}

@Component({
  selector: 'cng-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ProgressBarComponent {
  public readonly fontSize = input<number>(13);
  public readonly backgroundColor = input<string>('var(--cds-global-color-gray-100)');
  public readonly layoutStrategy = input(ProgressBarPositionStrategy.HORIZONTAL_STACKED);
  public readonly size = input<number>(100);
  public readonly barWidth = input(10);
  public readonly colors = input<string[]>(['#4caf50']);
  public readonly progress = input<number[]>([0]);
  public readonly label = input(undefined, {
    transform: (lbl: number | string | undefined): string | undefined =>
      typeof lbl === 'number' ? `${Math.round(lbl * 100)}%` : lbl,
  });
  public readonly labelColor = input<string>('#000');

  protected readonly clipId = `progress-bar-clip-${Math.random().toString()}`;
  protected readonly gap = computed(() => this.barWidth() * GAP_RATIO);
  protected readonly cornerRadius = computed(() => this.barWidth() / CORNER_RADIUS_DIVISOR);
  protected readonly labelMinWidth = computed(() => this.barWidth() * LABEL_MIN_WIDTH_RATIO);
  protected readonly segments = computed(() => {
    return this.progress().map((p, i) => ({
      width: Math.min(p, 1) * this.size(),
      color: this.colors()[i % this.colors().length],
    }));
  });
  protected readonly ProgressBarPositionStrategy = ProgressBarPositionStrategy;
}
