/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
import { FlowBarContentPanelDemo } from './flow-bar-content-panel/flow-bar-content-panel.demo';

export const APP_ROUTES: Routes = [
  { path: '', component: LandingComponent },
  { path: 'cards', component: CardsDemo },
  { path: 'view-edit-section', component: ViewEditSectionDemo },
  { path: 'pager', component: PagerDemo },
  { path: 'paged-search-result-list', component: PagedSearchResultListDemo },
  { path: 'collapse-expand-section', component: CollapseExpandSectionDemo },
  { path: 'content-panel', component: ContentPanelDemo },
  { path: 'flow-bar', component: FlowBarDemo },
  { path: 'flow-bar-content-panel', component: FlowBarContentPanelDemo },
  { path: 'breadcrumb', component: BreadcrumbDemo },
  { path: 'notification', component: NotificationDemo },
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
