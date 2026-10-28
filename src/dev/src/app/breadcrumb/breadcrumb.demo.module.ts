/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClarityModule } from '@clr/angular';

import { BreadcrumbDemo } from './breadcrumb.demo';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    RouterModule.forChild([{ path: '', component: BreadcrumbDemo }]),
    BreadcrumbDemo,
  ],
  exports: [BreadcrumbDemo],
})
export class BreadcrumbDemoModule {}
