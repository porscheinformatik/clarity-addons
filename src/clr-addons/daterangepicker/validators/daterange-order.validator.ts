import { Directive, forwardRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

import { NullableDaterange } from '../interfaces/daterange.interface';

/**
 * Validator for daterangepicker to validate that 'from' date is before 'to' date.
 * Otherwise will throw `fromIsAfterTo` validation error.
 *
 * This validator is applied automatically on ClrDaterangepickerDirective.
 * Or when set manually with `clrDaterangeOrder` attribute.
 *
 * Validator is active by default when applied. It can be disabled with: `[clrDaterangeOrder]="false"`
 */
@Directive({
  selector: '[clrDaterangepicker], [clrDaterangeOrder]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ClrDaterangeOrderValidator),
      multi: true,
    },
  ],
})
export class ClrDaterangeOrderValidator implements Validator {
  /** Validation error name. */
  public static readonly validationErrorName = 'fromIsAfterTo';

  private _active = true;

  /**
   * Disable validator by setting value to `false`.
   */
  @Input('clrDaterangeOrder')
  public set active(active: boolean | string | undefined | null) {
    this._active = active == null || (active !== false && `${active}` !== 'false');
  }

  /**
   * Validator method. Method that performs synchronous validation against the provided control.
   * @param control - The control to validate against.
   * @returns A map of validation errors if validation fails, otherwise null.
   */
  public validate(control: AbstractControl<NullableDaterange, any>): ValidationErrors | null {
    if (!this._active) {
      return null;
    }

    // Validation with `null` value is done with the regular required validator.
    if (control.value == null) {
      return null;
    }

    const { from, to } = control.value;

    // Validation with `null` values from 'from' & 'to' is done with the ClrDaterangeRequiredValidator.
    if (from == null || to == null) {
      return null;
    }

    if (from.isAfter(to)) {
      return {
        [ClrDaterangeOrderValidator.validationErrorName]: control.value,
      };
    }

    return null;
  }
}
