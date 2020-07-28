/*
 * Copyright (c) 2018-2020 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ClrHistoryModel } from './history-model.interface';
import { ClrHistoryService } from './history.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'clr-history-pinned',
  templateUrl: './history-pinned.html',
})
export class ClrHistoryPinned implements OnInit, OnDestroy {
  @Input('clrUsername') username: string;
  @Input('clrContext') context: { [key: string]: string };
  @Input('clrHideLast') hideLast: true;
  @Input('clrDomnain') domain?: string;

  /**
   * The array of history elements to be displayed.
   */
  historyElements: ClrHistoryModel[] = [];
  active = false;
  private settingsSubscription: Subscription;

  constructor(private historyService: ClrHistoryService) {}

  ngOnInit(): void {
    this.historyElements = this.historyService.getHistory(this.username, this.context);
    // remove last element to prevent showing one history entry
    if (this.historyElements && this.hideLast) {
      this.historyElements.pop();
    }
    this.historyService.initializeCookieSettings(this.username, this.domain);
    this.settingsSubscription = this.historyService.cookieSettings$.subscribe(settings => {
      const setting = settings.find(setting => setting.username === this.username);
      if (setting) {
        this.active = setting.historyPinned;
      }
    });
  }

  ngOnDestroy(): void {
    this.settingsSubscription.unsubscribe();
  }

  select(history: ClrHistoryModel): void {
    window.location.href = history.url;
  }
}
