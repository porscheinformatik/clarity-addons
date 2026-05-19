import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { DayModel, NullableDayModel } from '../../models/day.model';

@Component({
  selector: 'clr-datepicker',
  templateUrl: './datepicker.component.html',
  standalone: false,
})
export class ClrDatepickerComponent {
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

  @Input()
  public timeSelection = false;

  /**
   * Input control.
   */
  @ViewChild('inputElm')
  private inputElm!: ElementRef<HTMLInputElement>;

  /**
   * Event triggered when value changes.
   */
  @Output()
  public valueChange = new EventEmitter<NullableDayModel>();

  /**
   * Get date.
   * @returns JavaScript Date object.
   */
  protected get date(): Date | undefined | null {
    return this.value?.toDate();
  }

  /**
   * Set date.
   */
  protected set date(val: Date | undefined | null) {
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

  /**
   * Focus input.
   */
  public focus(): void {
    this.inputElm.nativeElement.focus();
  }
}
