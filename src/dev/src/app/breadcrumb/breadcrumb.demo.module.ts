/*
 * Copyright (c) 2018-2019 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClarityModule } from '@clr/angular';
import { ClrAddonsModule } from '@porscheinformatik/clr-addons';

import { BreadcrumbDemo } from './breadcrumb.demo';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    ClrAddonsModule,
    RouterModule.forChild([{ path: '', component: BreadcrumbDemo }]),
  ],
  declarations: [BreadcrumbDemo],
  exports: [BreadcrumbDemo],
})
export class BreadcrumbDemoModule {}
