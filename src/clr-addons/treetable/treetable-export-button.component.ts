/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, output } from '@angular/core';
import { ClrTreetable } from './treetable';
import { ClrTreetableColumnType } from './interfaces/column-model';
import { ExportExcelCell, ExportExcelService, ExportType, ExportTypeEnum } from '../shared';
import { HIDDEN_COLUMN_CSS_CLASS } from './constants';

/**
 * Export button for the `clr-treetable`.
 *
 * The button is placed as a sibling of the treetable and receives the treetable instance and its
 * `ElementRef`. Column headers are read from the rendered treetable, cell values are resolved via
 * the `clrTtField` property path of the corresponding `clr-tt-column`.
 *
 * `clrTtField` is the opt-in for the export: only columns that declare it are exported. A column
 * without `clrTtField` is omitted entirely, header and values alike. Hidden columns are excluded as
 * well. The type of the exported cells is taken from `clrTtColType` (`string` by default).
 *
 * The button offers the same export types as the datagrid export button:
 * - `ALL`: all rows, ignoring active filters. The active sort is applied.
 * - `FILTERED`: the rows that pass the active filters. Only offered while a filter is active.
 * - `SELECTED`: the currently selected rows. Only offered while at least one row is selected.
 *   Selection is tracked on the displayed rows, so a selected row that is hidden by a filter is not
 *   part of the export.
 *
 * @example
 * <clr-export-treetable-button [treetable]="tt" [treetableRef]="ttRef" />
 * <clr-treetable #tt>...</clr-treetable>
 */
@Component({
  selector: 'clr-export-treetable-button',
  templateUrl: './treetable-export-button.component.html',
  styleUrl: './treetable-export-button.component.scss',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExportTreetableButtonComponent {
  private readonly _exportService = inject(ExportExcelService);

  /** The treetable instance to export. */
  treetable = input<ClrTreetable<any> | undefined>();
  /** The `ElementRef` of the same treetable, used to read the rendered column titles. */
  treetableRef = input<ElementRef | undefined>();
  /** Restricts and/or relabels the offered export types. */
  exportTypesToShow = input<ExportType[] | undefined>();
  /** If true, no file is written and `backendExport` is emitted instead. */
  isBackendExport = input(false);
  /** File name of the exported file (without extension). */
  exportTitlePrefix = input('export-treetable');
  /** Horizontal alignment of the button. */
  exportButtonPosition = input<'left' | 'right'>('right');
  /** Custom or translated label of the button. */
  exportButtonText = input('EXPORT');

  /** Emitted instead of writing a file when `isBackendExport` is true. */
  readonly backendExport = output<ExportTypeEnum>();

  readonly exportTypes: ExportType[] = [
    { type: ExportTypeEnum.ALL, value: 'All entries' },
    { type: ExportTypeEnum.FILTERED, value: 'Filtered entries' },
    { type: ExportTypeEnum.SELECTED, value: 'Selected entries' },
  ];

  /**
   * The export types that are currently possible. `FILTERED` is only possible while at least one
   * filter is active, `SELECTED` only if at least one row is selected.
   */
  private readonly possibleExportTypes = computed(() => {
    const treetable = this.treetable();
    const types = [ExportTypeEnum.ALL];

    if (treetable?.hasActiveFilters()) {
      types.push(ExportTypeEnum.FILTERED);
    }

    if (treetable?.selectedItems()?.length > 0) {
      types.push(ExportTypeEnum.SELECTED);
    }

    return types;
  });

  /**
   * The export types shown in the dropdown, restricted by `exportTypesToShow` and by the current
   * state of the treetable.
   */
  readonly exportTypesFiltered = computed(() => {
    let exportTypesToShowVal = this.exportTypesToShow();
    if (!exportTypesToShowVal || exportTypesToShowVal.length === 0) {
      exportTypesToShowVal = this.exportTypes;
    }

    return exportTypesToShowVal
      .filter(showType => this.possibleExportTypes().some(type => type === showType.type))
      .map(showType => ({
        type: showType.type,
        value: showType.value ?? this.exportTypes.find(type => type.type === showType.type)?.value,
      }));
  });

  onExport(type: ExportTypeEnum): void {
    if (this.isBackendExport()) {
      this.backendExport.emit(type);
    } else {
      this.exportExcel(type);
    }
  }

  private exportExcel(type: ExportTypeEnum): void {
    const treetable = this.treetable();
    if (!treetable || !this.treetableRef()) {
      return;
    }

    const columnTitles = this.getColumnTitles();

    // `clrTtField` is the opt-in for the export: columns without it are omitted entirely.
    const exportColumns = treetable.visibleColumnStates().filter(column => !!column.field);
    if (exportColumns.length === 0) {
      console.warn('No columns declared for export. Add [clrTtField] to a treetable column that should be exported.');
      return;
    }

    const headerRow: ExportExcelCell[] = exportColumns.map(column => ({
      value: columnTitles.get(column.id) ?? '',
      type: 'string',
    }));

    const dataRows: ExportExcelCell[][] = this.getRowsToExport(type).map(item =>
      exportColumns.map(column => this.toCell(this.getValueByPath(item, column.field), column.colType))
    );

    this._exportService.exportToExcel(this.exportTitlePrefix(), headerRow, dataRows);
  }

  private getRowsToExport(type: ExportTypeEnum): any[] {
    switch (type) {
      case ExportTypeEnum.ALL:
        return this.treetable()?.allItems() ?? [];
      case ExportTypeEnum.FILTERED:
        return this.treetable()?.displayedItems() ?? [];
      case ExportTypeEnum.SELECTED:
        return this.treetable()?.selectedItems() ?? [];
      default:
        return [];
    }
  }

  /**
   * Reads the rendered column titles from the DOM and maps them by column id. Hidden columns are
   * skipped, because they are not part of the export either.
   */
  private getColumnTitles(): Map<string, string> {
    const nativeEl = this.treetableRef()?.nativeElement as HTMLElement;
    const columnEls: NodeListOf<Element> | Element[] =
      nativeEl?.querySelectorAll(`clr-tt-column:not(${HIDDEN_COLUMN_CSS_CLASS})`) ?? [];
    const titles = new Map<string, string>();

    columnEls.forEach(columnEl => {
      const columnId = columnEl.getAttribute('data-column-id');
      if (!columnId) {
        return;
      }
      titles.set(columnId, columnEl.querySelector('.treetable-column-title')?.textContent?.trim() ?? '');
    });

    return titles;
  }

  /**
   * Resolves a (possibly nested) property path like `address.city` on the given item.
   */
  private getValueByPath(item: any, path: string | undefined): unknown {
    if (!path) {
      return undefined;
    }

    return path.split('.').reduce((current: any, segment: string) => current?.[segment], item);
  }

  /**
   * Maps a resolved value to an export cell.
   *
   * The cell type is taken from the `clrTtColType` of the column (`string` by default). A `number`
   * column falls back to `string` for values that are not a finite number, because an empty numeric
   * cell would result in an invalid excel file.
   */
  private toCell(value: unknown, colType: ClrTreetableColumnType = 'string'): ExportExcelCell {
    const stringValue = value == null ? '' : String(value);
    const isNumber = colType === 'number' && stringValue.trim() !== '' && Number.isFinite(Number(stringValue));

    return {
      value: stringValue,
      type: isNumber ? 'number' : 'string',
    };
  }
}
