/*
 * Copyright (c) 2018-2024 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, Inject, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { ClrHistoryModel } from './history-model.interface';
import { ClrHistoryService } from './history.service';
import { Subscription } from 'rxjs';
import { HISTORY_PROVIDER, HistoryProvider } from './history.provider';

@Component({
  selector: 'clr-history-pinned',
  templateUrl: './history-pinned.html',
})
export class ClrHistoryPinned implements OnInit, OnDestroy {
  @Input('clrUsername') username: string;
  @Input('clrContext') context: { [key: string]: string };
  @Input('clrDomain') domain: string;

  /**
   * The array of history elements to be displayed.
   */
  historyElements: ClrHistoryModel[] = [];
  active = false;
  private settingsSubscription: Subscription;

  constructor(
    private historyService: ClrHistoryService,
    @Inject(HISTORY_PROVIDER) @Optional() private historyProvider: HistoryProvider
  ) {}

  ngOnInit(): void {
    const historyElements = this.historyService.getHistoryDisplay(this.username, this.context);
    this.historyElements = this.historyProvider
      ? this.historyProvider.getModifiedHistoryEntries(historyElements)
      : historyElements;

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
}
