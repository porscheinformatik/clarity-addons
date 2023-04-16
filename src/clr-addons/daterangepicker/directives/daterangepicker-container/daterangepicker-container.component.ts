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
import { calendarIcon, checkCircleIcon, ClarityIcons, exclamationCircleIcon, windowCloseIcon } from '@cds/core/icon';
import '@cds/core/icon/register.js';
import {
  ClrCommonStrings,
  ClrCommonStringsService,
  ClrLayout,
  ClrPopoverEventsService,
  ClrPopoverPosition,
  ClrPopoverPositionService,
  ClrPopoverToggleService,
} from '@clr/angular';
import { Subscription } from 'rxjs';

import { NullableDaterange } from '../../interfaces/daterange.interface';
import { DaterangePreset } from '../../interfaces/daterange-preset.interface';
import { NullableDayModel } from '../../models/day.model';
import { PopoverPositions } from '../../models/popover-positions.model';
import { DaterangeService } from '../../providers/daterange.service';
import { DaterangeParsingService } from '../../providers/daterange-parsing.service';
import { OpenedDatepickersTrackerService } from '../../providers/opened-datepickers-tracker.service';
import { ClrDatepickerComponent } from '../datepicker/datepicker.component';
import { ClrDaterangepickerDirective } from '../daterangepicker/daterangepicker.directive';
import { DaterangeControlStateService } from '../../providers/daterange-control-state.service';
import { ClrAbstractContainer } from '../abstract-container.component';
import { ControlIdService } from '../../../abstract-form-component/control-id.service';

ClarityIcons.addIcons(calendarIcon, exclamationCircleIcon, checkCircleIcon, windowCloseIcon);

/**
 * Daterangepicker container.
 */
@Component({
  selector: 'clr-daterangepicker-container',
  templateUrl: './daterangepicker-container.component.html',
  styleUrls: ['./daterangepicker-container.component.scss'],
  providers: [
    ClrPopoverToggleService,
    ClrPopoverEventsService,
    ClrPopoverPositionService,
    DaterangeControlStateService,
    DaterangeService,
    OpenedDatepickersTrackerService,
    ControlIdService,
  ],
})
export class ClrDaterangepickerContainerComponent extends ClrAbstractContainer implements AfterViewInit, OnDestroy {
  /**
   * List of presets.
   */
  @Input()
  public presets: Array<DaterangePreset> = [];

  /**
   * Set popover position.
   */
  @Input()
  public set clrPosition(position: string) {
    if (position && (PopoverPositions as Record<string, any>)[position]) {
      this.popoverPosition = (PopoverPositions as Record<string, any>)[position];
    }
  }

  /**
   * Text for the 'from' label.
   */
  @Input()
  public labelFrom = 'From';

  /**
   * Text for the 'to' label.
   */
  @Input()
  public labelTo = 'To';

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
   * Popover position config.
   */
  protected popoverPosition: ClrPopoverPosition = PopoverPositions['bottom-left'];

  /**
   * Date from.
   * @returns Date from.
   */
  protected get dateFrom() {
    return this.daterangeService.selectedDaterange?.from;
  }

  /**
   * Date to.
   * @returns Date to.
   */
  protected get dateTo() {
    return this.daterangeService.selectedDaterange?.to;
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
    private readonly clrPopoverEventsService: ClrPopoverEventsService,
    private readonly clrPopoverToggleService: ClrPopoverToggleService,
    private readonly clrCommonStringsService: ClrCommonStringsService,
    @Optional() protected readonly clrLayout: ClrLayout,
    protected readonly daterangeControlStateService: DaterangeControlStateService,
    private readonly openedDatepickersTrackerService: OpenedDatepickersTrackerService,
    private readonly daterangeService: DaterangeService,
    private readonly daterangeParsingService: DaterangeParsingService
  ) {
    super(clrLayout, daterangeControlStateService);
  }

  public ngAfterViewInit(): void {
    if (this.daterangepickerDirective == null) {
      throw new Error('`ClrDaterangepickerContainerComponent` requires an child `ClrDaterangepickerDirective`');
    }

    this.listenForDaterangeValueChanges();
    this.listenForOpenedDatepickersTrackerChanges();
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
        console.log('ClrDaterangepickerContainerComponent.listenForDaterangeValueChanges.valueChange', {
          daterange,
        });

        this._friendlyDaterange = this.daterangeParsingService.toLocaleString(
          daterange,
          this.daterangepickerDirective.separatorText
        );
      })
    );
  }

  /**
   * Listen for any opened datepickers tracker state changes.
   */
  private listenForOpenedDatepickersTrackerChanges(): void {
    this.subscriptions.push(
      this.openedDatepickersTrackerService.valueChange.subscribe(hasOpenDatePickers => {
        console.log('ClrDaterangepickerContainerComponent.listenForOpenedDatepickersTrackerChanges.valueChange', {
          hasOpenDatePickers,
          outsideClickClose: this.clrPopoverEventsService.outsideClickClose,
          outsideClickCloseNEW: !hasOpenDatePickers,
        });

        // When choosing an date in the DatePicker calender, all popovers are closed. Even our own popover.
        // Therefor we have to remove the ability to close our own popover.
        // Simply changing the `outsideClickClose` property after initialization does nothing.
        // We need to manually remove the listener, change the `outsideClickClose` property and re-attach the click listener.
        // Steps to reproduce with 2 daterangepickers:
        // 1. Click on second daterangepicker action icon to open the popover.
        // 2. Click on one of the datepickers to open calender.
        // 3. Close datepicker.
        // 4. Click on first daterangepicker action icon. Error.
        this.clrPopoverEventsService.removeClickListener();
        this.clrPopoverEventsService.outsideClickClose = !hasOpenDatePickers;
        // We need to wait before we attach the click listener.
        requestAnimationFrame(() => {
          this.clrPopoverEventsService.addClickListener();
        });
      })
    );
  }

  /**
   * Listen for popover toggle changes.
   */
  private listenForPopoverToggleChanges(): void {
    this.subscriptions.push(
      this.clrPopoverToggleService.openChange.subscribe(opened => {
        console.log('ClrDaterangepickerContainerComponent.listenForPopoverToggleChanges.openChange', {
          opened,
          outsideClickClose: this.clrPopoverEventsService.outsideClickClose,
          datepickerComponents: this.datepickerComponents,
          datepickerComponents1: this.datepickerComponents?.first,
          daterangepickerDirective: this.daterangepickerDirective,
        });

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
    console.log('ClrDaterangepickerContainerComponent.onDateFromChange', {
      value,
    });
    this.daterangeService.updateSelectedDaterange({
      from: value,
      to: this.dateTo,
    });
  }

  /**
   * Event triggered when date to changed.
   * @param value - Date to.
   */
  protected onDateToChange(value: NullableDayModel): void {
    console.log('ClrDaterangepickerContainerComponent.onDateToChange', {
      value,
    });
    this.daterangeService.updateSelectedDaterange({
      from: this.dateFrom,
      to: value,
    });
  }

  /**
   * Apply selected preset.
   * @param preset - Selected preset.
   */
  protected applyPreset(preset: DaterangePreset): void {
    const range = preset.range();
    console.log('ClrDaterangepickerContainerComponent.applyPreset', {
      preset,
      range,
    });
    this.daterangeService.updateSelectedDaterange(range);

    // Close popover here, because it's not possible to conditionally
    // apply `clrPopoverCloseButton` directive on preset button.
    if (this.daterangeService.isValid()) {
      this.clrPopoverToggleService.open = false;
    }
  }
}
