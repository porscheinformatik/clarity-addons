import { TemplateRef } from '@angular/core';

/**
 * Type of the values rendered in a treetable column. Used as metadata by the treetable export.
 */
export type ClrTreetableColumnType = 'string' | 'number';

export interface ColumnState {
  id: string;
  columnIndex?: number;

  width?: number; // This is the width calculated for the column
  strictWidth?: number; // This is the strict width if defined in styles/css

  hideable?: boolean; // This tells whether column can be hidden or not
  hidden?: boolean; // This is the state of column visibility

  titleTemplateRef?: TemplateRef<any>; // This is the template of the column content that will be used in the column toggle.

  field?: string; // Property path of the item that is rendered in this column. Used e.g. by the export button.
  colType?: ClrTreetableColumnType; // Type of the values of this column. Used e.g. by the export button.
}
