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

export const APP_ROUTES: Routes = [
  { path: '', component: LandingComponent },
  { path: 'view-edit-section', component: ViewEditSectionDemo },
  { path: 'pager', component: PagerDemo },
  { path: 'paged-search-result-list', component: PagedSearchResultListDemo },
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
