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
  @Input('username') username: string;
  @Input('application') application: string;
  @Input('tenantId') tenantId: string;
  @Input('pinActive') pinActive = true;
  @Input('dropdownHeader') dropdownHeader = 'History';
  @Input('dropdownPin') dropdownPin = 'Pin History';
  @Input('dropdownUnpin') dropdownUnpin = 'Unpin History';

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
    this.pinActivated = this.historyService.getHistoryPinned(this.username);
    this.historyService.cookieSettings$.subscribe(settings => {
      this.pinActivated = settings.find(setting => setting.username === this.username).historyPinned;
    });
  }

  select(history: ClrHistoryModel): void {
    window.location.href = history.url;
  }

  togglePinHistory(): void {
    this.historyService.setHistoryPinned(this.username, !this.historyService.getHistoryPinned(this.username));
  }
}
