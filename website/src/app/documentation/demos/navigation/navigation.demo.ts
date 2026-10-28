/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { DocWrapperModule } from '../_doc-wrapper/doc-wrapper.module';
import { UtilsModule } from '../../../utils/utils.module';
import { ClarityIcons, ClarityModule, ClrIcon, displayIcon } from '@clr/angular';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';
import { DocWrapper } from '../_doc-wrapper/doc-wrapper';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CodeSnippet } from '../../../utils/code-snippet';

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
  imports: [
    DocWrapper,
    ClrIcon,
    RouterLink,
    RouterLinkActive,
    CodeSnippet,
    CommonModule,
    ClarityModule,
    UtilsModule,
    DocWrapperModule,
  ],
})
export class NavigationDemo extends ClarityDocComponent {
  mainNavHtmlExample = MAINNAV_HTML_EXAMPLE;

  constructor() {
    super('navigation');
  }
}
