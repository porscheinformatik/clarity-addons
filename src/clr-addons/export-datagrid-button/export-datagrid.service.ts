import zipcelx, { ZipCelXConfig } from 'zipcelx';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExportDatagridService {
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
    zipcelx(config);
  }
}
