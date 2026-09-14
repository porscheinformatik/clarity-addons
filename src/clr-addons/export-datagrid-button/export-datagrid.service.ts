import { Injectable } from '@angular/core';
import { ExportExcelService } from '../shared';

/**
 * Excel export service used by the datagrid export button.
 *
 * It is a thin alias of the shared {@link ExportExcelService}.
 */
@Injectable()
export class ExportDatagridService extends ExportExcelService {}
