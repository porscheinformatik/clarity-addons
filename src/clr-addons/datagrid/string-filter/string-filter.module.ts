import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { ClrFilterClearButtonModule } from '../util/filter-clear-button';
import { ClrStringFilterComponent } from './string-filter.component';

@NgModule({
  imports: [ClarityModule, CommonModule, FormsModule, ClrFilterClearButtonModule],
  declarations: [ClrStringFilterComponent],
  exports: [ClrStringFilterComponent],
})
export class ClrStringFilterModule {}
