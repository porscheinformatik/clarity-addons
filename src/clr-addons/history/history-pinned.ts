/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, DestroyRef, inject, Inject, Input, OnInit, Optional } from '@angular/core';
import { ClrHistoryModel } from './history-model.interface';
import { ClrHistoryService } from './history.service';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HISTORY_PROVIDER, HistoryProvider } from './history.provider';

@Component({
  selector: 'clr-history-pinned',
  templateUrl: './history-pinned.html',
  standalone: false,
})
export class ClrHistoryPinned implements OnInit {
  @Input('clrUsername') username: string;
  @Input('clrTenantId') tenantId: string;
  @Input('clrContext') context: string;
  @Input('clrDomain') domain: string;

  /**
   * The array of history elements to be displayed.
   */
  historyElements$: Subject<ClrHistoryModel[]> = new ReplaySubject<ClrHistoryModel[]>(1);
  active$ = new BehaviorSubject<boolean>(this.initActive());

  private readonly destroyRef = inject(DestroyRef);

  constructor(
    private readonly historyService: ClrHistoryService,
    @Inject(HISTORY_PROVIDER) @Optional() private readonly historyProvider: HistoryProvider
  ) {}

  initActive(): boolean {
    return this.historyService.initializeCookieSettings(this.username, this.domain).historyPinned;
  }

  ngOnInit(): void {
    this.historyService
      .getHistory(this.username, this.tenantId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(elements => {
        this.historyElements$.next(
          this.historyProvider ? this.historyProvider.getModifiedHistoryEntries(elements) : elements
        );
      });

    this.historyService.cookieSettings$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(settings => {
      const setting = settings.find(setting => setting.username === this.username);
      this.active$.next(setting?.historyPinned);
    });

    this.historyService.deleteOldCookie(this.domain);
  }
}
