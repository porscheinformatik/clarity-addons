export interface ClrSummaryItemError {
  active: boolean;
  text?: string;
  click?: () => void;
}

export interface ClrSummaryItemWarning {
  active: boolean;
  text?: string;
  click?: () => void;
}

export interface ClrSummaryItemLoading {
  active: boolean;
  text?: string;
}

export interface ClrSummaryItemEditConfig {
  enabled: boolean;
  text?: string;
  click: () => void;
}
