/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ClrTreetableComparatorInterface, ClrTreetableSortOrder } from '@porscheinformatik/clr-addons';
import { ClarityDocComponent } from '../clarity-doc';
import { Component } from '@angular/core';

const HTML_EXAMPLE_CLICKABLE_ROWS = `
<clr-treetable>
    <clr-tt-column>Name</clr-tt-column>
    <clr-tt-column>Role</clr-tt-column>
    <clr-tt-column>Random Number</clr-tt-column>
    <clr-tt-column>Random Date</clr-tt-column>

    <clr-tt-row>
        <clr-tt-cell>David Wallace</clr-tt-cell>
        <clr-tt-cell>CFO</clr-tt-cell>
        <clr-tt-cell>2</clr-tt-cell>
        <clr-tt-cell>2nd of August</clr-tt-cell>

        <clr-tt-row>
            <clr-tt-cell>Michael Scott</clr-tt-cell>
            <clr-tt-cell>Regional Manager</clr-tt-cell>
            <clr-tt-cell>19</clr-tt-cell>
            <clr-tt-cell>3rd of April</clr-tt-cell>

            <clr-tt-row>
                <clr-tt-cell>Dwight K. Schrute</clr-tt-cell>
                <clr-tt-cell>Assistant to the Regional Manager</clr-tt-cell>
                <clr-tt-cell>290</clr-tt-cell>
                <clr-tt-cell>17th of May</clr-tt-cell>
            </clr-tt-row>
            ...
        </clr-tt-row>
    </clr-tt-row>
</clr-treetable>`;

const HTML_EXAMPLE_CLICKABLE_CARET = `
<clr-treetable [clrClickableRows]="false">
    <clr-tt-column>Name</clr-tt-column>
    <clr-tt-column>Role</clr-tt-column>
    <clr-tt-column>Actor</clr-tt-column>

    <clr-tt-row [clrExpanded]="true">
        <clr-tt-cell>David Wallace</clr-tt-cell>
        <clr-tt-cell>CFO</clr-tt-cell>
        <clr-tt-cell><a target="_blank" href="https://www.google.com">Some actor</a></clr-tt-cell>
    </clr-tt-row>
    ...
</clr-treetable>`;

const HTML_EXAMPLE_CUSTOM_SIZE = `
<clr-treetable>
    <clr-tt-column class="clr-col-9">Some column</clr-tt-column>
    <clr-tt-column class="clr-col-3">Some other column</clr-tt-column>
    <clr-tt-row clrExpandable="true">
        ...
    </clr-tt-row>
</clr-treetable>`;

const HTML_EXAMPLE_SINGLE_ROW_ACTION = `
<clr-treetable>
  <clr-tt-column>Some column</clr-tt-column>
  <clr-tt-column>Some other column</clr-tt-column>
  <clr-tt-row clrExpandable="true">
    <clr-tt-action-overflow>
      <button class="action-item">Test Action</button>
    </clr-tt-action-overflow>
    <clr-tt-cell>Lorem ipsum dolor sit amet</clr-tt-cell>
    <clr-tt-cell>2</clr-tt-cell>
    <clr-tt-row>
      <clr-tt-cell>Lorem ipsum dolor sit amet</clr-tt-cell>
      <clr-tt-cell>3</clr-tt-cell>
    </clr-tt-row>
  </clr-tt-row>
  <clr-tt-row>
    <clr-tt-cell>Lorem ipsum dolor sit amet</clr-tt-cell>
    <clr-tt-cell>1</clr-tt-cell>
  </clr-tt-row>
</clr-treetable>
`;

