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
import { DaterangeControlStateService } from '../../providers/daterange-control-state.service';
import { ControlIdService } from '../../../abstract-form-component/control-id.service';
import { NullableTimerange } from '../../interfaces/timerange.interface';
import { TimeModel } from '../../models/time.model';

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
  public set min(value: string | undefined | null) {
    this.daterangeService.minDate = !value ? null : new DayModel(value);
  }

  /**
   * Maximum date that can be selected.
   */
  @Input()
  public set max(value: string | undefined | null) {
    this.daterangeService.maxDate = !value ? null : new DayModel(value);
  }

  /**
   * Locale text between 'from' and 'to' dateranges.
   */
  @Input()
  public separatorText: string = SEPARATOR_TEXT_DEFAULT;

  regex = /^[0-9]+[mhdw]$/;
  regexW = /^[0-9]+w$/;
  regexH = /^[0-9]+h$/;
  regexD = /^[0-9]+d$/;
  regexM = /^[0-9]+m$/;

  /**
   * Placeholder text.
   *
   * It is recommend against overriding the automatically generated placeholder.
   * Adding an incorrect placeholder will create confusion while entering the daterange in the input.
   */
  @Input() public placeholder: string;

  @HostBinding('attr.placeholder')
  public get placeholderText(): string {
    if (this.daterangeService.timeActive) {
      return (
        this.placeholder ??
        this.daterangeParsingService.localeFormat +
          ' hh:mm' +
          (this.daterangeService.timeSecondsActive ? ':ss' : '') +
          this.separatorText +
          this.daterangeParsingService.localeFormat +
          ' hh:mm' +
          (this.daterangeService.timeSecondsActive ? ':ss' : '')
      );
    }
    return (
      this.placeholder ??
      this.daterangeParsingService.localeFormat + this.separatorText + this.daterangeParsingService.localeFormat
    );
  }

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
    this.daterangeControlStateService.disabled = value;
  }

  /**
   * Disabled state.
   * @returns Disabled state.
   */
  public get disabled() {
    return this.daterangeControlStateService.disabled;
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
    private readonly daterangeControlStateService: DaterangeControlStateService,
    private readonly controlIdService: ControlIdService,
    private readonly daterangeService: DaterangeService,
    private readonly daterangeParsingService: DaterangeParsingService
  ) {
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
        this.triggerChange();
      })
    );
  }

  /**
   * Listen for control status changes.
   */
  private listenForControlStatusChanges(): void {
    this.subscriptions.push(
      this.control.statusChanges.subscribe((_status: unknown) => {
        this.daterangeControlStateService.updateStatus(this.control.control);
      })
    );
  }

  /**
   * Listen to manual changes to the input.
   * @param target - Input element.
   */
  @HostListener('change', ['$event.target'])
  public onChangeEvent(target: HTMLInputElement): void {
    // Remove 'invalid' error.
    if (this.control.control.hasError('invalid')) {
      delete this.control.control.errors.invalid;
    }
    if (!target) {
      return;
    }

    if (target.value && this.regex.test(target.value)) {
      // handle easy access
      this.handleEasyAccess(target.value);
      return;
    }

    // If there is nothing to parse, `ClrDaterangeRequiredValidator` will take care of this.
    if (!target.value) {
      this.daterangeService.updateSelectedDaterange(null, true);
      return;
    }

    const daterange = this.daterangeParsingService.parse(target.value, this.separatorText);
    const invalidDaterange: boolean = daterange == null || daterange.from == null || daterange.to == null;

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
    this.daterangeControlStateService.focused = true;
  }

  /**
   * Listen to blur event.
   */
  @HostListener('blur')
  public blurEvent(): void {
    this.daterangeControlStateService.focused = false;
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

    // When `from` or `to` properties are not set, return null.
    // This will trigger the `required` validator (if present).
    if (!this.daterangeService.isValid()) {
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
    let dateString;
    if (this.daterangeService.timeActive) {
      if (
        this.daterangeService.selectedDaterange &&
        Object.prototype.hasOwnProperty.call(this.daterangeService.selectedDaterange, 'fromTime')
      ) {
        this.daterangeService.updateSelectedDaterange(
          this.daterangeService.selectedDaterange
            ? (this.daterangeService.selectedDaterange as NullableTimerange)
            : null,
          false
        );
      }
      dateString = this.daterangeParsingService.toLocaleStringWithTime(
        this.daterangeService.selectedDaterange,
        this.separatorText
      );
    } else {
      dateString = this.daterangeParsingService.toLocaleString(
        this.daterangeService.selectedDaterange,
        this.separatorText
      );
    }
    this.renderer.setProperty(this.element.nativeElement, 'value', dateString);
  }

  /**
   * ControlValueAccessor method. Set value from NgModel.
   * @param value - Daterange value.
   */
  public writeValue(value: NullableDaterange) {
    this.daterangeService.updateSelectedDaterange(value);
  }

  /**
   * ControlValueAccessor method. Register change event. When value changes.
   * @param fn - Change event.
   */
  public registerOnChange(fn: (value: NullableDaterange) => void): void {
    this.onChanged = fn;
  }

  private onChanged = (_value: NullableDaterange): void => undefined;

  /**
   * ControlValueAccessor method. Register touch event. When control is dirty.
   * @param fn - Touch event.
   */
  public registerOnTouched(fn: (value: NullableDaterange) => void): void {
    this.onTouched = fn;
  }

  private onTouched = (_value: NullableDaterange): void => undefined;

  /**
   * ControlValueAccessor method. Set disabled state.
   * @param disabled - Disabled state.
   */
  public setDisabledState(disabled: boolean): void {
    this.daterangeControlStateService.disabled = disabled;
  }

  private handleEasyAccess(value: string) {
    const now = new Date();
    if (this.regexW.test(value)) {
      value = value.replace('w', '');
      now.setDate(now.getDate() - Number(value) * 7);
      this.daterangeService.updateSelectedDaterange(
        {
          from: new DayModel(now),
          to: new DayModel(new Date()),
        },
        true
      );
    } else if (this.regexD.test(value)) {
      value = value.replace('d', '');
      now.setDate(now.getDate() - Number(value));
      this.daterangeService.updateSelectedDaterange(
        {
          from: new DayModel(now),
          to: new DayModel(new Date()),
        },
        true
      );
    } else if (this.regexH.test(value)) {
      value = value.replace('h', '');
      this.daterangeService.updateSelectedDaterange(
        {
          from: new DayModel(new Date()),
          to: new DayModel(new Date()),
          fromTime: new TimeModel(new Date(new Date().getTime() - Number(value) * 3600000)),
          toTime: new TimeModel(new Date()),
        },
        true
      );
    } else if (this.regexM.test(value)) {
      value = value.replace('m', '');
      this.daterangeService.updateSelectedDaterange(
        {
          from: new DayModel(new Date()),
          to: new DayModel(new Date()),
          fromTime: new TimeModel(new Date(new Date().getTime() - Number(value) * 60000)),
          toTime: new TimeModel(new Date()),
        },
        true
      );
    }
  }
}
