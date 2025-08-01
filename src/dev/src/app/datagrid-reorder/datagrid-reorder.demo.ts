/*
 * Copyright (c) 2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { TrophiesComponent } from './trophies.component';
import { CommonModule } from '@angular/common';
import { ClarityModule, ClrDatagrid } from '@clr/angular';
import {
  ClrAddonsModule,
  ColumnOrderPersistenceDirective,
  DatagridColumnReorderDirective,
  StatePersistenceOptions,
} from '@porscheinformatik/clr-addons';
import { FormsModule } from '@angular/forms';
import { Rider } from './model';
import { DynamicCellContentComponent } from '../../../../clr-addons/datagrid/column-reorder/dynamic-cell-content.component';
import { DynamicColumn } from '../../../../clr-addons/datagrid/column-reorder/dynamic-column';

@Component({
  selector: 'clr-datagrid-reorder-demo',
  templateUrl: './datagrid-reorder.demo.html',
  imports: [
    CommonModule,
    ClarityModule,
    ClrAddonsModule,
    FormsModule,
    CdkDropList,
    CdkDrag,
    DatagridColumnReorderDirective,
    DynamicCellContentComponent,
  ],
  styles: [
    `
      .cdk-drag-preview {
        border: none;
        box-sizing: border-box;
      }
      ::ng-deep .cdk-drag-placeholder .datagrid-column-title,
      ::ng-deep .cdk-drag-placeholder .datagrid-filter-toggle {
        opacity: 0;
      }
      .cdk-drag-animating {
        transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
      }

      /*TODO[ext.bromm]: Remove ng-deep and move to root CSS (it's easier to test when it's here)*/
      ::ng-deep clr-dg-column.cdk-drag-preview {
        text-align: left;
        min-width: var(--cds-global-space-15);
        display: flex;
        flex: 1 1 auto;
        vertical-align: top;
        border: var(--clr-table-borderwidth) solid var(--clr-table-border-color);
        border-radius: var(--clr-table-border-radius);
        padding: var(--clr-table-cell-padding);

        .datagrid-column-flex {
          display: flex;
          flex: 1 1 auto;
        }

        clr-dg-filter {
          display: none;
        }

        .datagrid-column-title {
          -webkit-appearance: none;
          -moz-appearance: none;
          -ms-appearance: none;
          -o-appearance: none;
          margin: 0;
          padding: 0 2rem 0 0;
          border: 0;
          border-radius: 0;
          box-shadow: none;
          background: none;
          text-align: left;
          color: var(--clr-thead-color);
          font-size: var(--cds-alias-typography-caption-font-size);
          font-weight: var(--cds-alias-typography-font-weight-semibold);
          line-height: var(--cds-alias-typography-caption-line-height);
          letter-spacing: var(--cds-alias-typography-caption-letter-spacing);

          cds-icon.sort-icon {
            display: none;
          }
        }
      }
    `,
  ],
})
export class DatagridReorderDemo implements OnInit {
  selected: Rider[] = [];

  @ViewChild('teamTemplate', { static: true }) public teamTemplateRef: TemplateRef<unknown>;
  @ViewChild(ClrDatagrid, { static: true }) public datagrid: ClrDatagrid;
  @ViewChildren(ColumnOrderPersistenceDirective) public orderDirectives: QueryList<ColumnOrderPersistenceDirective>;

  OPTIONS: StatePersistenceOptions = {
    key: 'datagrid.demo.reorder',
    serverDriven: false,
    persistFilters: true,
    persistPagination: true,
    persistSort: true,
    persistHiddenColumns: true,
    persistColumnWidths: true,
    persistColumnOrder: true,
  };

  data: Rider[] = [
    { name: 'Tadej', surname: 'Pogacar', team: 'UAD', trophies: ['crown', 'car'] },
    { name: 'Jonas', surname: 'Vingegaard', team: 'TVL', trophies: ['star'] },
    { name: 'Remco', surname: 'Evenepoel', team: 'SOQ', trophies: ['airplane'] },
    { name: 'Primoz', surname: 'Roglic', team: 'RBH' },
  ];

  columns: DynamicColumn<Rider>[] = [
    { name: 'name', title: 'Name', valueFn: rider => `${rider.name} ${rider.surname}` },
    { name: 'team', title: 'Team' },
    { name: 'hidden', title: 'Hidden', hidden: true },
    { name: 'trophies', title: 'Trophies', component: TrophiesComponent },
  ];

  ngOnInit() {
    this.columns[1].template = this.teamTemplateRef;
  }
}
