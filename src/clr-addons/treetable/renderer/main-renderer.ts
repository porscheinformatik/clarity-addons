/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { AfterViewInit, ContentChildren, Directive, QueryList } from '@angular/core';

import { ClrTreetableColumn } from '../treetable-column';
import { TreetableHeaderRenderer } from './header-renderer';
import { TreetableRowRenderer } from './row-renderer';

@Directive({
  selector: 'clr-treetable',
})
export class TreetableMainRenderer<T = any> implements AfterViewInit {
  @ContentChildren(TreetableHeaderRenderer) headers: QueryList<TreetableHeaderRenderer>;
  @ContentChildren(TreetableRowRenderer, { descendants: true })
  rows: QueryList<TreetableRowRenderer>;
  @ContentChildren(ClrTreetableColumn) columns: QueryList<ClrTreetableColumn>;

  constructor() {}

  ngAfterViewInit(): void {
    this.applyColumnClasses();
  }

  /**
   * Applies css column class to every header and cell.
   */
  private applyColumnClasses() {
    this.headers.forEach((header, headerIndex) => {
      const columnClasses = header.getColumnClasses();
      if (columnClasses.length === 0) {
        header.setDefaultColumnClass();
        this.rows.forEach(row => {
          // set every child cell of the same index to default class
          row.cells.find((cell, cellIndex) => cellIndex === headerIndex).setColumnClasses(['clr-col']);
        });
      } else {
        // set every child cell of the same index to the same class
        // we do not allow overriding column width on a per cell basis different to the header.
        this.rows.forEach(row => {
          row.cells.find((cell, cellIndex) => cellIndex === headerIndex).setColumnClasses(columnClasses);
        });
      }
    });
  }
}
