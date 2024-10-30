import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { ClrDateFilterComponent } from './date-filter.component';
import { ClrDateTimeModule } from '../../date-time-container';
import { ClrAutocompleteOffModule } from '../../autocomplete-off';
import { ClrFormModule } from '../../abstract-form-component';

@NgModule({
  imports: [ClarityModule, CommonModule, FormsModule, ClrDateTimeModule, ClrAutocompleteOffModule, ClrFormModule],
  declarations: [ClrDateFilterComponent],
  exports: [ClrDateFilterComponent],
})
export class ClrDateFilterModule {}
