import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { ClrEnumFilterComponent } from './enum-filter.component';

@NgModule({
  imports: [ClarityModule, CommonModule, FormsModule],
  declarations: [ClrEnumFilterComponent],
  exports: [ClrEnumFilterComponent],
})
export class ClrEnumFilterModule {}
