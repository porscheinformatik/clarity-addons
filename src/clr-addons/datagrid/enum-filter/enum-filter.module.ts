import { NgModule } from '@angular/core';
import { ClrEnumFilterComponent } from './enum-filter.component';

/**
 * @deprecated Compatibility wrapper for NgModule-based consumers. Import the standalone `ClrEnumFilterComponent` directly instead.
 */
@NgModule({
  imports: [ClrEnumFilterComponent],
  exports: [ClrEnumFilterComponent],
})
export class ClrEnumFilterModule {}
