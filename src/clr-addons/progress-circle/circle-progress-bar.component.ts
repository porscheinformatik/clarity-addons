import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export enum CircleProgressLayout {
  LAYERED = 'layered',
  CONCENTRIC = 'concentric',
}

@Component({
  selector: 'cng-circle-progress-bar',
  templateUrl: './circle-progress-bar.component.html',
  styleUrl: './circle-progress-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class CircleProgressBarComponent {
  public readonly backgroundColorCircle = input<string>('var(--cds-global-color-gray-100)');
  public readonly layoutStrategy = input<CircleProgressLayout>(CircleProgressLayout.LAYERED);
  public readonly size = input<number>(100);
  public readonly colors = input<string[]>(['#4caf50', '#2196f3', '#ff9800']);
  public readonly progress = input<number[]>([0]);
  public readonly label = input(undefined, {
    transform: (lbl: number | string | undefined): string | undefined =>
      typeof lbl === 'number' ? `${Math.round(lbl * 100)}%` : lbl,
  });

  public readonly defaultWidthRatio = computed(() =>
    this.layoutStrategy() === CircleProgressLayout.LAYERED || !this.progress().length ? 0.15 : 0.3
  );

  public readonly isSafeLayered = computed(
    () => this.layoutStrategy() === CircleProgressLayout.LAYERED || !this.progress().length
  );
  public readonly bgStrokeWidth = computed(() => this.size() * this.defaultWidthRatio());
  public readonly strokeWidth = computed(() =>
    this.isSafeLayered() ? this.bgStrokeWidth() : this.bgStrokeWidth() / this.progress().length
  );
  protected readonly viewBox = computed(() => {
    const s = this.size();
    return `0 0 ${s} ${s}`;
  });
  protected readonly radius = computed(() => this.size() - this.bgStrokeWidth() / 2);
  protected readonly center = computed(() => this.size() / 2);
  protected readonly segments = computed(() => {
    const sw = this.strokeWidth();
    const baseRadius = (this.size() - sw) / 2;

    return this.progress().map((progress, i) => {
      const currentRadius = this.isSafeLayered() ? baseRadius : baseRadius - i * sw;
      const safeRadius = Math.max(currentRadius, 0);

      const currentCircumference = 2 * Math.PI * safeRadius;

      return {
        radius: safeRadius,
        dashArray: `${currentCircumference * Math.min(progress, 1)} ${currentCircumference}`,
        color: this.colors()[i % this.colors().length],
      };
    });
  });
}
