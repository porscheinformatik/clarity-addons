/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { ClrTreetableComparatorInterface } from '../interfaces/comparator.interface';

@Injectable()
export class Sort<T> {
  private _comparator: ClrTreetableComparatorInterface<T>;
  private _reverse = false;
  private _change = new Subject<Sort<T>>();

  constructor() {}

  get comparator(): ClrTreetableComparatorInterface<T> {
    return this._comparator;
  }
  set comparator(value: ClrTreetableComparatorInterface<T>) {
    this._comparator = value;
    this.emitChange();
  }

  get reverse(): boolean {
    return this._reverse;
  }
  set reverse(value: boolean) {
    this._reverse = value;
    this.emitChange();
  }

  // We do not want to expose the Subject itself, but the Observable which is read-only
  get change(): Observable<Sort<T>> {
    return this._change.asObservable();
  }

  /**
   * Sets a comparator as the current one, or toggles reverse if the comparator is already used. The
   * optional forceReverse input parameter allows to override that toggling behavior by sorting in
   * reverse order if `true`.
   *
   * @memberof Sort
   */
  toggle(sortBy: ClrTreetableComparatorInterface<T>, forceReverse?: boolean) {
    if (this.comparator === sortBy) {
      this._reverse = typeof forceReverse !== 'undefined' ? forceReverse || !this._reverse : !this._reverse;
    } else {
      this._comparator = sortBy;
      this._reverse = typeof forceReverse !== 'undefined' ? forceReverse : false;
    }
    this.emitChange();
  }

  clear() {
    this.comparator = null;
  }

  compare(a: T, b: T): number {
    return (this.reverse ? -1 : 1) * this.comparator.compare(a, b);
  }

  emitChange() {
    this._change.next(this);
  }
}
