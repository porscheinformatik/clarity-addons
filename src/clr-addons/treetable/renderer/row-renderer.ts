/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ContentChildren, Directive, QueryList } from '@angular/core';
import { TreetableCellRenderer } from './cell-renderer';

@Directive({ selector: 'clr-tt-row' })
export class TreetableRowRenderer {
  @ContentChildren(TreetableCellRenderer) cells: QueryList<TreetableCellRenderer>;

  constructor() {}
}
