/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';
import { of, share } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  ClarityIcons,
  errorStandardIcon,
  infoStandardIcon,
  minusIcon,
  plusIcon,
  successStandardIcon,
  warningStandardIcon,
} from '@cds/core/icon';
import { ActivatedRoute } from '@angular/router';
import { ClrDatagrid } from '@clr/angular';

interface ExportableEntry {
  column1: string;
  column2: string;
  column3: string;
  column4: string;
}

const NO_SELECT_ALL_HTML = `
<clr-datagrid class="datagrid-no-select-all" [(clrDgSelected)]="selected">
    <clr-dg-column>Description</clr-dg-column>
    <clr-dg-row clrDgItem="1"><clr-dg-cell>Item 1</clr-dg-cell></clr-dg-row>
    <clr-dg-row clrDgItem="2"><clr-dg-cell>Item 2</clr-dg-cell></clr-dg-row>
    <clr-dg-row clrDgItem="3"><clr-dg-cell>Item 3</clr-dg-cell></clr-dg-row>
    <clr-dg-row clrDgItem="4"><clr-dg-cell>Item 4</clr-dg-cell></clr-dg-row>
    <clr-dg-row clrDgItem="5"><clr-dg-cell>Item 5</clr-dg-cell></clr-dg-row>
</clr-datagrid>`;

const FULL_HEIGHT_HTML = `
<div [ngStyle]="{height: '150px'}"> <!-- ngStyle just here for example, don't use in prod -->
  <clr-datagrid class="datagrid-full-height">
    <clr-dg-column>Description</clr-dg-column>
    <clr-dg-row>
      <clr-dg-cell>Item 1</clr-dg-cell>
    </clr-dg-row>
    <clr-dg-row>
      <clr-dg-cell>Item 2</clr-dg-cell>
    </clr-dg-row>
    <clr-dg-row>
      <clr-dg-cell>Item 3</clr-dg-cell>
    </clr-dg-row>
    <clr-dg-row>
      <clr-dg-cell>Item 4</clr-dg-cell>
    </clr-dg-row>
    <clr-dg-row>
      <clr-dg-cell>Item 5</clr-dg-cell>
    </clr-dg-row>
  </clr-datagrid>
</div>
`;

const PERSISTED_STATE = `
<clr-datagrid [clrStatePersistenceKey]="{key: 'datagrid.demo.statePersistence', serverDriven: true}"
              [clrPaginationDescription]="'{{first}} - {{last}} of {{total}} entries'">
  <clr-dg-column [clrDgField]="'hideableCol'">
    <ng-template clrDgHideableColumn>Hideable String</ng-template>
  </clr-dg-column>
  <clr-dg-column [clrDgField]="'numericCol'" clrDgColType="number">Numeric</clr-dg-column>
  <clr-dg-column [clrDgField]="'dateCol'">Date
    <clr-dg-filter>
      <clr-date-filter clrProperty="dateCol"></clr-date-filter>
    </clr-dg-filter>
  </clr-dg-column>
  <clr-dg-column [clrDgField]="'enumCol'">
    Enum
    <clr-dg-filter>
      <clr-enum-filter clrProperty="enumCol"></clr-enum-filter>
    </clr-dg-filter>
  </clr-dg-column>

  <clr-dg-row *clrDgItems="let item of data$ | async" [clrDgItem]="item">
    <clr-dg-cell>{{item.hideableCol}}</clr-dg-cell>
    <clr-dg-cell>{{item.numericCol}}</clr-dg-cell>
    <clr-dg-cell>{{item.dateCol | date}}</clr-dg-cell>
    <clr-dg-cell>{{item.enumCol}}</clr-dg-cell>
  </clr-dg-row>

  <clr-dg-footer>
    <clr-dg-pagination [clrDgPageSize]="5">
      <clr-dg-page-size [clrPageSizeOptions]="[5,10,15,50,100]">Entries per page</clr-dg-page-size>
    </clr-dg-pagination>
  </clr-dg-footer>
</clr-datagrid>`;

