/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { UtilsModule } from '../../../utils/utils.module';
import { DocWrapperModule } from '../_doc-wrapper/doc-wrapper.module';
import { TooltipDemo } from './tooltip.demo';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    DocWrapperModule,
    UtilsModule,
    RouterModule.forChild([{ path: '', component: TooltipDemo }]),
  ],
  declarations: [TooltipDemo],
  exports: [TooltipDemo],
})
export class TooltipDemoModule {}
