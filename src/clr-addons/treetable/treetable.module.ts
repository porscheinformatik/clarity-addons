/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { NgModule } from '@angular/core';
import { ClrTreetableRow } from './treetable-row';
import { ClrTreetable } from './treetable';
import { ClrTreetableCell } from './treetable-cell';
import { ClrTreetableColumn } from './treetable-column';
import { ClrTreetablePlaceholder } from './treetable-placeholder';
import {
  TreetableCellRenderer,
  TreetableHeaderRenderer,
  TreetableMainRenderer,
  TreetableRowRenderer,
} from './renderer';
import { ClrTreetableActionOverflow } from './treetable-action-overflow';
import { TreetableItemsDirective } from './treetable-items';
import { ClrTreetableFilter } from './treetable-filter';
import { ClrTreetableStringFilter } from './built-in/filter/treetable-string-filter';
import { ClrTreetableFooter } from './treetable-footer';
import { ClrTreetableHideableColumn } from './treetable-hideable-column.directive';
import { ExportTreetableButtonComponent } from './treetable-export-button.component';

export const CLR_TREETABLE_DIRECTIVES = [
  ClrTreetable,
  ClrTreetableRow,
  ClrTreetableCell,
  ClrTreetableColumn,
  ClrTreetableHideableColumn,
  ClrTreetableFooter,
  ClrTreetablePlaceholder,
  ClrTreetableActionOverflow,
  TreetableMainRenderer,
  TreetableHeaderRenderer,
  TreetableRowRenderer,
  TreetableCellRenderer,
  TreetableItemsDirective,
  ClrTreetableFilter,
  ClrTreetableStringFilter,
  ExportTreetableButtonComponent,
] as const;

/**
 * @deprecated Compatibility wrapper for NgModule-based consumers. Import the standalone `CLR_TREETABLE_DIRECTIVES` directly instead.
 */
@NgModule({
  imports: [...CLR_TREETABLE_DIRECTIVES],
  exports: [...CLR_TREETABLE_DIRECTIVES],
})
export class ClrTreetableModule {}
