/*
 * Copyright (c) 2018-2021 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ContentChildren, Input, OnDestroy, QueryList } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClrTreetableColumn } from './treetable-column';
import { ClrTreetableRow } from './treetable-row';

@Component({
  selector: 'clr-treetable',
  templateUrl: './treetable.html',
  host: { '[class.empty]': 'empty', '[class.treetable-host]': 'true' },
})
export class ClrTreetable implements OnDestroy {
  @Input() clrClickableRows = true;
  @Input('clrHideHeader') hideHeader = false;

  @ContentChildren(ClrTreetableColumn, { descendants: true })
  ttColumns: QueryList<ClrTreetableRow>;

  empty = true;
  hasActionOverflow = false;

  private _ttRows: QueryList<ClrTreetableRow>;
  private destroyed$ = new Subject();

  @ContentChildren(ClrTreetableRow, { descendants: true })
  set ttRows(items: QueryList<ClrTreetableRow>) {
    this._ttRows = items;
    this.initClickableRows();
    this.initEmpty();
    this.initActionOverflow();
  }

  private initClickableRows(): void {
    if (this._ttRows) {
      this._ttRows.forEach(ttRow => {
        ttRow.clickable = this.clrClickableRows;
      });
    }
  }

  private initEmpty(): void {
    this.empty = this._ttRows.length === 0;
  }

  private initActionOverflow() {
    this._ttRows.forEach(row =>
      row.hasActionOverflow.pipe(takeUntil(this.destroyed$)).subscribe((hasActionOverflow: boolean) => {
        this.hasActionOverflow = this.hasActionOverflow || hasActionOverflow;
        if (this.hasActionOverflow) {
          this._ttRows.forEach(ttRow => (ttRow.showActionOverflow = true));
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
