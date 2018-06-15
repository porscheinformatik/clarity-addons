/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './landing.component';

export const APP_ROUTES: Routes = [
  { path: '', component: LandingComponent },
  {
    path: 'view-edit-section',
    loadChildren: 'src/app/view-edit-section/view-edit-section.demo.module#ViewEditSectionDemoModule',
  },
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
