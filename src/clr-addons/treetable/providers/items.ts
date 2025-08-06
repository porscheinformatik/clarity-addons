/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { Sort } from './sort';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable()
export class Items<T = any> {
  private _all: T[][] = [];
  private _displayed: T[][] = [];
  private _change = new Subject<T[][]>();

  private readonly _sort = inject(Sort<T>);

  constructor() {
    this._sort.change.pipe(takeUntilDestroyed()).subscribe(() => {
      this.sortItems();
    });
  }

  get all() {
    return this._all;
  }
  addItems(items: T[]) {
    this._all = this._all.concat([items.slice()]);

    this._displayed = this._displayed.concat([items.slice()]);
    this.emitChange();
  }

  get displayed(): T[][] {
    return this._displayed;
  }

  get change(): Observable<T[][]> {
    return this._change.asObservable();
  }

  /**
   * Checks if we don't have data to process yet, to abort early operations
   */
  private get uninitialized() {
    return !this._all;
  }

  private emitChange() {
    this._change.next(this.displayed);
  }

  private sortItems() {
    if (this.uninitialized) {
      return;
    }
    if (this._sort.comparator) {
      this._displayed.forEach(subArray => {
        subArray.sort((a, b) => this._sort.compare(a, b));
      });
    } else {
      this._displayed = this._all.map(subArray => subArray.slice());
    }
    this.emitChange();
  }
}
