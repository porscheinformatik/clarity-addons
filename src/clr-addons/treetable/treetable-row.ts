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
  DestroyRef,
  EventEmitter,
  inject,
  input,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { ClrTreetableActionOverflow } from './treetable-action-overflow';
import { angleIcon, ClarityIcons } from '@cds/core/icon';
import { Selection } from './providers';
import { SelectionType } from './enums/selection-type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

ClarityIcons.addIcons(angleIcon);

@Component({
  selector: 'clr-tt-row',
  templateUrl: './treetable-row.html',
  styleUrl: './treetable-row.scss',
  host: { '[class.treetable-row-wrapper]': 'true', '[class.treetable-selected]': 'selected' },
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClrTreetableRow<T> implements OnInit {
  readonly selection = inject(Selection);
  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly _destroyRef = inject(DestroyRef);

  private _selected = false;
  shouldAnimate = signal<boolean>(false);

  @Input('clrExpanded') expanded = false;
  @Input('clrClickable') clickable = true;
  @Input('clrExpandable') expandable = false;
  clrTtItem = input<T>();

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

    //I don't like that but how else can we trigger change detection
    // when the checkbox in overall treetable is clicked?
    // this is only necessary when changeDetection: ChangeDetectionStrategy.OnPush
    this.selection.allSelectedChange.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
      this._cdr.markForCheck();
    });
  }

  onExpandCollapseClick() {
    // Only animate on user click (not on sorting or initial rendering)
    this.shouldAnimate.set(true);
    this.toggleExpand();

    // Remove .animate after animation to prevent unwanted transitions
    setTimeout(() => {
      this.shouldAnimate.set(false);
    }, 350);
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
      this.onExpandCollapseClick();
    }
  }

  onCaretClick(): void {
    if (!this.clickable) {
      this.onExpandCollapseClick();
    }
  }

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

  protected readonly SelectionType = SelectionType;
}
