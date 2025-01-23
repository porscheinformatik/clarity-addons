import { Component } from '@angular/core';

const IMPORT_ADDONS_ICONS = `
import {
  airConditionerIcon
} from '@porscheinformatik/clr-addons';

ClarityIcons.addIcons(airConditionerIcon);
`;

const IMPORT_ALL_ADDONS_ICONS = `
import {
  allIcons
} from '@porscheinformatik/clr-addons';

ClarityIcons.addIcons(...allIcons);
`;

const USAGE_ADDONS_ICONS = `
<cds-icon shape="air-conditioner"></cds-icon>
`;

@Component({
  selector: 'icons-get-started',
  templateUrl: './icons-get-started.component.html',
  standalone: false,
})
export class IconsGetStartedComponent {
  importAddonsIcons = IMPORT_ADDONS_ICONS;
  importAllAddonsIcons = IMPORT_ALL_ADDONS_ICONS;
  usageAddonsIcons = USAGE_ADDONS_ICONS;
}
