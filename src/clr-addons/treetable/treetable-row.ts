/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { ClrTreetableActionOverflow } from './treetable-action-overflow';
import { ClrTreetableSelectedState, SelectionType } from './enums/selection-type';
import { ClrTreetable } from './treetable';
import { ClrTreetableTreeNode } from './interfaces/treetable-model';
import {
  TREETABLE_RECURSION_SERVICE_PROVIDER,
  ClrTreetableRecursionService,
} from './providers/treetable-recursion.service';

@Component({
  selector: 'clr-tt-row',
  templateUrl: './treetable-row.html',
  styleUrl: './treetable-row.scss',
  providers: [TREETABLE_RECURSION_SERVICE_PROVIDER],
  host: { '[class.treetable-row-wrapper]': 'true', '[class.treetable-selected]': 'isSelected()' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ClrTreetableRow<T extends object> {
  private readonly _recursionService = inject(ClrTreetableRecursionService);
  private readonly _treetable = inject(ClrTreetable);

  clrExpanded = model(false);
  clrExpandable = input(false);
  clrClickable = input(true);
  clrTtItem = input<ClrTreetableTreeNode<T>>(undefined);

  private readonly _actionOverflow = contentChild(ClrTreetableActionOverflow);
  protected readonly shouldAnimate = signal<boolean>(false);
  protected readonly isRecursionMode = this._recursionService.isRecursionMode;

  private readonly _isClickable = computed(() => this._treetable.clrClickableRows() && this.clrClickable());
  protected readonly isSelected = computed(() => this.clrTtItem()?.selected() === ClrTreetableSelectedState.SELECTED);

  protected readonly showActionOverflow = computed(
    () => this._treetable.hasActionOverflow() || !!this._actionOverflow()
  );
  protected readonly showEmptyActionOverflow = computed(() => !this._actionOverflow());
  protected readonly showClickClass = computed(() => this._treetable.clrClickableRows() && this.clrExpandable());
  protected readonly showSelection = computed(() => this._treetable.selectionType() === SelectionType.Multi);

  private onExpandCollapseClick() {
    // Only animate on user click (not on sorting or initial rendering)
    this.shouldAnimate.set(true);
    this.toggleExpand();

    // Remove .animate after animation to prevent unwanted transitions
    setTimeout(() => {
      this.shouldAnimate.set(false);
    }, 350);
  }

  protected toggleSelection(selectionState: ClrTreetableSelectedState) {
    this.clrTtItem()?.setSelected(selectionState);
  }

  private toggleExpand(): void {
    if (this.clrExpandable()) {
      this.clrExpanded.update(state => !state);
    }
  }

  protected onRowClick(event: MouseEvent): void {
    if (this._isClickable() && !(event.target as HTMLElement).closest('.treetable-action-trigger')) {
      this.onExpandCollapseClick();
    }
  }

  protected onCaretClick(): void {
    if (!this._isClickable()) {
      this.onExpandCollapseClick();
    }
  }
}
