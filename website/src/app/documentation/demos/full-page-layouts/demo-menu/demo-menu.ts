/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ClarityIcons, angleIcon, applicationsIcon, cogIcon, userIcon } from '@cds/core/icon';

ClarityIcons.addIcons(cogIcon, applicationsIcon, angleIcon, userIcon);

@Component({
  selector: 'clr-demo-menu',
  templateUrl: './demo-menu.html',
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
