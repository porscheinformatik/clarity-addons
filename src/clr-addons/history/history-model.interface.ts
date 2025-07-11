/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { InjectionToken } from '@angular/core';

export const HISTORY_NOTIFICATION_URL_PROVIDER = new InjectionToken<string>('HISTORY_NOTIFICATION_URL_PROVIDER');

export interface ClrHistoryModel {
  /**
   * The username
   */
  username: string;

  /**
   * The name of the page
   */
  pageName: string;

  /**
   * The tenant ID
   */
  tenantId: string;

  /**
   * The context of the page
   */
  context?: string;

  /**
   * The title to be displayed.
   */
  title: string;

  /**
   * The url where the navigation goes.
   */
  url: string;
}

export interface ClrHistorySettingsModel {
  /**
   * Indicating if history is pinned (additional menu is shown if true)
   */
  historyPinned: boolean;

  /**
   * The username
   */
  username: string;
}
