/*
 * Copyright (c) 2018-2021 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Injectable } from '@angular/core';
import { ClrHistoryModel, ClrHistorySettingsModel } from './history-model.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ClrHistoryService {
  public cookieSettings$ = new BehaviorSubject<ClrHistorySettingsModel[]>([]);
  cookieName = 'clr.history';
  cookieNameSettings = 'clr.history.settings';
  private expiryDate: Date;

  // maxmimum history length
  private maxSize = 1024;
  // maximum url length for usage in history
  private maxUrlSize = 256;

  constructor() {
    this.expiryDate = new Date();
    this.expiryDate.setTime(this.expiryDate.getTime() + 365 * 24 * 60 * 60 * 1000);
  }

  /**
   * Add a new history entry
   * @param historyEntry The entry to be added
   * @param domain The optional domain param where the cookie is stored
   * @returns true when entry added, otherwise false is returned
   */
  addHistoryEntry(historyEntry: ClrHistoryModel, domain?: string): boolean {
    this.removeFromHistory(historyEntry);
    let history = this.getHistory(historyEntry.username, historyEntry.context);

    /* only add to history in case url does not exceed maxUrlSize characters */
    if (historyEntry.url && historyEntry.url.length < this.maxUrlSize) {
      /* add it as last element */
      history.push(historyEntry);
      /* support a maximum of 4 pages in history */
      history = history.slice(-4);
      this.setHistory(history, domain);
      return true;
    }
    return false;
  }

  getHistoryDisplay(username: string, context: { [key: string]: string }): ClrHistoryModel[] {
    const history = this.getHistory(username, context);
    if (history.length > 0) {
      const currentPageTitle = history[history.length - 1].title;
      const toDisplay: ClrHistoryModel[] = [];
      const alreadyDisplay: string[] = [];

      for (let i = history.length - 1; i >= 0 && alreadyDisplay.length < 4; i--) {
        if (!alreadyDisplay.includes(history[i].title) && history[i].title !== currentPageTitle) {
          alreadyDisplay.push(history[i].title);
          toDisplay.push(history[i]);
        }
      }

      return toDisplay.reverse();
    } else {
      return history;
    }
  }

  getHistory(username: string, context: { [key: string]: string }): ClrHistoryModel[] {
    const history: ClrHistoryModel[] = this.getCookieByName(this.cookieName);
    if (!history) {
      return [];
    }
    return history.filter(element => this.checkEqualContext(element, context) && element.username === username);
  }

  /**
   * Set history
   * @param entries
   * @param domain
   */
  private setHistory(entries: ClrHistoryModel[], domain?: string): void {
    if (!entries || entries.length === 0) {
      // clear all entries
      this.setCookie(this.cookieName, this.encode([]), domain);
    } else {
      entries = this.reduceSize(entries);
      // encode title & pagename to be cookie saving save
      if (entries && entries.length > 0) {
        entries.forEach(entry => {
          entry.title = encodeURI(entry.title);
          entry.pageName = encodeURI(entry.pageName);
        });
      }
      this.setCookie(this.cookieName, this.encode(entries), domain);
    }
  }

  reduceSize(entries: ClrHistoryModel[]): ClrHistoryModel[] {
    if (JSON.stringify(entries).length > this.maxSize) {
      const reduced: ClrHistoryModel[] = [];
      do {
        for (let i = 0; i < entries.length; i++) {
          reduced.push(entries[i]);
        }
      } while (JSON.stringify(reduced).length < this.maxSize);
      return reduced;
    } else {
      return entries;
    }
  }

  resetHistory(): void {
    this.setHistory(null);
  }

  removeFromHistory(entry: ClrHistoryModel): void {
    let history = this.getHistory(entry.username, entry.context);
    /* remove current entry from array */
    history = history.filter(
      element =>
        !(
          element.title === entry.title &&
          element.username === entry.username &&
          this.checkEqualContext(element, entry.context)
        )
    );
    this.setHistory(history);
  }

  private checkEqualContext(entry: ClrHistoryModel, toCompare: { [key: string]: string }): boolean {
    let equal = false;
    if (entry && entry.context && toCompare) {
      Object.keys(toCompare).forEach(key => {
        equal = key in entry.context && entry.context[key] === toCompare[key];
      });
    }
    return equal;
  }

  initializeCookieSettings(username: string, domain?: string): void {
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
        .map(cookie => {
          return name === this.cookieName
            ? this.decode(cookie.substring(name.length + 1))
            : JSON.parse(cookie.substring(name.length + 1));
        })[0] || [];
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

  private encode(content: ClrHistoryModel[]): string {
    const jsonString = btoa(encodeURIComponent(JSON.stringify(content)));
    return jsonString.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '!');
  }

  private decode(content: string): ClrHistoryModel[] {
    try {
      const base64 = content.replace(/-/g, '+').replace(/_/g, '/').replace(/!/g, '=');
      return JSON.parse(decodeURIComponent(atob(base64)));
    } catch (error) {
      return [];
    }
  }

  private setCookie(name: string, content: string, domain: string): void {
    document.cookie =
      name +
      '=' +
      content +
      ';domain=' +
      (domain ? domain : this.getDomain()) +
      ';expires=' +
      this.expiryDate.toUTCString() +
      ';path=/';
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
