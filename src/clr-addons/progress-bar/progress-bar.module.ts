import { NgModule } from '@angular/core';
import { ProgressBarComponent } from './progress-bar.component';

/**
 * @deprecated Compatibility wrapper for NgModule-based consumers. Import the standalone `ProgressBarComponent` directly instead.
 */
@NgModule({
  imports: [ProgressBarComponent],
  exports: [ProgressBarComponent],
})
export class ClrProgressBarModule {}
