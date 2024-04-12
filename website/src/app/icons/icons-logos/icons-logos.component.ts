import { Component } from '@angular/core';
import { ClarityIcons } from '@cds/core/icon';
import { wcpIcon } from '@porscheinformatik/clr-addons';

@Component({
  selector: 'clr-icons-logos',
  templateUrl: './icons-logos.component.html',
})
export class IconsLogosComponent {
  icons = [wcpIcon];

  shapes: string[] = this.icons.map(item => item[0]).sort();
  constructor() {
    ClarityIcons.addIcons(...this.icons);
  }
}
