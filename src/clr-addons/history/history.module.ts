/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { NgModule } from '@angular/core';
import { ClrHistory } from './history';
import { ClrHistoryPinned } from './history-pinned';
import { HISTORY_TOKEN } from './history.http.service';
import { ClrHistoryHttpImplService } from './history.http.impl.service';

/**
 * @deprecated Compatibility wrapper for NgModule-based consumers. Import the standalone `ClrHistory` / `ClrHistoryPinned` directly and add `provideClrHistory()` to your providers.
 */
@NgModule({
  imports: [ClrHistory, ClrHistoryPinned],
  exports: [ClrHistory, ClrHistoryPinned],
  providers: [
    {
      provide: HISTORY_TOKEN,
      useClass: ClrHistoryHttpImplService,
    },
  ],
})
export class ClrHistoryModule {}
