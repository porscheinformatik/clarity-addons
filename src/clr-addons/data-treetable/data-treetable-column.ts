/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { ClrDatagridComparatorInterface, ClrDatagridSortOrder, DatagridPropertyComparator } from '@clr/angular';
import { Sort } from './providers';

@Component({
  selector: 'clr-dt-column',
  template: `
    <button
      class="datagrid-column-title"
      *ngIf="sortable"
      (click)="sort()"
      type="button"
      style="
    margin: 0;
    padding: 0;
    border: none;
    border-radius: 0;
    box-shadow: none;
    background: none;
    color: var(--clr-table-font-color);
    text-align: left;
    flex: 1 1 auto;
    align-items: center;
    align-self: center;
    display: flex;
    cursor: pointer;
width: 100%"
    >
      <ng-container *ngTemplateOutlet="columnTitle"></ng-container>
      <cds-icon style="padding: 0;" shape="arrow" [attr.direction]="sortDirection" aria-hidden="true" class="sort-icon">
      </cds-icon>
    </button>

    @if (!sortable) {
    <ng-container *ngTemplateOutlet="columnTitle"></ng-container>
    }

    <ng-template #columnTitle>
      <ng-content></ng-content>
    </ng-template>
  `,
  host: {
    '[class.data-treetable-column]': 'true',
    role: 'columnheader',
  },
  standalone: false,
})
export class ClrDataTreeTableColumn<T> {
  private _field: string;
  private _sortBy: ClrDatagridComparatorInterface<T>;
  private _sortOrder: ClrDatagridSortOrder = ClrDatagridSortOrder.UNSORTED;

  @Output('clrDgSortOrderChange') sortOrderChange = new EventEmitter<ClrDatagridSortOrder>();

  private _sortDirection: 'up' | 'down' | null;

  get sortDirection(): 'up' | 'down' | null {
    return this._sortDirection;
  }

  private readonly _sort = inject(Sort<T>);

  @Input('clrDgField')
  get field() {
    return this._field;
  }
  set field(field: string) {
    if (typeof field === 'string') {
      this._field = field;

      if (!this._sortBy) {
        this._sortBy = new DatagridPropertyComparator(field);
      }
    }
  }

  @Input('clrDgSortBy')
  get sortBy() {
    return this._sortBy;
  }
  set sortBy(comparator: ClrDatagridComparatorInterface<T> | string) {
    if (typeof comparator === 'string') {
      this._sortBy = new DatagridPropertyComparator(comparator);
    } else if (comparator) {
      this._sortBy = comparator;
    } else if (this.field) {
      this._sortBy = new DatagridPropertyComparator(this.field);
    } else {
      delete this._sortBy;
    }
  }

  @Input('clrDgSortOrder')
  get sortOrder() {
    return this._sortOrder;
  }
  set sortOrder(value: ClrDatagridSortOrder) {
    if (typeof value === 'undefined') {
      return;
    }

    // only if the incoming order is different from the current one
    if (this._sortOrder === value) {
      return;
    }

    switch (value) {
      case ClrDatagridSortOrder.ASC:
        this.sort(false);
        break;
      case ClrDatagridSortOrder.DESC:
        this.sort(true);
        break;
      // the Unsorted case happens when the current state is neither Asc or Desc
      case ClrDatagridSortOrder.UNSORTED:
      default:
        this._sort.clear();
        break;
    }
  }

  /**
   * Indicates if the column is sortable
   */
  get sortable(): boolean {
    return !!this._sortBy;
  }

  sort(reverse?: boolean) {
    console.log('sort clicked');

    if (!this.sortable) {
      return;
    }

    this._sort.toggle(this._sortBy, reverse);

    // setting the private variable to not retrigger the setter logic
    this._sortOrder = this._sort.reverse ? ClrDatagridSortOrder.DESC : ClrDatagridSortOrder.ASC;
    // Sets the correct icon for current sort order
    this._sortDirection = this._sortOrder === ClrDatagridSortOrder.DESC ? 'down' : 'up';
    this.sortOrderChange.emit(this._sortOrder);
  }
}
