/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { computed, Injectable, signal } from '@angular/core';
import { ClrTreetableComparatorInterface } from '../interfaces/comparator.interface';
import { toObservable } from '@angular/core/rxjs-interop';

export interface TreetableSortState<T extends object> {
  comparator: ClrTreetableComparatorInterface<T> | null;
  reverse: boolean;
}

@Injectable()
export class Sort<T extends object> {
  private readonly _comparator = signal<ClrTreetableComparatorInterface<T> | null>(null);
  private readonly _reverse = signal<boolean>(false);

  readonly sortState = computed<TreetableSortState<T>>(() => ({
    comparator: this._comparator(),
    reverse: this._reverse(),
  }));
  readonly changes$ = toObservable(this.sortState);

  /**
   * Sets a comparator as the current one, or toggles reverse if the comparator is already used. The
   * optional forceReverse input parameter allows to override that toggling behavior by sorting in
   * reverse order if `true`.
   */
  public toggle(sortBy: ClrTreetableComparatorInterface<T>, forceReverse?: boolean): void {
    if (this._comparator() === sortBy) {
      const newReverse = typeof forceReverse !== 'undefined' ? forceReverse : !this._reverse();
      this._reverse.set(newReverse);
    } else {
      this._comparator.set(sortBy);
      this._reverse.set(typeof forceReverse !== 'undefined' ? forceReverse : false);
    }
  }

  /**
   * Clears the current comparator
   */
  public clear(): void {
    this._comparator.set(null);
  }

  /**
   * Compares two items using the current comparator and reverse flag
   */
  public compare(a: T, b: T): number {
    const currentComparator = this._comparator();
    if (!currentComparator) {
      return 0;
    }

    return (this._reverse() ? -1 : 1) * currentComparator.compare(a, b);
  }
}
