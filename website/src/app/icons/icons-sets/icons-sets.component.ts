import { Component } from '@angular/core';
import { ClrAddonsIconShapes } from '@porscheinformatik/clr-addons';

@Component({
  selector: 'icons-sets',
  templateUrl: './icons-sets.component.html',
})
export class IconsSetsComponent {
  shapes: string[] = Object.keys(ClrAddonsIconShapes);
}
