import {
  AfterViewInit,
  Component,
  ContentChild,
  HostBinding,
  Input,
  OnDestroy,
  Optional,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  calendarIcon,
  checkCircleIcon,
  ClarityIcons,
  exclamationCircleIcon,
  trashIcon,
  windowCloseIcon,
} from '@clr/angular/icon';
import {
  ClrCommonStrings,
  ClrCommonStringsService,
  ClrLayout,
  ClrPopoverPosition,
  ClrPopoverService,
} from '@clr/angular';
import { Subscription } from 'rxjs';

import { ControlIdService } from '../../../abstract-form-component/control-id.service';
import { TRANSLATIONS } from '../../daterange.constants';
import { DaterangePreset } from '../../interfaces/daterange-preset.interface';
import { NullableDaterange } from '../../interfaces/daterange.interface';
import { NullableDayModel } from '../../models/day.model';
import { DaterangeControlStateService } from '../../providers/daterange-control-state.service';
import { DaterangeParsingService } from '../../providers/daterange-parsing.service';
import { DaterangeService } from '../../providers/daterange.service';
import { ClrAbstractContainer } from '../abstract-container.component';
import { ClrDatepickerComponent } from '../datepicker/datepicker.component';
import { ClrDaterangepickerDirective } from '../daterangepicker/daterangepicker.directive';
import { DateTimerangePreset } from '../../interfaces/timerange-preset.interface';
import { NullableTimeModel } from '../../models/time.model';
import { NullableTimerange } from '../../interfaces/timerange.interface';

ClarityIcons.addIcons(calendarIcon, exclamationCircleIcon, checkCircleIcon, windowCloseIcon, trashIcon);

/**
 * Daterangepicker container.
 */
@Component({
  selector: 'clr-daterangepicker-container',
  templateUrl: './daterangepicker-container.component.html',
  styleUrls: ['./daterangepicker-container.component.scss'],
  providers: [ClrPopoverService, DaterangeControlStateService, DaterangeService, ControlIdService],
  standalone: false,
})
export class ClrDaterangepickerContainerComponent extends ClrAbstractContainer implements AfterViewInit, OnDestroy {
  /**
   * List of presets.
   */
  @Input()
  public presets: Array<DaterangePreset> = [];

  /**
   * List of time presets.
   */
  @Input()
  public presetsDateTime: Array<DateTimerangePreset> = [];

  _timeSelection = false;
  @Input()
  public set timeSelection(value: boolean) {
    this._timeSelection = !!value;
    this.daterangeService.timeActive = this._timeSelection;
  }

  _activateSeconds = false;
  @Input()
  public set activateSeconds(value: boolean) {
    this._activateSeconds = !!value;
    this.daterangeService.timeSecondsActive = this._activateSeconds;
  }

  /**
   * Popover position config.
   */
  @Input('clrPosition')
  public popoverPosition = ClrPopoverPosition.BOTTOM_LEFT;

  /**
   * Text for the 'from' label.
   */
  @Input()
  public labelFrom = TRANSLATIONS.from;

  /**
   * Text for the 'to' label.
   */
  @Input()
  public labelTo = TRANSLATIONS.to;

  /** List of datepicker components children. */
  @ViewChildren(ClrDatepickerComponent)
  private datepickerComponents!: QueryList<ClrDatepickerComponent>;

  /** Daterangepicker directive. */
  @ContentChild(ClrDaterangepickerDirective)
  private daterangepickerDirective!: ClrDaterangepickerDirective;

  /** CSS classes. */
  @HostBinding('class')
  public classes = 'clr-date-container';

  /**
   * Popover open state.
   */
  protected open = false;

  /**
   * Date from.
   * @returns Date from.
   */
  protected get dateFrom() {
    return this.daterangeService.selectedDaterange?.from;
  }

  protected get timeFrom() {
    return this.daterangeService.selectedDaterange
      ? (this.daterangeService.selectedDaterange as NullableTimerange).fromTime
      : null;
  }

  /**
   * Date to.
   * @returns Date to.
   */
  protected get dateTo() {
    return this.daterangeService.selectedDaterange?.to;
  }

  protected get timeTo() {
    return this.daterangeService.selectedDaterange
      ? (this.daterangeService.selectedDaterange as NullableTimerange).toTime
      : null;
  }

  /**
   * Minimum date that can be selected.
   * @returns Minimum date that can be selected.
   */
  protected get minDate(): NullableDayModel {
    return this.daterangeService.minDate;
  }

  /**
   * Maximum date that can be selected.
   * @returns Maximum date that can be selected.
   */
  protected get maxDate(): NullableDayModel {
    return this.daterangeService.maxDate;
  }

