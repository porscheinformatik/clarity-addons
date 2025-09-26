import { NgModule } from '@angular/core';
import { ExportableDatagridComponent } from './exportable-datagrid.component';
import { RouterModule } from '@angular/router';
import { ClrDatagridModule } from '@clr/angular';
import { CommonModule } from '@angular/common';
import { ClrAddonsModule, ClrExportDatagridButtonModule } from '@porscheinformatik/clr-addons';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ExportableDatagridComponent }]),
    ClrDatagridModule,
    ClrAddonsModule,
    ClrExportDatagridButtonModule,
  ],
  declarations: [ExportableDatagridComponent],
  exports: [ExportableDatagridComponent],
})
export class ExportableDatagridModule {}
