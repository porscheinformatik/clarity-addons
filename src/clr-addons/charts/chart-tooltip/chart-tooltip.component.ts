import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { ClrIconModule } from '@clr/angular';
import { toChartColor } from '../utils';

@Component({
  selector: 'cng-chart-tooltip',
  templateUrl: './chart-tooltip.component.html',
  styleUrls: ['./chart-tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ClrIconModule],
})
export class ChartTooltipComponent {
  public readonly tooltipPosition = input.required<{ x: number; y: number }>();
  public readonly tooltipOrientation = input<'top' | 'bottom'>('top');
  public readonly squareColor = input.required<string | undefined>();
  public readonly tooltipClickable = input(true);

  public readonly tooltipClosed = output<void>();
  public readonly tooltipHeaderClicked = output<void>();

  protected readonly toChartColor = toChartColor;
}