  private _friendlyDaterange?: string;
  /**
   * Get friendly daterange text.
   * @returns Friendly daterange text.
   */
  protected get friendlyDaterange(): string {
    return this._friendlyDaterange || this.commonStrings.datepickerToggleChooseDateLabel;
  }

  /**
   * List of common translation keys.
   */
  protected get commonStrings(): Readonly<ClrCommonStrings> {
    return this.clrCommonStringsService.keys;
  }

  /** List of subscriptions to later destroy. */
  private subscriptions: Array<Subscription> = [];

  public constructor(
    private readonly clrPopoverToggleService: ClrPopoverService,
    private readonly clrCommonStringsService: ClrCommonStringsService,
    @Optional() protected readonly clrLayout: ClrLayout,
    protected readonly daterangeControlStateService: DaterangeControlStateService,
    protected readonly daterangeService: DaterangeService,
    private readonly daterangeParsingService: DaterangeParsingService
  ) {
    super(clrLayout, daterangeControlStateService);
  }

  public ngAfterViewInit(): void {
    if (this.daterangepickerDirective == null) {
      throw new Error('`ClrDaterangepickerContainerComponent` requires an child `ClrDaterangepickerDirective`');
    }
    this.listenForDaterangeValueChanges();
    this.listenForPopoverToggleChanges();
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  /**
   * Listen for daterange value changes.
   */
  private listenForDaterangeValueChanges(): void {
    this.subscriptions.push(
      this.daterangeService.valueChange.subscribe((daterange: NullableDaterange) => {
        this._friendlyDaterange = this.daterangeParsingService.toLocaleString(
          daterange,
          this.daterangepickerDirective.separatorText
        );
      })
    );
  }

  /**
   * Listen for popover toggle changes.
   */
  private listenForPopoverToggleChanges(): void {
    this.subscriptions.push(
      this.clrPopoverToggleService.openChange.subscribe(opened => {
        // Focus first datepicker when popover opens.
        // Focus back to input when popover is closed.
        if (opened) {
          // Wait for the datepicker components to be rendered.
          requestAnimationFrame(() => {
            this.datepickerComponents.first.focus();
          });
        } else {
          this.daterangepickerDirective.focus();

          // When closing popover modal and daterange is not valid, reset model.
          if (!this.daterangeService.isValid()) {
            this.daterangeService.updateSelectedDaterange(null);
          }
        }
      })
    );
  }

  /**
   * Event triggered when date from changed.
   * @param value - Date from.
   */
  protected onDateFromChange(value: NullableDayModel): void {
    if (this.daterangeService.timeActive) {
      this.daterangeService.updateSelectedDaterange({
        from: value,
        to: this.dateTo,
        fromTime: this.timeFrom,
        toTime: this.timeTo,
      });
    } else {
      this.daterangeService.updateSelectedDaterange({
        from: value,
        to: this.dateTo,
      });
    }
  }

  /**
   * Event triggered when date to changed.
   * @param value - Date to.
   */
  protected onDateToChange(value: NullableDayModel): void {
    if (this.daterangeService.timeActive) {
      this.daterangeService.updateSelectedDaterange({
        from: this.dateFrom,
        to: value,
        fromTime: this.timeFrom,
        toTime: this.timeTo,
      });
    } else {
      this.daterangeService.updateSelectedDaterange({
        from: this.dateFrom,
        to: value,
      });
    }
  }

  /**
   * Apply selected preset.
   * @param preset - Selected preset.
   */
  protected applyPreset(preset: DaterangePreset): void {
    const range = preset.range();
    this.daterangeService.updateSelectedDaterange(range);

    // Close popover here, because it's not possible to conditionally
    // apply `clrPopoverCloseButton` directive on preset button.
    if (this.daterangeService.isValid()) {
      this.clrPopoverToggleService.open = false;
    }
  }

  applyPresetTime(preset: DateTimerangePreset) {
    const range = preset.range();
    this.daterangeService.updateSelectedDaterange(range);

    // Close popover here, because it's not possible to conditionally
    // apply `clrPopoverCloseButton` directive on preset button.
    if (this.daterangeService.isValid()) {
      this.clrPopoverToggleService.open = false;
    }
  }

  protected onTimeFromChange(value: NullableTimeModel) {
    this.daterangeService.updateSelectedDaterange({
      from: this.dateFrom,
      to: this.dateTo,
      fromTime: value,
      toTime: this.timeTo,
    });
  }

  protected onTimeToChange(value: NullableTimeModel) {
    this.daterangeService.updateSelectedDaterange({
      from: this.dateFrom,
      to: this.dateTo,
      fromTime: this.timeFrom,
      toTime: value,
    });
  }
}
