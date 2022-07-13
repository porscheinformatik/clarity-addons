export interface ClrDatagridStatePersistenceModel {
  pageSize: number;
  columns: { [key: string]: ClrColumnStatePersistenceModel };
}

export interface ClrColumnStatePersistenceModel {
  hidden?: boolean;
}
