import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule, ClrDatepickerModule, ClrIconModule } from '@clr/angular';

import { ClrDatepickerComponent } from './directives/datepicker/datepicker.component';
import { ClrDaterangepickerDirective } from './directives/daterangepicker/daterangepicker.directive';
import { ClrDaterangepickerContainerComponent } from './directives/daterangepicker-container/daterangepicker-container.component';
import { ClrIfDaterangeErrorDirective } from './directives/if-daterange-error.directive';
import { ClrDaterangeMaxValidator } from './validators/daterange-max.validator';
import { ClrDaterangeMinValidator } from './validators/daterange-min.validator';
import { ClrDaterangeOrderValidator } from './validators/daterange-order.validator';
import { ClrDaterangeRequiredValidator } from './validators/daterange-required.validator';

@NgModule({
  imports: [CommonModule, FormsModule, ClarityModule, ClrDatepickerModule, ClrIconModule],
  declarations: [
    ClrDatepickerComponent,
    ClrDaterangeMaxValidator,
    ClrDaterangeMinValidator,
    ClrDaterangeOrderValidator,
    ClrDaterangepickerContainerComponent,
    ClrDaterangepickerDirective,
    ClrDaterangeRequiredValidator,
    ClrIfDaterangeErrorDirective,
  ],
  entryComponents: [ClrDatepickerComponent],
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
