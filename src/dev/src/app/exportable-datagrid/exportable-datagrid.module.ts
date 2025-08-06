import { NgModule } from '@angular/core';
import { ExportableDatagridComponent } from './exportable-datagrid.component';
import { RouterModule } from '@angular/router';
import { ClrDatagridModule, ClrDropdownModule } from '@clr/angular';
import { NgForOf } from '@angular/common';
import { ExportDatagridButtonModule } from '../../../../clr-addons/export-datagrid-button';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ExportableDatagridComponent }]),
    ClrDatagridModule,
    ClrDropdownModule,
    NgForOf,
    ExportDatagridButtonModule,
  ],
  declarations: [ExportableDatagridComponent],
  exports: [ExportableDatagridComponent],
})
export class ExportableDatagridModule {}
