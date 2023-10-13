/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  ClarityIcons,
  errorStandardIcon,
  infoStandardIcon,
  minusIcon,
  successStandardIcon,
  warningStandardIcon,
} from '@cds/core/icon';

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
ClarityIcons.addIcons(errorStandardIcon, warningStandardIcon, successStandardIcon, infoStandardIcon, minusIcon);

@Component({
  selector: 'clr-datagrid-demo-docu',
  templateUrl: './datagrid.demo.html',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
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
  dateFilterExample = DATE_FILTER;
  dateFilterPreselectExample = DATE_FILTER_PRESELECT;

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
  ];

  currentPage = 1;

  dataList = [
    { name: 'TestValue1', date: today },
    { name: 'TestValue2', date: yesterday },
    { name: 'TestValue3', date: tomorrow },
  ];
  customPossibleValues = ['TestValue1', 'TestValue2', 'TestValue3', 'TestValue4'];
  preselectedValues = ['TestValue1', 'TestValue3'];
  dateFilterValue = [null, today];

  constructor() {
    super('datagrid');
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
