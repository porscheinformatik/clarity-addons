/*
 * Copyright (c) 2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ClarityDocComponent } from '../clarity-doc';
import { Component } from '@angular/core';
import { ClarityIcons, checkCircleIcon, flagIcon, folderIcon, userIcon, usersIcon } from '@cds/core/icon';

ClarityIcons.addIcons(userIcon, usersIcon, flagIcon, folderIcon, checkCircleIcon);

const BASIC_EXAMPLE = `<clr-summary-area [rows]="3">
    <clr-summary-item label="Customer Name">
      <clr-summary-item-value value="John Doe"></clr-summary-item-value>
    </clr-summary-item>
    <clr-summary-item label="Customer ID" [valueCopyable]="true">
      <clr-summary-item-value value="CUST-12345"></clr-summary-item-value>
    </clr-summary-item>
    <clr-summary-item label="Email">
      <clr-summary-item-value icon="envelope"></clr-summary-item-value>
      <clr-summary-item-value value="john.doe@example.com"></clr-summary-item-value>
    </clr-summary-item>
    <clr-summary-item label="Status">
      <clr-summary-item-value value="Active"></clr-summary-item-value>
    </clr-summary-item>
    <clr-summary-item label="Created Date">
      <clr-summary-item-value value="2024-01-15"></clr-summary-item-value>
    </clr-summary-item>
  </clr-summary-area>`;

const ICON_EXAMPLE = `<clr-summary-area [rows]="1">
    <clr-summary-item label="Priority">
      <clr-summary-item-value icon="flag"></clr-summary-item-value>
      <clr-summary-item-value value="High"></clr-summary-item-value>
    </clr-summary-item>
    <clr-summary-item label="Type">
      <clr-summary-item-value icon="users"></clr-summary-item-value>
      <clr-summary-item-value value="Business"></clr-summary-item-value>
    </clr-summary-item>
    <clr-summary-item label="Category">
      <clr-summary-item-value icon="folder"></clr-summary-item-value>
      <clr-summary-item-value value="Finance"></clr-summary-item-value>
    </clr-summary-item>
  </clr-summary-area>`;

const CLICKABLE_EXAMPLE = `<clr-summary-area [rows]="1">
    <clr-summary-item label="Account">
      <clr-summary-item-value
        icon="user"
        [clickable]="true"
        tooltip="View user profile"
        (clicked)="handleIconClick()"
      ></clr-summary-item-value>
      <clr-summary-item-value
        value="View Details"
        [clickable]="true"
        (clicked)="handleValueClick()"
      ></clr-summary-item-value>
    </clr-summary-item>
    <clr-summary-item label="External Link">
      <clr-summary-item-value
        value="Open Documentation"
        [clickable]="true"
        tooltip="Opens in new tab"
        (clicked)="openExternalLink()"
      ></clr-summary-item-value>
    </clr-summary-item>
  </clr-summary-area>`;

const MULTIPLE_VALUES_EXAMPLE = `<clr-summary-area [rows]="1">
    <clr-summary-item label="Tags" [valueCopyable]="true">
      <clr-summary-item-value value="Angular"></clr-summary-item-value>
      <clr-summary-item-value value="TypeScript"></clr-summary-item-value>
      <clr-summary-item-value value="Clarity"></clr-summary-item-value>
    </clr-summary-item>
  </clr-summary-area>`;

const TOOLTIP_EXAMPLE = `<clr-summary-area [rows]="1">
    <clr-summary-item label="Description">
      <clr-summary-item-value
        value="This is a very long description that will be truncated with ellipsis"
        tooltip="This is a tooltip for the long description"
      ></clr-summary-item-value>
    </clr-summary-item>
    <clr-summary-item label="Info">
      <clr-summary-item-value
        value="Hover me"
        tooltip="This is a custom tooltip providing additional context"
      ></clr-summary-item-value>
    </clr-summary-item>
  </clr-summary-area>`;

const EMPTY_VALUE_EXAMPLE = `<clr-summary-area [rows]="1">
    <clr-summary-item label="With Placeholder" [showOnEmptyValue]="true"></clr-summary-item>
    <clr-summary-item label="Hidden When Empty" [showOnEmptyValue]="false"></clr-summary-item>
    <clr-summary-item label="Has Value">
      <clr-summary-item-value value="Visible"></clr-summary-item-value>
    </clr-summary-item>
  </clr-summary-area>`;

const EDIT_CONFIG_EXAMPLE = `<clr-summary-area [rows]="1">
    <clr-summary-item
      label="Phone Number"
      [editConfig]="{enabled: true, text: 'Add Phone', click: onAddPhone}"
    ></clr-summary-item>
    <clr-summary-item
      label="Address"
      [editConfig]="{enabled: true, click: onAddAddress}"
    ></clr-summary-item>
  </clr-summary-area>

// In component:
onAddPhone = (): void => {
  // Handle add phone action
};

onAddAddress = (): void => {
  // Handle add address action
};`;

const COPYABLE_EXAMPLE = `<clr-summary-area [rows]="1">
    <clr-summary-item label="Order ID" [valueCopyable]="true">
      <clr-summary-item-value value="ORD-2024-00123"></clr-summary-item-value>
    </clr-summary-item>
    <clr-summary-item label="Reference Code"
                      [valueCopyable]="true"
                      [copyButtonTooltip]="'Copy Reference Code'">
      <clr-summary-item-value value="ABC-XYZ-123"></clr-summary-item-value>
    </clr-summary-item>
    <clr-summary-item label="Custom" [valueCopyable]="true"> I am projected content </clr-summary-item>
  </clr-summary-area>`;

const LOADING_EXAMPLE = `<!-- Area Loading -->
<clr-summary-area [rows]="1" [loading]="{active: true, text: 'Loading data...'}">
  <clr-summary-item label="Name">
    <clr-summary-item-value value="John Doe"></clr-summary-item-value>
  </clr-summary-item>
</clr-summary-area>

<!-- Item Loading -->
<clr-summary-area [rows]="1">
  <clr-summary-item label="Status" [loading]="{active: true, text: 'Fetching status...'}">
    <clr-summary-item-value value="Active"></clr-summary-item-value>
  </clr-summary-item>
  <clr-summary-item label="Type">
    <clr-summary-item-value value="Premium"></clr-summary-item-value>
  </clr-summary-item>
</clr-summary-area>`;

const ERROR_EXAMPLE = `<!-- Area Error -->
<clr-summary-area [rows]="1"
                  [error]="{active: true,
                            text: 'Failed to load data',
                            linkText: 'Retry',
                            click: onRetry}">
  <clr-summary-item label="Name">
    <clr-summary-item-value value="John Doe"></clr-summary-item-value>
  </clr-summary-item>
</clr-summary-area>

<!-- Item Error -->
<clr-summary-area [rows]="1">
  <clr-summary-item label="Sync Status"
                    [error]="{active: true,
                              text: 'Sync failed - Click to retry',
                              click: onRetryItem}">
    <clr-summary-item-value value="Synced"></clr-summary-item-value>
  </clr-summary-item>
  <clr-summary-item label="Type">
    <clr-summary-item-value value="Premium"></clr-summary-item-value>
  </clr-summary-item>
</clr-summary-area>`;

const WARNING_EXAMPLE = `<!-- Area Warning -->
<clr-summary-area [rows]="1"
                  [warning]="{active: true,
                              text: 'Data may be outdated'
                              linkText: 'Refresh',
                              click: onRefresh}">
  <clr-summary-item label="Last Updated">
    <clr-summary-item-value value="2 hours ago"></clr-summary-item-value>
  </clr-summary-item>
</clr-summary-area>

<!-- Item Warning -->
<clr-summary-area [rows]="1">
  <clr-summary-item label="Sync Status"
                    [warning]="{active: true,
                                text: 'Data outdated - Click to sync',
                                click: onSyncItem}">
    <clr-summary-item-value value="Synced"></clr-summary-item-value>
  </clr-summary-item>
  <clr-summary-item label="Type">
    <clr-summary-item-value value="Premium"></clr-summary-item-value>
  </clr-summary-item>
</clr-summary-area>`;

const TOGGLE_EXAMPLE = `import { ClrSummaryAreaStateService } from '@porscheinformatik/clr-addons';

@Component({
  // ...
  providers: [ClrSummaryAreaStateService] // Required for toggle to work
})
export class MyComponent {}

<!-- Template -->
<div class="clr-row">
  <div class="clr-col-12">
    <clr-summary-area-toggle [localStorageKey]="'collapseSummaryAreaDemoKey'"
                              ariaLabel="Toggle summary"
    ></clr-summary-area-toggle>
  </div>
</div>
<clr-summary-area [rows]="2" [localStorageKey]="'collapseSummaryAreaDemoKey'">
  <clr-summary-item label="Customer">
    <clr-summary-item-value value="Acme Corp"></clr-summary-item-value>
  </clr-summary-item>
  <clr-summary-item label="Contract">
    <clr-summary-item-value value="Enterprise"></clr-summary-item-value>
  </clr-summary-item>
  <clr-summary-item label="Status">
    <clr-summary-item-value value="Active"></clr-summary-item-value>
  </clr-summary-item>
</clr-summary-area>`;

const PROJECTED_CONTENT_EXAMPLE = `<clr-summary-area [rows]="1">
  <clr-summary-item label="Progress">
    <div class="progress-bar-container">
      <div class="progress" style="width: 75%;">75%</div>
    </div>
  </clr-summary-item>
  <clr-summary-item label="Custom Badge">
    <span class="badge badge-success">Verified</span>
  </clr-summary-item>
</clr-summary-area>`;

const COMPLETE_EXAMPLE = `<clr-summary-area [rows]="3">
  <clr-summary-item label="Order ID" [valueCopyable]="true">
    <clr-summary-item-value value="ORD-2024-00456"></clr-summary-item-value>
  </clr-summary-item>
  <clr-summary-item label="Customer">
    <clr-summary-item-value icon="user"></clr-summary-item-value>
    <clr-summary-item-value
      value="Jane Smith"
      [clickable]="true"
      (clicked)="viewCustomer()"
    ></clr-summary-item-value>
  </clr-summary-item>
  <clr-summary-item label="Status">
    <clr-summary-item-value icon="success-standard
    "></clr-summary-item-value>
    <clr-summary-item-value value="Completed"></clr-summary-item-value>
  </clr-summary-item>
  <clr-summary-item label="Amount" [valueCopyable]="true">
    <clr-summary-item-value value="€1,234.56"></clr-summary-item-value>
  </clr-summary-item>
  <clr-summary-item label="Payment Method">
    <clr-summary-item-value value="Credit Card"></clr-summary-item-value>
  </clr-summary-item>
  <clr-summary-item label="Shipping Address">
    <clr-summary-item-value value="123 Main Street, Vienna, Austria"></clr-summary-item-value>
  </clr-summary-item>
  <clr-summary-item label="Notes" [showOnEmptyValue]="true"></clr-summary-item>
  <clr-summary-item label="Tracking" [loading]="{active: false}">
    <clr-summary-item-value
      value="Track Package"
      [clickable]="true"
      tooltip="Open tracking page"
      (clicked)="trackPackage()"
    ></clr-summary-item-value>
  </clr-summary-item>
  <clr-summary-item
    label="Gift Message"
    [editConfig]="{enabled: true, text: 'Add message', click: onAddGiftMessage}"
  ></clr-summary-item>
</clr-summary-area>`;

@Component({
  selector: 'clr-summary-area-demo',
  templateUrl: './summary-area.demo.html',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
  styleUrls: ['./summary-area.demo.scss'],
  standalone: false,
})
export class SummaryAreaDemo extends ClarityDocComponent {
  // Code examples
  basicExample = BASIC_EXAMPLE;
  iconExample = ICON_EXAMPLE;
  clickableExample = CLICKABLE_EXAMPLE;
  multipleValuesExample = MULTIPLE_VALUES_EXAMPLE;
  tooltipExample = TOOLTIP_EXAMPLE;
  emptyValueExample = EMPTY_VALUE_EXAMPLE;
  editConfigExample = EDIT_CONFIG_EXAMPLE;
  copyableExample = COPYABLE_EXAMPLE;
  loadingExample = LOADING_EXAMPLE;
  errorExample = ERROR_EXAMPLE;
  warningExample = WARNING_EXAMPLE;
  toggleExample = TOGGLE_EXAMPLE;
  projectedContentExample = PROJECTED_CONTENT_EXAMPLE;
  completeExample = COMPLETE_EXAMPLE;

  constructor() {
    super('summary-area');
  }

  // Demo click handlers
  handleIconClick(): void {
    alert('Icon clicked!');
  }

  handleValueClick(): void {
    alert('Value clicked!');
  }

  openExternalLink(): void {
    window.open('https://clarity.design', '_blank');
  }

  viewCustomer(): void {
    alert('Navigate to customer details');
  }

  trackPackage(): void {
    alert('Open tracking page');
  }

  // Edit config handlers (using arrow functions to preserve 'this' context)
  onAddPhone = (): void => {
    alert('Add phone clicked');
  };

  onAddAddress = (): void => {
    alert('Add address clicked');
  };

  onAddGiftMessage = (): void => {
    alert('Add gift message clicked');
  };

  // State handlers
  onRetry = (): void => {
    alert('Retry loading data');
  };

  onRetryItem = (): void => {
    alert('Retry loading item');
  };

  onRefresh = (): void => {
    alert('Refresh data');
  };

  onSyncItem = (): void => {
    alert('Sync data');
  };
}
