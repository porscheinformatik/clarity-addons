import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { airplaneIcon, carIcon, ClarityIcons, ClrDatagridModule, ClrIcon, crownIcon, starIcon } from '@clr/angular';
import { Rider } from './model';

ClarityIcons.addIcons(crownIcon, starIcon, airplaneIcon, carIcon);

@Component({
  selector: 'clr-trophies',
  template: `
    @for (trophy of item().trophies; track trophy) {
      <cds-icon [shape]="trophy" />
    } @empty {
      -
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ClrIcon, ClrDatagridModule],
})
export class TrophiesComponent {
  item = input<Rider>();
}
