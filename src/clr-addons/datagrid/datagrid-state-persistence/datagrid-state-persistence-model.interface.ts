export interface ClrDatagridStatePersistenceModel {
  pageSize: number;
  currentPage: number;
  sortBy?: string;
  sortReverse?: boolean;
  columns: { [key: string]: ClrColumnStatePersistenceModel };
}

export interface ClrColumnStatePersistenceModel {
  hidden?: boolean;
  filterValue?: any;
}
