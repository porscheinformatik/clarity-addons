/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ClrHistoryModel, HISTORY_NOTIFICATION_URL_PROVIDER } from './history-model.interface';
import { Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClrHistoryHttpService } from './history.http.service';

@Injectable()
export class ClrHistoryHttpImplService implements ClrHistoryHttpService {
  constructor(
    @Inject(HISTORY_NOTIFICATION_URL_PROVIDER) private readonly historyNotificationUrl: string,
    private readonly httpClient: HttpClient
  ) {}

  /**
   * Add a new history entry
   * @param historyEntry The entry to be added
   */
  addHistoryEntry(historyEntry: ClrHistoryModel): Observable<void> {
    return this.httpClient.post<void>(this.historyNotificationUrl, historyEntry);
  }

  getHistory(username: string, tenantId: string): Observable<ClrHistoryModel[]> {
    return this.httpClient.get<ClrHistoryModel[]>(this.buildGetHistoryUrl(username, tenantId));
  }

  removeFromHistory(historyEntry: ClrHistoryModel): Observable<void> {
    return this.httpClient.delete<void>(this.historyNotificationUrl, { body: historyEntry });
  }

  private buildGetHistoryUrl(username: string, tenantId: string): string {
    let url = this.historyNotificationUrl + '?numEntries=3';
    if (username) {
      url += `&username=${encodeURIComponent(username)}`;
    }
    if (tenantId) {
      url += `&tenantId=${encodeURIComponent(tenantId)}`;
    }
    return url;
  }
}
