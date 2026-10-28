import { NgModule } from '@angular/core';
import { ClrIfWarning } from './if-warning.directive';
import { ClarityIcons, exclamationTriangleIcon } from '@clr/angular';

ClarityIcons.addIcons(exclamationTriangleIcon);

/**
 * @deprecated Compatibility wrapper for NgModule-based consumers. Import the standalone `ClrIfWarning` directly instead.
 */
@NgModule({
  imports: [ClrIfWarning],
  exports: [ClrIfWarning],
})
export class ClrIfWarningModule {}
