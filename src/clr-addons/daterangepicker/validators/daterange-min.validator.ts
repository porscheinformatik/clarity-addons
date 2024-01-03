import { Directive, forwardRef, Input, Optional } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

import { NullableDaterange } from '../interfaces/daterange.interface';
import { NullableDayModel } from '../models/day.model';
import { DaterangeService } from '../providers/daterange.service';

/**
 * Validator for daterangepicker to validate that 'from' date is not before 'min' value.
 * Otherwise will throw corresponding `min` validation error.
 *
 * Validator is applied to the ClrDaterangepickerDirective with `min` attribute.
 * Or when set manually with `clrDaterangeMin` attribute.
 *
 * Validator is active by default when applied. It can be disabled with: `[clrDaterangeMin]="false"`
 */
@Directive({
  selector: '[clrDaterangepicker][min], [clrDaterangeMin]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ClrDaterangeMinValidator),
      multi: true,
    },
  ],
})
export class ClrDaterangeMinValidator implements Validator {
  /** Validation error name. */
  public static readonly validationErrorName = 'min';

  private _active = true;

  public constructor(@Optional() private readonly daterangeService: DaterangeService) {}

  /**
   * Disable validator by setting value to `false`.
   */
  @Input('clrDaterangeMin')
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

    if (control.value == null) {
      return null;
    }

    const min: NullableDayModel = this.daterangeService.minDate;
    if (min == null) {
      return null;
    }

    const { from } = control.value;

    if (from == null) {
      return null;
    }

    if (from.isBefore(min)) {
      return {
        [ClrDaterangeMinValidator.validationErrorName]: {
          min,
          actual: from,
        },
      };
    }

    return null;
  }
}
