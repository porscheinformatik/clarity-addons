import { TemplateRef } from '@angular/core';

export interface ColumnState {
  id: string;
  columnIndex?: number;

  width?: number; // This is the width calculated for the column
  strictWidth?: number; // This is the strict width if defined in styles/css

  hideable?: boolean; // This tells whether column can be hidden or not
  initialHidden?: boolean; // This is the initial state of column visibility, used to reset the hidden states
  hidden?: boolean; // This is the state of column visibility

  titleTemplateRef?: TemplateRef<any>; // This is the template of the column content that will be used in the column toggle.
}
