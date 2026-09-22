import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { ClrFilterClearButtonModule } from '../util/filter-clear-button';
import { ClrNumericFilterComponent } from './numeric-filter.component';

@NgModule({
  imports: [ClarityModule, CommonModule, FormsModule, ClrFilterClearButtonModule],
  declarations: [ClrNumericFilterComponent],
  exports: [ClrNumericFilterComponent],
})
export class ClrNumericFilterModule {}
