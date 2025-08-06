/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Inject, Injectable } from '@angular/core';
import { ClrHistoryModel, ClrHistorySettingsModel } from './history-model.interface';
import { BehaviorSubject, filter, Observable, of, switchMap, tap } from 'rxjs';
import { ClrHistoryHttpService, HISTORY_TOKEN } from './history.http.service';

@Injectable()
export class ClrHistoryService {
  public cookieSettings$ = new BehaviorSubject<ClrHistorySettingsModel[]>([]);
  cookieNameSettings = 'clr.history.settings';
  private readonly expiryDate: Date;

  private readonly changingHistory$ = new BehaviorSubject<boolean>(false);

  constructor(@Inject(HISTORY_TOKEN) private readonly historyHttpService: ClrHistoryHttpService) {
    this.expiryDate = new Date();
    this.expiryDate.setTime(this.expiryDate.getTime() + 365 * 24 * 60 * 60 * 1000);
  }

  /**
   * Add a new history entry
   * @param historyEntry The entry to be added
   */
  addHistoryEntry(historyEntry: ClrHistoryModel): Observable<void> {
    return of(historyEntry).pipe(
      tap(() => this.changingHistory$.next(true)),
      switchMap(entry => this.historyHttpService.addHistoryEntry(entry)),
      tap(() => this.changingHistory$.next(false))
    );
  }

  getHistory(username: string, tenantId: string): Observable<ClrHistoryModel[]> {
    return this.changingHistory$.pipe(
      filter(changing => !changing),
      switchMap(() => this.historyHttpService.getHistory(username, tenantId))
    );
  }

  removeFromHistory(historyEntry: ClrHistoryModel): Observable<void> {
    return of(historyEntry).pipe(
      tap(() => this.changingHistory$.next(true)),
      switchMap(entry => this.historyHttpService.removeFromHistory(entry)),
      tap(() => this.changingHistory$.next(false))
    );
  }

  initializeCookieSettings(username: string, domain?: string): ClrHistorySettingsModel {
    let historySettings: ClrHistorySettingsModel[] = this.getCookieByName(this.cookieNameSettings);
    if (!historySettings || historySettings.length === 0) {
      this.setHistoryPinned(username, false, domain);
      historySettings = [{ username: username, historyPinned: false }];
    }
    if (!historySettings.find(hSetting => hSetting.username === username)) {
      this.setHistoryPinned(username, false, domain);
      historySettings.push({ username: username, historyPinned: false });
    }
    this.cookieSettings$.next(historySettings);
    return historySettings.find(hSetting => hSetting.username === username);
  }

  setHistoryPinned(username: string, pin: boolean, domain?: string): void {
    const historySettings: ClrHistorySettingsModel[] = this.getCookieByName(this.cookieNameSettings);
    const historySetting = historySettings.find(hSetting => hSetting.username === username);
    if (historySetting) {
      historySetting.historyPinned = pin;
    } else {
      historySettings.push({ username: username, historyPinned: pin });
    }
    this.cookieSettings$.next(historySettings);
    // Set it
    this.setCookie(this.cookieNameSettings, JSON.stringify(historySettings), domain);
  }

  private getCookieByName(name: string): any[] {
    const cookieEntries =
      document.cookie
        .split(';')
        .map(c => c.trim())
        .filter(cookie => {
          return cookie.substring(0, name.length + 1) === `${name}=`;
        })
        .map(cookie => JSON.parse(cookie.substring(name.length + 1)))[0] ?? [];
    if (cookieEntries && cookieEntries.length > 0) {
      cookieEntries.forEach((entry: any) => {
        if (entry.title) {
          entry.title = decodeURI(entry.title);
        }
        if (entry.pageName) {
          entry.pageName = decodeURI(entry.pageName);
        }
      });
    }
    return cookieEntries;
  }

  private setCookie(name: string, content: string, domain?: string): void {
    document.cookie =
      name +
      '=' +
      content +
      ';domain=' +
      (domain || this.getDomain()) +
      ';expires=' +
      this.expiryDate.toUTCString() +
      ';path=/';
  }

  public deleteOldCookie(domain?: string): void {
    document.cookie =
      'clr.history=;domain=' + (domain || this.getDomain()) + ';expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/';
  }

  private getDomain(): string {
    const domain = window.location.hostname.split('.');
    //localhost fallback
    if (domain.length === 1) {
      return domain[0];
    }
    domain.shift();
    return domain.join('.');
  }
}
