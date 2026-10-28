import { NgModule } from '@angular/core';

import { ClrDaterangepickerContainerComponent } from './directives/daterangepicker-container/daterangepicker-container.component';
import { ClrDaterangepickerDirective } from './directives/daterangepicker/daterangepicker.directive';
import { ClrIfDaterangeErrorDirective } from './directives/if-daterange-error.directive';
import { ClrDaterangeMaxValidator } from './validators/daterange-max.validator';
import { ClrDaterangeMinValidator } from './validators/daterange-min.validator';
import { ClrDaterangeOrderValidator } from './validators/daterange-order.validator';
import { ClrDaterangeRequiredValidator } from './validators/daterange-required.validator';

/**
 * @deprecated Compatibility wrapper for NgModule-based consumers. Import the standalone `ClrDaterangeMaxValidator`, `ClrDaterangeMinValidator`, `ClrDaterangeOrderValidator`, `ClrDaterangepickerContainerComponent`, `ClrDaterangepickerDirective`, `ClrDaterangeRequiredValidator`, `ClrIfDaterangeErrorDirective` directly instead.
 */
@NgModule({
  imports: [
    ClrDaterangeMaxValidator,
    ClrDaterangeMinValidator,
    ClrDaterangeOrderValidator,
    ClrDaterangepickerContainerComponent,
    ClrDaterangepickerDirective,
    ClrDaterangeRequiredValidator,
    ClrIfDaterangeErrorDirective,
  ],
  exports: [
    ClrDaterangeMaxValidator,
    ClrDaterangeMinValidator,
    ClrDaterangeOrderValidator,
    ClrDaterangepickerContainerComponent,
    ClrDaterangepickerDirective,
    ClrDaterangeRequiredValidator,
    ClrIfDaterangeErrorDirective,
  ],
})
export class ClrDaterangepickerModule {}
