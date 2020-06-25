/*
 * Copyright (c) 2018-2020 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, Input, OnInit } from '@angular/core';
import { ClrHistoryModel } from './history-model.interface';
import { ClrHistoryService } from './history.service';

@Component({
  selector: 'clr-history',
  templateUrl: './history.html',
})
export class ClrHistory implements OnInit {
  @Input('clrUsername') username: string;
  @Input('clrApplication') application: string;
  @Input('clrTenantId') tenantId: string;
  @Input('clrPinActive') pinActive = true;
  @Input('clrDropdownHeader') dropdownHeader = 'History';
  @Input('clrDropdownPin') dropdownPin = 'Pin History';
  @Input('clrDropdownUnpin') dropdownUnpin = 'Unpin History';

  /**
   * The array of history elements to be displayed.
   */
  historyElements: ClrHistoryModel[] = [];
  pinActivated = false;

  constructor(private historyService: ClrHistoryService) {}

  ngOnInit(): void {
    this.historyElements = this.historyService.getHistory(this.username, this.application, this.tenantId);
    // remove last element to prevent showing own history entry
    if (this.historyElements) {
      this.historyElements.pop();
    }
    this.historyService.initializeCookieSettings(this.username);
    this.historyService.cookieSettings$.subscribe(settings => {
      this.pinActivated = settings.find(setting => setting.username === this.username).historyPinned;
    });
  }

  select(history: ClrHistoryModel): void {
    window.location.href = history.url;
  }

  togglePinHistory(): void {
    this.historyService.setHistoryPinned(this.username, !this.pinActivated);
  }
}
