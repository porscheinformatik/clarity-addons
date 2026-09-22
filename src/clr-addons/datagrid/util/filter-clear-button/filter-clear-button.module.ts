import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { ClrFilterClearButtonComponent } from './filter-clear-button.component';

@NgModule({
  imports: [ClarityModule, CommonModule],
  declarations: [ClrFilterClearButtonComponent],
  exports: [ClrFilterClearButtonComponent],
})
export class ClrFilterClearButtonModule {}
