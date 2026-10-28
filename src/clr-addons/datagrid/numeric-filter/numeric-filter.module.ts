import { NgModule } from '@angular/core';
import { ClrNumericFilterComponent } from './numeric-filter.component';

/**
 * @deprecated Compatibility wrapper for NgModule-based consumers. Import the standalone `ClrNumericFilterComponent` directly instead.
 */
@NgModule({
  imports: [ClrNumericFilterComponent],
  exports: [ClrNumericFilterComponent],
})
export class ClrNumericFilterModule {}
