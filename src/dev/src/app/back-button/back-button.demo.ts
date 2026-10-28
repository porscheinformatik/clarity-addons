/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import {
  ClarityIcons,
  ClrButtonGroupModule,
  ClrDropdownModule,
  ClrIcon,
  ClrNavigationModule,
  ClrStandaloneCdkTrapFocus,
  cogIcon,
} from '@clr/angular';
import { RouterLinkActive, RouterLink } from '@angular/router';
import { ClrMainNavGroup, ClrBackButton } from '@porscheinformatik/clr-addons';

ClarityIcons.addIcons(cogIcon);

@Component({
  selector: 'clr-back-button-demo',
  templateUrl: './back-button.demo.html',
  imports: [
    ClrNavigationModule,
    ClrStandaloneCdkTrapFocus,
    ClrMainNavGroup,
    RouterLinkActive,
    RouterLink,
    ClrDropdownModule,
    ClrIcon,
    ClrBackButton,
    ClrButtonGroupModule,
  ],
})
export class BackButtonDemo {}