const EXPORT_BUTTON_EXAMPLE = `
<clr-export-datagrid-button
  [datagrid]="datagrid"
  [datagridRef]="datagridRef"
  [exportTypesToShow]="exportType"
  [isBackendExport]="false"
  [exportTitlePrefix]="'MyExport'"
  [exportButtonPosition]="'right'"
  (backendExport)="onBackendExport($event)">
</clr-export-datagrid-button>
<clr-datagrid #datagrid class="datagrid-full-width datagrid-full-height" [(clrDgSelected)]="selected">
  <clr-dg-column [clrDgField]="'column1'">
    <ng-container *clrDgHideableColumn="{ hidden: false }">Column 1</ng-container>
  </clr-dg-column>
  <clr-dg-column [clrDgField]="'column2'">
    <ng-container *clrDgHideableColumn="{ hidden: false }">Column 2</ng-container>
  </clr-dg-column>
  <clr-dg-column [clrDgField]="'column3'">
    <ng-container *clrDgHideableColumn="{ hidden: false }">Column 3</ng-container>
  </clr-dg-column>
  <clr-dg-column [clrDgField]="'column4'">
    <ng-container *clrDgHideableColumn="{ hidden: true }">Column 4</ng-container>
  </clr-dg-column>
  <clr-dg-row *clrDgItems="let entry of exportableEntries" [clrDgItem]="entry">
    <clr-dg-cell>{{ entry.column1 }}</clr-dg-cell>
    <clr-dg-cell>{{ entry.column2 }}</clr-dg-cell>
    <clr-dg-cell>{{ entry.column3 }}</clr-dg-cell>
    <clr-dg-cell>{{ entry.column4 }}</clr-dg-cell>
  </clr-dg-row>
</clr-datagrid>
`;

const EXPORT_TYPES_DISPLAY = `exportType: ExportType[] = [
  {
    type: ExportTypeEnum.ALL,
    value: 'Translated all entries',
  },
  {
    type: ExportTypeEnum.FILTERED,
    // No value provided, will use default label
  }
];
`;

const ENUM_FILTER = `
<clr-datagrid>
  <clr-dg-column [clrDgField]="'name'"
    >Name
    <clr-dg-filter>
      <clr-enum-filter clrProperty="name"> </clr-enum-filter>
    </clr-dg-filter>
  </clr-dg-column>

  <clr-dg-row *clrDgItems="let data of dataList" [clrDgItem]="data">
    <clr-dg-cell>{{data.name}}</clr-dg-cell>
  </clr-dg-row>
</clr-datagrid>
`;

const ENUM_FILTER_CUSTOM = `
<clr-datagrid>
  <clr-dg-column [clrDgField]="'name'"
    >Name
    <clr-dg-filter>
      <clr-enum-filter clrProperty="name" [clrPossibleValues]="customPossibleValues"> </clr-enum-filter>
    </clr-dg-filter>
  </clr-dg-column>

  <clr-dg-row *clrDgItems="let data of dataList" [clrDgItem]="data">
    <clr-dg-cell>{{data.name}}</clr-dg-cell>
  </clr-dg-row>
</clr-datagrid>
`;

const ENUM_FILTER_CUSTOM_TS = `
customPossibleValues = ['TestValue1', 'TestValue2', 'TestValue3', 'TestValue4'];
`;

const ENUM_FILTER_CUSTOM_DISPLAYNAME_TS = `
customPossibleValues = [
  { value: 'ENUM_VALUE_1', displayValue: 'TestValue1' },
  { value: 'ENUM_VALUE_2', displayValue: 'TestValue2' },
  { value: 'ENUM_VALUE_3', displayValue: 'TestValue3' },
  { value: 'ENUM_VALUE_4', displayValue: 'TestValue4' },
];
`;

const ENUM_FILTER_PRESELECT = `
<clr-datagrid>
  <clr-dg-column [clrDgField]="'name'"
    >Name
    <clr-dg-filter>
      <clr-enum-filter clrProperty="name" [clrFilterValues]="preselectedValues"> </clr-enum-filter>
    </clr-dg-filter>
  </clr-dg-column>

  <clr-dg-row *clrDgItems="let data of dataList" [clrDgItem]="data">
    <clr-dg-cell>{{data.name}}</clr-dg-cell>
  </clr-dg-row>
</clr-datagrid>
`;

const ENUM_FILTER_EMPTY = `
<clr-datagrid>
  <clr-dg-column [clrDgField]="'name'"
    >Name
    <clr-dg-filter>
      <clr-enum-filter clrProperty="name" [clrEmptyValuesTranslation]="'(Leere)'"></clr-enum-filter>
    </clr-dg-filter>
  </clr-dg-column>

  <clr-dg-row *clrDgItems="let data of dataListWithEmpty" [clrDgItem]="data">
    <clr-dg-cell>{{data.name}}</clr-dg-cell>
  </clr-dg-row>
</clr-datagrid>
`;

