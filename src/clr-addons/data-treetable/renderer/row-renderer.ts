/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ContentChildren, Directive, QueryList } from '@angular/core';
import { DataTreeTableCellRenderer } from './cell-renderer';

@Directive({
  selector: 'clr-dt-row',
  standalone: false,
})
export class DataTreeTableRowRenderer {
  @ContentChildren(DataTreeTableCellRenderer) cells: QueryList<DataTreeTableCellRenderer>;
}
