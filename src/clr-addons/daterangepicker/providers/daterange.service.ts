import { EventEmitter, Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

import { NullableDaterange } from '../interfaces/daterange.interface';
import { NullableDayModel } from '../models/day.model';

/**
 * Daterange service.
 * Stores data for communication between container and input.
 */
@Injectable()
export class DaterangeService {
  /** Minimum date that can be selected. */
  public minDate: NullableDayModel = null;

  /** Maximum date that can be selected. */
  public maxDate: NullableDayModel = null;

  /** Disabled control state. */
  public disabled = false;

  /** Focused. */
  public focused = false;

  /** List of validation errors. */
  public errors: ValidationErrors | null = null;

  private _selectedDaterange: NullableDaterange = null;
  /**
   * Selected daterange value.
   * @returns Selected daterange value.
   */
  public get selectedDaterange(): NullableDaterange {
    return this._selectedDaterange;
  }
  /**
   * Selected daterange value.
   * @param value - New selected daterange value.
   * @param triggerEvent - Trigger change event (default true).
   */
  public updateSelectedDaterange(value: NullableDaterange, triggerEvent = true): void {
    console.log('DaterangeService.selectedDaterange.set', {
      value,
      oldValue: this._selectedDaterange,
      condition: this._selectedDaterange === value,
    });
    this._selectedDaterange = value;

    if (triggerEvent) this.valueChange.emit(value);
  }

  /**
   * Event triggered when value changes.
   */
  public valueChange = new EventEmitter<NullableDaterange>();

  private _invalid = false;
  /**
   * Control invalid status.
   * @returns Control invalid status.
   */
  public get invalid(): boolean {
    return this._invalid;
  }

  /**
   * Update status.
   * Only for valid & invalid status changes.
   * And only if there was a real change.
   * Also updates errors list.
   * Emits `statusChange` event.
   * @param control
   */
  public updateStatus(control: AbstractControl) {
    console.log('DaterangeService.updateStatus', {
      status: control.status,
      errors: control.errors,
      invalid: control.invalid,
      control,
    });

    // We only care about valid & invalid status changes.
    // There is an bug where `ClrDaterangepickerDirective.writeValue` is called twice with same value (`null`).
    // Setting ` && (control.touched || control.dirty)` in next if-statement will hide the errors,
    // but the control will still be invalid with errors (just hidden).
    if (['VALID', 'INVALID'].includes(control.status)) {
      this.errors = control.errors;
      this._invalid = control.invalid;
      this.statusChange.emit(this._invalid);
    }
  }

  /**
   * Event triggered when status changes.
   */
  public statusChange = new EventEmitter<boolean>();
}
