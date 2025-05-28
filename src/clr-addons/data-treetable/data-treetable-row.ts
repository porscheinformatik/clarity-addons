/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, ContentChild, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ClrDataTreeTableActionOverflow } from './data-treetable-action-overflow';
import { angleIcon, ClarityIcons } from '@cds/core/icon';
import { Selection } from './providers';
import { SelectionType } from './enums/selection-type';

ClarityIcons.addIcons(angleIcon);

@Component({
  selector: 'clr-dt-row',
  templateUrl: './data-treetable-row.html',
  host: { '[class.data-treetable-row-wrapper]': 'true' },
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
  standalone: false,
})
export class ClrDataTreeTableRow implements OnInit {
  @Input('clrExpanded') expanded = false;
  @Input('clrClickable') clickable = true;
  @Input('clrExpandable') expandable = false;

  @Output() hasActionOverflow = new EventEmitter<boolean>();
  @Output('clrExpandedChange') expandedChange = new EventEmitter<boolean>();

  @Output('clrDtSelectedChange') selectedChanged = new EventEmitter<boolean>(false);

  showActionOverflow = false;
  showEmptyActionOverflow = false;
  showClickClass = false;

  @ContentChild(ClrDataTreeTableActionOverflow)
  set actionOverflow(actionOverflow: ClrDataTreeTableActionOverflow) {
    this.showActionOverflow = !!actionOverflow;
    this.showEmptyActionOverflow = !this.showActionOverflow;
    this.hasActionOverflow.emit(this.showActionOverflow);
  }

  private _item: any;
  @Input('clrDtItem')
  get item() {
    return this._item;
  }
  set item(item) {
    this._item = item;
    console.log(this._item);
  }

  private readonly selection = inject(Selection);

  private _selected = false;

  @Input('clrDtSelected')
  get selected() {
    if (this.selection.selectionType === SelectionType.None) {
      return this._selected;
    } else {
      return this.selection.isSelected(this.item);
    }
  }
  set selected(value: boolean | string) {
    console.log('set selected', value);
    this.selection.setSelected(this.item, value as boolean);
  }

  toggle(selected = !this.selected) {
    if (selected !== this.selected) {
      this.selected = selected;
      this.selectedChanged.emit(selected);
    }
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
    if (this.clickable && !(event.target as HTMLElement).closest('.data-treetable-action-trigger')) {
      this.toggleExpand();
    }
  }

  onCaretClick(): void {
    if (!this.clickable) {
      this.toggleExpand();
    }
  }
}
