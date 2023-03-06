import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  Self,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { SEPARATOR_TEXT_DEFAULT } from '../../daterange.constants';
import { NullableDaterange } from '../../interfaces/daterange.interface';
import { DayModel } from '../../models/day.model';
import { DaterangeService } from '../../providers/daterange.service';
import { DaterangeParsingService } from '../../providers/daterange-parsing.service';
import { ControlStateService } from '../../providers/control-state.service';
import { ControlIdService } from '../../../abstract-form-component/control-id.service';

/**
 * Daterangepicker.
 */
@Directive({
  selector: '[clrDaterangepicker]',
})
export class ClrDaterangepickerDirective implements OnInit, OnDestroy, ControlValueAccessor {
  /**
   * Minimum date that can be selected.
   */
  @Input()
  public set min(value: Date | undefined | null) {
    this.daterangeService.minDate = value == null ? null : new DayModel(value);
  }

  /**
   * Maximum date that can be selected.
   */
  @Input()
  public set max(value: Date | undefined | null) {
    this.daterangeService.maxDate = value == null ? null : new DayModel(value);
  }

  /**
   * Locale text between 'from' and 'to' dateranges.
   */
  @Input()
  public separatorText: string = SEPARATOR_TEXT_DEFAULT;

  /**
   * Id-attribute.
   */
  @HostBinding()
  @Input()
  public get id() {
    return this.controlIdService.id;
  }
  /**
   * Id-attribute.
   * @returns Id-attribute.
   */
  public set id(value: string) {
    this.controlIdService.id = value;
  }

  /**
   * Disable control.
   */
  @HostBinding('disabled')
  @Input()
  public set disabled(value: boolean) {
    //console.log('ClrDaterangepickerDirective.disabled.set', value);
    this.controlStateService.disabled = value;
  }
  /**
   * Disabled state.
   * @returns Disabled state.
   */
  public get disabled() {
    //console.log('ClrDaterangepickerDirective.disabled.get', this.daterangeService.disabled);
    return this.controlStateService.disabled;
  }

  /**
   * Event that is triggered when value changes.
   */
  @Output()
  public valueChange = new EventEmitter<NullableDaterange>();

  /** Set the `type` attribute always to "text", to not get the native datepicker. */
  @HostBinding('attr.type')
  public inputType = 'text';

  @HostBinding('class.clr-input')
  public inputClass = true;

  /** List of subscriptions to later destroy. */
  private subscriptions: Array<Subscription> = [];

  public constructor(
    @Self()
    private readonly control: NgControl,
    private readonly element: ElementRef,
    private readonly renderer: Renderer2,
    private readonly controlStateService: ControlStateService,
    private readonly controlIdService: ControlIdService,
    private readonly daterangeService: DaterangeService,
    private readonly daterangeParsingService: DaterangeParsingService
  ) {
    console.log('ClrDaterangepickerDirective.ctor', this.control);

    // To get access to the NgControl, we had to remove the `NG_VALUE_ACCESSOR`
    // provider and set them manually, while still keeping the interfaces.
    this.control.valueAccessor = this;
  }

