import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';

@Component({
  selector: 'cng-chart-legend-skeleton',
  template: `
    <ngx-skeleton-loader
      class="d-flex gap-m"
      [class.clr-flex-column]="orientation() === 'vertical'"
      [class.clr-flex-row]="orientation() === 'horizontal'"
      [class.placeholder-skeleton]="skeletonType() === 'placeholder'"
      [appearance]="'line'"
      [count]="count()"
      [animation]="animationStyle()"
      [theme]="{
        height: '16px',
        width: '60px',
        marginBottom: '0px',
      }"
    />
  `,
  styles: `
    .placeholder-skeleton ::ng-deep .skeleton-loader {
      cursor: default;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgxSkeletonLoaderComponent],
})
export class ChartLegendSkeletonComponent {
  public readonly orientation = input<'vertical' | 'horizontal'>('horizontal');
  public readonly count = input(2);
  public readonly skeletonType = input<'loading' | 'placeholder'>('loading');

  protected readonly animationStyle = computed(() => (this.skeletonType() === 'loading' ? 'pulse' : false));
}
