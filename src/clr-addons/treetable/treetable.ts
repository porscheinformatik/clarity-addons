/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  OnChanges,
  QueryList,
  AfterContentChecked,
} from '@angular/core';
import { ClrTreetableRow } from './treetable-row';
import { ClrTreetableColumn } from './treetable-column';
import { TreetableRenderOrganizer } from './renderer/render-organizer';
import { TableSizeService } from './renderer/table-size.service';

@Component({
  selector: 'clr-treetable',
  templateUrl: './treetable.html',
  host: { '[class.empty]': 'empty', '[class.treetable-host]': 'true' },
  providers: [TreetableRenderOrganizer, TableSizeService],
})
export class ClrTreetable implements AfterContentInit, AfterContentChecked, OnChanges {
  @Input() clrClickableRows = true;
  empty = true;

  @ContentChildren(ClrTreetableRow, { descendants: true })
  ttRows: QueryList<ClrTreetableRow>;

  @ContentChildren(ClrTreetableColumn, { descendants: true })
  ttColumns: QueryList<ClrTreetableRow>;

  constructor(private renderOrganizer: TreetableRenderOrganizer) {}

  ngAfterContentInit(): void {
    this.initClickableRows();
    this.initEmpty();
  }

  ngAfterContentChecked(): void {
    this.renderOrganizer.resize();
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
