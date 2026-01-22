import { Component, computed, effect, ElementRef, EventEmitter, input, OnDestroy, Output, signal } from '@angular/core';
import { ClarityModule, ClrDatagrid } from '@clr/angular';
import { ExportDatagridService } from './export-datagrid.service';
import { NgClass, NgForOf } from '@angular/common';
import { ExportType, ExportTypeEnum } from './export-type.model';
import { delay, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'clr-export-datagrid-button',
  templateUrl: './export-datagrid-button.component.html',
  styleUrl: './export-datagrid-button.component.scss',
  standalone: true,
  imports: [ClarityModule, NgForOf, NgClass],
})
export class ExportDatagridButtonComponent implements OnDestroy {
  /* input signals */
  datagrid = input<ClrDatagrid | undefined>();
  datagridRef = input<ElementRef | undefined>();
  exportTypesToShow = input<ExportType[] | undefined>();
  isBackendExport = input(false);
  exportTitlePrefix = input('export-datagrid');
  exportButtonPosition = input<'left' | 'right'>('right');
  possibleExportTypes = signal<ExportTypeEnum[]>([ExportTypeEnum.ALL]);
  exportButtonText = input('EXPORT');

  destroy$ = new Subject<void>();

  /* outputs */
  @Output() readonly backendExport: EventEmitter<ExportTypeEnum> = new EventEmitter<ExportTypeEnum>();

  readonly exportTypes: ExportType[] = [
    { type: ExportTypeEnum.ALL, value: 'All entries' },
    { type: ExportTypeEnum.FILTERED, value: 'Filtered entries' },
    { type: ExportTypeEnum.SELECTED, value: 'Selected entries' },
  ];

  readonly exportTypesFiltered = computed(() => {
    let exportTypesToShowVal = this.exportTypesToShow();
    if (!exportTypesToShowVal || exportTypesToShowVal.length === 0) {
      exportTypesToShowVal = this.exportTypes;
    }
    return exportTypesToShowVal
      .filter(showType => this.possibleExportTypes().some(et => et === showType.type))
      .map(showType => {
        const defaultType = this.exportTypes.find(et => et.type === showType.type);
        return {
          type: showType.type,
          value: showType.value != null ? showType.value : defaultType?.value,
        };
      });
  });

  constructor(private readonly exportService: ExportDatagridService) {
    effect(() => {
      const datagrid = this.datagrid();
      if (!datagrid) {
        return undefined;
      }

      this.destroy$.next();

      datagrid.refresh.pipe(delay(0), takeUntil(this.destroy$)).subscribe(dgState => {
        const hasFilter = dgState.filters && dgState.filters.length > 0;
        this.updateExportType(ExportTypeEnum.FILTERED, hasFilter, this.exportTypesToShow() || this.exportTypes);
      });

      datagrid.selectedChanged.pipe(takeUntil(this.destroy$)).subscribe(() => {
        const hasSelection = datagrid.selection.current.length > 0;
        this.updateExportType(ExportTypeEnum.SELECTED, hasSelection, this.exportTypesToShow() || this.exportTypes);
      });
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

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
   * @param exportTypesToShowVal the allowed export types to show
   */
  private updateExportType(type: ExportTypeEnum, shouldExist: boolean, exportTypesToShowVal: ExportType[]) {
    const index = this.possibleExportTypes().findIndex(et => et === type);
    const allowed =
      !exportTypesToShowVal || exportTypesToShowVal.length === 0 || exportTypesToShowVal.some(et => et.type === type);
    if (index === -1 && allowed && shouldExist) {
      this.possibleExportTypes.update(prev => [...prev, type]);
    } else if (allowed && !shouldExist && index !== -1) {
      this.possibleExportTypes.update(prev => prev.filter(et => et !== type));
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
