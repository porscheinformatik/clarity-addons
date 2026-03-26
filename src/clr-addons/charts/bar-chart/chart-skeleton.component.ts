import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';

@Component({
  selector: 'cng-bar-chart-skeleton',
  templateUrl: './bar-chart-skeleton.component.html',
  styleUrls: ['./bar-chart-skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgxSkeletonLoaderComponent],
})
export class BarChartSkeletonComponent {
  public readonly skeletonType = input<'loading' | 'placeholder'>('loading');
  public readonly orientation = input.required<'vertical' | 'horizontal'>();

  protected readonly animationStyle = computed(() => (this.skeletonType() === 'loading' ? 'pulse' : undefined));
}
