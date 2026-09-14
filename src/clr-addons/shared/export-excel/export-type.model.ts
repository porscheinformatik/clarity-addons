/**
 * The available export types of the export buttons.
 */
export enum ExportTypeEnum {
  /** All entries, ignoring active filters. */
  ALL = 'ALL',
  /** Only the entries that pass the active filters. */
  FILTERED = 'FILTERED',
  /** Only the currently selected entries. */
  SELECTED = 'SELECTED',
}

/**
 * An export type together with an optional custom (e.g. translated) label.
 */
export interface ExportType {
  type: ExportTypeEnum;
  value?: string;
}
