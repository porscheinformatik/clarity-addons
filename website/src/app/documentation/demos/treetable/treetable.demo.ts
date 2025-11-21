/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import {
  ClrTreetableComparatorInterface,
  ClrTreetableSortOrder,
  ClrTreetableStringFilterFunction,
} from '@porscheinformatik/clr-addons';
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

  <clr-tt-row
    *clrTtItems="let employee of hierarchy; getChildren: getChildren; clrTtNode as item; isLeaf as isLeaf"
    [clrExpandable]="!isLeaf"
    [clrExpanded]="true"
    [clrTtItem]="item"
  >
    <clr-tt-cell>{{ employee.value.name }}</clr-tt-cell>
    <clr-tt-cell>{{ employee.value.role }}</clr-tt-cell>
    <clr-tt-cell></clr-tt-cell>
  </clr-tt-row>
</clr-treetable>
`;

const HTML_EXAMPLE_SELECTION = `
<clr-treetable [(clrTtSelected)]="selected">
  <clr-tt-column>Name</clr-tt-column>
  <clr-tt-column>Role</clr-tt-column>
  <clr-tt-column>Supervisor</clr-tt-column>

  <clr-tt-row
    *clrTtItems="let employee of hierarchy; getChildren: getChildren; clrTtNode as item; isLeaf as isLeaf"
    [clrExpandable]="!isLeaf"
    [clrExpanded]="true"
    [clrTtItem]="item"
  >
    <clr-tt-cell>{{ employee.value.name }}</clr-tt-cell>
    <clr-tt-cell>{{ employee.value.role }}</clr-tt-cell>
    <clr-tt-cell></clr-tt-cell>
  </clr-tt-row>
</clr-treetable>
`;

const HTML_EXAMPLE_NO_AUTO_PARENT_SELECTION = `
<clr-treetable [(clrTtSelected)]="selected" [clrTtAutoParentSelection]="false">
  <clr-tt-column>Name</clr-tt-column>
  <clr-tt-column>Role</clr-tt-column>
  <clr-tt-column>Supervisor</clr-tt-column>

  <clr-tt-row
    *clrTtItems="let employee of hierarchy; getChildren: getChildren; clrTtNode as item; isLeaf as isLeaf"
    [clrExpandable]="!isLeaf"
    [clrExpanded]="true"
    [clrTtItem]="item"
  >
    <clr-tt-cell>{{ employee.value.name }}</clr-tt-cell>
    <clr-tt-cell>{{ employee.value.role }}</clr-tt-cell>
    <clr-tt-cell></clr-tt-cell>
  </clr-tt-row>
</clr-treetable>
`;

const HTML_EXAMPLE_CUSTOM_SELECTION = `
<clr-treetable>
  <clr-tt-column [clrTtSortBy]="nameComparator" [(clrTtSortOrder)]="sortOrder">Name</clr-tt-column>
  <clr-tt-column>Role</clr-tt-column>
  <clr-tt-column>Supervisor</clr-tt-column>

  <clr-tt-row
    *clrTtItems="let employee of hierarchy; getChildren: getChildren; clrTtNode as item; isLeaf as isLeaf"
    [clrExpandable]="!isLeaf"
    [clrExpanded]="true"
    [clrTtItem]="item"
  >
    <clr-tt-cell>{{ employee.value.name }}</clr-tt-cell>
    <clr-tt-cell>{{ employee.value.role }}</clr-tt-cell>
    <clr-tt-cell></clr-tt-cell>
  </clr-tt-row>
</clr-treetable>
`;

const HTML_EXAMPLE_PRESORTING = `
<clr-treetable>
  <clr-tt-column [clrTtSortBy]="nameComparator" [(clrTtSortOrder)]="descOrder">Name</clr-tt-column>
  <clr-tt-column>Role</clr-tt-column>
  <clr-tt-column>Supervisor</clr-tt-column>

  <clr-tt-row
    *clrTtItems="let employee of hierarchy; getChildren: getChildren; clrTtNode as item; isLeaf as isLeaf"
    [clrExpandable]="!isLeaf"
    [clrExpanded]="true"
    [clrTtItem]="item"
  >
    <clr-tt-cell>{{ employee.value.name }}</clr-tt-cell>
    <clr-tt-cell>{{ employee.value.role }}</clr-tt-cell>
    <clr-tt-cell></clr-tt-cell>
  </clr-tt-row>
