import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule, ClrFormsModule } from '@clr/angular';
import { ClrAddonsModule } from '@porscheinformatik/clr-addons';
import { UtilsModule } from '../../../utils/utils.module';
import { DocWrapperModule } from '../_doc-wrapper/doc-wrapper.module';
import { DaterangepickerDemo } from './daterangepicker.demo';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
    ClrFormsModule,
    UtilsModule,
    DocWrapperModule,
    RouterModule.forChild([{ path: '', component: DaterangepickerDemo }]),
    ClrAddonsModule,
  ],
  declarations: [DaterangepickerDemo],
  exports: [DaterangepickerDemo],
})
export class DaterangepickerDemoModule {}
