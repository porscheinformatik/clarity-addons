/*
 * Copyright (c) 2018-2024 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, Inject, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { ClrHistoryModel } from './history-model.interface';
import { ClrHistoryService } from './history.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { angleIcon, ClarityIcons, historyIcon } from '@cds/core/icon';
import { HISTORY_PROVIDER, HistoryProvider } from './history.provider';

ClarityIcons.addIcons(historyIcon, angleIcon);

@Component({
  selector: 'clr-history',
  templateUrl: './history.html',
})
export class ClrHistory implements OnInit, OnDestroy {
  @Input('clrUsername') username: string;
  @Input('clrContext') context: { [key: string]: string };
  @Input('clrPinActive') pinActive = true;
  @Input('clrDropdownHeader') dropdownHeader = 'History';
  @Input('clrDropdownPin') dropdownPin = 'Pin History';
  @Input('clrDropdownUnpin') dropdownUnpin = 'Unpin History';
  @Input('clrDomain') domain: string;
  @Input('clrPosition') position = 'bottom-right';

  /**
   * The array of history elements to be displayed.
   */
  historyElements: ClrHistoryModel[] = [];
  pinActivated = false;
  private onDestroy$ = new Subject<void>();

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
    this.historyService.cookieSettings$.pipe(takeUntil(this.onDestroy$)).subscribe(settings => {
      this.pinActivated = settings.find(setting => setting.username === this.username).historyPinned;
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  select(history: ClrHistoryModel): void {
    window.location.href = history.url;
  }

  togglePinHistory(): void {
    this.historyService.setHistoryPinned(this.username, !this.pinActivated);
  }
}
