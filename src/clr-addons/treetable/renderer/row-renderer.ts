/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { contentChildren, Directive } from '@angular/core';
import { TreetableCellRenderer } from './cell-renderer';

@Directive({
  selector: 'clr-tt-row',
  standalone: false,
})
export class TreetableRowRenderer {
  readonly cells = contentChildren(TreetableCellRenderer);
}
