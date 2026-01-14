/*
 * Copyright (c) 2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { ClrAddonsModule } from '@porscheinformatik/clr-addons';

import { DemoMenuModule } from '../demo-menu/demo-menu.module';
import { SummaryAreaPageLayoutDemo } from './summary-area-page-layout.demo';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    ClrAddonsModule,
    DemoMenuModule,
    RouterModule.forChild([{ path: '', component: SummaryAreaPageLayoutDemo, outlet: 'fullpage' }]),
  ],
  declarations: [SummaryAreaPageLayoutDemo],
  exports: [SummaryAreaPageLayoutDemo],
})
export class SummaryAreaPageLayoutDemoModule {}
