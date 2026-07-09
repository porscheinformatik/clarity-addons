import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ClrDatagridModule, ClrIcon } from '@clr/angular';
import { ClarityIcons } from '@clr/angular/icon';
import { Rider } from './model';
import { crownIcon, starIcon, airplaneIcon, carIcon } from '@clr/angular/icon';

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
