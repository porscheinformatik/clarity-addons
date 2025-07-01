/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { inject, Injectable } from '@angular/core';
import { debounceTime, Observable, Subject } from 'rxjs';
import { SelectionType } from '../enums/selection-type';
import { Items } from './items';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable()
export class Selection<T> {
  private _current: T[];
  private _change = new Subject<T[]>();
  private _allSelected = new Subject<boolean>();
  //debounce and batch changes before emitting them to subscribers
  private _valueCollector = new Subject<T[]>();
  private _selectionType: SelectionType = SelectionType.None;

  private _items = inject(Items);

  constructor() {
    this._valueCollector.pipe(debounceTime(0), takeUntilDestroyed()).subscribe(() => this.emitChange());
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
      this._valueCollector.next(value);
    }
  }

  get change(): Observable<T[]> {
    return this._change.asObservable();
  }

  get allSelectedChange(): Observable<boolean> {
    return this._allSelected.asObservable();
  }

  isSelected(item: T): boolean {
    return this.current.indexOf(item) >= 0;
  }

  setSelected(item: T, selected: boolean) {
    const index = this.current ? this.current.indexOf(item) : -1;

    if (index >= 0 && !selected) {
      this.deselectItem(index);
    } else if (index < 0 && selected) {
      this.selectItem(item);
    }
  }

  isAllSelected(): boolean {
    const displayedItems: T[][] = this._items.displayed;

    const nbDisplayed = displayedItems.length;
    if (nbDisplayed < 1) {
      return false;
    }
    const flattenedDisplayedItems: T[] = displayedItems.flat();
    const selectedItems: T[] = flattenedDisplayedItems.filter(item => this.current.indexOf(item) > -1);
    return selectedItems.length === flattenedDisplayedItems.length;
  }

  toggleAll() {
    const isAllSelected = this.isAllSelected();

    if (isAllSelected) {
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

    this._allSelected.next(!isAllSelected);
  }

  private selectItem(item: T): void {
    this.current = this.current.concat(item);
  }

  private deselectItem(indexOfItem: number): void {
    this.current = this.current.slice(0, indexOfItem).concat(this.current.slice(indexOfItem + 1));
  }

  private emitChange() {
    this._change.next(this.current);
  }
}
