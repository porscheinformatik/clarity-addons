import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ClrSignpostModule } from '@clr/angular';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'cng-funnel-skeleton',
  imports: [NgxSkeletonLoaderModule, ClrSignpostModule],
  template: `
    <div class="funnel-skeleton-container">
      @for (_ of [1, 2, 3, 4, 5, 6, 7, 8]; track $index) {
        <div class="funnel-bar bar-{{ $index + 1 }}" [class.centered]="centered()">
          <ngx-skeleton-loader
            [appearance]="'line'"
            [count]="1"
            [animation]="'pulse'"
            [theme]="{
              height: '100%',
              'border-radius': 'var(--clr-base-border-radius-xxs)',
            }"
          />
        </div>
      }
    </div>
  `,
  styleUrl: './funnel-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FunnelSkeletonComponent {
  public readonly centered = input(false);
}
