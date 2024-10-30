import { EventEmitter, Injectable } from '@angular/core';

import { NullableDaterange } from '../interfaces/daterange.interface';
import { NullableDayModel } from '../models/day.model';
import { NullableTimerange } from '../interfaces/timerange.interface';

/**
 * Daterange service.
 * Keeps track of daterange related values.
 */
@Injectable()
export class DaterangeService {
  /** Minimum date that can be selected. */
  public minDate: NullableDayModel = null;

  /** Maximum date that can be selected. */
  public maxDate: NullableDayModel = null;

  private _selectedDaterange: NullableDaterange = null;

  public timeActive = false;
  public timeSecondsActive = false;

  /**
   * Selected daterange value.
   * @returns Selected daterange value.
   */
  public get selectedDaterange(): NullableDaterange {
    return this._selectedDaterange;
  }

  /**
   * Set selected daterange value.
   * @param value - New selected daterange value.
   * @param triggerEvent - Trigger change event (default true).
   */
  public updateSelectedDaterange(value: NullableDaterange | NullableTimerange, triggerEvent = true): void {
    this._selectedDaterange = value;

    if (triggerEvent) {
      this.valueChange.emit(value);
    }
  }

  /**
   * Set selected Timerange value.
   * @param value - New selected Timerange value.
   * @param triggerEvent - Trigger change event (default true).
   */
  public updateSelectedTimerange(value: NullableTimerange, triggerEvent = true): void {
    this._selectedDaterange = value;

    if (triggerEvent) {
      this.valueChange.emit(value);
    }
  }

  /**
   * Event triggered when value changes.
   */
  public valueChange = new EventEmitter<NullableDaterange>();

  /**
   * Checks if daterange is valid.
   * Daterange is considered invalid when it's empty, or when one of it's properties is absent.
   * @returns Wether daterange is valid.
   */
  public isValid(): boolean {
    return !(
      this._selectedDaterange == null ||
      this._selectedDaterange.from == null ||
      this._selectedDaterange.to == null
    );
  }
}
