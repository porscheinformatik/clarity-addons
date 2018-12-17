/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { AfterContentInit, Component, ContentChildren, Input, OnChanges, QueryList } from '@angular/core';
import { ClrTreetableColumn } from './treetable-column';
import { ClrTreetableRow } from './treetable-row';

@Component({
  selector: 'clr-treetable',
  templateUrl: './treetable.html',
  host: { '[class.empty]': 'empty', '[class.treetable-host]': 'true' },
})
export class ClrTreetable implements AfterContentInit, OnChanges {
  @Input() clrClickableRows = true;
  @Input('clrHideHeader') hideHeader = false;

  @ContentChildren(ClrTreetableRow, { descendants: true })
  ttRows: QueryList<ClrTreetableRow>;
  @ContentChildren(ClrTreetableColumn, { descendants: true })
  ttColumns: QueryList<ClrTreetableRow>;

  empty = true;

  ngAfterContentInit(): void {
    this.initClickableRows();
    this.initEmpty();
  }

  ngOnChanges(): void {
    this.initClickableRows();
  }

  private initClickableRows(): void {
    if (this.ttRows) {
      this.ttRows.forEach((ttRow, index) => {
        ttRow.clickable = this.clrClickableRows;
      });
    }
  }

  private initEmpty(): void {
    this.empty = this.ttRows.length === 0;
  }
}
