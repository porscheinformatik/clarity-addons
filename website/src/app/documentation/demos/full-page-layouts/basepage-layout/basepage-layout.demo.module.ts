/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';

import { BasepageLayoutDemo } from './basepage-layout';
import { DemoMenuModule } from '../demo-menu/demo-menu.module';
import { ClrAddonsModule, HISTORY_TOKEN } from '@porscheinformatik/clr-addons';
import { MockClrHistoryHttpService } from '../../history/_mocks/history.http.mock.service';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    DemoMenuModule,
    RouterModule.forChild([{ path: '', component: BasepageLayoutDemo, outlet: 'fullpage' }]),
    ClrAddonsModule,
  ],
  declarations: [BasepageLayoutDemo],
  exports: [BasepageLayoutDemo],
  providers: [
    {
      provide: HISTORY_TOKEN,
      useClass: MockClrHistoryHttpService,
    },
  ],
})
export class BasepageLayoutDemoModule {}
