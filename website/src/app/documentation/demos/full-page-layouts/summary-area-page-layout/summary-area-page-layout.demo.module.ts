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
} from '@porscheinformatik/clr-addons';

import { DemoMenuModule } from '../demo-menu/demo-menu.module';
import { SummaryAreaPageLayoutDemo } from './summary-area-page-layout.demo';
import { SummaryAreaOverviewPageDemo } from './summary-area-overview-page.demo';
import { SummaryAreaDetailsPageDemo } from './summary-area-details-page.demo';
import { SummaryAreaSettingsPageDemo } from './summary-area-settings-page.demo';
import { SummaryAreaTasksPageDemo } from './summary-area-tasks-page.demo';
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
        component: SummaryAreaPageLayoutDemo,
        outlet: 'fullpage',
        children: [
          { path: '', redirectTo: 'overview', pathMatch: 'full' },
          { path: 'overview', component: SummaryAreaOverviewPageDemo },
          { path: 'details', component: SummaryAreaDetailsPageDemo },
          { path: 'settings', component: SummaryAreaSettingsPageDemo },
          { path: 'tasks', component: SummaryAreaTasksPageDemo },
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
    SummaryAreaPageLayoutDemo,
    SummaryAreaOverviewPageDemo,
    SummaryAreaDetailsPageDemo,
    SummaryAreaSettingsPageDemo,
    SummaryAreaTasksPageDemo,
  ],
  exports: [
    SummaryAreaPageLayoutDemo,
    SummaryAreaOverviewPageDemo,
    SummaryAreaDetailsPageDemo,
    SummaryAreaSettingsPageDemo,
    SummaryAreaTasksPageDemo,
  ],
})
export class SummaryAreaPageLayoutDemoModule {}
