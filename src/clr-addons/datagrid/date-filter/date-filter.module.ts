import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { ClrDateFilterComponent } from './date-filter.component';
import { ClrDateTimeModule } from '../../date-time-container';
import { ClrFormModule } from '../../abstract-form-component';

@NgModule({
  imports: [ClarityModule, CommonModule, FormsModule, ClrDateTimeModule, ClrFormModule],
  declarations: [ClrDateFilterComponent],
  exports: [ClrDateFilterComponent],
})
export class ClrDateFilterModule {}
