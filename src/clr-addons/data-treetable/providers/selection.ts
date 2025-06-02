/*
 * Copyright (c) 2016-2025 Broadcom. All Rights Reserved.
 * The term "Broadcom" refers to Broadcom Inc. and/or its subsidiaries.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { inject, Injectable } from '@angular/core';
import { debounceTime, Observable, Subject } from 'rxjs';
import { SelectionType } from '../enums/selection-type';
import { Items } from './items';

@Injectable()
export class Selection<T = any> {
  private _current: T[];
  private _change = new Subject<T[] | T>();

  private valueCollector = new Subject<T[]>();
  private _selectionType: SelectionType = SelectionType.None;

  private _items = inject(Items);

  constructor() {
    this.valueCollector.pipe(debounceTime(0)).subscribe(() => this.emitChange());
  }

  get selectionType(): SelectionType {
    return this._selectionType;
  }
  set selectionType(value: SelectionType) {
    if (value === this.selectionType) {
      return;
    }
    this._selectionType = value;
    if (value === SelectionType.None) {
      delete this.current;
    } else {
      this.updateCurrent([], false);
    }
  }

  get current(): T[] {
    return this._current;
  }
  set current(value: T[]) {
    this.updateCurrent(value, true);
  }

  updateCurrent(value: T[], emit: boolean) {
    this._current = value;

    if (emit) {
      this.valueCollector.next(value);
    }
  }

  clearSelection(): void {
    this._current = [];
  }

  get change(): Observable<T[] | T> {
    return this._change.asObservable();
  }

  /**
   * Checks if an item is currently selected
   */
  isSelected(item: T): boolean {
    return this.current.indexOf(item) >= 0;
  }

  /**
   * Selects or deselects an item
   */
  setSelected(item: T, selected: boolean) {
    const index = this.current ? this.current.indexOf(item) : -1;

    if (index >= 0 && !selected) {
      this.deselectItem(index);
    } else if (index < 0 && selected) {
      this.selectItem(item);
    }
  }

  /**
   * Checks if all currently displayed items are selected
   */
  isAllSelected(): boolean {
    // make sure to exclude the locked items from the list when counting
    const displayedItems: T[][] = this._items.displayed;

    const nbDisplayed = displayedItems.length;
    if (nbDisplayed < 1) {
      return false;
    }
    const flattenedDisplayedItems: T[] = displayedItems.flat();
    const selectedItems: T[] = flattenedDisplayedItems.filter(item => this.current.indexOf(item) > -1);
    return selectedItems.length === flattenedDisplayedItems.length;
  }

  /**
   * Selects or deselects all currently displayed items
   */
  toggleAll() {
    console.log('DISPLAYED ITEMS', this._items.displayed);

    if (this.isAllSelected()) {
      this._items.displayed.forEach(items => {
        items.forEach(item => {
          const currentIndex = this.current.indexOf(item);
          if (currentIndex > -1) {
            this.deselectItem(currentIndex);
          }
        });
      });
    } else {
      this._items.displayed.forEach(items => {
        items.forEach(item => {
          if (this.current.indexOf(item) < 0) {
            this.selectItem(item);
          }
        });
      });
    }
  }

  /**
   * Selects an item
   */
  private selectItem(item: T): void {
    this.current = this.current.concat(item);
  }

  /**
   * Deselects an item
   */
  private deselectItem(indexOfItem: number): void {
    this.current = this.current.slice(0, indexOfItem).concat(this.current.slice(indexOfItem + 1));
  }

  private emitChange() {
    this._change.next(this.current);
  }
}
