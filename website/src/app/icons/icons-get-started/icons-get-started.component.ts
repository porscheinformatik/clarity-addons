import { Component } from '@angular/core';

const IMPORT_ADDONS_ICONS = `
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ClarityIcons } from '@clr/icons';
import { ClrAddonsIconShapes } from '@porscheinformatik/clr-addons';

export function loadIcons() {
  return (): void => {
    // Clarity addons shapes if needed
    ClarityIcons.add(ClrAddonsIconShapes);
  };
}

@NgModule({
...
    providers: [
        {
          provide: APP_INITIALIZER,
          useFactory: loadIcons,
          multi: true,
        },
    ]
...
})
export class AppModule { }
`;

const USAGE_ADDONS_ICONS = `
<clr-icon shape="air-conditioner"></clr-icon>
`;

@Component({
  selector: 'icons-get-started',
  templateUrl: './icons-get-started.component.html',
})
export class IconsGetStartedComponent {
  importAddonsIcons = IMPORT_ADDONS_ICONS;
  usageAddonsIcons = USAGE_ADDONS_ICONS;
}
