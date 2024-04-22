import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClrControlWarning } from './clr-control-warning.component';
import { IfWarning } from './if-warning.directive';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ClrControlWarning, IfWarning],
  exports: [ClrControlWarning, IfWarning, TranslateModule],
  imports: [CommonModule],
})
export class ClrControlWarningModule {}
