import { ContentChild, Directive, HostBinding, Optional } from '@angular/core';
import { ClrControlError, ClrControlHelper, ClrControlSuccess, ClrLabel, ClrLayout } from '@clr/angular';
import { DaterangeControlStateService } from '../providers/daterange-control-state.service';

@Directive()
export abstract class ClrAbstractContainer {
  @HostBinding('class.clr-form-control') protected readonly isFormControl = true;

  /**
   * Detect if container is not part of an vertical form to apply correct grid classes.
   */
  @HostBinding('class.clr-row')
  public get addLayoutGrid() {
    return !this.clrLayout?.layoutService?.isVertical();
  }

  /** Label component. */
  @ContentChild(ClrLabel) protected labelComponent: ClrLabel;

  /** Helper control component. */
  @ContentChild(ClrControlHelper) protected controlHelperComponent: ClrControlHelper;
  /** Error control component. */
  @ContentChild(ClrControlError) protected controlErrorComponent: ClrControlError;
  /** Success control component. */
  @ContentChild(ClrControlSuccess) protected controlSuccessComponent: ClrControlSuccess;

  /**
   * Wether to show the helper control.
   * @returns Wether to show the helper control.
   */
  protected get showHelper(): boolean {
    if (this.controlHelperComponent == null) {
      return false;
    }

    // Helper Component exist and the state of the form is NONE (not touched).
    if (!this.daterangeControlStateService.touched) {
      return true;
    }

    // Or there is no success component but the state of the form is VALID - show helper information.
    if (
      this.controlSuccessComponent == null &&
      this.daterangeControlStateService.touched &&
      !this.daterangeControlStateService.invalid
    ) {
      return true;
    }

    // Or there is no error component but the state of the form is INVALID - show helper information.
    if (this.controlErrorComponent == null && this.daterangeControlStateService.invalid) {
      return true;
    }

    return false;
  }

  /**
   * Wether to show the valid control.
   * @returns Wether to show the valid control.
   */
  protected get showValid(): boolean {
    return !this.daterangeControlStateService.invalid && !!this.controlSuccessComponent;
  }

  /**
   * Wether to show the invalid control.
   * @returns Wether to show the invalid control.
   */
  protected get showInvalid(): boolean {
    return this.daterangeControlStateService.invalid && !!this.controlErrorComponent;
  }

  /**
   * Disabled state.
   * @returns Disabled state.
   */
  protected get disabled(): boolean {
    return this.daterangeControlStateService.disabled;
  }

  /**
   * If control is focused.
   * @returns Wether control is focused.
   */
  protected get focus(): boolean {
    return this.daterangeControlStateService.focused;
  }

  /**
   * Wether control is invalid.
   * @returns Wether control is invalid.
   */
  protected get isInvalid(): boolean {
    return this.daterangeControlStateService.invalid;
  }

  public constructor(
    @Optional() protected readonly clrLayout: ClrLayout,
    protected readonly daterangeControlStateService: DaterangeControlStateService
  ) {}
}
