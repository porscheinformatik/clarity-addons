/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, Inject, DOCUMENT } from '@angular/core';
import {
  angleIcon,
  applicationsIcon,
  ClarityIcons,
  ClrDropdownModule,
  ClrIcon,
  ClrIfOpen,
  ClrNavigationModule,
  ClrPopoverContent,
  ClrStandaloneCdkTrapFocus,
  cogIcon,
  shoppingCartIcon,
  userIcon,
} from '@clr/angular';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ClrMainNavGroup, ClrMainNavGroupItem, ClrDropdownOverflowDirective } from '@porscheinformatik/clr-addons';

ClarityIcons.addIcons(cogIcon, applicationsIcon, angleIcon, userIcon, shoppingCartIcon);

@Component({
  selector: 'clr-demo-menu',
  templateUrl: './demo-menu.html',
  imports: [
    ClrNavigationModule,
    RouterLink,
    ClrStandaloneCdkTrapFocus,
    RouterLinkActive,
    ClrMainNavGroup,
    ClrMainNavGroupItem,
    ClrDropdownModule,
    ClrIcon,
    ClrIfOpen,
    ClrPopoverContent,
    ClrDropdownOverflowDirective,
  ],
})
export class DemoMenu {
  themes = [
    { name: 'PHS', cdsTheme: 'phs' },
    { name: 'Clarity (light)', cdsTheme: 'light' },
    { name: 'Clarity (dark)', cdsTheme: 'dark' },
  ];

  constructor(@Inject(DOCUMENT) private document: Document) {}

  setTheme(theme: { cdsTheme: string; href: string }): void {
    this.document.body.setAttribute('cds-theme', theme.cdsTheme);
  }
}
