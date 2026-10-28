import { NgModule } from '@angular/core';
import { ClrStringFilterComponent } from './string-filter.component';

/**
 * @deprecated Compatibility wrapper for NgModule-based consumers. Import the standalone `ClrStringFilterComponent` directly instead.
 */
@NgModule({
  imports: [ClrStringFilterComponent],
  exports: [ClrStringFilterComponent],
})
export class ClrStringFilterModule {}