const DATE_FILTER = `
<clr-datagrid>
  <clr-dg-column>
    Name
  </clr-dg-column>
  <clr-dg-column [clrDgField]="'date'">
    Date
    <clr-dg-filter>
      <clr-date-filter clrProperty="date"></clr-date-filter>
    </clr-dg-filter>
  </clr-dg-column>

  <clr-dg-row *clrDgItems="let data of dataList" [clrDgItem]="data">
    <clr-dg-cell>{{data.name}}</clr-dg-cell>
    <clr-dg-cell>{{data.date|date}}</clr-dg-cell>
  </clr-dg-row>
</clr-datagrid>`;

const DATETIME_FILTER = `
<clr-datagrid>
  <clr-dg-column>
    Name
  </clr-dg-column>
  <clr-dg-column [clrDgField]="'date'">
    Date
    <clr-dg-filter>
      <clr-date-filter clrProperty="date"></clr-date-filter>
    </clr-dg-filter>
  </clr-dg-column>
  <clr-dg-column [clrDgField]="'dateTime'">
    DateTime
     <clr-dg-filter>
       <clr-date-filter [timeActive]="true" clrProperty="dateTime"></clr-date-filter>
     </clr-dg-filter>
  </clr-dg-column>

  <clr-dg-row *clrDgItems="let data of dataList" [clrDgItem]="data">
    <clr-dg-cell>{{data.name}}</clr-dg-cell>
    <clr-dg-cell>{{data.date|date}}</clr-dg-cell>
    <clr-dg-cell>{{ data.dateTime| date:'medium' }}</clr-dg-cell>
  </clr-dg-row>
</clr-datagrid>`;

const DATE_FILTER_PRESELECT = `
<clr-datagrid>
  <clr-dg-column>
    Name
  </clr-dg-column>
  <clr-dg-column [clrDgField]="'date'">
    Date
    <clr-dg-filter>
      <clr-date-filter clrProperty="date" [(clrFilterValue)]="dateFilterValue"></clr-date-filter>
    </clr-dg-filter>
  </clr-dg-column>

  <clr-dg-row *clrDgItems="let data of dataList" [clrDgItem]="data">
    <clr-dg-cell>{{data.name}}</clr-dg-cell>
    <clr-dg-cell>{{data.date|date}}</clr-dg-cell>
  </clr-dg-row>
</clr-datagrid>
`;

const today = new Date(Date.now());
const yesterday = new Date(Date.now() - 24 * 1000 * 60 * 60);
const tomorrow = new Date(Date.now() + 24 * 1000 * 60 * 60);
ClarityIcons.addIcons(
  errorStandardIcon,
  warningStandardIcon,
  successStandardIcon,
  infoStandardIcon,
  minusIcon,
  plusIcon
);

@Component({
  selector: 'clr-datagrid-demo-docu',
  templateUrl: './datagrid.demo.html',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
  standalone: false,
})
export class DatagridDemo extends ClarityDocComponent {
  noSelectAllExample = NO_SELECT_ALL_HTML;
  fullHeightExample = FULL_HEIGHT_HTML;
  persistedStateExample = PERSISTED_STATE;
  enumFilterExample = ENUM_FILTER;
  enumFilterCustomExample = ENUM_FILTER_CUSTOM;
  enumFilterCustomExampleTs = ENUM_FILTER_CUSTOM_TS;
  enumFilterCustomDisplayNameExampleTs = ENUM_FILTER_CUSTOM_DISPLAYNAME_TS;
  enumFilterPreselectExample = ENUM_FILTER_PRESELECT;
  enumFilterEmptyExample = ENUM_FILTER_EMPTY;
  dateFilterExample = DATE_FILTER;
  dateFilterTimeExample = DATETIME_FILTER;
  dateFilterPreselectExample = DATE_FILTER_PRESELECT;
  exportButtonExample = EXPORT_BUTTON_EXAMPLE;
  exportTypesDisplayExample = EXPORT_TYPES_DISPLAY;
  activeFragment;
  selected: any[] = [];
  selectedMinor: any[] = [];

