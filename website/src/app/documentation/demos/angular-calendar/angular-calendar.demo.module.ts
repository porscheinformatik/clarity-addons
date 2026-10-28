import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule, ClrFormsModule } from '@clr/angular';
import { UtilsModule } from '../../../utils/utils.module';
import { DocWrapperModule } from '../_doc-wrapper/doc-wrapper.module';
import { AngularCalendarDemo } from './angular-calendar.demo';
import { HttpClientModule } from '@angular/common/http';
import { DateAdapter, provideCalendar } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
    ClrFormsModule,
    UtilsModule,
    DocWrapperModule,
    RouterModule.forChild([{ path: '', component: AngularCalendarDemo }]),
    AngularCalendarDemo,
  ],
  exports: [AngularCalendarDemo],
  providers: [provideCalendar({ provide: DateAdapter, useFactory: adapterFactory })],
})
export class AngularCalendarDemoModule {}
