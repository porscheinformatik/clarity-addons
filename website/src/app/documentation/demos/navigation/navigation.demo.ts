/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';

const CONTENTPANEL_CODE_EXAMPLE = `
<div class="btn-group">
    <button class="btn" (click)="contentPanel.toggle()">Show/Hide</button>
</div>

<clr-content-panel-container>
    <h2>This is the page title</h2>
    <span>This is the page content</span>
    <clr-content-panel #contentPanel>
        <ng-container clr-content-panel-title>Content Panel</ng-container>
        <ng-container clr-content-panel-content>Content</ng-container>
    </clr-content-panel>
</clr-content-panel-container>
`;

const MAINNAV_HTML_EXAMPLE = `
<clr-main-nav-group clrTitle="Layouts" routerLinkActive="active">
    <a class="nav-link" routerLink="/full-page-layouts/basepage-layout" routerLinkActive="active" clrMainNavGroupItem>Base Pagelayout</a>
    <a class="nav-link" routerLink="/full-page-layouts/sidebarpage-layout" routerLinkActive="active" clrMainNavGroupItem>Sidebar Pagelayout</a>
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
})
export class NavigationDemo extends ClarityDocComponent {
  contentPanelCodeExample = CONTENTPANEL_CODE_EXAMPLE;
  mainNavHtmlExample = MAINNAV_HTML_EXAMPLE;

  constructor() {
    super('navigation');
  }
}
