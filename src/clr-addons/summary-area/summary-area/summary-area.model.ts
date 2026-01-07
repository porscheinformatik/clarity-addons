export interface ClrSummaryAreaError {
  active: boolean;
  text?: string;
  click?: () => void;
  linkText?: string;
}

export interface ClrSummaryAreaWarning {
  active: boolean;
  text?: string;
  click?: () => void;
  linkText?: string;
}

export interface ClrSummaryAreaLoading {
  active: boolean;
  text?: string;
}

export type ClrSummaryAreaColumns = 1 | 2 | 3 | 4 | 5;
export type ClrSummaryAreaRows = 1 | 2 | 3;
