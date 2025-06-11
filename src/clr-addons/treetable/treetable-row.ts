/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  inject,
  input,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ClrTreetableActionOverflow } from './treetable-action-overflow';
import { angleIcon, ClarityIcons } from '@cds/core/icon';
import { Selection } from './providers';
import { SelectionType } from './enums/selection-type';

ClarityIcons.addIcons(angleIcon);

@Component({
  selector: 'clr-tt-row',
  templateUrl: './treetable-row.html',
  host: { '[class.treetable-row-wrapper]': 'true', '[class.treetable-selected]': 'selected' },
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClrTreetableRow<T> implements OnInit {
  readonly selection = inject(Selection);
  private readonly _cdr = inject(ChangeDetectorRef);

  private _selected = false;

  @Input('clrExpanded') expanded = false;
  @Input('clrClickable') clickable = true;
  @Input('clrExpandable') expandable = false;
  clrTtItem = input<T>();
  @Input('clrTtSelected')
  get selected() {
    if (this.selection.selectionType === SelectionType.None) {
      return this._selected;
    } else {
      return this.selection.isSelected(this.clrTtItem());
    }
  }
  set selected(value: boolean | string) {
    this.selection.setSelected(this.clrTtItem(), value as boolean);
  }

  @Output() hasActionOverflow = new EventEmitter<boolean>();
  @Output('clrExpandedChange') expandedChange = new EventEmitter<boolean>();
  @Output('clrTtSelectedChange') selectedChanged = new EventEmitter<boolean>(false);

  showActionOverflow = false;
  showEmptyActionOverflow = false;
  showClickClass = false;

  @ContentChild(ClrTreetableActionOverflow)
  set actionOverflow(actionOverflow: ClrTreetableActionOverflow) {
    this.showActionOverflow = !!actionOverflow;
    this.showEmptyActionOverflow = !this.showActionOverflow;
    this.hasActionOverflow.emit(this.showActionOverflow);
  }

  ngOnInit(): void {
    this.showClickClass = this.expandable && this.clickable;

    //TODO: i don't like that but how else can we trigger change detection
    // when the checkbox in overall treetable is clicked?
    // this is only necessary when changeDetection: ChangeDetectionStrategy.OnPush
    this.selection.allSelectedChange.subscribe(() => {
      this._cdr.markForCheck();
    });
  }

  toggle(selected = !this.selected) {
    if (selected !== this.selected) {
      this.selected = selected;
      this.selectedChanged.emit(selected);
    }
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

  protected readonly SelectionType = SelectionType;
}
