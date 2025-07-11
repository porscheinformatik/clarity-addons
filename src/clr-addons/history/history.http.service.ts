/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ClrHistoryModel } from './history-model.interface';
import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';

export const HISTORY_TOKEN = new InjectionToken<any>('clr.history.http.service');

export interface ClrHistoryHttpService {
  addHistoryEntry(historyEntry: ClrHistoryModel): Observable<void>;

  getHistory(username: string, tenantId: string): Observable<ClrHistoryModel[]>;

  removeFromHistory(historyEntry: ClrHistoryModel): Observable<void>;
}
