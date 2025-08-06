import { NgModule } from '@angular/core';
import { ExportDatagridButtonComponent } from './export-datagrid-button.component';
import { ClarityModule } from '@clr/angular';
import { NgClass, NgForOf, NgIf } from '@angular/common';

@NgModule({
  imports: [ClarityModule, NgIf, NgForOf, NgClass],
  declarations: [ExportDatagridButtonComponent],
  exports: [ExportDatagridButtonComponent],
})
export class ExportDatagridButtonModule {}
