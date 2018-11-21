/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { AfterContentInit, ContentChildren, Directive, OnDestroy, QueryList } from '@angular/core';
import { Subscription } from 'rxjs';

import { TreetableRenderStep } from './render-step.enum';
import { TreetableCellRenderer } from './cell-renderer';
import { TreetableRenderOrganizer } from './render-organizer';

@Directive({ selector: 'clr-tt-row' })
export class TreetableRowRenderer implements AfterContentInit, OnDestroy {
  constructor(private organizer: TreetableRenderOrganizer) {
    this.subscriptions.push(
      organizer.filterRenderSteps(TreetableRenderStep.ALIGN_COLUMNS).subscribe(() => this.setWidths())
    );
  }

  private subscriptions: Subscription[] = [];
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  @ContentChildren(TreetableCellRenderer) cells: QueryList<TreetableCellRenderer>;

  private setWidths() {
    if (this.organizer.widths.length !== this.cells.length) {
      return;
    }
    this.cells.forEach((cell, index) => {
      cell.setWidth(this.organizer.widths[index]);
    });
  }

  ngAfterContentInit() {
    this.cells.changes.subscribe(() => {
      this.setWidths();
    });
  }

  ngAfterViewInit() {
    this.setWidths();
  }
}
