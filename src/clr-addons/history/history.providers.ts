/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Provider } from '@angular/core';
import { HISTORY_NOTIFICATION_URL_PROVIDER } from './history-model.interface';
import { ClrHistoryHttpImplService } from './history.http.impl.service';
import { HISTORY_TOKEN } from './history.http.service';
import { ClrHistoryService } from './history.service';

/**
 * Provides everything the standalone `ClrHistory` and `ClrHistoryPinned` components need:
 * the `ClrHistoryService` and the default backend implementation behind `HISTORY_TOKEN`.
 * Provide your own `HISTORY_TOKEN` afterwards to use a different backend.
 *
 * @param notificationUrl The backend URL used by the default implementation. If omitted, the application has to
 * provide `HISTORY_NOTIFICATION_URL_PROVIDER` itself.
 */
export function provideClrHistory(notificationUrl?: string): Provider[] {
  return [
    ClrHistoryService,
    { provide: HISTORY_TOKEN, useClass: ClrHistoryHttpImplService },
    ...(notificationUrl ? [{ provide: HISTORY_NOTIFICATION_URL_PROVIDER, useValue: notificationUrl }] : []),
  ];
}
