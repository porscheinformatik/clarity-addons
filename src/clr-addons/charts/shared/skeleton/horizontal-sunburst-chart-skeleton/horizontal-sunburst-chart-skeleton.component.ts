import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgxSkeletonLoaderComponent } from 'ngx-skeleton-loader';

@Component({
  selector: 'cng-horizontal-sunburst-chart-skeleton',
  template: `
    <div class="chart-skeleton w-100 h-100">
      <div class="skeleton-wrapper d-flex clr-flex-column" [style.gap.px]="barGap()">
        @for (_item of items(); track $index) {
          <div class="skeleton-row" [style.height.px]="barHeight()">
            <ngx-skeleton-loader
              [appearance]="'line'"
              [animation]="'pulse'"
              [theme]="{
                width: '100%',
                height: '100%',
                'border-radius': 'var(--clr-base-border-radius-xxs)',
              }"
            />
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgxSkeletonLoaderComponent],
})
export class HorizontalSunburstChartSkeletonComponent {
  public readonly itemCount = input.required<number>();
  public readonly barHeight = input.required<number>();
  public readonly barGap = input.required<number>();

  protected readonly items = computed(() => Array.from({ length: this.itemCount() ?? 0 }));
}
