import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ClrCommonStringsService,
  ClrDatagridFilter,
  ClrDatagridFilterInterface,
  ClrPopoverEventsService,
} from '@clr/angular';
import { Observable, Subject } from 'rxjs';
import { NestedProperty } from './nested-property';
import { ClarityIcons, trashIcon } from '@cds/core/icon';

ClarityIcons.addIcons(trashIcon);

@Component({
  selector: 'clr-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss'],
})
export class ClrDateFilterComponent<T extends { [key: string]: any }>
  implements ClrDatagridFilterInterface<T>, AfterViewInit
{
  private nestedProp: NestedProperty<any>;
  @Input()
  timeActive = false;

  @Input('clrProperty') set property(value: string) {
    this.nestedProp = new NestedProperty(value);
  }

  get property() {
    return this.nestedProp.prop;
  }

  constructor(
    private commonStrings: ClrCommonStringsService,
    private clrPopoverEventsService: ClrPopoverEventsService,
    filterContainer: ClrDatagridFilter
  ) {
    filterContainer.setFilter(this);
  }

  public ngAfterViewInit(): void {
    this.clrPopoverEventsService.outsideClickClose = false;
  }

  /**
   * Provide a way to pass external placeholder and aria-label to the filter input
   */
  @Input('clrFilterMaxPlaceholder') maxPlaceholder: string;

  get maxPlaceholderValue() {
    return this.maxPlaceholder || this.commonStrings.keys.maxValue;
  }

  @Input('clrFilterMinPlaceholder') minPlaceholder: string;

  get minPlaceholderValue() {
    return this.minPlaceholder || this.commonStrings.keys.minValue;
  }

  @Input('clrFilterValue')
  public set value(values: [Date, Date]) {
    if (Array.isArray(values)) {
      if (values && (values[0] !== this._from || values[1] !== this._to)) {
        if (typeof values[0] === 'object') {
          this._from = values[0];
          this._fromTime = this._from.toLocaleTimeString();
        } else {
          this._from = null;
        }
        if (typeof values[1] === 'object') {
          this._to = values[1];
          this._toTime = this._to.toLocaleTimeString();
        } else {
          this._to = null;
        }
        this._changes.next(values);
      }
    }
  }

  @Output('clrFilterValueChange') filterValueChange = new EventEmitter();

  /**
   * Internal values and accessor
   */
  private _from: Date | null = null;
  private _to: Date | null = null;
  private _toTime: string | null;
  private _fromTime: string | null;

  public get from() {
    return this._from;
  }

  public get fromTime() {
    return this._fromTime;
  }

  public get toTime() {
    return this._toTime;
  }

  public set from(from: Date) {
    if (typeof from === 'object' && from !== this._from) {
      if (from && typeof from.setHours === 'function') {
        from.setHours(0, 0, 0, 0); // set from-date to start of day
      }
      if (this.fromTime) {
        const [hours, minutes, seconds] = this.fromTime.split(':').map(n => parseInt(n));
        from.setHours(hours, minutes, seconds || 0, 0);
      }
      this._from = from;
      this._changes.next([this._from, this._to]);
      this.filterValueChange.emit([this._from, this._to]);
    }
  }

  public set fromTime(fromtime: string) {
    this._fromTime = fromtime;
    if (this._fromTime && this._from) {
      const [hours, minutes, seconds] = this._fromTime.split(':').map(n => parseInt(n));
      this._from.setHours(hours, minutes, seconds || 0, 0);
      this._changes.next([this._from, this._to]);
      this.filterValueChange.emit([this._from, this._to]);
    }
  }

  public get to() {
    return this._to;
  }

  public set to(to: Date) {
    if (typeof to === 'object' && to !== this._to) {
      if (to && typeof to.setHours === 'function') {
        to.setHours(23, 59, 59, 999); // set to-date to end of day
      }
      if (this.toTime) {
        const [hours, minutes, seconds] = this.toTime.split(':').map(n => parseInt(n));
        to.setHours(hours, minutes, seconds || 0, 0);
      }
      this._to = to;
      this._changes.next([this._from, this._to]);
      this.filterValueChange.emit([this._from, this._to]);
    }
  }

  public set toTime(totime: string) {
    this._toTime = totime;
    if (this._toTime && this._to) {
      const [hours, minutes, seconds] = this._toTime.split(':').map(n => parseInt(n));
      this._to.setHours(hours, minutes, seconds || 0, 0);
      this._changes.next([this._from, this._to]);
      this.filterValueChange.emit([this._from, this._to]);
    }
  }

  /**
   * Indicates if the filter is currently active, (at least one input is set)
   */
  public isActive(): boolean {
    return this._from !== null || this._to !== null;
  }

  accepts(item: T): boolean {
    let propValue = this.nestedProp ? this.nestedProp.getPropValue(item) : item;
    if (propValue === undefined) {
      return false;
    }
    if (typeof propValue === 'string') {
      propValue = new Date(propValue);
    }
    if (this._from !== null && (!(propValue instanceof Date) || propValue.getTime() < this._from.getTime())) {
      return false;
    }
    if (this._to !== null && (!(propValue instanceof Date) || propValue.getTime() > this._to.getTime())) {
      return false;
    }
    return true;
  }

  /**
   * The Observable required as part of the Filter interface
   */
  private _changes = new Subject<[Date, Date]>();

  // We do not want to expose the Subject itself, but the Observable which is read-only
  public get changes(): Observable<[Date, Date]> {
    return this._changes.asObservable();
  }

  public get state(): any {
    return {
      property: this.nestedProp,
      from: this._from,
      to: this._to,
    };
  }

  public clearFilter() {
    this._from = null;
    this._to = null;
    this.fromTime = null;
    this.toTime = null;
    this._changes.next([this._from, this._to]);
    this.filterValueChange.emit([this._from, this._to]);
  }

  public equals(other: ClrDatagridFilterInterface<T, any>): boolean {
    return other === this;
  }
}
