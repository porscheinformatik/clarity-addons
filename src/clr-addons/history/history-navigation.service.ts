/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { DOCUMENT, inject, Injectable } from '@angular/core';
import { ClrHistoryModel } from './history-model.interface';

/**
 * Handles same-tab navigation from dropdown and pinned history.
 * Applications can override this service to confirm, defer, or cancel navigation.
 */
@Injectable({ providedIn: 'root' })
export class ClrHistoryNavigationService {
  private readonly document = inject(DOCUMENT);

  /**
   * Navigates to the selected entry using the browser by default.
   * Overrides own the navigation request, including any asynchronous confirmation.
   *
   * @param entry The original history entry.
   * @param url The destination URL. Pinned history supplies the browser-resolved link URL.
   */
  navigate(entry: ClrHistoryModel, url = entry.url): void {
    this.document.location.href = url;
  }
}
