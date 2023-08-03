import { Component } from '@angular/core';

const USAGE_ADDONS_ICONS = `
<cds-icon shape="air-conditioner"></cds-icon>
`;

@Component({
  selector: 'icons-get-started',
  templateUrl: './icons-get-started.component.html',
})
export class IconsGetStartedComponent {
  usageAddonsIcons = USAGE_ADDONS_ICONS;
}
