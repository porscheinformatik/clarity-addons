/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ChangeDetectionStrategy, Component, computed, contentChildren, effect, inject, input } from '@angular/core';
import { ClrTreetableRow } from './treetable-row';
import { SelectionType } from './enums/selection-type';
import { SortStateService, TreetableDataStateService } from './providers';
import { outputFromObservable, toObservable } from '@angular/core/rxjs-interop';
import { ClrTreetableActionOverflow } from './treetable-action-overflow';
import { FilterStateService } from './providers/filter-state.service';
import {
  ClrTreetableRecursionService,
  TREETABLE_RECURSION_SERVICE_PROVIDER,
} from './providers/treetable-recursion.service';
import { ClrTreetableState } from './interfaces/treetable-state-model';
import { TreetableColumnStateService } from './providers/treetable-column-state.service';
import { ClrCommonStringsService } from '@clr/angular';

let treetableId = 0;

@Component({
  selector: 'clr-treetable',
  templateUrl: './treetable.html',
  host: { '[class.empty]': 'empty()', '[class.treetable-host]': 'true' },
  providers: [
    TREETABLE_RECURSION_SERVICE_PROVIDER,
    TreetableDataStateService,
    TreetableColumnStateService,
    SortStateService,
    FilterStateService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ClrTreetable<T extends object> {
  public readonly treetableId = `clr-treetable-${++treetableId}`;
  protected readonly selectAllId = `clr-tt-select-all${treetableId}`;

  private readonly _dataStateService = inject(TreetableDataStateService<T>);
  private readonly _columnStateService = inject(TreetableColumnStateService);
  private readonly _filterStateService = inject(FilterStateService<T>);
  private readonly _recursionService = inject(ClrTreetableRecursionService<T>);
  private readonly _commonStringsService = inject(ClrCommonStringsService);

  protected readonly commonStrings = this._commonStringsService.keys;

  clrClickableRows = input(true);
  clrHideHeader = input(false);
  clrTtLoading = input(false);
  clrTtSelected = input<T[]>(undefined);
  clrTtAutoParentSelection = input(true);

  clrTtSelectedChange = outputFromObservable<T[]>(toObservable(this._dataStateService.selectedNodes));
  clrTtRefresh = outputFromObservable<ClrTreetableState<T>>(this._dataStateService.changes$);

  private readonly _ttRows = contentChildren(ClrTreetableRow, { descendants: true });
  private readonly _actionOverflow = contentChildren(ClrTreetableActionOverflow, { descendants: true });

  protected readonly empty = computed(() => !this._ttRows() || this._ttRows().length === 0);
  protected readonly displayedNodes = this._dataStateService.displayedNodes;
  protected readonly isRecursionMode = this._recursionService.isRecursionMode;

  readonly selectionType = computed(() => (this.clrTtSelected() ? SelectionType.Multi : SelectionType.None));
  readonly showSelection = computed(() => this.selectionType() === SelectionType.Multi);
  readonly areAllRowsSelected = computed(() => this._dataStateService.areAllNodesSelected());
  readonly hasActionOverflow = computed(() => this._actionOverflow()?.length > 0);

  /**
   * All items of the data source as a flat, depth-first list. Active filters are ignored, the
   * active sort is applied.
   */
  readonly allItems = this._dataStateService.allItems;

  /**
   * All currently displayed items (filtered and sorted) as a flat, depth-first list.
   */
  readonly displayedItems = this._dataStateService.displayedItems;

  /**
   * All currently selected items as a flat, depth-first list.
   *
   * Selection is tracked on the displayed nodes, so a selected item that is hidden by an active
   * filter is not part of this list.
   */
  readonly selectedItems = this._dataStateService.selectedNodes;

  /**
   * True as long as at least one filter of the treetable is active.
   */
  readonly hasActiveFilters = this._filterStateService.hasActiveFilters;

  /**
   * State of all currently visible (not hidden) columns, in render order.
   */
  readonly visibleColumnStates = this._columnStateService.visibleColumns;

  constructor() {
    effect(() => {
      const selectedItems = this.clrTtSelected();
      if (selectedItems) {
        this._dataStateService.setExternallySelectedItems(selectedItems);
      }
    });

    effect(() => {
      this._dataStateService.setStickyIndeterminate(!this.clrTtAutoParentSelection());
    });
  }

  toggleSelectAll() {
    this._dataStateService.toggleSelectionForDisplayedNodes();
  }
}
