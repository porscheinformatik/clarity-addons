import { AfterContentInit, contentChild, Directive } from '@angular/core';
import { ClrEndDateInput, ClrStartDateInput } from '@clr/angular';

@Directive({
  selector: 'clr-date-range-container[cngTenantFullDateRange]',
  standalone: true,
})
export class TenantFullDateRangeDirective implements AfterContentInit {
  private readonly start = contentChild(ClrStartDateInput);
  private readonly end = contentChild(ClrEndDateInput);

  public ngAfterContentInit(): void {
    if (this.start()) {
      const originalStartEmit = this.start().dateChange.emit.bind(this.start().dateChange);
      this.start().dateChange.emit = date => {
        originalStartEmit(this.toTenantDateTime(date, '00:00'));
      };
    }

    if (this.end()) {
      const originalEndEmit = this.end().dateChange.emit.bind(this.end().dateChange);
      this.end().dateChange.emit = date => {
        originalEndEmit(this.toTenantDateTime(date, '23:59'));
      };
    }
  }

  private toTenantDateTime(date: Date, time: string): Date {
    if (!date) {
      return date;
    }
    const [hours, minutes] = time.split(':').map(Number);
    const result = new Date(date);
    result.setHours(hours, minutes, 0, 0);
    return result;
  }
}
