import { Component } from '@angular/core';
import {
  ClrSummaryAreaStateService,
  ClrSummaryAreaToggle,
  ClrSummaryArea,
  ClrSummaryItem,
  ClrSummaryItemValue,
} from '@porscheinformatik/clr-addons';

@Component({
  selector: 'clr-collapsible-summary-area-demo-2',
  template: `
    <div class="clr-row">
      <div class="clr-col-12">
        <clr-summary-area-toggle ariaLabel="Toggle summary 2"></clr-summary-area-toggle>
      </div>
    </div>
    <clr-summary-area [rows]="2" [localStorageKey]="'collapsibleSummaryAreaDemo1'">
      <clr-summary-item label="Customer2">
        <clr-summary-item-value value="Acme Corp"></clr-summary-item-value>
      </clr-summary-item>
      <clr-summary-item label="Contract2">
        <clr-summary-item-value value="Enterprise"></clr-summary-item-value>
      </clr-summary-item>
    </clr-summary-area>
  `,
  providers: [ClrSummaryAreaStateService],
  imports: [ClrSummaryAreaToggle, ClrSummaryArea, ClrSummaryItem, ClrSummaryItemValue, ClrSummaryArea],
})
export class CollapsibleSummaryArea2Demo {}
