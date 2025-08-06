import { Component, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ClrDatagrid } from '@clr/angular';
import zipcelx, { ZipCelXConfig } from 'zipcelx';

export enum ExportTypeEnum {
  ALL = 'ALL',
  FILTERED = 'FILTERED',
  SELECTED = 'SELECTED',
}

interface ExportType {
  type: ExportTypeEnum;
  title: string;
}

@Component({
  selector: 'clr-export-datagrid-button',
  templateUrl: './export-datagrid-button.component.html',
  styleUrl: './export-datagrid-button.component.scss',
  standalone: false,
})
export class ExportDatagridButtonComponent {
  @Input() datagrid: ClrDatagrid | undefined;
  @Input() datagridRef?: ElementRef;
  @Input() exportTypesToShow?: ExportTypeEnum[];
  @Input() isBackendExport: boolean = false;
  @Input() exportTitlePrefix: string = 'exported-datagrid';
  @Input() exportButtonPosition: 'left' | 'right' = 'right';

  @Output() backendExport: EventEmitter<ExportTypeEnum> = new EventEmitter<ExportTypeEnum>();

  exportTypes: ExportType[] = [
    { type: ExportTypeEnum.ALL, title: 'All entries' },
    { type: ExportTypeEnum.FILTERED, title: 'Filtered entries' },
    { type: ExportTypeEnum.SELECTED, title: 'Selected entries' },
  ];

  get exportTypesFiltered(): ExportType[] {
    if (!this.exportTypesToShow || this.exportTypesToShow.length === 0) {
      return this.exportTypes;
    }
    return this.exportTypes.filter(et => this.exportTypesToShow.includes(et.type));
  }

  exportExcel(type: ExportTypeEnum) {
    if (!this.datagrid || !this.datagridRef) {
      return;
    }

    // Filter visible columns once
    const visibleColumns = this.datagrid.columns.filter(col => !col.isHidden);

    // Get header titles for visible columns only
    const headerRow = this.getColumnsTitle().map(title => ({
      value: title,
      type: 'string' as const,
    }));

    const rowsToExport = this.getRowsToExport(type);

    // Map data rows for visible columns only
    const dataRows = rowsToExport.map(row =>
      visibleColumns.map(col => ({
        value: String(row[col.field] ?? ''),
        type: col.colType,
      }))
    );

    const config: ZipCelXConfig = {
      filename: this.exportTitlePrefix + '.xlsx',
      sheet: {
        data: [headerRow, ...dataRows],
      },
    };

    zipcelx(config);
  }

  onExport(type: ExportTypeEnum) {
    if (this.isBackendExport) {
      this.backendExport.emit(type);
    } else {
      this.exportExcel(type);
    }
  }

  private getRowsToExport(type: ExportTypeEnum): any[] {
    switch (type) {
      case ExportTypeEnum.ALL:
        return this.datagrid?.items.all ?? [];
      case ExportTypeEnum.FILTERED:
        return this.datagrid?.items.displayed ?? [];
      case ExportTypeEnum.SELECTED:
        return this.datagrid?.selection.current ?? [];
      default:
        return [];
    }
  }

  private getColumnsTitle(): string[] {
    const nativeEl = this.datagridRef?.nativeElement as HTMLElement;
    const headerEls: NodeListOf<Element> | any[] =
      nativeEl?.querySelectorAll('clr-dg-column:not(.datagrid-hidden-column)') ?? [];
    const columnTitles: string[] = [];

    headerEls.forEach(columnEl => {
      const titleButton = columnEl.querySelector('button.datagrid-column-title');
      if (titleButton) {
        columnTitles.push(titleButton.textContent?.trim() ?? '');
      }
    });

    return columnTitles;
  }
}
