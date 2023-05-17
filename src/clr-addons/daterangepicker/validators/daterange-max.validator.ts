import { Directive, forwardRef, Input, Optional } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

import { NullableDaterange } from '../interfaces/daterange.interface';
import { NullableDayModel } from '../models/day.model';
import { DaterangeService } from '../providers/daterange.service';

/**
 * Validator for daterangepicker to validate that 'to' date is not after 'max' value.
 * Otherwise will throw corresponding `max` validation error.
 *
 * Validator is applied to the ClrDaterangepickerDirective with `max` attribute.
 * Or when set manually with `clrDaterangeMax` attribute.
 *
 * Validator is active by default when applied. It can be disabled with: `[clrDaterangeMax]="false"`
 */
@Directive({
  selector: '[clrDaterangepicker][max], [clrDaterangeMax]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ClrDaterangeMaxValidator),
      multi: true,
    },
  ],
})
export class ClrDaterangeMaxValidator implements Validator {
  /** Validation error name. */
  public static readonly validationErrorName = 'max';

  private _active = true;

  public constructor(@Optional() private readonly daterangeService: DaterangeService) {}

  /**
   * Disable validator by setting value to `false`.
   */
  @Input('clrDaterangeMax')
  public set active(active: boolean | string | undefined | null) {
    console.log('ClrDaterangeMaxValidator.active', {
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
    console.log('ClrDaterangeMaxValidator.validate', {
      value: control.value,
      _active: this._active,
      control,
    });

    if (!this._active) {
      return null;
    }

    if (control.value == null) {
      return null;
    }

    const max: NullableDayModel = this.daterangeService.maxDate;

    console.log('ClrDaterangeMaxValidator.validate.2', {
      max,
    });

    if (max == null) {
      return null;
    }

    const { to } = control.value;

    if (to == null) {
      return null;
    }

    if (to.isAfter(max)) {
      return {
        [ClrDaterangeMaxValidator.validationErrorName]: {
          max,
          actual: to,
        },
      };
    }

    return null;
  }
}
