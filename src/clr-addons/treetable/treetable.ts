/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ChangeDetectionStrategy, Component, computed, contentChildren, effect, inject, input } from '@angular/core';
import { ClrTreetableRow } from './treetable-row';
import { SelectionType } from './enums/selection-type';
import { TreetableDataStateService, Selection, Sort } from './providers';
import { outputFromObservable, toObservable } from '@angular/core/rxjs-interop';
import { ClrTreetableActionOverflow } from './treetable-action-overflow';
import { Filters } from './providers/filters';
import {
  TREETABLE_RECURSION_SERVICE_PROVIDER,
  ClrTreetableRecursionService,
} from './providers/treetable-recursion.service';

@Component({
  selector: 'clr-treetable',
  templateUrl: './treetable.html',
  host: { '[class.empty]': 'empty()', '[class.treetable-host]': 'true' },
  providers: [TREETABLE_RECURSION_SERVICE_PROVIDER, Selection, TreetableDataStateService, Sort, Filters],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ClrTreetable<T extends object> {
  private readonly _dataStateService = inject(TreetableDataStateService<T>);
  private readonly _recursionService = inject(ClrTreetableRecursionService<T>);

  readonly clrClickableRows = input(true);
  readonly clrHideHeader = input(false);
  readonly clrTtLoading = input(false);
  readonly clrTtSelected = input<T[]>(undefined);
  readonly clrTtNoAutoParentSelection = input(false);

  readonly clrTtSelectedChange = outputFromObservable<T[]>(toObservable(this._dataStateService.selectedNodes));
  readonly clrTtRefresh = outputFromObservable(this._dataStateService.changes$);

  private readonly _ttRows = contentChildren(ClrTreetableRow, { descendants: true });
  private readonly _actionOverflow = contentChildren(ClrTreetableActionOverflow, { descendants: true });

  protected readonly empty = computed(() => !this._ttRows() || this._ttRows().length === 0);
  protected readonly displayedNodes = this._dataStateService.displayedNodes;
  protected readonly isRecursionMode = this._recursionService.isRecursionMode;

  readonly selectionType = computed(() => (this.clrTtSelected() ? SelectionType.Multi : SelectionType.None));
  readonly showSelection = computed(() => this.selectionType() === SelectionType.Multi);
  readonly areAllRowsSelected = computed(() => this._dataStateService.areAllNodesSelected());
  readonly hasActionOverflow = computed(() => this._actionOverflow()?.length > 0);

  constructor() {
    effect(() => {
      this._dataStateService.setStickyIndeterminate(this.clrTtNoAutoParentSelection());
    });
  }

  toggleSelectAll() {
    this._dataStateService.toggleSelectForAllDisplayedNodes();
  }
}
