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
export class ClrTreetable {
  @Input() clrClickableRows = true;
  @Input('clrHideHeader') hideHeader = false;

  @ContentChildren(ClrTreetableColumn, { descendants: true })
  ttColumns: QueryList<ClrTreetableRow>;

  empty = true;

  private _ttRows: QueryList<ClrTreetableRow>;

  @ContentChildren(ClrTreetableRow, { descendants: true })
  set ttRows(items) {
    this._ttRows = items;
    this.initClickableRows();
    this.initEmpty();
  }

  private initClickableRows(): void {
    if (this._ttRows) {
      this._ttRows.forEach((ttRow, index) => {
        ttRow.clickable = this.clrClickableRows;
      });
    }
  }

  private initEmpty(): void {
    this.empty = this._ttRows.length === 0;
  }
}