const HTML_EXAMPLE_SMART_ITERATOR = `
<clr-treetable>
  <clr-tt-column>Name</clr-tt-column>
  <clr-tt-column>Role</clr-tt-column>
  <clr-tt-column>Supervisor</clr-tt-column>

  <clr-tt-row *clrTtItems="hierachy; let ceo; trackBy: trackByRoleId" [clrExpandable]="true" [clrExpanded]="true">
    <clr-tt-cell>{{ ceo.value.name }}</clr-tt-cell>
    <clr-tt-cell>{{ ceo.value.role }}</clr-tt-cell>
    <clr-tt-cell></clr-tt-cell>

    <clr-tt-row *clrTtItems="ceo.children; let heads; trackBy: trackByRoleId" [clrExpandable]="true" [clrExpanded]="true">
      <clr-tt-cell>{{ heads.value.name }}</clr-tt-cell>
      <clr-tt-cell>{{ heads.value.role }}</clr-tt-cell>
      <clr-tt-cell>{{ heads.parent.name }}</clr-tt-cell>

      <clr-tt-row *clrTtItems="heads.children; let manager; trackBy: trackByRoleId">
        <clr-tt-cell>{{ manager.value.name }}</clr-tt-cell>
        <clr-tt-cell>{{ manager.value.role }}</clr-tt-cell>
        <clr-tt-cell>{{ manager.parent.name }}</clr-tt-cell>
      </clr-tt-row>
    </clr-tt-row>
  </clr-tt-row>
</clr-treetable>
`;

const HTML_EXAMPLE_SELECTION = `
<clr-treetable [(clrTtSelected)]="selected">
  <clr-tt-column>Name</clr-tt-column>
  <clr-tt-column>Role</clr-tt-column>
  <clr-tt-column>Supervisor</clr-tt-column>

  <clr-tt-row *clrTtItems="hierachy; let ceo" [clrTtItem]="ceo" [clrExpandable]="true" [clrExpanded]="true">
    <clr-tt-cell>{{ ceo.value.name }}</clr-tt-cell>
    <clr-tt-cell>{{ ceo.value.role }}</clr-tt-cell>
    <clr-tt-cell></clr-tt-cell>

    <clr-tt-row *clrTtItems="ceo.children; let heads" [clrTtItem]="heads" [clrExpandable]="true" [clrExpanded]="true">
      <clr-tt-cell>{{ heads.value.name }}</clr-tt-cell>
      <clr-tt-cell>{{ heads.value.role }}</clr-tt-cell>
      <clr-tt-cell>{{ heads.parent.name }}</clr-tt-cell>

      <clr-tt-row *clrTtItems="heads.children; let manager" [clrTtItem]="manager">
        <clr-tt-cell>{{ manager.value.name }}</clr-tt-cell>
        <clr-tt-cell>{{ manager.value.role }}</clr-tt-cell>
        <clr-tt-cell>{{ manager.parent.name }}</clr-tt-cell>
      </clr-tt-row>
    </clr-tt-row>
  </clr-tt-row>
</clr-treetable>
`;

const HTML_EXAMPLE_CUSTOM_SELECTION = `
<clr-treetable>
  <clr-tt-column [clrTtSortBy]="nameComparator" [(clrTtSortOrder)]="sortOrder">Name</clr-tt-column>
  <clr-tt-column>Role</clr-tt-column>
  <clr-tt-column>Supervisor</clr-tt-column>

  <clr-tt-row *clrTtItems="hierachy; let ceo" [clrExpandable]="true" [clrExpanded]="true">
    <clr-tt-cell>{{ ceo.value.name }}</clr-tt-cell>
    <clr-tt-cell>{{ ceo.value.role }}</clr-tt-cell>
    <clr-tt-cell></clr-tt-cell>

    <clr-tt-row *clrTtItems="ceo.children; let heads" [clrExpandable]="true" [clrExpanded]="true">
      <clr-tt-cell>{{ heads.value.name }}</clr-tt-cell>
      <clr-tt-cell>{{ heads.value.role }}</clr-tt-cell>
      <clr-tt-cell>{{ heads.parent.name }}</clr-tt-cell>

      <clr-tt-row *clrTtItems="heads.children; let manager">
        <clr-tt-cell>{{ manager.value.name }}</clr-tt-cell>
        <clr-tt-cell>{{ manager.value.role }}</clr-tt-cell>
        <clr-tt-cell>{{ manager.parent.name }}</clr-tt-cell>
      </clr-tt-row>
    </clr-tt-row>
  </clr-tt-row>
</clr-treetable>
`;

