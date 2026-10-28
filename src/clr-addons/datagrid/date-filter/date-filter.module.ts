import { NgModule } from '@angular/core';
import { ClrDateFilterComponent } from './date-filter.component';

/**
 * @deprecated Compatibility wrapper for NgModule-based consumers. Import the standalone `ClrDateFilterComponent` directly instead.
 */
@NgModule({
  imports: [ClrDateFilterComponent],
  exports: [ClrDateFilterComponent],
})
export class ClrDateFilterModule {}
