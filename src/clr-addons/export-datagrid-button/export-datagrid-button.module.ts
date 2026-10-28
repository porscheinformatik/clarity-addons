import { NgModule } from '@angular/core';
import { ExportDatagridButtonComponent } from './export-datagrid-button.component';
import { ExportDatagridService } from './export-datagrid.service';

/**
 * @deprecated Compatibility wrapper for NgModule-based consumers. Import the standalone `ExportDatagridButtonComponent` directly and provide `ExportDatagridService` yourself.
 */
@NgModule({
  imports: [ExportDatagridButtonComponent],
  exports: [ExportDatagridButtonComponent],
  providers: [ExportDatagridService],
})
export class ClrExportDatagridButtonModule {}
