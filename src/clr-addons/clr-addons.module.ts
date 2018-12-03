/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { NgModule } from '@angular/core';

import { ClrViewEditSectionModule } from './view-edit-section/view-edit-section.module';
import { ClrPagerModule } from './pager/pager.module';
import { ClrPagedSearchResultListModule } from './paged-search-result-list/paged-search-result-list.module';
import { ClrCollapseExpandSectionModule } from './collapse-expand-section/collapse-expand-section.module';
import { ClrMainNavGroupModule } from './main-nav-group/main-nav-group.module';
import { ClrContentPanelModule } from './content-panel/content-panel.module';
import { ClrBreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { ClrNotificationModule } from './notification/notification.module';
import { ClrFlowBarModule } from './flow-bar/flow-bar.module';
import { ClrBackButtonModule } from './back-button/back-button.module';
import { ClrNumericFieldModule } from './numericfield/numericfield.module';
import { ClrTreetableModule } from './treetable/treetable.module';
import { ClrProgressSpinnerModule } from './progress-spinner/progress-spinner.module';
import { ClrComboboxModule } from './combobox/combobox.module';

@NgModule({
  exports: [
    ClrViewEditSectionModule,
    ClrPagerModule,
    ClrPagedSearchResultListModule,
    ClrCollapseExpandSectionModule,
    ClrBreadcrumbModule,
    ClrMainNavGroupModule,
    ClrContentPanelModule,
    ClrNotificationModule,
    ClrFlowBarModule,
    ClrBackButtonModule,
    ClrNumericFieldModule,
    ClrTreetableModule,
    ClrProgressSpinnerModule,
    ClrComboboxModule,
  ],
})
export class ClrAddonsModule {}
