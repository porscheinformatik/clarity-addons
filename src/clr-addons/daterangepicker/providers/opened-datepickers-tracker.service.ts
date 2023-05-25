import { EventEmitter, Injectable } from '@angular/core';

/**
 * Keeps track of how many Clarity Datepicker there are open.
 * This is needed for the ClrDaterangepickerContainerComponent, to know when to close the popover.
 */
@Injectable({ providedIn: 'root' })
export class OpenedDatepickersTrackerService {
  private openedDatepickersCount = 0;

  /**
   * Event triggered when value changes.
   */
  public valueChange = new EventEmitter<boolean>();

  /**
   * Tracks an opened datepicker.
   * @param opened - Opened state.
   */
  public track(opened: boolean): void {
    if (opened) {
      this.openedDatepickersCount++;
    } else {
      this.openedDatepickersCount--;
    }
    this.openedDatepickersCount = Math.max(0, this.openedDatepickersCount);
    this.valueChange.emit(this.openedDatepickersCount !== 0);
  }
}
