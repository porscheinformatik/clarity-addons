/*
 * Copyright (c) 2018-2024 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, ContentChild, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ClrTreetableActionOverflow } from './treetable-action-overflow';
import { angleIcon, ClarityIcons } from '@cds/core/icon';

ClarityIcons.addIcons(angleIcon);

@Component({
  selector: 'clr-tt-row',
  templateUrl: './treetable-row.html',
  host: { '[class.treetable-row-wrapper]': 'true' },
  animations: [
    trigger('collapseExpandAnimation', [
      state('false', style({ display: 'none' })),
      state('true', style({ display: 'block' })),
      transition('false => true', [
        style({ opacity: 0, height: 0, overflow: 'hidden', display: 'block' }),
        animate('300ms', style({ opacity: 1, height: '*' })),
      ]),
      transition('true => false', [
        style({ opacity: 1, height: '*', overflow: 'hidden' }),
        animate('300ms', style({ opacity: 0, height: 0 })),
      ]),
    ]),
  ],
})
export class ClrTreetableRow implements OnInit {
  @Input('clrExpanded') expanded = false;
  @Input('clrClickable') clickable = true;
  @Input('clrExpandable') expandable = false;

  @Output() hasActionOverflow = new EventEmitter<boolean>();
  @Output('clrExpandedChange') expandedChange = new EventEmitter<boolean>();

  showActionOverflow = false;
  showEmptyActionOverflow = false;
  showClickClass = false;

  @ContentChild(ClrTreetableActionOverflow)
  set actionOverflow(actionOverflow: ClrTreetableActionOverflow) {
    this.showActionOverflow = !!actionOverflow;
    this.showEmptyActionOverflow = !this.showActionOverflow;
    this.hasActionOverflow.emit(this.showActionOverflow);
  }

  constructor() {}

  ngOnInit(): void {
    this.showClickClass = this.expandable && this.clickable;
  }

  private toggleExpand(): void {
    if (this.expandable) {
      this.expanded = !this.expanded;
      this.expandedChange.emit(this.expanded);
    }
  }

  onRowClick(event: MouseEvent): void {
    if (this.clickable && !(event.target as HTMLElement).closest('.treetable-action-trigger')) {
      this.toggleExpand();
    }
  }

  onCaretClick(): void {
    if (!this.clickable) {
      this.toggleExpand();
    }
  }
}
