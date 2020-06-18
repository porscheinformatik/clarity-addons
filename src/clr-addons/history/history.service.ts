/*
 * Copyright (c) 2018-2020 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Injectable } from '@angular/core';
import { ClrHistoryModel, ClrHistorySettingsModel } from './history-model.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ClrHistoryService {
  public cookieSettings$ = new BehaviorSubject<ClrHistorySettingsModel[]>([]);
  cookieName = 'cng.history';
  cookieNameSettings = 'cng.history.settings';
  // prefix from old solution in tapestry
  private tenantPrefix = 't';
  private expiryDate: Date;

  constructor() {
    this.expiryDate = new Date();
    this.expiryDate.setTime(this.expiryDate.getTime() + 365 * 24 * 60 * 60 * 1000);
  }

  addHistoryEntry(historyEntry: ClrHistoryModel): void {
    this.removeFromHistory(historyEntry);
    let history = this.getHistory(historyEntry.username, historyEntry.applicationName, historyEntry.tenantid);
    /* add it as last element */
    if (historyEntry.tenantid) {
      historyEntry.tenantid = this.tenantPrefix + historyEntry.tenantid;
    }
    history.push(historyEntry);
    /* only consider the last 4 bread crumbs per tenantid */
    history = history.slice(-4);
    this.setHistory(history);
  }

  getHistory(username: string, application: string, tenant?: string): ClrHistoryModel[] {
    const history: ClrHistoryModel[] = this.getCookieByName(this.cookieName);
    if (!history) {
      return [];
    }
    if (tenant) {
      return history.filter(
        element =>
          element.username === username &&
          element.applicationName === application &&
          element.tenantid === this.tenantPrefix + tenant
      );
    }
    return history.filter(element => element.username === username && element.applicationName === application);
  }

  /**
   * Set history for username, application and tenant id
   * Keep other untouched
   * @param entries
   */
  private setHistory(entries: ClrHistoryModel[]): void {
    if (!entries) {
      // clear all entries
      this.setCookie(this.cookieName, '');
    }
    this.setCookie(this.cookieName, JSON.stringify(entries));
  }

  resetHistory(): void {
    this.setHistory(null);
  }

  removeFromHistory(entry: ClrHistoryModel): void {
    let history = this.getHistory(entry.username, entry.applicationName, entry.tenantid);
    /* remove current entry from array */
    history = history.filter(
      element =>
        !(
          element.pageName === entry.pageName &&
          element.context.indexOf(entry.context) === 0 &&
          element.tenantid === this.tenantPrefix + entry.tenantid &&
          element.username === entry.username
        )
    );
    this.setHistory(history);
  }

  getHistoryPinned(username: string): boolean {
    let historySettings: ClrHistorySettingsModel[] = this.getCookieByName(this.cookieNameSettings);
    if (!historySettings || historySettings.length === 0) {
      this.setHistoryPinned(username, false);
      historySettings = [{ username: username, historyPinned: false }];
    }
    this.cookieSettings$.next(historySettings);
    const historySetting = historySettings.find(hSetting => hSetting.username === username);
    if (historySetting) {
      return historySetting.historyPinned;
    }
    return false;
  }

  setHistoryPinned(username: string, pin: boolean): void {
    const historySettings: ClrHistorySettingsModel[] = this.getCookieByName(this.cookieNameSettings);
    const historySetting = historySettings.find(hSetting => hSetting.username === username);
    if (historySetting) {
      historySetting.historyPinned = pin;
    } else {
      historySettings.push({ username: username, historyPinned: pin });
    }
    this.cookieSettings$.next(historySettings);
    // Set it
    this.setCookie(this.cookieNameSettings, JSON.stringify(historySettings));
  }

  private getCookieByName(name: string): any[] {
    return (
      document.cookie
        .split(';')
        .map(c => c.trim())
        .filter(cookie => {
          return cookie.substring(0, name.length + 1) === `${name}=`;
        })
        .map(cookie => {
          return JSON.parse(cookie.substring(name.length + 1));
        })[0] || []
    );
  }

  private setCookie(name: string, content: string): void {
    document.cookie =
      name +
      '=' +
      content +
      ';domain=' +
      window.location.hostname.split('-').slice(-1) +
      ';expires=' +
      this.expiryDate.toUTCString() +
      '; path=/';
  }
}
