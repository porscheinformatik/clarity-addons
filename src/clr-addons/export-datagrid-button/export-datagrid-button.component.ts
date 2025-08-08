import { Component, Output, EventEmitter, input, ElementRef, computed } from '@angular/core';
import { ClrDatagrid } from '@clr/angular';
import zipcelx, { ZipCelXConfig } from 'zipcelx';
import { ClarityModule } from '@clr/angular';
import { NgIf, NgForOf, NgClass } from '@angular/common';
import { ExportType, ExportTypeEnum } from './export-type.model';

@Component({
  selector: 'clr-export-datagrid-button',
  templateUrl: './export-datagrid-button.component.html',
  styleUrl: './export-datagrid-button.component.scss',
  standalone: true,
  imports: [ClarityModule, NgIf, NgForOf, NgClass],
})
export class ExportDatagridButtonComponent {
  /* input signals */
  datagrid = input<ClrDatagrid | undefined>();
  datagridRef = input<ElementRef | undefined>();
  exportTypesToShow = input<ExportType[] | undefined>();
  isBackendExport = input(false);
  exportTitlePrefix = input('export-datagrid');
  exportButtonPosition = input<'left' | 'right'>('right');

  /* outputs */
  @Output() readonly backendExport: EventEmitter<ExportTypeEnum> = new EventEmitter<ExportTypeEnum>();

  readonly exportTypes: ExportType[] = [
    { type: ExportTypeEnum.ALL, value: 'All entries' },
    { type: ExportTypeEnum.FILTERED, value: 'Filtered entries' },
    { type: ExportTypeEnum.SELECTED, value: 'Selected entries' },
  ];

  readonly exportTypesFiltered = computed(() => {
    const exportTypesToShowVal = this.exportTypesToShow();
    if (!exportTypesToShowVal || exportTypesToShowVal.length === 0) {
      return this.exportTypes;
    }
    // Map to translated value, falling back to default if value is not provided
    return exportTypesToShowVal.map(showType => {
      const defaultType = this.exportTypes.find(et => et.type === showType.type);
      return {
        type: showType.type,
        value: showType.value != null ? showType.value : defaultType?.value,
      };
    });
  });

  private exportExcel(type: ExportTypeEnum): void {
    if (!this.datagrid() || !this.datagridRef()) {
      return;
    }

    // Filter visible columns once
    const visibleColumns = this.datagrid().columns.filter(col => !col.isHidden);

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
      filename: this.exportTitlePrefix(),
      sheet: {
        data: [headerRow, ...dataRows],
      },
    };

    zipcelx(config);
  }

  onExport(type: ExportTypeEnum) {
    if (this.isBackendExport()) {
      this.backendExport.emit(type);
    } else {
      this.exportExcel(type);
    }
  }

  private getRowsToExport(type: ExportTypeEnum): any[] {
    switch (type) {
      case ExportTypeEnum.ALL:
        return this.datagrid()?.items.all ?? [];
      case ExportTypeEnum.FILTERED:
        return this.datagrid()?.items.displayed ?? [];
      case ExportTypeEnum.SELECTED:
        return this.datagrid()?.selection.current ?? [];
      default:
        return [];
    }
  }

  private getColumnsTitle(): string[] {
    const nativeEl = this.datagridRef()?.nativeElement as HTMLElement;
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
