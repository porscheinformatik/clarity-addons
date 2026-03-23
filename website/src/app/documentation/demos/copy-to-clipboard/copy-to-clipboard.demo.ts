/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';

const DATAGRID_EXAMPLE = `<clr-datagrid>
  <clr-dg-column>ID</clr-dg-column>
  <clr-dg-column>Name</clr-dg-column>

  @for (user of users; track user.id) {
    <clr-dg-row>
      <clr-dg-cell class="clr-copy-to-clipboard-container">
        {{ user.id }}
        <clr-copy-to-clipboard [value]="user.id" [hiddenUntilHovered]="true"></clr-copy-to-clipboard>
      </clr-dg-cell>
      <clr-dg-cell>{{ user.name }}</clr-dg-cell>
    </clr-dg-row>
  }
</clr-datagrid>`;

const TREETABLE_EXAMPLE = `<clr-treetable>
  <clr-tt-column class="clr-col-6">Name</clr-tt-column>
  <clr-tt-column class="clr-col-6">Code</clr-tt-column>

  <clr-tt-row [clrExpandable]="true" [clrExpanded]="true">
    <clr-tt-cell>Engineering</clr-tt-cell>
    <clr-tt-cell class="clr-copy-to-clipboard-container">
      ENG-100
      <clr-copy-to-clipboard value="ENG-100" [hiddenUntilHovered]="true"></clr-copy-to-clipboard>
    </clr-tt-cell>
    <clr-tt-row>
      <clr-tt-cell>Frontend</clr-tt-cell>
      <clr-tt-cell class="clr-copy-to-clipboard-container">
        ENG-110
        <clr-copy-to-clipboard value="ENG-110" [hiddenUntilHovered]="true"></clr-copy-to-clipboard>
      </clr-tt-cell>
    </clr-tt-row>
  </clr-tt-row>
</clr-treetable>`;

const TABLE_EXAMPLE = `<table class="table">
  <thead>
    <tr>
      <th>Label</th>
      <th>Value</th>
    </tr>
  </thead>
  <tbody>
    @for (row of tableRows; track row.label) {
      <tr>
        <td>{{ row.label }}</td>
        <td class="clr-copy-to-clipboard-container clr-justify-content-center">
          {{ row.value }}
          <clr-copy-to-clipboard [value]="row.value" [hiddenUntilHovered]="true"></clr-copy-to-clipboard>
        </td>
      </tr>
    }
  </tbody>
</table>`;

const ALWAYS_VISIBLE_EXAMPLE = `<clr-copy-to-clipboard [value]="'some value'" [tooltipText]="'Copy ID'"></clr-copy-to-clipboard>`;

interface User {
  id: string;
  name: string;
  email: string;
}

interface TreeNode {
  name: string;
  code: string;
  children?: TreeNode[];
}

@Component({
  selector: 'clr-copy-to-clipboard-demo',
  templateUrl: './copy-to-clipboard.demo.html',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
  standalone: false,
})
export class CopyToClipboardDemo extends ClarityDocComponent {
  datagridExample = DATAGRID_EXAMPLE;
  treetableExample = TREETABLE_EXAMPLE;
  tableExample = TABLE_EXAMPLE;
  alwaysVisibleExample = ALWAYS_VISIBLE_EXAMPLE;

  users: User[] = [
    { id: 'USR-001', name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 'USR-002', name: 'Bob Smith', email: 'bob@example.com' },
    { id: 'USR-003', name: 'Carol Williams', email: 'carol@example.com' },
  ];

  treeData: TreeNode[] = [
    {
      name: 'Engineering',
      code: 'ENG-100',
      children: [
        { name: 'Frontend', code: 'ENG-110' },
        { name: 'Backend', code: 'ENG-120' },
      ],
    },
    {
      name: 'Marketing',
      code: 'MKT-200',
      children: [{ name: 'Digital', code: 'MKT-210' }],
    },
  ];

  tableRows = [
    { label: 'Order Number', value: 'ORD-2026-4815' },
    { label: 'Tracking ID', value: 'TRK-XJ9K2M' },
    { label: 'Invoice Reference', value: 'INV-2026-03-001' },
  ];

  getChildren = (node: TreeNode): TreeNode[] => node.children || [];

  constructor() {
    super('copy-to-clipboard');
  }
}
