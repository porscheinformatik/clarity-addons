/*
 * Copyright (c) 2018-2020 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { NgModule } from '@angular/core';
import { ClrBackButtonModule } from './back-button/back-button.module';
import { ClrBreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { ClrCollapseExpandSectionModule } from './collapse-expand-section/collapse-expand-section.module';
import { ClrComboboxModule } from './combobox/combobox.module';
import { ClrContentPanelModule } from './content-panel/content-panel.module';
import { ClrDataListValidatorModule } from './data-list-validator/data-list-validator.module';
import { ClrDateTimeModule } from './date-time-container/date-time-module';
import { ClrDotPagerModule } from './dot-pager/dot-pager.module';
import { ClrFlowBarModule } from './flow-bar/flow-bar.module';
import { ClrGenericQuickListModule } from './generic-quick-list/generic-quick-list.module';
import { ClrAddonsIconsModule } from './icons/icons.module';
import { ClrLetterAvatarModule } from './letter-avatar/letter-avatar.module';
import { ClrMainNavGroupModule } from './main-nav-group/main-nav-group.module';
import { ClrMultilingualModule } from './multilingual/multilingual.module';
import { ClrNotificationModule } from './notification/notification.module';
import { ClrNumericFieldModule } from './numericfield/numeric-field.module';
import { ClrPagedSearchResultListModule } from './paged-search-result-list/paged-search-result-list.module';
import { ClrPagerModule } from './pager/pager.module';
import { ClrProgressSpinnerModule } from './progress-spinner/progress-spinner.module';
import { ClrQuickListModule } from './quick-list/quick-list.module';
import { ClrSearchFieldModule } from './searchfield/search-field.module';
import { ClrTreetableModule } from './treetable/treetable.module';
import { ClrViewEditSectionModule } from './view-edit-section/view-edit-section.module';

@NgModule({
  exports: [
    ClrViewEditSectionModule,
    ClrPagerModule,
    ClrDotPagerModule,
    ClrPagedSearchResultListModule,
    ClrCollapseExpandSectionModule,
    ClrBreadcrumbModule,
    ClrMainNavGroupModule,
    ClrContentPanelModule,
    ClrNotificationModule,
    ClrFlowBarModule,
    ClrBackButtonModule,
    ClrNumericFieldModule,
    ClrSearchFieldModule,
    ClrTreetableModule,
    ClrProgressSpinnerModule,
    ClrComboboxModule,
    ClrDateTimeModule,
    ClrQuickListModule,
    ClrLetterAvatarModule,
    ClrMultilingualModule,
    ClrGenericQuickListModule,
    ClrDataListValidatorModule,
    ClrAddonsIconsModule,
  ],
})
export class ClrAddonsModule {}
