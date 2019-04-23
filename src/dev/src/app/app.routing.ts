/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackButtonDemo } from './back-button/back-button.demo';
import { BreadcrumbDemo } from './breadcrumb/breadcrumb.demo';
import { CardsDemo } from './cards/cards.demo';
import { CollapseExpandSectionDemo } from './collapse-expand-section/collapse-expand-section.demo';
import { ContentPanelDemo } from './content-panel/content-panel.demo';
import { DateTimeContainerDemo } from './date-time-container/date-time-container.demo';
import { FlowBarContentPanelDemo } from './flow-bar-content-panel/flow-bar-content-panel.demo';
import { FlowBarDemo } from './flow-bar/flow-bar.demo';

import { LandingComponent } from './landing.component';
import { NotificationDemo } from './notification/notification.demo';
import { NumericFieldDemo } from './numericfield/numericfield.demo';
import { SearchFieldDemo } from './searchfield/searchfield.demo';
import { PagedSearchResultListDemo } from './paged-search-result-list/paged-search-result-list.demo';
import { PagerDemo } from './pager/pager.demo';
import { ProgressSpinnerDemo } from './progress-spinner/progress-spinner.demo';
import { ReadonlyDemo } from './readonly/readonly.demo';
import { TreetableDemo } from './treetable/treetable.demo';
import { ViewEditSectionDemo } from './view-edit-section/view-edit-section.demo';
import { DotPagerDemo } from './dot-pager/dot-pager.demo';
import { QuickListDemo } from './quick-list/quick-list.demo';

export const APP_ROUTES: Routes = [
  { path: '', component: LandingComponent },
  { path: 'back-button', component: BackButtonDemo },
  { path: 'cards', component: CardsDemo },
  { path: 'view-edit-section', component: ViewEditSectionDemo },
  { path: 'pager', component: PagerDemo },
  { path: 'dot-pager', component: DotPagerDemo },
  { path: 'paged-search-result-list', component: PagedSearchResultListDemo },
  { path: 'collapse-expand-section', component: CollapseExpandSectionDemo },
  { path: 'content-panel', component: ContentPanelDemo },
  { path: 'flow-bar', component: FlowBarDemo },
  { path: 'flow-bar-content-panel', component: FlowBarContentPanelDemo },
  { path: 'breadcrumb', component: BreadcrumbDemo },
  { path: 'progress-spinner', component: ProgressSpinnerDemo },
  { path: 'notification', component: NotificationDemo },
  { path: 'numericfield', component: NumericFieldDemo },
  { path: 'searchfield', component: SearchFieldDemo },
  { path: 'treetable', component: TreetableDemo },
  { path: 'readonly', component: ReadonlyDemo },
  { path: 'combobox', loadChildren: 'src/app/combobox/combobox.demo.module#ComboboxDemoModule' },
  { path: 'date-time-container', component: DateTimeContainerDemo },
  { path: 'quick-list-container', component: QuickListDemo },
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