  public ngOnInit(): void {
    this.listenForDaterangeValueChanges();
    this.listenForControlStatusChanges();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  /**
   * Listen for daterange value changes.
   */
  private listenForDaterangeValueChanges(): void {
    this.subscriptions.push(
      this.daterangeService.valueChange.subscribe((_daterange: NullableDaterange) => {
        console.log('ClrDaterangepickerDirective.listenForDaterangeValueChanges.valueChange', {
          _daterange,
        });
        this.triggerChange();
      })
    );
  }

  /**
   * Listen for control status changes.
   */
  private listenForControlStatusChanges(): void {
    this.subscriptions.push(
      this.control.statusChanges.subscribe((status: unknown) => {
        console.log('ClrDaterangepickerDirective.listenForControlStatusChanges.statusChanges', {
          status,
          invalid: this.control.invalid,
          errors: this.control.errors,
        });
        this.controlStateService.updateStatus(this.control.control);
      })
    );
  }

  /**
   * Listen to manual changes to the input.
   * @param target - Input.
   */
  @HostListener('change', ['$event.target'])
  public onChangeEvent(target: HTMLInputElement): void {
    console.log('ClrDaterangepickerDirective.onChangeEvent', {
      value: target.value,
      errors: this.control.control.errors,
    });

    // Remove 'invalid' error.
    if (this.control.control.hasError('invalid')) delete this.control.control.errors.invalid;

    // If there is nothing to parse, `ClrDaterangeRequiredValidator` will take care of this.
    if (!target.value) return;

    const daterange = this.daterangeParsingService.parse(target.value, this.separatorText);
    const invalidDaterange: boolean = daterange == null || daterange.from == null || daterange.to == null;

    console.log('ClrDaterangepickerDirective.onChangeEvent.2', { daterange, invalidDaterange });

    // Invalid manual daterange specified.
    if (invalidDaterange) {
      this.control.control.setErrors({
        invalid: target.value,
      });
    }

    // Update selected daterange, but only notify when valid.
    this.daterangeService.updateSelectedDaterange(daterange, !invalidDaterange);
  }

  /**
   * Listen to focus event.
   */
  @HostListener('focus')
  public focusEvent(): void {
    this.controlStateService.focused = true;
  }

  /**
   * Listen to blur event.
   */
  @HostListener('blur')
  public blurEvent(): void {
    this.controlStateService.focused = false;
  }

  /**
   * Focus input.
   */
  public focus(): void {
    this.element.nativeElement.focus();
  }

  /**
   * Trigger events to notify form controls, trigger validation and update attributes/properties.
   */
  private triggerChange(): void {
    let daterange = this.daterangeService.selectedDaterange;
    console.log('ClrDaterangepickerDirective.triggerChange', { daterange });

    // When both `from` and `to` properties are not set, just return null.
    // This will trigger the `required` validator.
    if (daterange != null && daterange.from == null && daterange.to == null) {
      daterange = null;
    }

    // Mark control dirty.
    this.onTouched(daterange);
    // Update NgModel.
    this.onChanged(daterange);
    // Notify parent.
    this.valueChange.emit(daterange);
    // Update attributes/properties.
    this.updateInput();
  }

  /**
   * Update input with friendly daterange text.
   */
  private updateInput(): void {
    console.log('ClrDaterangepickerDirective.updateInput', {
      value: this.daterangeService.selectedDaterange,
    });
    const dateString = this.daterangeParsingService.toLocaleString(
      this.daterangeService.selectedDaterange,
      this.separatorText
    );
    this.renderer.setProperty(this.element.nativeElement, 'value', dateString);
  }

  /**
   * ControlValueAccessor method. Set value from NgModel.
   * @param value - Daterange value.
   */
  public writeValue(value: NullableDaterange) {
    console.log('ClrDaterangepickerDirective.writeValue', { value });
    this.daterangeService.updateSelectedDaterange(value);
  }

  /**
   * ControlValueAccessor method. Register change event. When value changes.
   * @param fn - Change event.
   */
  public registerOnChange(fn: (value: NullableDaterange) => void): void {
    console.log('ClrDaterangepickerDirective.registerOnChange', { fn });
    this.onChanged = fn;
  }
  private onChanged = (_value: NullableDaterange): void => undefined;

  /**
   * ControlValueAccessor method. Register touch event. When control is dirty.
   * @param fn - Touch event.
   */
  public registerOnTouched(fn: (value: NullableDaterange) => void): void {
    console.log('ClrDaterangepickerDirective.registerOnTouched', { fn });
    this.onTouched = fn;
  }
  private onTouched = (_value: NullableDaterange): void => undefined;

  /**
   * ControlValueAccessor method. Set disabled state.
   * @param disabled - Disabled state.
   */
  public setDisabledState(disabled: boolean): void {
    console.log('ClrDaterangepickerDirective.setDisabledState', { disabled });
    this.controlStateService.disabled = disabled;
  }
}
