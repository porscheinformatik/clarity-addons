import { Directive, forwardRef, Input, Optional } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

import { NullableDaterange } from '../interfaces/daterange.interface';
import { NullableDayModel } from '../models/day.model';
import { DaterangeService } from '../providers/daterange.service';

/**
 * Validator for daterangepicker to validate that 'from' and 'to' dates are within the 'min' and 'max' values.
 * Otherwise will throw corresponding `min` or `max` validation error.
 *
 * Validator is applied to the ClrDaterangepickerDirective with `min` or `max` attribute.
 * Or when set manually with `clrDaterangeMinMax` attribute.
 *
 * Validator is active by default when applied. It can be disabled with: `[clrDaterangeMinMax]="false"`
 */
@Directive({
  selector: '[clrDaterangepicker][min], [clrDaterangepicker][max], [clrDaterangeMinMax]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ClrDaterangeMinMaxValidator),
      multi: true,
    },
  ],
})
export class ClrDaterangeMinMaxValidator implements Validator {
  /** Validation min error name. */
  public static readonly validationMinErrorName = 'min';
  /** Validation max error name. */
  public static readonly validationMaxErrorName = 'max';

  private _active = true;

  public constructor(@Optional() private readonly daterangeService: DaterangeService) {}

  /**
   * Disable validator by setting value to `false`.
   */
  @Input('clrDaterangeMinMax')
  public set active(active: boolean | string | undefined | null) {
    console.log('ClrDaterangeMinMaxValidator.active', {
      active,
      _active: active == null || (active !== false && `${active}` !== 'false'),
    });
    this._active = active == null || (active !== false && `${active}` !== 'false');
  }

  /**
   * Validator method. Method that performs synchronous validation against the provided control.
   * @param control - The control to validate against.
   * @returns A map of validation errors if validation fails, otherwise null.
   */
  public validate(control: AbstractControl<NullableDaterange, any>): ValidationErrors | null {
    console.log('ClrDaterangeMinMaxValidator.validate', {
      value: control.value,
      _active: this._active,
      control,
    });

    if (!this._active) return null;

    if (control.value == null) return null;

    const min: NullableDayModel = this.daterangeService.minDate;
    const max: NullableDayModel = this.daterangeService.maxDate;

    console.log('ClrDaterangeMinMaxValidator.validate.2', {
      min,
      max,
    });

    if (min == null && max == null) return null;

    const errors: ValidationErrors = {};
    let hasError = false;
    const { from, to } = control.value;

    if (min != null && from != null && from.isBefore(min)) {
      errors[ClrDaterangeMinMaxValidator.validationMinErrorName] = {
        min,
        actual: from,
      };
      hasError = true;
    }

    if (max != null && to != null && to.isAfter(max)) {
      errors[ClrDaterangeMinMaxValidator.validationMaxErrorName] = {
        max,
        actual: to,
      };
      hasError = true;
    }

    if (hasError) return errors;

    return null;
  }
}
