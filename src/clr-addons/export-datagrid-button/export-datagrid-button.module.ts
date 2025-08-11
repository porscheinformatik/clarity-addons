import { NgModule } from '@angular/core';
import { ExportDatagridButtonComponent } from './export-datagrid-button.component';
import { ExportDatagridService } from './export-datagrid.service';

@NgModule({
  imports: [ExportDatagridButtonComponent],
  exports: [ExportDatagridButtonComponent],
  providers: [ExportDatagridService],
})
export class ClrExportDatagridButtonModule {}
