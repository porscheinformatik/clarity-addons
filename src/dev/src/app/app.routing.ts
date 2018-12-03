/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackButtonDemo } from './back-button/back-button.demo';

import { LandingComponent } from './landing.component';
import { PagerDemo } from './pager/pager.demo';
import { ViewEditSectionDemo } from './view-edit-section/view-edit-section.demo';
import { PagedSearchResultListDemo } from './paged-search-result-list/paged-search-result-list.demo';
import { CollapseExpandSectionDemo } from './collapse-expand-section/collapse-expand-section.demo';
import { ContentPanelDemo } from './content-panel/content-panel.demo';
import { BreadcrumbDemo } from './breadcrumb/breadcrumb.demo';
import { NotificationDemo } from './notification/notification.demo';
import { FlowBarDemo } from './flow-bar/flow-bar.demo';
import { CardsDemo } from './cards/cards.demo';
import { ProgressSpinnerDemo } from './progress-spinner/progress-spinner.demo';
import { FlowBarContentPanelDemo } from './flow-bar-content-panel/flow-bar-content-panel.demo';
import { NumericFieldDemo } from './numericfield/numericfield.demo';
import { TreetableDemo } from './treetable/treetable.demo';

export const APP_ROUTES: Routes = [
  { path: '', component: LandingComponent },
  { path: 'back-button', component: BackButtonDemo },
  { path: 'cards', component: CardsDemo },
  { path: 'view-edit-section', component: ViewEditSectionDemo },
  { path: 'pager', component: PagerDemo },
  { path: 'paged-search-result-list', component: PagedSearchResultListDemo },
  { path: 'collapse-expand-section', component: CollapseExpandSectionDemo },
  { path: 'content-panel', component: ContentPanelDemo },
  { path: 'flow-bar', component: FlowBarDemo },
  { path: 'flow-bar-content-panel', component: FlowBarContentPanelDemo },
  { path: 'breadcrumb', component: BreadcrumbDemo },
  { path: 'progress-spinner', component: ProgressSpinnerDemo },
  { path: 'notification', component: NotificationDemo },
  { path: 'numericfield', component: NumericFieldDemo },
  { path: 'treetable', component: TreetableDemo },
  { path: 'combobox', loadChildren: 'src/app/combobox/combobox.demo.module#ComboboxDemoModule' },
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
