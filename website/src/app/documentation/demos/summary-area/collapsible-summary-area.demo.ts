import { Component } from '@angular/core';
import {
  ClrSummaryAreaToggle,
  ClrSummaryArea,
  ClrSummaryItem,
  ClrSummaryItemValue,
} from '@porscheinformatik/clr-addons';

@Component({
  selector: 'clr-collapsible-summary-area-demo',
  template: `
    <div class="clr-row">
      <div class="clr-col-12">
        <clr-summary-area-toggle
          [localStorageKey]="'collapsibleSummaryAreaDemo1'"
          ariaLabel="Toggle summary"
        ></clr-summary-area-toggle>
      </div>
    </div>
    <clr-summary-area [rows]="2" [localStorageKey]="'collapsibleSummaryAreaDemo1'">
      <clr-summary-item label="Customer">
        <clr-summary-item-value value="Acme Corp"></clr-summary-item-value>
      </clr-summary-item>
      <clr-summary-item label="Contract">
        <clr-summary-item-value value="Enterprise"></clr-summary-item-value>
      </clr-summary-item>
      <clr-summary-item label="Status">
        <clr-summary-item-value value="Active"></clr-summary-item-value>
      </clr-summary-item>
    </clr-summary-area>
  `,
  imports: [ClrSummaryAreaToggle, ClrSummaryArea, ClrSummaryItem, ClrSummaryItemValue],
})
export class CollapsibleSummaryAreaDemo {}
