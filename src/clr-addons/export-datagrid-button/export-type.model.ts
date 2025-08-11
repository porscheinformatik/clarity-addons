export enum ExportTypeEnum {
  ALL = 'ALL',
  FILTERED = 'FILTERED',
  SELECTED = 'SELECTED',
}

export interface ExportType {
  type: ExportTypeEnum;
  value?: string;
}
