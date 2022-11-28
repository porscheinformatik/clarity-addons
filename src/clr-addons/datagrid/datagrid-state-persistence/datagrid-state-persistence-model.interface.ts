export interface ClrDatagridStatePersistenceModel {
  pageSize: number;
  currentPage: number;
  columns: { [key: string]: ClrColumnStatePersistenceModel };
}

export interface ClrColumnStatePersistenceModel {
  hidden?: boolean;
  filterValue?: any;
}
