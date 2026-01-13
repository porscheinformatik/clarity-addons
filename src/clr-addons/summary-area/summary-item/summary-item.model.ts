/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

export interface ClrSummaryItemError {
  active: boolean;
  text?: string;
  click?: () => void;
}

export interface ClrSummaryItemWarning {
  active: boolean;
  text?: string;
  click?: () => void;
}

export interface ClrSummaryItemLoading {
  active: boolean;
  text?: string;
}

export interface ClrSummaryItemEditConfig {
  enabled: boolean;
  text?: string;
  click: () => void;
}
