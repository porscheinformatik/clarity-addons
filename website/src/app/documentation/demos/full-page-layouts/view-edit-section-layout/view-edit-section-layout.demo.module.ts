import { CommonModule } from '@angular/common';
/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { ClrAddonsModule } from '@porscheinformatik/clr-addons';
import { DemoMenuModule } from '../demo-menu/demo-menu.module';
import { UtilsModule } from '../../../../utils/utils.module';

import { ViewEditSectionLayout } from './view-edit-section-layout';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    DemoMenuModule,
    RouterModule.forChild([{ path: '', component: ViewEditSectionLayout, outlet: 'fullpage' }]),
    ClrAddonsModule,
    UtilsModule,
  ],
  declarations: [ViewEditSectionLayout],
  exports: [ViewEditSectionLayout],
})
export class ViewEditSectionLayoutDemoModule {}
