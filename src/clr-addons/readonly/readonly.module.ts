import { NgModule } from '@angular/core';
import { ClrReadonlyDirective } from './readonly.directive';

/**
 * @deprecated Compatibility wrapper for NgModule-based consumers. Import the standalone `ClrReadonlyDirective` directly instead.
 */
@NgModule({
  imports: [ClrReadonlyDirective],
  exports: [ClrReadonlyDirective],
})
export class ClrReadonlyDirectiveModule {}
