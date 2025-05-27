/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ClrDataTreeTableRow } from './data-treetable-row';
import { ClrDataTreeTable } from './data-treetable';
import { ClrDataTreeTableCell } from './data-treetable-cell';
import { ClrDataTreeTableColumn } from './data-treetable-column';
import { ClrDataTreeTablePlaceholder } from './data-treetable-placeholder';
import { DataTreeTableHeaderRenderer } from './renderer/header-renderer';
import { DataTreeTableMainRenderer } from './renderer/main-renderer';
import { DataTreeTableRowRenderer } from './renderer/row-renderer';
import { DataTreeTableCellRenderer } from './renderer/cell-renderer';
import { ClrDataTreeTableActionOverflow } from './data-treetable-action-overflow';
import { DataTreetableItemsDirective } from './data-treetable-items.directive';
import { FormsModule } from '@angular/forms';

const CLR_TREETABLE_DIRECTIVES: Type<any>[] = [
  ClrDataTreeTable,
  ClrDataTreeTableRow,
  ClrDataTreeTableCell,
  ClrDataTreeTableColumn,
  ClrDataTreeTablePlaceholder,
  ClrDataTreeTableActionOverflow,
  DataTreeTableMainRenderer,
  DataTreeTableHeaderRenderer,
  DataTreeTableRowRenderer,
  DataTreeTableCellRenderer,
  DataTreetableItemsDirective,
];

@NgModule({
  imports: [CommonModule, ClarityModule, FormsModule],
  declarations: [CLR_TREETABLE_DIRECTIVES],
  exports: [CLR_TREETABLE_DIRECTIVES],
})
export class ClrDataTreeTableModule {}
