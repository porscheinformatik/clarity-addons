export interface StatePersistenceOptions {
  key: string;
  serverDriven: boolean;
  persistFilters?: boolean;
  persistPagination?: boolean;
  persistSort?: boolean;
  persistHiddenColumns?: boolean;
}
