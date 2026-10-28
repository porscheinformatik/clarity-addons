import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ClarityModule, ClrFormsModule } from '@clr/angular';

import { DaterangepickerDemo } from './daterangepicker.demo';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    ClrFormsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: DaterangepickerDemo }]),
    DaterangepickerDemo,
  ],
  exports: [DaterangepickerDemo],
})
export class DaterangepickerDemoModule {}
