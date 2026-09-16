import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';

// TODO[VU3REQ-4790]: We should centralize the styles (border-radius, etc) of all skeletons in reporting
//  I think we can use "extendsFromRoot: true" for the theme or sth like that?
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
  // TODO[VU3REQ-4790]: Duplicated across skeletons
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

  // TODO[VU3REQ-4790]: We might not need a placeholder type, if we just show the legend all the time
  public readonly skeletonType = input<'loading' | 'placeholder'>('loading');

  protected readonly animationStyle = computed(() => (this.skeletonType() === 'loading' ? 'pulse' : false));
}
