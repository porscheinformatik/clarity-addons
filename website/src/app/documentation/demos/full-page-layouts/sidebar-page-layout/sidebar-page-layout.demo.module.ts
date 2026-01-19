/*
 * Copyright (c) 2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClarityModule, ClrModalModule, ClrProgressBarModule } from '@clr/angular';
import {
  ClrAddonsModule,
  ClrSummaryAreaToggle,
  ClrSummaryArea,
  ClrSummaryItem,
  ClrSummaryItemValue,
  ClrSummaryAreaStateService,
} from '@porscheinformatik/clr-addons';

import { DemoMenuModule } from '../demo-menu/demo-menu.module';
import { SidebarPageLayoutDemo } from './sidebar-page-layout.demo';
import { SidebarOverviewPageDemo } from './sidebar-overview-page.demo';
import { SidebarProfilePageDemo } from './sidebar-profile-page.demo';
import { SidebarSettingsPageDemo } from './sidebar-settings-page.demo';
import { SidebarTasksPageDemo } from './sidebar-tasks-page.demo';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    ClrAddonsModule,
    DemoMenuModule,
    RouterModule.forChild([
      {
        path: '',
        component: SidebarPageLayoutDemo,
        outlet: 'fullpage',
        children: [
          { path: '', redirectTo: 'overview', pathMatch: 'full' },
          { path: 'overview', component: SidebarOverviewPageDemo },
          { path: 'profile', component: SidebarProfilePageDemo },
          { path: 'settings', component: SidebarSettingsPageDemo },
          { path: 'tasks', component: SidebarTasksPageDemo },
        ],
      },
    ]),
    ClrSummaryAreaToggle,
    ClrModalModule,
    ClrSummaryArea,
    ClrSummaryItem,
    ClrSummaryItemValue,
    ClrProgressBarModule,
    FormsModule,
  ],
  declarations: [
    SidebarPageLayoutDemo,
    SidebarOverviewPageDemo,
    SidebarProfilePageDemo,
    SidebarSettingsPageDemo,
    SidebarTasksPageDemo,
  ],
  exports: [
    SidebarPageLayoutDemo,
    SidebarOverviewPageDemo,
    SidebarProfilePageDemo,
    SidebarSettingsPageDemo,
    SidebarTasksPageDemo,
  ],
  providers: [ClrSummaryAreaStateService],
})
export class SidebarPageLayoutDemoModule {}
