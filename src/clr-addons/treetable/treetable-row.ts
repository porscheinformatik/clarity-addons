/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'clr-tt-row',
  templateUrl: './treetable-row.html',
  host: { '[class.treetable-row-wrapper]': 'true' },
  animations: [
    trigger('collapseExpandAnimation', [
      state('false', style({ display: 'none' })),
      state('true', style({ display: 'block' })),
      transition('false => true', [
        style({ opacity: 0, height: 0, overflow: 'hidden' }),
        animate('300ms', style({ opacity: 1, height: '*' })),
      ]),
      transition('true => false', [
        style({ opacity: 1, height: '*', overflow: 'hidden' }),
        animate('300ms', style({ opacity: 0, height: 0 })),
      ]),
    ]),
  ],
})
export class ClrTreetableRow {
  @Input('clrExpanded') expanded = false;
  @Input('clrClickable') clickable = true;

  @Input('clrExpandable') expandable = false;

  private toggleExpand() {
    if (this.expandable) {
      this.expanded = !this.expanded;
    }
  }

  onRowClick() {
    if (this.clickable) {
      this.toggleExpand();
    }
  }

  onCaretClick() {
    if (!this.clickable) {
      this.toggleExpand();
    }
  }

  isExpandable(): boolean {
    return this.expandable;
  }
}
