/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ClrAddonsModule, HISTORY_TOKEN } from '@porscheinformatik/clr-addons';

import { HistoryDemo } from './history.demo';
import { DocWrapperModule } from '../_doc-wrapper/doc-wrapper.module';
import { RouterModule } from '@angular/router';
import { UtilsModule } from '../../../utils/utils.module';
import { MockClrHistoryHttpService } from './_mocks/history.http.mock.service';

@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
    DocWrapperModule,
    RouterModule.forChild([{ path: '', component: HistoryDemo }]),
    ClarityModule,
    ClrAddonsModule,
  ],
  declarations: [HistoryDemo],
  exports: [HistoryDemo],
  providers: [
    {
      provide: HISTORY_TOKEN,
      useClass: MockClrHistoryHttpService,
    },
  ],
})
export class HistoryDemoModule {}