</clr-treetable>
`;

const HTML_EXAMPLE_BUILT_IN_FILTER = `
<clr-treetable>
  <clr-tt-column>
    Name
    <clr-tt-string-filter [clrTtStringFilter]="nameFilter" [clrTtFilterPlaceholder]="'Name'"></clr-tt-string-filter>
  </clr-tt-column>
  <clr-tt-column>
    Role
    <clr-tt-string-filter [clrTtStringFilter]="roleFilter" [clrTtFilterPlaceholder]="'Role'"></clr-tt-string-filter>
  </clr-tt-column>
  <clr-tt-column>Supervisor</clr-tt-column>

  <clr-tt-row
    *clrTtItems="let member of orgUnitHierarchy; getChildren: getChildren; clrTtNode as item; isLeaf as isLeaf"
    [clrExpandable]="!isLeaf"
    [clrExpanded]="true"
    [clrTtItem]="item"
  >
    <clr-tt-cell>{{ member.value.name }}</clr-tt-cell>
    <clr-tt-cell>{{ member.value.role }}</clr-tt-cell>
    <clr-tt-cell></clr-tt-cell>
  </clr-tt-row>
</clr-treetable>
`;

const TS_EXAMPLE_BUILT_IN_FILTER_FUNCTION = `
nameFilter: ClrTreetableStringFilterFunction<OrganizationUnitMember> = (item: OrganizationUnitMember, search: string): boolean =>
  item?.value?.name?.toLowerCase().includes(search.toLowerCase());

roleFilter: ClrTreetableStringFilterFunction<OrganizationUnitMember> = (item: OrganizationUnitMember, search: string): boolean =>
  item?.value?.role?.toLowerCase().includes(search.toLowerCase());
`;

const HTML_EXAMPLE_CUSTOM_FILTER = `
<clr-treetable>
  <clr-tt-column>Name</clr-tt-column>
  <clr-tt-column>Role</clr-tt-column>
  <clr-tt-column>
    Type
    <clr-tt-filter [clrTtFilter]="roleTypeFilter">
      <clr-role-type-filter #roleTypeFilter />
    </clr-tt-filter>
  </clr-tt-column>

  <clr-tt-row
    *clrTtItems="let member of orgUnitMemberHierarchy; getChildren: getChildren; clrTtNode as item; isLeaf as isLeaf"
    [clrExpandable]="!isLeaf"
    [clrExpanded]="true"
    [clrTtItem]="item"
  >
    <clr-tt-cell>{{ member.value.name }}</clr-tt-cell>
    <clr-tt-cell>{{ member.value.role }}</clr-tt-cell>
    <clr-tt-cell>{{ member.value.roleType | titlecase }}</clr-tt-cell>
  </clr-tt-row>
</clr-treetable>
`;

const TS_EXAMPLE_CUSTOM_FILTER = `
const RoleEnum = {
  Ceo: 'CEO',
  Lead: 'LEAD',
  Manager: 'MANAGER',
  Employee: 'EMPLOYEE',
} as const satisfies Record<string, string>;
type Role = (typeof RoleEnum)[keyof typeof RoleEnum];

