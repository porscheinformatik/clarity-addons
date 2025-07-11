/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ClrHistory } from './history';
import { RouterModule } from '@angular/router';
import { ClrHistoryPinned } from './history-pinned';
import { ClrDropdownOverflowModule } from '../dropdown';
import { HISTORY_TOKEN } from './history.http.service';
import { ClrHistoryHttpImplService } from './history.http.impl.service';

@NgModule({
  imports: [CommonModule, ClarityModule, RouterModule, ClrDropdownOverflowModule],
  declarations: [ClrHistory, ClrHistoryPinned],
  exports: [ClrHistory, ClrHistoryPinned],
  providers: [
    {
      provide: HISTORY_TOKEN,
      useClass: ClrHistoryHttpImplService,
    },
  ],
})
export class ClrHistoryModule {}
