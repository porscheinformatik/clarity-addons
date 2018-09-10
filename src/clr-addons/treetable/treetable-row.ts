/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { AfterContentInit, Component, ContentChildren, Input, QueryList } from '@angular/core';

@Component({
  selector: 'clr-tt-row',
  templateUrl: './treetable-row.html',
  styleUrls: ['./treetable-row.scss'],
})
export class ClrTreetableRow implements AfterContentInit {
  @Input() clrExpanded = false;
  @Input() clrClickable = true;

  isExpandable = false;

  @ContentChildren(ClrTreetableRow) ttRows: QueryList<ClrTreetableRow>;

  ngAfterContentInit(): void {
    this.initIsExpandable();
    this.ttRows.changes.subscribe(() => this.initIsExpandable());
  }

  private initIsExpandable(): void {
    this.isExpandable = this.ttRows.length > 1;
  }

  private toggleExpand() {
    this.clrExpanded = !this.clrExpanded;
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
