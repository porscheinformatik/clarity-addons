/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  OnDestroy,
  OnInit,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { outputFromObservable, takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { ClrPopoverService } from '@clr/angular';
import { combineLatest, map } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ClrTreetableSortOrder } from './enums/sort-order.enum';
import { SortStateService } from './providers';
import { TreetableColumnStateService, TreetableColumnUpdate } from './providers/treetable-column-state.service';
import { ClrTreetableComparatorInterface } from './interfaces/comparator.interface';

let columnId = 0;

@Component({
  selector: 'clr-tt-column',
  providers: [ClrPopoverService],
  template: `
    @if (isSortable()) {
    <button type="button" class="treetable-column-title" data-testId="clrTtSortButton" (click)="sort()">
      <ng-container *ngTemplateOutlet="columnTitle" />
      @if (sortDirection()) {
      <cds-icon
        shape="arrow"
        aria-hidden="true"
        class="sort-icon"
        data-testId="clrTtSortIndicator"
        [direction]="sortDirection()"
      />
      }
    </button>
    } @else {
    <div class="treetable-column-title">
      <ng-container *ngTemplateOutlet="columnTitle" />
    </div>
    }

    <ng-content select="clr-tt-filter, clr-tt-string-filter" />

    <clr-tt-column-separator [columnId]="columnId" />

    <ng-template #columnTitle>
      <ng-content />
    </ng-template>
  `,
  host: {
    '[class.treetable-column]': 'true',
    '[attr.aria-sort]': 'ariaSort()',
    role: 'columnheader',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ClrTreetableColumn<T extends object> implements OnInit, OnDestroy {
  public readonly columnId = `clr-tt-col-${columnId++}`;

  private readonly _columnTitleRef = viewChild('columnTitle', { read: TemplateRef });
  private readonly _columnState = inject(TreetableColumnStateService);
  private readonly _sort = inject(SortStateService<T>);

  clrTtSortBy = input<ClrTreetableComparatorInterface<T> | null>(null);

  private readonly _internalSortOrder = computed(() => {
    const sortState = this._sort.sortState();
    const sortBy = this.clrTtSortBy();

    if (sortBy == null || sortState.comparator !== sortBy) {
      return ClrTreetableSortOrder.UNSORTED;
    }

    return sortState.reverse ? ClrTreetableSortOrder.DESC : ClrTreetableSortOrder.ASC;
  });

  clrTtSortOrder = input(ClrTreetableSortOrder.UNSORTED);
  clrTtSortOrderChange = outputFromObservable<ClrTreetableSortOrder>(toObservable(this._internalSortOrder));

  clrTtColumnSize = input<number | null>(null);
  clrTtColumnResize = outputFromObservable<number>(
    this._columnState.getColumnChangesById(this.columnId).pipe(
      filter(data => data.type === TreetableColumnUpdate.WIDTH),
      map(data => data.width)
    )
  );

  protected readonly isSortable = computed(() => !!this.clrTtSortBy());
  protected readonly sortDirection = computed(() => {
    const order = this._internalSortOrder();
    if (order === ClrTreetableSortOrder.UNSORTED) {
      return null;
    }
    return order === ClrTreetableSortOrder.DESC ? 'down' : 'up';
  });

  protected readonly ariaSort = computed(() => {
    switch (this._internalSortOrder()) {
      case ClrTreetableSortOrder.ASC:
        return 'ascending';
      case ClrTreetableSortOrder.DESC:
        return 'descending';
      case ClrTreetableSortOrder.UNSORTED:
      default:
        return 'none';
    }
  });

  ngOnInit() {
    this._columnState.register({ id: this.columnId, titleTemplateRef: this._columnTitleRef() });
  }

  ngOnDestroy() {
    this._columnState.unregister(this.columnId);
  }

  constructor() {
    // Handle incoming sort order changes
    const sortOrder$ = toObservable(this.clrTtSortOrder);
    const sortBy$ = toObservable(this.clrTtSortBy);
    const handleExternalSortOrderChange$ = combineLatest([sortOrder$, sortBy$]);

    // CombineLatest does not contain sortState, because only external sort changes should trigger this stream.
    // Only react to external sort order changes, if no current sortState exists, or this column is responsible for it.
    handleExternalSortOrderChange$
      .pipe(
        map(([sortOrder, comparator]) => ({
          sortOrder,
          comparator,
          sortState: this._sort.sortState(),
        })),
        filter(
          ({ comparator, sortState }) =>
            !!comparator && (sortState.comparator == null || sortState.comparator === comparator)
        ),
        map(({ sortOrder, comparator, sortState }) => ({
          sortOrder: sortOrder,
          isCurrentActiveComparator: sortState.comparator === comparator,
          reverse: sortState.reverse,
        })),
        takeUntilDestroyed()
      )
      .subscribe(({ sortOrder, isCurrentActiveComparator, reverse }) => {
        switch (sortOrder) {
          case ClrTreetableSortOrder.ASC:
            if (!isCurrentActiveComparator || (isCurrentActiveComparator && reverse)) {
              this.sort(false);
            }
            break;
          case ClrTreetableSortOrder.DESC:
            if (!isCurrentActiveComparator || (isCurrentActiveComparator && !reverse)) {
              this.sort(true);
            }
            break;
          case ClrTreetableSortOrder.UNSORTED:
            if (isCurrentActiveComparator) {
              this._sort.clear();
            }
            break;
        }
      });

    effect(() => {
      const size = this.clrTtColumnSize();
      if (size) {
        this._columnState.changeWidth(this.columnId, size);
      }
    });
  }

  protected sort(reverse?: boolean) {
    const comparator = this.clrTtSortBy();
    if (!comparator) {
      return;
    }
    this._sort.toggle(comparator, reverse);
  }
}
