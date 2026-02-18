/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { NgModule } from '@angular/core';
import { ClrBackButtonModule } from './back-button';
import { ClrBreadcrumbModule } from './breadcrumb';
import { ClrCollapseExpandSectionModule } from './collapse-expand-section';
import { ClrContentPanelModule } from './content-panel';
import { ClrDataListValidatorModule } from './data-list-validator';
import { ClrDateTimeModule } from './date-time-container';
import { ClrDotPagerModule } from './dot-pager';
import { ClrFlowBarModule } from './flow-bar';
import { ClrGenericQuickListModule } from './generic-quick-list';
import { ClrIconAvatarModule } from './icon-avatar';
import { ClrLetterAvatarModule } from './letter-avatar';
import { ClrMainNavGroupModule } from './main-nav-group';
import { ClrMultilingualModule } from './multilingual';
import { ClrNotificationModule } from './notification';
import { ClrNumericFieldModule } from './numericfield';
import { ClrPagedSearchResultListModule } from './paged-search-result-list';
import { ClrPagerModule } from './pager';
import { ClrProgressSpinnerModule } from './progress-spinner';
import { ClrQuickListModule } from './quick-list';
import { ClrSearchFieldModule } from './searchfield';
import { ClrTreetableModule } from './treetable';
import { ClrViewEditSectionModule } from './view-edit-section';
import { ClrHistoryModule } from './history';
import { ClrAutocompleteOffModule } from './autocomplete-off';
import { ClrBrandAvatarModule } from './brand-avatar';
import { ClrLocationBarModule } from './location-bar';
import { ClrFormModule } from './abstract-form-component';
import { ClrDropdownOverflowModule } from './dropdown';
import {
  ClrDatagridColumnReorderModule,
  ClrDatagridStatePersistenceModule,
  ClrDateFilterModule,
  ClrEnumFilterModule,
} from './datagrid';
import { ClrDaterangepickerModule } from './daterangepicker';
import { ClrIfWarningModule } from './clr-control-warning/if-warning.module';
import { ClrActionPanelModule } from './action-panel';
import { ClrReadonlyDirectiveModule } from './readonly/readonly.module';
import { ClrSignpostAddonModule } from './signpost';

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
    ClrDateTimeModule,
    ClrQuickListModule,
    ClrIconAvatarModule,
    ClrLetterAvatarModule,
    ClrMultilingualModule,
    ClrGenericQuickListModule,
    ClrDataListValidatorModule,
    ClrHistoryModule,
    ClrAutocompleteOffModule,
    ClrBrandAvatarModule,
    ClrLocationBarModule,
    ClrFormModule,
    ClrDropdownOverflowModule,
    ClrDatagridStatePersistenceModule,
    ClrEnumFilterModule,
    ClrDateFilterModule,
    ClrDaterangepickerModule,
    ClrIfWarningModule,
    ClrActionPanelModule,
    ClrReadonlyDirectiveModule,
    ClrDatagridColumnReorderModule,
    ClrSignpostAddonModule,
  ],
})
export class ClrAddonsModule {}
