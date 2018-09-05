/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { AfterContentInit, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { ClrDatagridRow } from '@clr/angular';

@Component({
  selector: 'clr-tt-row',
  templateUrl: './treetable-row.html',
  styleUrls: ['./treetable-row.scss'],
})
export class ClrTreetableRow implements AfterContentInit {
  expanded = false;
  hasExpandableRow = false;

  @Input() clrClickable = false;

  @ContentChildren(ClrTreetableRow) ttRows: QueryList<ClrTreetableRow>;

  ngAfterContentInit(): void {
    this.hasExpandableRow = this.ttRows.length > 1;
  }

  private toggleExpand() {
    this.expanded = !this.expanded;
  }

  onRowClick() {
    if (this.clrClickable) {
      this.toggleExpand();
    }
  }

  onCaretClick() {
    if (!this.clrClickable) {
      this.toggleExpand();
    }
  }
}
