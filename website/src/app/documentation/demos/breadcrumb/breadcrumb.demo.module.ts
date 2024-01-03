/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ClrAddonsModule } from '@porscheinformatik/clr-addons';

import { BreadcrumbDemo } from './breadcrumb.demo';
import { DocWrapperModule } from '../_doc-wrapper/doc-wrapper.module';
import { RouterModule } from '@angular/router';
import { UtilsModule } from '../../../utils/utils.module';

@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
    DocWrapperModule,
    RouterModule.forChild([{ path: '', component: BreadcrumbDemo }]),
    ClarityModule,
    ClrAddonsModule,
  ],
  declarations: [BreadcrumbDemo],
  exports: [BreadcrumbDemo],
})
export class BreadcrumbDemoModule {}