@Component({
  selector: 'clr-role-type-filter',
  template: \`
    <button class="btn btn-sm btn-icon btn-link btn-trash" (click)="clearFilter()">
      <cds-icon shape="trash"></cds-icon>
    </button>
    <clr-checkbox-container cds-layout="m-t:xs">
      @for (role of RoleEnum | keyvalue; track $index) {
        <clr-checkbox-wrapper>
          <input
            type="checkbox"
            clrCheckbox
            [name]="role.key"
            [checked]="isSelected(role.value)"
            (change)="toggleSelection(role.value)"
          />
          <label [for]="role.key">{{ role.key | titlecase }}</label>
        </clr-checkbox-wrapper>
      }
    </clr-checkbox-container>
  \`,
  styles: \`
    .btn-trash {
      position: absolute;
      top: 10px;
      right: 40px;
      padding: 0;
    }
  \`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreetableRoleTypeFilterComponent implements ClrTreetableFilterInterface<OrganizationUnitMember, Role[]> {
  protected readonly RoleEnum = RoleEnum;

  protected readonly selectedRoles = signal<Set<Role>>(new Set());
  readonly changes: Observable<Role[]> = toObservable(this.selectedRoles).pipe(
    map((roleSet) => Array.from(roleSet)),
  );

  isActive(): boolean {
    return this.selectedRoles().size > 0;
  }

  accepts(item: OrganizationUnitMember): boolean {
    return this.isSelected(item?.value?.roleType);
  }

  protected isSelected(role: Role) {
    return this.selectedRoles().has(role);
  }

  protected toggleSelection(role: Role) {
    if (this.isSelected(role)) {
      this.selectedRoles.update((current) => {
        current.delete(role);
        return new Set<Role>(current);
      });
      return;
    }

    this.selectedRoles.update((current) => {
      current.add(role);
      return new Set<Role>(current);
    });
  }

  protected clearFilter(): void {
    this.selectedRoles.set(new Set())
  }
}
`;

export const RoleEnum = {
  Ceo: 'CEO',
  Lead: 'LEAD',
  Manager: 'MANAGER',
  Employee: 'EMPLOYEE',
} as const satisfies Record<string, string>;
export type Role = (typeof RoleEnum)[keyof typeof RoleEnum];

export type Elem = {
  role: string;
  roleType: Role;
  name?: string;
};

export type OrganizationUnitMember = {
  id: string;
  value?: Elem;
  parent?: Elem;
  children?: OrganizationUnitMember[];
};

class NameComparator implements ClrTreetableComparatorInterface<OrganizationUnitMember> {
  compare(a: OrganizationUnitMember, b: OrganizationUnitMember): number {
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
  htmlExampleNoAutoParentSelection = HTML_EXAMPLE_NO_AUTO_PARENT_SELECTION;
  htmlExampleCustomSorting = HTML_EXAMPLE_CUSTOM_SELECTION;
  htmlExamplePresorting = HTML_EXAMPLE_PRESORTING;
  htmlExampleBuiltInFilter = HTML_EXAMPLE_BUILT_IN_FILTER;
  tsExampleBuiltInFilterFunction = TS_EXAMPLE_BUILT_IN_FILTER_FUNCTION;
  htmlExampleCustomFilter = HTML_EXAMPLE_CUSTOM_FILTER;
  tsExampleCustomFilter = TS_EXAMPLE_CUSTOM_FILTER;

  constructor() {
    super('treetable');
  }

  orgUnitMemberHierarchy: OrganizationUnitMember[] = [
    {
      id: 'ceo',
      value: {
        role: 'CEO',
        roleType: RoleEnum.Ceo,
        name: 'Bob',
      },
      children: [
        {
          id: 'sales',
          value: { role: 'Head of Sales', roleType: RoleEnum.Lead, name: 'Alice' },
          parent: { role: 'CEO', roleType: RoleEnum.Ceo, name: 'Bob' },
          children: [
            {
              id: 'sales1',
              value: { role: 'Sales Manager 1', roleType: RoleEnum.Manager, name: 'Frank' },
              parent: { role: 'Head of Sales', roleType: RoleEnum.Lead, name: 'Alice' },
              children: [],
            },
            {
              id: 'sales2',
              value: { role: 'Sales Manager 2', roleType: RoleEnum.Manager, name: 'Charlie' },
              parent: { role: 'Head of Sales', roleType: RoleEnum.Lead, name: 'Alice' },
              children: [],
            },
          ],
        },
        {
          id: 'engineering',
          value: { role: 'Head of Engineering', roleType: RoleEnum.Lead, name: 'Grace' },
          parent: { role: 'CEO', roleType: RoleEnum.Ceo, name: 'Bob' },
          children: [
            {
              id: 'eng1',
              value: { role: 'Engineering Manager 1', roleType: RoleEnum.Manager, name: 'Hank' },
              parent: { role: 'Head of Engineering', roleType: RoleEnum.Lead, name: 'Grace' },
              children: [],
            },
            {
              id: 'eng2',
              value: { role: 'Engineering Manager 2', roleType: RoleEnum.Manager, name: 'Karen' },
              parent: { role: 'Head of Engineering', roleType: RoleEnum.Lead, name: 'Grace' },
              children: [],
            },
          ],
        },
      ],
    },
  ];

  selected = [];
  nameComparator = new NameComparator();
  sortOrder = 0;
  descOrder = ClrTreetableSortOrder.DESC;

  getChildren = (node: OrganizationUnitMember): OrganizationUnitMember[] => node?.children ?? [];
  orgUnitMemberNameFilter: ClrTreetableStringFilterFunction<OrganizationUnitMember> = (
    item: OrganizationUnitMember,
    search: string
  ): boolean => item?.value?.name?.toLowerCase().includes(search.toLowerCase());
  orgUnitMemberRoleFilter: ClrTreetableStringFilterFunction<OrganizationUnitMember> = (
    item: OrganizationUnitMember,
    search: string
  ): boolean => item?.value?.role?.toLowerCase().includes(search.toLowerCase());
}
