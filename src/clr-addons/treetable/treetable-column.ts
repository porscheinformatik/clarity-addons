/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ChangeDetectionStrategy, Component, computed, effect, inject, input, output } from '@angular/core';
import { ClrTreetableComparatorInterface } from './interfaces/comparator.interface';
import { Sort } from './providers';
import { ClrTreetableSortOrder } from './enums/sort-order.enum';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { combineLatest, map } from 'rxjs';
import { filter } from 'rxjs/operators';
import {
  ClrPopoverEventsService,
  ClrPopoverHostDirective,
  ClrPopoverPositionService,
  ClrPopoverToggleService,
} from '@clr/angular';

@Component({
  selector: 'clr-tt-column',
  providers: [ClrPopoverToggleService, ClrPopoverEventsService, ClrPopoverPositionService],
  template: `
    @if (isSortable()) {
    <button class="treetable-column-title" (click)="sort()" type="button">
      <ng-container *ngTemplateOutlet="columnTitle" />
      <cds-icon
        *ngIf="sortDirection()"
        shape="arrow"
        [attr.direction]="sortDirection()"
        aria-hidden="true"
        class="sort-icon"
      />
    </button>
    } @else {
    <ng-container *ngTemplateOutlet="columnTitle" />
    }

    <ng-content select="clr-tt-filter, clr-tt-string-filter" />

    <ng-template #columnTitle>
      <ng-content />
    </ng-template>
  `,
  hostDirectives: [ClrPopoverHostDirective],
  host: {
    '[class.treetable-column]': 'true',
    '[attr.aria-sort]': 'ariaSort()',
    role: 'columnheader',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ClrTreetableColumn<T extends object> {
  private readonly _sort = inject(Sort<T>);

  readonly clrTtSortBy = input<ClrTreetableComparatorInterface<T> | null>(null);
  readonly clrTtSortOrder = input(ClrTreetableSortOrder.UNSORTED);
  readonly clrTtSortOrderChange = output<ClrTreetableSortOrder>();

  private readonly _currentSortOrder = computed(() => {
    const sortState = this._sort.sortState();
    const sortBy = this.clrTtSortBy();

    if (sortBy == null || sortState.comparator !== sortBy) {
      return ClrTreetableSortOrder.UNSORTED;
    }

    return sortState.reverse ? ClrTreetableSortOrder.DESC : ClrTreetableSortOrder.ASC;
  });

  protected readonly isSortable = computed(() => !!this.clrTtSortBy());
  protected readonly sortDirection = computed(() => {
    const order = this._currentSortOrder();
    if (order === ClrTreetableSortOrder.UNSORTED) {
      return null;
    }
    return order === ClrTreetableSortOrder.DESC ? 'down' : 'up';
  });

  protected readonly ariaSort = computed(() => {
    switch (this._currentSortOrder()) {
      case ClrTreetableSortOrder.ASC:
        return 'ascending';
      case ClrTreetableSortOrder.DESC:
        return 'descending';
      case ClrTreetableSortOrder.UNSORTED:
      default:
        return 'none';
    }
  });

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

    // Emit sort order changes when the sort state changes
    effect(() => {
      const currentOrder = this._currentSortOrder();
      this.clrTtSortOrderChange.emit(currentOrder);
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
