import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { ClrCommonStringsService, ClrDatagridFilter, ClrDatagridFilterInterface } from '@clr/angular';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NestedProperty } from '../util';

export const CLR_NUMERIC_FILTER_DEBOUNCE_MS = 500;

export type ClrNumericFilterSize = 'S' | 'M' | 'L';

interface FilterInputChange {
  low: number | null;
  high: number | null;
}

@Component({
  selector: 'clr-numeric-filter',
  templateUrl: './numeric-filter.component.html',
  styleUrls: ['./numeric-filter.component.scss'],
  standalone: false,
})
export class ClrNumericFilterComponent<T extends { [key: string]: any }>
  implements ClrDatagridFilterInterface<T>, OnDestroy
{
  private nestedProp: NestedProperty;

  @Input('clrProperty') set property(value: string) {
    this.nestedProp = new NestedProperty(value);
  }

  get property() {
    return this.nestedProp?.prop;
  }

  @Input('clrFilterMinPlaceholder') minPlaceholder: string;

  get minPlaceholderValue() {
    return this.minPlaceholder || this.commonStrings.keys.minValue;
  }

  @Input('clrFilterMaxPlaceholder') maxPlaceholder: string;

  get maxPlaceholderValue() {
    return this.maxPlaceholder || this.commonStrings.keys.maxValue;
  }

  /**
   * Controls the width of the min/max inputs:
   * - S: up to 99.999 (6 characters)
   * - M: up to 9.999.999 (9 characters)
   * - L: up to 9.999.999.999 (13 characters)
   */
  @Input('clrFilterSize') size: ClrNumericFilterSize = 'M';

  get inputSizeClass() {
    switch (this.size) {
      case 'S':
        return 'filter-input-s';
      case 'L':
        return 'filter-input-l';
      default:
        return 'filter-input-m';
    }
  }

  @Input('clrFilterValue')
  public set value(values: [number | null, number | null]) {
    if (!Array.isArray(values)) {
      return;
    }

    const low = this.normalizeValue(values[0]);
    const high = this.normalizeValue(values[1]);

    this.restartDebounce();
    if (low === this._low && high === this._high) {
      return;
    }

    this.lowInput = low;
    this.highInput = high;
    this.pendingLow = low;
    this.pendingHigh = high;
    this.applyValue(low, high, false);
  }

  public get value(): [number | null, number | null] {
    return this._value;
  }

  @Output('clrFilterValueChange') filterValueChange = new EventEmitter<[number | null, number | null]>();

  lowInput: number | null = null;
  highInput: number | null = null;

  private _low: number | null = null;
  private _high: number | null = null;
  private _value: [number | null, number | null] = [null, null];
  private pendingLow: number | null = null;
  private pendingHigh: number | null = null;
  private readonly inputChanges = new Subject<FilterInputChange>();
  private readonly _changes = new Subject<[number | null, number | null]>();
  private debounceSubscription: Subscription;

  constructor(
    private commonStrings: ClrCommonStringsService,
    filterContainer: ClrDatagridFilter
  ) {
    filterContainer.setFilter(this);
    this.restartDebounce();
  }

  onLowInput(value: number | null) {
    const normalized = this.normalizeValue(value);

    this.pendingLow = normalized;
    this.inputChanges.next({ low: this.pendingLow, high: this.pendingHigh });
  }

  onHighInput(value: number | null) {
    const normalized = this.normalizeValue(value);

    this.pendingHigh = normalized;
    this.inputChanges.next({ low: this.pendingLow, high: this.pendingHigh });
  }

  isActive(): boolean {
    return this._low !== null || this._high !== null;
  }

  accepts(item: T): boolean {
    const propValue = this.nestedProp ? this.nestedProp.getPropValue(item) : item;
    if (propValue === undefined || propValue === null) {
      return false;
    }

    const numericValue = this.normalizeValue(propValue);
    if (numericValue === null) {
      return false;
    }

    if (this._low !== null && numericValue < this._low) {
      return false;
    }
    if (this._high !== null && numericValue > this._high) {
      return false;
    }

    return true;
  }

  public get changes(): Observable<[number | null, number | null]> {
    return this._changes.asObservable();
  }

  public get state(): any {
    return {
      property: this.nestedProp,
      low: this._low,
      high: this._high,
    };
  }

  public clearFilter() {
    this.lowInput = null;
    this.highInput = null;
    this.pendingLow = null;
    this.pendingHigh = null;
    this.restartDebounce();
    this.applyValue(null, null);
  }

  public equals(other: ClrDatagridFilterInterface<T, any>): boolean {
    return other === this;
  }

  ngOnDestroy() {
    this.debounceSubscription.unsubscribe();
  }

  /**
   * (Re)subscribes to the input debounce pipeline, discarding any pending
   * (not-yet-emitted) debounced keystroke so it can't overwrite a value that
   * was just set programmatically or cleared.
   */
  private restartDebounce() {
    this.debounceSubscription?.unsubscribe();
    this.debounceSubscription = this.inputChanges
      .pipe(
        debounceTime(CLR_NUMERIC_FILTER_DEBOUNCE_MS),
        distinctUntilChanged((previous, current) => previous.low === current.low && previous.high === current.high)
      )
      .subscribe(({ low, high }) => this.applyValue(low, high));
  }

  private applyValue(low: number | null, high: number | null, emitChange = true) {
    if (low === this._low && high === this._high) {
      return;
    }

    this._low = low;
    this._high = high;
    this._value = [this._low, this._high];
    this._changes.next(this._value);
    if (emitChange) {
      this.filterValueChange.emit(this._value);
    }
  }

  private normalizeValue(value: number | string | null | undefined): number | null {
    if (value === null || value === undefined || value === '') {
      return null;
    }

    const numericValue = typeof value === 'number' ? value : Number(value);

    return Number.isFinite(numericValue) ? numericValue : null;
  }
}