const HTML_EXAMPLE_PRESORTING = `
<clr-treetable>
  <clr-tt-column [clrTtSortBy]="nameComparator" [(clrTtSortOrder)]="descOrder">Name</clr-tt-column>
  <clr-tt-column>Role</clr-tt-column>
  <clr-tt-column>Supervisor</clr-tt-column>

  <clr-tt-row *clrTtItems="hierachy; let ceo" [clrExpandable]="true" [clrExpanded]="true">
    <clr-tt-cell>{{ ceo.value.name }}</clr-tt-cell>
    <clr-tt-cell>{{ ceo.value.role }}</clr-tt-cell>
    <clr-tt-cell></clr-tt-cell>

    <clr-tt-row *clrTtItems="ceo.children; let heads" [clrExpandable]="true" [clrExpanded]="true">
      <clr-tt-cell>{{ heads.value.name }}</clr-tt-cell>
      <clr-tt-cell>{{ heads.value.role }}</clr-tt-cell>
      <clr-tt-cell>{{ heads.parent.name }}</clr-tt-cell>

      <clr-tt-row *clrTtItems="heads.children; let manager">
        <clr-tt-cell>{{ manager.value.name }}</clr-tt-cell>
        <clr-tt-cell>{{ manager.value.role }}</clr-tt-cell>
        <clr-tt-cell>{{ manager.parent.name }}</clr-tt-cell>
      </clr-tt-row>
    </clr-tt-row>
  </clr-tt-row>
</clr-treetable>
`;

export type Elem = {
  role: string;
  name?: string;
};

export type Tree = {
  id: string;
  value?: Elem;
  parent?: Elem;
  children?: Tree[];
};

class NameComparator implements ClrTreetableComparatorInterface<Tree> {
  compare(a: Tree, b: Tree): number {
    return a.value.name.localeCompare(b.value.name);
  }
}

@Component({
  selector: 'clr-treetable-demo',
  templateUrl: './treetable.demo.html',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
  standalone: false,
})
export class TreetableDemo extends ClarityDocComponent {
  htmlExampleClickableRows = HTML_EXAMPLE_CLICKABLE_ROWS;
  htmlExampleClickableCaret = HTML_EXAMPLE_CLICKABLE_CARET;
  htmlExampleCustomSize = HTML_EXAMPLE_CUSTOM_SIZE;
  htmlExampleSingleRowAction = HTML_EXAMPLE_SINGLE_ROW_ACTION;
  htmlExampleSmartIterator = HTML_EXAMPLE_SMART_ITERATOR;
  htmlExampleSelection = HTML_EXAMPLE_SELECTION;
  htmlExampleCustomSorting = HTML_EXAMPLE_CUSTOM_SELECTION;
  htmlExamplePresorting = HTML_EXAMPLE_PRESORTING;

  constructor() {
    super('treetable');
  }

  hierachy: Tree[] = [
    {
      id: 'ceo',
      value: { role: 'CEO', name: 'Bob' },
      children: [
        {
          id: 'sales',
          value: { role: 'Head of Sales', name: 'Alice' },
          parent: { role: 'CEO', name: 'Bob' },
          children: [
            {
              id: 'sales1',
              value: { role: 'Sales Manager 1', name: 'Frank' },
              parent: { role: 'Head of Sales', name: 'Alice' },
              children: [],
            },
            {
              id: 'sales2',
              value: { role: 'Sales Manager 2', name: 'Charlie' },
              parent: { role: 'Head of Sales', name: 'Alice' },
              children: [],
            },
          ],
        },
        {
          id: 'engineering',
          value: { role: 'Head of Engineering', name: 'Grace' },
          parent: { role: 'CEO', name: 'Bob' },
          children: [
            {
              id: 'eng1',
              value: { role: 'Engineering Manager 1', name: 'Hank' },
              parent: { role: 'Head of Engineering', name: 'Grace' },
              children: [],
            },
            {
              id: 'eng2',
              value: { role: 'Engineering Manager 2', name: 'Karen' },
              parent: { role: 'Head of Engineering', name: 'Grace' },
              children: [],
            },
          ],
        },
      ],
    },
  ];

  trackByRoleId(_: number, item: Tree): string {
    return item.id;
  }
  selected = [];
  nameComparator = new NameComparator();
  sortOrder = 0;
  descOrder = ClrTreetableSortOrder.DESC;
}
