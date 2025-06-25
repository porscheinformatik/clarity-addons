/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, output } from '@angular/core';
import { ClrTreetableComparatorInterface } from './interfaces/comparator.interface';
import { Sort } from './providers';
import { ClrTreetableSortOrder } from './enums/sort-order.enum';

@Component({
  selector: 'clr-tt-column',
  template: `
    <button class="treetable-column-title" *ngIf="sortable" (click)="sort()" type="button">
      <ng-container *ngTemplateOutlet="columnTitle" />
      <cds-icon
        *ngIf="sortDirection"
        shape="arrow"
        [attr.direction]="sortDirection"
        aria-hidden="true"
        class="sort-icon"
      />
    </button>

    @if (!sortable) {
    <ng-container *ngTemplateOutlet="columnTitle" />
    }

    <ng-template #columnTitle>
      <ng-content />
    </ng-template>
  `,
  host: {
    '[class.treetable-column]': 'true',
    '[attr.aria-sort]': 'ariaSort',
    role: 'columnheader',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ClrTreetableColumn<T> {
  private readonly _sort = inject(Sort<T>);
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);

  private _sortBy: ClrTreetableComparatorInterface<T>;
  private _sortOrder: ClrTreetableSortOrder = ClrTreetableSortOrder.UNSORTED;
  private _sortDirection: 'up' | 'down' | null;

  @Input('clrTtSortBy')
  get sortBy() {
    return this._sortBy;
  }
  set sortBy(comparator: ClrTreetableComparatorInterface<T>) {
    this._sortBy = comparator;
  }

  @Input('clrTtSortOrder')
  get sortOrder(): ClrTreetableSortOrder {
    return this._sortOrder;
  }
  set sortOrder(value: ClrTreetableSortOrder) {
    if (typeof value === 'undefined') {
      return;
    }

    // nothing to do when incoming sort order is the same
    if (this._sortOrder === value) {
      return;
    }

    switch (value) {
      case ClrTreetableSortOrder.ASC:
        this.sort(false);
        break;
      case ClrTreetableSortOrder.DESC:
        this.sort(true);
        break;
      // UNSORTED when neither ASC or DESC
      case ClrTreetableSortOrder.UNSORTED:
      default:
        this._sort.clear();
        break;
    }
  }
  get sortDirection(): 'up' | 'down' | null {
    return this._sortDirection;
  }

  sortOrderChange = output<ClrTreetableSortOrder>({ alias: 'clrTtSortOrderChange' });

  constructor() {
    this.listenForSortingChanges();
  }

  get ariaSort() {
    switch (this._sortOrder) {
      case ClrTreetableSortOrder.ASC:
        return 'ascending';
      case ClrTreetableSortOrder.DESC:
        return 'descending';
      case ClrTreetableSortOrder.UNSORTED:
      default:
        return 'none';
    }
  }

  get sortable(): boolean {
    return !!this._sortBy;
  }

  sort(reverse?: boolean) {
    if (!this.sortable) {
      return;
    }

    this._sort.toggle(this._sortBy, reverse);

    // setting the private variable to not retrigger the setter logic
    this._sortOrder = this._sort.reverse ? ClrTreetableSortOrder.DESC : ClrTreetableSortOrder.ASC;
    // Sets the correct icon for current sort order
    this._sortDirection = this._sortOrder === ClrTreetableSortOrder.DESC ? 'down' : 'up';
    this.sortOrderChange.emit(this._sortOrder);
  }

  private listenForSortingChanges() {
    return this._sort.change.subscribe(sort => {
      // Need to manually mark the component to be checked
      // for both activating and deactivating sorting
      this._changeDetectorRef.markForCheck();
      // We're only listening to make sure we emit an event when the column goes from sorted to unsorted
      if (this.sortOrder !== ClrTreetableSortOrder.UNSORTED && sort.comparator !== this._sortBy) {
        this._sortOrder = ClrTreetableSortOrder.UNSORTED;
        this.sortOrderChange.emit(this._sortOrder);
        this._sortDirection = null;
      }
    });
  }
}
