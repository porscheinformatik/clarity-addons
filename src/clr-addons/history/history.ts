/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, DestroyRef, inject, Inject, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { ClrHistoryModel } from './history-model.interface';
import { ClrHistoryService } from './history.service';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { angleIcon, ClarityIcons, historyIcon } from '@cds/core/icon';
import { HISTORY_PROVIDER, HistoryProvider } from './history.provider';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

ClarityIcons.addIcons(historyIcon, angleIcon);

@Component({
  selector: 'clr-history',
  templateUrl: './history.html',
  host: { class: 'clr-history' },
  standalone: false,
})
export class ClrHistory implements OnInit, OnDestroy {
  @Input('clrUsername') username: string;
  @Input('clrTenantId') tenantId: string;
  @Input('clrContext') context: string;
  @Input('clrPinActive') pinActive = true;
  @Input('clrDropdownHeader') dropdownHeader = 'History';
  @Input('clrDropdownPin') dropdownPin = 'Pin History';
  @Input('clrDropdownUnpin') dropdownUnpin = 'Unpin History';
  @Input('clrDomain') domain: string;
  @Input('clrPosition') position = 'bottom-right';

  /**
   * The array of history elements to be displayed.
   */
  historyElements$: Subject<ClrHistoryModel[]> = new ReplaySubject<ClrHistoryModel[]>(1);
  pinActivated = false;
  private readonly onDestroy$ = new Subject<void>();
  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private readonly historyService: ClrHistoryService,
    @Inject(HISTORY_PROVIDER) @Optional() private readonly historyProvider: HistoryProvider
  ) {}

  ngOnInit(): void {
    this.historyService
      .getHistory(this.username, this.tenantId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(elements => {
        this.historyElements$.next(
          this.historyProvider ? this.historyProvider.getModifiedHistoryEntries(elements) : elements
        );
      });

    this.historyService.initializeCookieSettings(this.username, this.domain);
    this.historyService.cookieSettings$.pipe(takeUntil(this.onDestroy$)).subscribe(settings => {
      this.pinActivated = settings.find(setting => setting.username === this.username).historyPinned;
    });

    this.historyService.deleteOldCookie(this.domain);
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
