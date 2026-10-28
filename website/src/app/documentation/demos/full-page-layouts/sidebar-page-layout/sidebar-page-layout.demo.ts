/*
 * Copyright (c) 2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, inject, OnInit } from '@angular/core';
import {
  administratorIcon,
  ClarityIcons,
  ClrButtonGroupModule,
  ClrMainContainerModule,
  ClrNavigationModule,
  ClrProgressBarModule,
  ClrStandaloneCdkTrapFocus,
  ClrVerticalNavModule,
  envelopeIcon,
  lightbulbIcon,
  loginIcon,
  mapMarkerIcon,
  mobileIcon,
  pencilIcon,
  userIcon,
} from '@clr/angular';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import {
  ClrSummaryItemWarning,
  ClrSummaryAreaLoading,
  ClrSummaryItemLoading,
  ClrSummaryItemError,
  ClrSummaryItemEditConfig,
  ClrBackButton,
  ClrSummaryAreaToggle,
  ClrSummaryArea,
  ClrSummaryItem,
  ClrSummaryItemValue,
} from '@porscheinformatik/clr-addons';
import { DemoMenu } from '../demo-menu/demo-menu';

ClarityIcons.addIcons(
  userIcon,
  envelopeIcon,
  pencilIcon,
  administratorIcon,
  mobileIcon,
  mapMarkerIcon,
  loginIcon,
  lightbulbIcon
);

@Component({
  selector: 'clr-summary-area-page-layout-demo',
  templateUrl: './sidebar-page-layout.demo.html',
  imports: [
    ClrMainContainerModule,
    ClrNavigationModule,
    DemoMenu,
    ClrBackButton,
    ClrSummaryAreaToggle,
    ClrButtonGroupModule,
    ClrProgressBarModule,
    ClrSummaryArea,
    ClrSummaryItem,
    ClrSummaryItemValue,
    RouterOutlet,
    ClrVerticalNavModule,
    ClrStandaloneCdkTrapFocus,
    RouterLink,
    RouterLinkActive,
  ],
})
export class SidebarPageLayoutDemo implements OnInit {
  public summaryAreaLoadingState: ClrSummaryAreaLoading = { active: true, text: 'Loading...' };
  public itemLoadingState: ClrSummaryItemLoading = { active: true, text: 'Search open tasks...' };
  public itemErrorState: ClrSummaryItemError = {
    active: true,
    text: 'Missing data',
    click: () => {
      alert('Enter missing data in details page.');
    },
  };
  public itemWarningState: ClrSummaryItemWarning = {
    active: true,
    text: 'Reload',
    click: () => {
      this.itemWarningState.active = false;
      alert('Handle warning clicked!');
    },
  };
  public editConfig: ClrSummaryItemEditConfig = {
    enabled: true,
    text: 'Edit',
    click: () => {
      alert('Edit skills clicked!');
    },
  };

  private readonly router: Router = inject(Router);

  public ngOnInit(): void {
    setTimeout(() => {
      this.summaryAreaLoadingState = { ...this.summaryAreaLoadingState, active: false };
    }, 2000);

    setTimeout(() => {
      this.itemLoadingState = { ...this.itemLoadingState, active: false };
    }, 10000);
  }

  sendEmail(email: string) {
    globalThis.location.href = `mailto:${email}`;
  }

  callPhone(number: string) {
    globalThis.location.href = `tel:${number}`;
  }
}
