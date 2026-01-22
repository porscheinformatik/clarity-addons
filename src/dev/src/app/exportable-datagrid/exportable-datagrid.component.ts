import { Component, ElementRef, ViewChild } from '@angular/core';
import { ClrDatagrid } from '@clr/angular';
import { ExportDatagridService, ExportType, ExportTypeEnum } from '@porscheinformatik/clr-addons';

enum StatusEnum {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

interface ExportableEntry {
  column1: string;
  column2: string;
  column3: string;
  column4: string;
  status: StatusEnum;
}

@Component({
  selector: 'app-exportable-datagrid',
  templateUrl: './exportable-datagrid.component.html',
  standalone: false,
})
export class ExportableDatagridComponent {
  exportableEntries: ExportableEntry[] = [
    { column1: 'A1', column2: 'B1', column3: 'C1', column4: 'D1', status: StatusEnum.ACTIVE },
    { column1: 'A2', column2: 'B2', column3: 'C2', column4: 'D2', status: StatusEnum.ACTIVE },
    { column1: 'A3', column2: 'B3', column3: 'C3', column4: 'D3', status: StatusEnum.ACTIVE },
    { column1: 'A4', column2: 'B4', column3: 'C4', column4: 'D4', status: StatusEnum.ACTIVE },
    { column1: 'A5', column2: 'B5', column3: 'C5', column4: 'D5', status: StatusEnum.ACTIVE },
    { column1: 'A6', column2: 'B6', column3: 'C6', column4: 'D6', status: StatusEnum.ACTIVE },
    { column1: 'A7', column2: 'B7', column3: 'C7', column4: 'D7', status: StatusEnum.ACTIVE },
    { column1: 'A8', column2: 'B8', column3: 'C8', column4: 'D8', status: StatusEnum.ACTIVE },
    { column1: 'A9', column2: 'B9', column3: 'C9', column4: 'D9', status: StatusEnum.INACTIVE },
    { column1: 'A10', column2: 'B10', column3: 'C10', column4: 'D10', status: StatusEnum.INACTIVE },
    { column1: 'A11', column2: 'B11', column3: 'C11', column4: 'D11', status: StatusEnum.INACTIVE },
    { column1: 'A12', column2: 'B12', column3: 'C12', column4: 'D12', status: StatusEnum.INACTIVE },
  ];

  selected: ExportableEntry[] = [];
  exportType: ExportType[] = [
    {
      type: ExportTypeEnum.ALL,
      value: 'Translated all entries',
    },
    {
      type: ExportTypeEnum.FILTERED,
    },
    {
      type: ExportTypeEnum.SELECTED,
      value: 'Translated selected entries',
    },
  ];

  constructor(private readonly exportService: ExportDatagridService) {}

  @ViewChild('datagrid', { static: false }) datagrid: ClrDatagrid | undefined;
  @ViewChild('datagrid', { static: false, read: ElementRef }) datagridRef?: ElementRef;

  onBackendExport(type: ExportTypeEnum): void {
    console.log('Exporting data for type: ', type);
    // example on how to provide data for backend export
    const columns = this.exportableEntries.length > 0 ? Object.keys(this.exportableEntries[0]) : [];
    const headerRow = columns.map(col => ({ value: col, type: 'string' }));
    const dataRows = this.exportableEntries.map(entry =>
      columns.map(col => ({ value: entry[col as keyof ExportableEntry], type: 'string' }))
    );

    this.exportService.exportToExcel('backend-export', headerRow, dataRows);
  }
}
