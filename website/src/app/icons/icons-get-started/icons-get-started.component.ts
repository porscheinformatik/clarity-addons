import { Component } from '@angular/core';

const IMPORT_ADDONS_ICONS = `
import {
  airConditionerIcon
} from '@porscheinformatik/clr-addons';

ClarityIcons.addIcons(airConditionerIcon);
`;

const USAGE_ADDONS_ICONS = `
<cds-icon shape="air-conditioner"></cds-icon>
`;

@Component({
  selector: 'icons-get-started',
  templateUrl: './icons-get-started.component.html',
})
export class IconsGetStartedComponent {
  importAddonsIcons = IMPORT_ADDONS_ICONS;
  usageAddonsIcons = USAGE_ADDONS_ICONS;
}
