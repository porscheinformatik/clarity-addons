import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';

@Component({
  selector: 'cng-donut-chart-skeleton',
  template: `
    <div class="chart-skeleton">
      <div class="donut-wrapper">
        <ngx-skeleton-loader
          [class.placeholder-skeleton]="skeletonType() === 'placeholder'"
          [appearance]="'circle'"
          [animation]="animationStyle()"
          [theme]="{ width: '100%', height: '100%', margin: '0' }"
        />
        <div
          class="inner-donut-circle"
          [style.width.%]="(1 - innerRadiusRatio()) * 100"
          [style.height.%]="(1 - innerRadiusRatio()) * 100"
        ></div>
      </div>
    </div>
  `,
  styleUrls: ['./donut-chart-skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgxSkeletonLoaderComponent],
})
export class DonutChartSkeletonComponent {
  public readonly donutSize = input<number>();
  public readonly innerRadiusRatio = input.required<number>();
  public readonly skeletonType = input<'loading' | 'placeholder'>('loading');

  protected readonly animationStyle = computed(() => (this.skeletonType() === 'loading' ? 'pulse' : false));
}
