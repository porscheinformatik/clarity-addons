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

import { FormsLayout } from './forms-layout';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    DemoMenuModule,
    RouterModule.forChild([{ path: '', component: FormsLayout, outlet: 'fullpage' }]),
    ClrAddonsModule,
    UtilsModule,
  ],
  declarations: [FormsLayout],
  exports: [FormsLayout],
})
export class FormsLayoutDemoModule {}
