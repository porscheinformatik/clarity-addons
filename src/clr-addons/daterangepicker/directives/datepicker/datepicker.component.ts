import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ClrDateContainer, ClrPopoverToggleService } from '@clr/angular';
import { Subscription } from 'rxjs';

import { DayModel, NullableDayModel } from '../../models/day.model';
import { OpenedDatepickersTrackerService } from '../../providers/opened-datepickers-tracker.service';

@Component({
  selector: 'clr-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class ClrDatepickerComponent implements AfterViewInit, OnDestroy {
  /**
   * Input value.
   */
  @Input()
  public value: NullableDayModel;

  /**
   * Text label.
   */
  @Input()
  public label = 'Date';

  /**
   * Minimum date that can be selected.
   */
  @Input()
  public minDate: NullableDayModel = undefined;

  /**
   * Maximum date that can be selected.
   */
  @Input()
  public maxDate: NullableDayModel = undefined;

  @ViewChild('input', { static: false })
  private input: ElementRef<any>;

  @ViewChildren(ClrDateContainer)
  private dateComponents: QueryList<ClrDateContainer>;

  /**
   * Event triggered when value changes.
   */
  @Output()
  public valueChange = new EventEmitter<NullableDayModel>();

  /**
   * Disabled state.
   */
  protected disabled = false;

  /**
   * Get date.
   * @returns JavaScript Date object.
   */
  protected get date(): Date | undefined | null {
    //console.log('ClrDatepickerComponent.date.get', { value: this.value, date: this.value?.date });
    return this.value?.toDate();
  }

  /**
   * Set date.
   */
  protected set date(val: Date | undefined | null) {
    //console.log('ClrDatepickerComponent.date.set', { val, date: val?.getDate() });
    this.value = val == null ? null : new DayModel(val);
    this.valueChange.emit(this.value);
  }

  /**
   * Minimum date as attribute string.
   * @returns Minimum date as attribute string.
   */
  protected get minDateAttr(): string | undefined | null {
    return this.minDate?.toHTML5SpecDateString();
  }

  /**
   * Maximum date as attribute string.
   * @returns Maximum date as attribute string.
   */
  protected get maxDateAttr(): string | undefined | null {
    return this.maxDate?.toHTML5SpecDateString();
  }

  /** List of subscriptions to later destroy. */
  private subscriptions: Array<Subscription> = [];

  public constructor(private readonly openedDatepickersTrackerService: OpenedDatepickersTrackerService) {}

  public ngAfterViewInit(): void {
    // eslint-disable-next-line dot-notation -- Need access to this private property.
    const toggleService = this.dateComponents.first['toggleService'] as ClrPopoverToggleService;
    this.subscriptions.push(
      toggleService.openChange.subscribe(openState => {
        console.log('ClrDatepickerComponent.toggleService.openChange', { openState });
        this.openedDatepickersTrackerService.track(openState);
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  /**
   * Reset value.
   */
  public resetValue(): void {
    this.input.nativeElement.value = '';
  }

  /**
   * Focus input.
   */
  public focus(): void {
    this.input.nativeElement.focus();
  }

  /**
   * Disable control.
   */
  public disable(): void {
    this.disabled = true;
  }

  /**
   * Enable control.
   */
  public enable(): void {
    this.disabled = false;
  }
}
