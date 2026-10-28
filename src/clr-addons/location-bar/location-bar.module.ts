import { NgModule } from '@angular/core';
import { LocationBarComponent } from './location-bar.component';

/**
 * @deprecated Compatibility wrapper for NgModule-based consumers. Import the standalone `LocationBarComponent` directly instead.
 */
@NgModule({
  imports: [LocationBarComponent],
  exports: [LocationBarComponent],
})
export class ClrLocationBarModule {}
