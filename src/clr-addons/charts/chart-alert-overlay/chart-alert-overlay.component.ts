import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ClrAlertModule } from '@clr/angular';

@Component({
  selector: 'cng-chart-alert-overlay',
  template: `
    <clr-alert
      data-testid="chart-alert-overlay"
      [clrAlertSizeSmall]="true"
      [clrAlertClosable]="false"
      [clrAlertType]="alertType()"
    >
      <clr-alert-item>
        <span class="alert-text" data-testid="chart-alert-overlay-message">
          {{ alertMessage() }}
        </span>
      </clr-alert-item>
    </clr-alert>
    <div class="overlay" data-testid="chart-alert-overlay-gradient"></div>
  `,
  styles: `
    :host {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      pointer-events: none;
      z-index: 1;

      clr-alert {
        pointer-events: auto;

        ::ng-deep .alert {
          margin-bottom: 0;
        }
      }

      .overlay {
        height: 2rem;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ClrAlertModule],
})
export class ChartAlertOverlayComponent {
  public readonly alertMessage = input.required<string>();
  public readonly alertType = input<string>('info');
}
