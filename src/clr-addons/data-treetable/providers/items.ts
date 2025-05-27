/*
 * Copyright (c) 2016-2025 Broadcom. All Rights Reserved.
 * The term "Broadcom" refers to Broadcom Inc. and/or its subsidiaries.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { Sort } from './sort';

export type ClrDatagridItemsTrackByFunction<T> = (item: T) => any;

@Injectable()
export class Items<T = any> {
  /**
   * Indicates if the data is currently loading
   */
  loading = false;

  /**
   * Subscriptions to the other providers changes.
   */
  private _filtersSub: Subscription;
  private _sortSub: Subscription;
  private _pageSub: Subscription;

  /**
   * Whether we should use smart items for this datagrid or let the user handle
   * everything.
   */
  private _smart = false;

  /**
   * List of all items in the datagrid
   */
  private _all: T[][] = [];

  /**
   * List of items currently displayed
   */
  private _displayed: T[][] = [];

  /**
   * The Observable that lets other classes subscribe to items changes
   */
  private _change = new Subject<T[][]>();

  private _allChanges = new Subject<T[][]>();

  constructor(private _sort: Sort<T>) {}

  get smart(): boolean {
    return this._smart;
  }

  get all() {
    return this._all;
  }
  set addItems(items: T[]) {
    this._all = this._all.concat([items]);
    //this.emitAllChanges(items);

    this._displayed = this._displayed.concat([items]);
    this.emitChange();
  }

  get displayed(): T[][] {
    // Ideally we could return an immutable array, but we don't have it in Clarity yet.
    return this._displayed;
  }

  // We do not want to expose the Subject itself, but the Observable which is read-only
  get change(): Observable<T[][]> {
    return this._change.asObservable();
  }

  get allChanges(): Observable<T[][]> {
    return this._allChanges.asObservable();
  }

  /**
   * Checks if we don't have data to process yet, to abort early operations
   */
  private get uninitialized() {
    return !this._all;
  }

  /**
   * Tracking function to identify objects.
   */
  trackBy: ClrDatagridItemsTrackByFunction<T> = item => item;

  /**
   * Cleans up our subscriptions to other providers
   */
  destroy() {
    if (this._filtersSub) {
      this._filtersSub.unsubscribe();
    }
    if (this._sortSub) {
      this._sortSub.unsubscribe();
    }
    if (this._pageSub) {
      this._pageSub.unsubscribe();
    }
  }

  smartenDown() {
    this._smart = false;

    this.destroy();
  }

  smartenUp() {
    this._smart = true;
    /*
     * These observers trigger a chain of function: filter -> sort -> paginate
     * An observer up the chain re-triggers all the operations that follow it.
     */
    this._sortSub = this._sort.change.subscribe(() => {
      // Special case, if the datagrid went from sorted to unsorted, we have to re-filter
      // to get the original order back
      if (this._sort.comparator) {
        this._sortItems();
      }
    });
  }

  private emitChange() {
    this._change.next(this.displayed);
  }

  /*
  private emitAllChanges(items:T[][]): void {
    this._allChanges.next(items);
  }
  */

  /**
   * Sorts items in the filtered list
   */
  private _sortItems() {
    if (this.uninitialized) {
      return;
    }
    if (this._sort.comparator) {
      this._displayed = this._displayed.map(subArray => {
        return subArray.sort((a, b) => this._sort.compare(a, b));
      });
    }
    this.emitChange();
  }
}
