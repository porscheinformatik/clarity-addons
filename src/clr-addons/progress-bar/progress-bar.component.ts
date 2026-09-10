import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

const DEFAULT_PROGRESS_COLOR = 'var(--cds-global-color-green-100)';
const DEFAULT_BACKGROUND_COLOR = 'var(--cds-global-color-gray-100)';
const DEFAULT_LABEL_COLOR = 'var(--cds-global-color-black)';

export enum ProgressBarPositionStrategy {
  HORIZONTAL_STACKED = 'horizontal-stacked',
  HORIZONTAL_MULTILINE = 'horizontal-multiline',
}

@Component({
  selector: 'clr-multi-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
  host: {
    '[class.clr-multi-progress-bar--has-label]': 'label() != null',
    '[style.min-height.px]': 'label() != null ? fontSize() * 1.5 : null',
  },
})
export class ProgressBarComponent {
  public readonly fontSize = input<number>(13);
  public readonly backgroundColor = input<string>(DEFAULT_BACKGROUND_COLOR);
  public readonly layoutStrategy = input(ProgressBarPositionStrategy.HORIZONTAL_STACKED);
  public readonly colors = input<string[]>([DEFAULT_PROGRESS_COLOR]);
  public readonly progress = input<number[]>([0]);
  public readonly label = input(undefined, {
    transform: (lbl: number | string | undefined): string | undefined =>
      typeof lbl === 'number' ? `${Math.round(lbl * 100)}%` : lbl,
  });
  public readonly labelColor = input<string>(DEFAULT_LABEL_COLOR);
  protected readonly segments = computed(() => {
    let offset = 0;
    return this.progress().map((p, i) => {
      const width = Math.min(p, 1);
      const segment = {
        offset: `${offset * 100}%`,
        width: `${width * 100}%`,
        color: this.colors()[i % this.colors().length],
      };
      offset += width;
      return segment;
    });
  });
  protected readonly ProgressBarPositionStrategy = ProgressBarPositionStrategy;
}
