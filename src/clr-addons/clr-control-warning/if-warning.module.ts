import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClrIfWarning } from './if-warning.directive';
import { ClarityIcons, exclamationTriangleIcon } from '@cds/core/icon';

ClarityIcons.addIcons(exclamationTriangleIcon);

@NgModule({
  declarations: [ClrIfWarning],
  imports: [CommonModule],
  exports: [ClrIfWarning],
})
export class ClrIfWarningModule {}
