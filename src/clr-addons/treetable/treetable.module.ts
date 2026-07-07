/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTrapFocusModule, ClarityModule } from '@clr/angular';
import { ClrTreetableRow } from './treetable-row';
import { ClrTreetable } from './treetable';
import { ClrTreetableCell } from './treetable-cell';
import { ClrTreetableColumn } from './treetable-column';
import { ClrTreetablePlaceholder } from './treetable-placeholder';
import { TreetableHeaderRenderer } from './renderer/header-renderer';
import { TreetableMainRenderer } from './renderer/main-renderer';
import { TreetableRowRenderer } from './renderer/row-renderer';
import { TreetableCellRenderer } from './renderer/cell-renderer';
import { ClrTreetableActionOverflow } from './treetable-action-overflow';
import { TreetableItemsDirective } from './treetable-items';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClrTreetableFilter } from './treetable-filter';
import {
  angleIcon,
  arrowIcon,
  ClarityIcons,
  ellipsisVerticalIcon,
  filterGridCircleIcon,
  filterGridIcon,
} from '@clr/angular/icon';
import { ClrTreetableStringFilter } from './built-in/filter/treetable-string-filter';
import { ClrTreetableRecursiveRows } from './treetable-recursive-rows';
import { ClrTreetableRowCheckbox } from './treetable-row-checkbox';
import { ClrTreetableFooter } from './treetable-footer';
import { ClrTreetableColumnManagerMenuComponent } from './treetable-column-manager-menu.component';
import { ClrTreetableHideableColumn } from './treetable-hideable-column.directive';

const CLR_TREETABLE_DIRECTIVES: Type<any>[] = [
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
];

@NgModule({
  imports: [CommonModule, ClarityModule, ReactiveFormsModule, FormsModule, CdkTrapFocusModule],
  declarations: [
    CLR_TREETABLE_DIRECTIVES,
    ClrTreetableRecursiveRows,
    ClrTreetableRowCheckbox,
    ClrTreetableColumnManagerMenuComponent,
  ],
  exports: [CLR_TREETABLE_DIRECTIVES],
})
export class ClrTreetableModule {
  constructor() {
    ClarityIcons.addIcons(angleIcon, arrowIcon, ellipsisVerticalIcon, filterGridCircleIcon, filterGridIcon);
  }
}
