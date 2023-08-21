/*
 * Copyright (c) 2018-2023 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';
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
export class ClrTreetableRow {
  @Input('clrExpanded') expanded = false;
  @Input('clrClickable') clickable = true;

  @Input('clrExpandable')
  set clrExpandable(expandable: boolean) {
    setTimeout(() => {
      this.expandable = expandable;
      this.changeDetectorRef.markForCheck();
    });
  }

  @Output() hasActionOverflow = new EventEmitter<boolean>();
  @Output('clrExpandedChange') expandedChange = new EventEmitter<boolean>();

  showActionOverflow = false;
  showEmptyActionOverflow = false;
  expandable = false;

  @ContentChild(ClrTreetableActionOverflow)
  set actionOverflow(actionOverflow: ClrTreetableActionOverflow) {
    this.showActionOverflow = !!actionOverflow;
    this.showEmptyActionOverflow = !this.showActionOverflow;
    this.hasActionOverflow.emit(this.showActionOverflow);
  }

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

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

  isExpandable(): boolean {
    return this.expandable;
  }
}
