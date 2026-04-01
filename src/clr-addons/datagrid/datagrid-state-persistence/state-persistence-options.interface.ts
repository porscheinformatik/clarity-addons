import { ClrDatagridStatePersistenceModel } from './datagrid-state-persistence-model.interface';

export interface StatePersistenceOptions {
  key: string;
  serverDriven: boolean;
  persistFilters?: boolean;
  persistPagination?: boolean;
  persistSort?: boolean;
  persistHiddenColumns?: boolean;
  persistColumnWidths?: boolean;
  persistColumnOrder?: boolean;
  persistColumnOrderTransformer?: (state: ClrDatagridStatePersistenceModel, columns: { name: string }[]) => void;
}
