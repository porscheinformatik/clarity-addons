/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { AfterContentInit, Component, ContentChildren, Input, OnChanges, QueryList } from '@angular/core';
import { ClrTreetableRow } from './treetable-row';
import { ClrDatagridCell, ClrDatagridColumn } from '@clr/angular';

@Component({
  selector: 'clr-treetable',
  templateUrl: './treetable.html',
  styleUrls: ['./treetable.scss'],
  host: { '[class.empty]': 'empty' },
})
export class ClrTreetable implements AfterContentInit, OnChanges {
  @Input() clrClickableRows = true;
  empty = true;

  @ContentChildren(ClrTreetableRow, { descendants: true })
  ttRows: QueryList<ClrTreetableRow>;

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
        ttRow.clrClickable = this.clrClickableRows;
      });
    }
  }

  private initEmpty(): void {
    this.empty = this.ttRows.length === 0;
  }
}
