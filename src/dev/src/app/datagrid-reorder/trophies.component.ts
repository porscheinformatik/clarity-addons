import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ClrDatagridModule, ClrIconModule } from '@clr/angular';
import { ClarityIcons } from '@cds/core/icon';
import { Rider } from './model';
import { crownIcon, starIcon, airplaneIcon, carIcon } from '@cds/core/icon';

ClarityIcons.addIcons(crownIcon, starIcon, airplaneIcon, carIcon);

@Component({
  selector: 'clr-trophies',
  template: `
    @for (trophy of item().trophies; track trophy) {
    <cds-icon [attr.shape]="trophy" />
    } @empty { - }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ClrIconModule, ClrDatagridModule],
  standalone: true,
})
export class TrophiesComponent {
  item = input<Rider>();
}
