/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { ClrTreetableRow } from './treetable-row';
import { ClrTreetable } from './treetable';
import { ClrTreetableCell } from './treetable-cell';
import { ClrTreetableColumn } from './treetable-column';
import { ClrTreetablePlaceholder } from './treetable-placeholder';
import { TreetableHeaderRenderer } from './renderer/header-renderer';
import { TreetableMainRenderer } from './renderer/main-renderer';
import { TreetableRowRenderer } from './renderer/row-renderer';
import { TreetableCellRenderer } from './renderer/cell-renderer';

const CLR_TREETABLE_DIRECTIVES: Type<any>[] = [
  ClrTreetable,
  ClrTreetableRow,
  ClrTreetableCell,
  ClrTreetableColumn,
  ClrTreetablePlaceholder,

  TreetableMainRenderer,
  TreetableHeaderRenderer,
  TreetableRowRenderer,
  TreetableCellRenderer,
];

@NgModule({
  imports: [CommonModule, ClarityModule],
  declarations: [CLR_TREETABLE_DIRECTIVES],
  exports: [CLR_TREETABLE_DIRECTIVES],
})
export class ClrTreetableModule {}
