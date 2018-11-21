/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

export enum TreetableRenderStep {
  ALIGN_COLUMNS,
  CLEAR_WIDTHS, // Note this is listened to by both cells and columns
  COMPUTE_COLUMN_WIDTHS,
  UPDATE_ROW_WIDTH,
}
