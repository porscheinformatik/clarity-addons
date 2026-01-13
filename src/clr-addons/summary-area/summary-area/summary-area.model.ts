/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
export interface ClrSummaryAreaError {
  active: boolean;
  text?: string;
  click?: () => void;
  linkText?: string;
}

export interface ClrSummaryAreaWarning {
  active: boolean;
  text?: string;
  click?: () => void;
  linkText?: string;
}

export interface ClrSummaryAreaLoading {
  active: boolean;
  text?: string;
}

export type ClrSummaryAreaColumns = 1 | 2 | 3 | 4 | 5;
export type ClrSummaryAreaRows = 1 | 2 | 3;
