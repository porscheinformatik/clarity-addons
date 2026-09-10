/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ZipCelXConfig } from 'zipcelx';
import { Injectable } from '@angular/core';

/**
 * Cell type supported by the excel export.
 */
export type ExportExcelCellType = 'string' | 'number';

/**
 * A single cell of the excel export.
 */
export interface ExportExcelCell {
  value: string;
  type: ExportExcelCellType | string;
}

/**
 * Generic excel export service based on the optional `zipcelx` dependency.
 *
 * It is used as the shared writer for all export buttons of this library
 * (e.g. datagrid and treetable export).
 */
@Injectable({ providedIn: 'root' })
export class ExportExcelService {
  zipcelx: any;

  constructor() {
    this.init();
  }

  async init() {
    try {
      this.zipcelx = await import('zipcelx');
    } catch (error) {
      console.warn('Optional feature requires `zipcelx`. Please install it: npm install zipcelx', error);
    }
  }

  /**
   * Writes the given headers and rows into an excel file and triggers the download.
   *
   * @param filename Name of the exported file (without extension).
   * @param headers The header row of the exported sheet.
   * @param rows The data rows of the exported sheet.
   */
  exportToExcel(filename: string, headers: ExportExcelCell[], rows: ExportExcelCell[][]): void {
    const config: ZipCelXConfig = {
      filename,
      sheet: {
        data: [headers, ...rows] as ZipCelXConfig['sheet']['data'],
      },
    };

    this.zipcelx.default(config);
  }
}
