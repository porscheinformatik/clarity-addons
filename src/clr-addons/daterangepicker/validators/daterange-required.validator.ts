import { Directive, forwardRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

import { NullableDaterange } from '../interfaces/daterange.interface';

/**
 * Validator for daterangepicker to validate that 'from' *AND* 'to' date are not `null`.
 * Will throw `required` validation error.
 *
 * Validator is applied to the ClrDaterangepickerDirective with `required` attribute.
 * Or when set manually with `clrDaterangeRequired` attribute.
 *
 * Validator is active by default when applied. It can be disabled with: `[clrDaterangeRequired]="false"`
 */
@Directive({
  selector: '[clrDaterangepicker][required], [clrDaterangeRequired]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ClrDaterangeRequiredValidator),
      multi: true,
    },
  ],
})
export class ClrDaterangeRequiredValidator implements Validator {
  /** Validation error name. */
  public static readonly validationErrorName = 'required';

  private _active: boolean = true;

  /**
   * Disable validator by setting value to `false`.
   */
  @Input('clrDaterangeRequired')
  public set active(active: boolean | string | undefined | null) {
    console.log('ClrDaterangeRequiredValidator.active', {
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
    console.log('ClrDaterangeRequiredValidator.validate', {
      value: control.value,
      _active: this._active,
      control,
    });

    if (!this._active) return null;

    // Validation with `null` value is done with the regular required validator.
    if (control.value == null) return null;

    const { from, to } = control.value;
    if (from == null || to == null) {
      return {
        [ClrDaterangeRequiredValidator.validationErrorName]: control.value,
      };
    }

    return null;
  }
}
