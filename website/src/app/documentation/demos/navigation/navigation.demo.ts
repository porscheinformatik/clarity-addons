/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';
import { ClarityIcons, displayIcon } from '@cds/core/icon';

ClarityIcons.addIcons(displayIcon);

const MAINNAV_HTML_EXAMPLE = `
<clr-main-nav-group clrTitle="Layouts" routerLinkActive="active">
    <a class="nav-link" routerLink="/full-page-layouts/basepage-layout" routerLinkActive="active" clrMainNavGroupItem>Base Page Layout</a>
    <a class="nav-link" routerLink="/full-page-layouts/sidebarpage-layout" routerLinkActive="active" clrMainNavGroupItem>Sidebar Page Layout</a>
    <a class="nav-link" routerLink="/full-page-layouts/content-panel" routerLinkActive="active" clrMainNavGroupItem>Content Panel Layout</a>
</clr-main-nav-group>
`;

@Component({
  selector: 'clr-navigation-demo-docu',
  templateUrl: './navigation.demo.html',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
  standalone: false,
})
export class NavigationDemo extends ClarityDocComponent {
  mainNavHtmlExample = MAINNAV_HTML_EXAMPLE;

  constructor() {
    super('navigation');
  }
}
