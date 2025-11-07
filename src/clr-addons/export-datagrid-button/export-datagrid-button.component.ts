import { Component, computed, ElementRef, EventEmitter, input, Output, signal } from '@angular/core';
import { ClarityModule, ClrDatagrid, ClrDatagridColumn } from '@clr/angular';
import { ExportDatagridService } from './export-datagrid.service';
import { NgClass, NgForOf, NgIf } from '@angular/common';
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
  readonly filterOrSelectionChanged = signal(0);

  /* outputs */
  @Output() readonly backendExport: EventEmitter<ExportTypeEnum> = new EventEmitter<ExportTypeEnum>();

  readonly exportTypes: ExportType[] = [
    { type: ExportTypeEnum.ALL, value: 'All entries' },
    { type: ExportTypeEnum.FILTERED, value: 'Filtered entries' },
    { type: ExportTypeEnum.SELECTED, value: 'Selected entries' },
  ];
  possibleExportTypes: ExportType[] = [{ type: ExportTypeEnum.ALL, value: 'All entries' }];

  readonly exportTypesFiltered = computed(() => {
    this.filterOrSelectionChanged();
    let exportTypesToShowVal = this.exportTypesToShow();
    if (!exportTypesToShowVal || exportTypesToShowVal.length === 0) {
      exportTypesToShowVal = this.exportTypes;
    }
    for (const column of this.datagrid().columns) {
      // if a column filter is applied, show the FILTERED export type
      column.filterValueChange.subscribe((col: ClrDatagridColumn) => {
        this.updateExportType(ExportTypeEnum.FILTERED, !!col, 'Filtered entries', exportTypesToShowVal);
      });
    }

    this.datagrid().selectedChanged.subscribe(() => {
      const hasSelection = this.datagrid().selection.current.length > 0;
      // if a row is selected, show the SELECTED export type
      this.updateExportType(ExportTypeEnum.SELECTED, hasSelection, 'Selected entries', exportTypesToShowVal);
    });

    // Map to translated value, falling back to default if value is not provided
    return exportTypesToShowVal
      .filter(showType => this.possibleExportTypes.some(et => et.type === showType.type))
      .map(showType => {
        const defaultType = this.exportTypes.find(et => et.type === showType.type);
        return {
          type: showType.type,
          value: showType.value != null ? showType.value : defaultType?.value,
        };
      });
  });

  constructor(private readonly exportService: ExportDatagridService) {}

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

    this.exportService.exportToExcel(this.exportTitlePrefix(), headerRow, dataRows);
  }

  onExport(type: ExportTypeEnum) {
    if (this.isBackendExport()) {
      this.backendExport.emit(type);
    } else {
      this.exportExcel(type);
    }
  }

  /**
   * Updates the possible export types based on the current datagrid state and allowed export types.
   * @param type the export type to update
   * @param shouldExist whether the export type should exist in the possible export types
   * @param value the display value for the export type
   * @param exportTypesToShowVal the allowed export types to show
   */
  private updateExportType(
    type: ExportTypeEnum,
    shouldExist: boolean,
    value: string,
    exportTypesToShowVal: ExportType[]
  ) {
    const index = this.possibleExportTypes.findIndex(et => et.type === type);
    const allowed =
      !exportTypesToShowVal || exportTypesToShowVal.length === 0
        ? true
        : exportTypesToShowVal.some(et => et.type === type);
    if (index === -1 && allowed && shouldExist) {
      this.possibleExportTypes.push({ type, value });
      this.filterOrSelectionChanged.update(v => v + 1);
    } else if (allowed && !shouldExist && index !== -1) {
      this.possibleExportTypes.splice(index, 1);
      this.filterOrSelectionChanged.update(v => v + 1);
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
