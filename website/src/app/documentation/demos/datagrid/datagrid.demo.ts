/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';

const NO_SELECT_ALL_HTML = `
<clr-datagrid class="datagrid-no-select-all" [(clrDgSelected)]="selected">
    <clr-dg-column>Description</clr-dg-column>
    <clr-dg-row clrDgItem="1"><clr-dg-cell>Item 1</clr-dg-cell></clr-dg-row>
    <clr-dg-row clrDgItem="2"><clr-dg-cell>Item 2</clr-dg-cell></clr-dg-row>
    <clr-dg-row clrDgItem="3"><clr-dg-cell>Item 3</clr-dg-cell></clr-dg-row>
    <clr-dg-row clrDgItem="4"><clr-dg-cell>Item 4</clr-dg-cell></clr-dg-row>
    <clr-dg-row clrDgItem="5"><clr-dg-cell>Item 5</clr-dg-cell></clr-dg-row>
</clr-datagrid>`;

const PERSITED_COLUMN_STATE = `
<clr-datagrid [clrStatePersistenceKey]="'datagrid.demo.statePersistence'">
    <clr-dg-column [clrDgField]="'hideableColumn'">
        <ng-template clrDgHideableColumn>Hideable</ng-template>
    </clr-dg-column>
    <clr-dg-column>Not Hideable</clr-dg-column>

    <clr-dg-row clrDgItem="1"><clr-dg-cell>Hideable item 1</clr-dg-cell><clr-dg-cell>Not hideable item 1</clr-dg-cell></clr-dg-row>
    <clr-dg-row clrDgItem="2"><clr-dg-cell>Hideable item 2</clr-dg-cell><clr-dg-cell>Not hideable item 2</clr-dg-cell></clr-dg-row>

    <clr-dg-footer></clr-dg-footer>
</clr-datagrid>`;

const PERSITED_PAGE_SIZE = `
<clr-datagrid [clrStatePersistenceKey]="'datagrid.demo.statePersistence'">
    <clr-dg-column>Description</clr-dg-column>
    
    <clr-dg-row *clrDgItems="let item of pageableItems" [clrDgItem]="item">
        <clr-dg-cell>{{item}}</clr-dg-cell>
    </clr-dg-row>

    <clr-dg-footer>
        <clr-dg-pagination #pagination [(clrDgPage)]="currentPage" [clrDgPageSize]="3"
                           [clrDgTotalItems]="totalItems">
            <clr-dg-page-size [clrPageSizeOptions]="[1,3,5,8]">Entries per page</clr-dg-page-size>
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
  columnStateExample = PERSITED_COLUMN_STATE;
  persistedPageSizeExample = PERSITED_PAGE_SIZE;
  enumFilterExample = ENUM_FILTER;
  enumFilterCustomExample = ENUM_FILTER_CUSTOM;
  enumFilterPreselectExample = ENUM_FILTER_PRESELECT;

  selected: any[] = [];

  pageableItems: any[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

  currentPage = 1;
  totalItems = 5;

  dataList = [{ name: 'TestValue1' }, { name: 'TestValue2' }, { name: 'TestValue3' }];
  customPossibleValues = ['TestValue1', 'TestValue2', 'TestValue3', 'TestValue4'];
  preselectedValues = ['TestValue1', 'TestValue3'];

  constructor() {
    super('datagrid');
  }
}
