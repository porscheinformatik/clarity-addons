import { ZipCelXConfig } from 'zipcelx';
import { Injectable } from '@angular/core';

@Injectable()
export class ExportDatagridService {
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

  exportToExcel(
    filename: string,
    headers: { value: string; type: string }[],
    rows: { value: string; type: any }[][]
  ): void {
    const config: ZipCelXConfig = {
      filename,
      sheet: {
        data: [headers, ...rows],
      },
    };

    this.zipcelx.default(config);
  }
}
