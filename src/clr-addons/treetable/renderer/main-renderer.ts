/*
 * Copyright (c) 2018-2020 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { AfterViewChecked, ContentChildren, Directive, HostListener, QueryList, AfterContentInit } from '@angular/core';

import { ClrTreetableColumn } from '../treetable-column';
import { TreetableHeaderRenderer } from './header-renderer';
import { TreetableRowRenderer } from './row-renderer';

@Directive({
  selector: 'clr-treetable',
})
export class TreetableMainRenderer implements AfterViewChecked, AfterContentInit {
  @ContentChildren(TreetableHeaderRenderer) headers: QueryList<TreetableHeaderRenderer>;
  @ContentChildren(TreetableRowRenderer, { descendants: true })
  rows: QueryList<TreetableRowRenderer>;
  @ContentChildren(ClrTreetableColumn) columns: QueryList<ClrTreetableColumn>;
  private shouldStabilizeColumn = true;

  @HostListener('window:resize')
  onResize(): void {
    this.applyMaxWidth();
  }

  ngAfterContentInit(): void {
    this.headers.changes.subscribe(() => {
      this.shouldStabilizeColumn = true;
    });
    this.rows.changes.subscribe(() => {
      this.shouldStabilizeColumn = true;
    });
  }

  ngAfterViewChecked(): void {
    if (this.shouldStabilizeColumn) {
      this.applyColumnClasses();
      setTimeout(() => {
        this.applyMaxWidth();
      }, 10);
    }
  }

  /**
   * Applies css column class to every header and cell.
   */
  private applyColumnClasses(): void {
    this.shouldStabilizeColumn = false;

    this.headers.forEach((header, headerIndex) => {
      const columnClasses = header.getColumnClasses();
      if (columnClasses.length === 0) {
        header.setDefaultColumnClass();
        this.rows.forEach(row => {
          // set every child cell of the same index to default class
          const cell = row.cells.find((_c, cellIndex) => cellIndex === headerIndex);
          if (cell) {
            cell.setColumnClasses(['clr-col']);
          }
        });
      } else {
        // set every child cell of the same index to the same class
        // we do not allow overriding column width on a per cell basis different to the header.
        this.rows.forEach(row => {
          const cell = row.cells.find((_c, cellIndex) => cellIndex === headerIndex);
          if (cell) {
            cell.setColumnClasses(columnClasses);
          }
        });
      }
    });
  }

  private applyMaxWidth(): void {
    if (this.headers.first) {
      const maxWidth = this.headers.first.getWidth();
      if (maxWidth === 0) {
        // If the max width is zero, call this in a timeout to be able to retrieve the client rendered value
        setTimeout(() => {
          this.applyMaxWidthOnEachRow(this.headers.first.getWidth());
        }, 100);
      } else {
        this.applyMaxWidthOnEachRow(maxWidth);
      }
    }
  }

  private applyMaxWidthOnEachRow(maxWidth: number): void {
    this.rows.forEach(row => {
      row.cells.first.setMaxWidth(maxWidth);
    });
  }
}