  data$ = of(
    [...Array(15).keys()].map(i => ({
      hideableCol: 'item' + i,
      numericCol: i,
      dateCol: new Date(),
      enumCol: 'Enum ' + i,
    }))
  ).pipe(delay(0));

  dataHighlighting = [
    { name: 'Cell', text: 'Cell', status: 'Cell' },
    { name: 'Cell', text: 'Cell', status: 'Cell' },
    { name: 'Cell', text: 'Cell', status: 'Cell' },
    { name: 'success', text: 'Cell', status: 'success' },
    { name: 'error', text: 'Cell', status: 'error' },
    { name: 'warning', text: 'Cell', status: 'warning' },
    { name: 'info', text: 'Cell', status: 'info' },
    { name: 'Cell', text: 'Cell', status: 'Cell' },
    { name: 'row-hover', text: 'Cell', status: 'Cell' },
    { name: 'row-select', text: 'Cell', status: 'selected' },
    { name: 'disabled', text: 'Cell', status: 'Cell', disabled: true },
    { name: 'selected disabled', text: 'Cell', status: 'selected', disabled: true },
  ];

  currentPage = 1;

  dataList = [
    { name: 'TestValue1', date: today, dateTime: today },
    { name: 'TestValue2', date: yesterday, dateTime: yesterday },
    { name: 'TestValue3', date: tomorrow, dateTime: tomorrow },
  ];

  dataListWithEmpty = [{ name: 'TestValue1' }, { name: 'TestValue2' }, { name: '' }];

  customPossibleValues = ['TestValue1', 'TestValue2', 'TestValue3', 'TestValue4'];
  preselectedValues = ['TestValue1', 'TestValue3'];
  dateFilterValue = [null, today];

  exportableEntries: ExportableEntry[] = [
    { column1: 'A1', column2: 'B1', column3: 'C1', column4: 'D1' },
    { column1: 'A2', column2: 'B2', column3: 'C2', column4: 'D2' },
    { column1: 'A3', column2: 'B3', column3: 'C3', column4: 'D3' },
    { column1: 'A4', column2: 'B4', column3: 'C4', column4: 'D4' },
    { column1: 'A5', column2: 'B5', column3: 'C5', column4: 'D5' },
    { column1: 'A6', column2: 'B6', column3: 'C6', column4: 'D6' },
    { column1: 'A7', column2: 'B7', column3: 'C7', column4: 'D7' },
    { column1: 'A8', column2: 'B8', column3: 'C8', column4: 'D8' },
    { column1: 'A9', column2: 'B9', column3: 'C9', column4: 'D9' },
    { column1: 'A10', column2: 'B10', column3: 'C10', column4: 'D10' },
    { column1: 'A11', column2: 'B11', column3: 'C11', column4: 'D11' },
    { column1: 'A12', column2: 'B12', column3: 'C12', column4: 'D12' },
  ];

  selectedEntry: ExportableEntry[] = [];

  onBackendExport(type: any) {
    console.log(
      'Backend export triggered with type: ' + type + '. Provide dataset to component in order to execute export.'
    );
  }

  @ViewChild('datagrid', { static: false }) datagrid: ClrDatagrid | undefined;
  @ViewChild('datagrid', { static: false, read: ElementRef }) datagridRef?: ElementRef;

  constructor(public route: ActivatedRoute) {
    super('datagrid');
    this.activeFragment = this.route.fragment.pipe(share());
  }

  getColoring(state: string) {
    switch (state) {
      case 'error':
        return 'datagrid-highlight-error';
      case 'success':
        return 'datagrid-highlight-success';
      case 'info':
        return 'datagrid-highlight-info';
      case 'warning':
        return 'datagrid-highlight-warning';
    }
    return '';
  }

  getTextColoring(state: string) {
    switch (state) {
      case 'error':
        return 'highlight-text-error';
      case 'success':
        return 'highlight-text-success';
      case 'info':
        return 'highlight-text-info';
      case 'warning':
        return 'highlight-text-warning';
    }
    return '';
  }

  getIcon(state: string) {
    switch (state) {
      case 'error':
        return 'error-standard';
      case 'success':
        return 'success-standard';
      case 'info':
        return 'info-standard';
      case 'warning':
        return 'warning-standard';
      default:
        return 'minus';
    }
  }
}
