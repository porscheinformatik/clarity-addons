import { NgModule } from '@angular/core';
import { CircleProgressBarComponent } from './circle-progress-bar.component';

/**
 * @deprecated Compatibility wrapper for NgModule-based consumers. Import the standalone `CircleProgressBarComponent` directly instead.
 */
@NgModule({
  imports: [CircleProgressBarComponent],
  exports: [CircleProgressBarComponent],
})
export class ClrProgressCircleModule {}
