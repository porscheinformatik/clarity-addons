import { EventEmitter, Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * Control state service.
 * Stores data for communication between container and input.
 */
@Injectable()
export class ControlStateService {
  /** Disabled control state. */
  public disabled = false;

  /** Focused. */
  public focused = false;

  /** List of validation errors. */
  public errors: ValidationErrors | null = null;

  private _invalid = false;
  /**
   * Control invalid status.
   * @returns Control invalid status.
   */
  public get invalid(): boolean {
    return this._invalid;
  }

  private _touched = false;
  /**
   * Touched.
   * @returns Touched.
   */
  public get touched(): boolean {
    return this._touched;
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
    console.log('ControlStateService.updateStatus', {
      status: control.status,
      errors: control.errors,
      invalid: control.invalid,
      control,
    });

    this._touched = control.touched;

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
