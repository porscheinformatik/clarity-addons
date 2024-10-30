import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { ClrDateFilterComponent } from './date-filter.component';

@NgModule({
  imports: [ClarityModule, CommonModule, FormsModule],
  declarations: [ClrDateFilterComponent],
  exports: [ClrDateFilterComponent],
})
export class ClrDateFilterModule {}
