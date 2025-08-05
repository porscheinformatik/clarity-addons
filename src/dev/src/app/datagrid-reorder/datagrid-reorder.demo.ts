/*
 * Copyright (c) 2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { TrophiesComponent } from './trophies.component';
import { CommonModule } from '@angular/common';
import { ClarityModule, ClrDatagrid } from '@clr/angular';
import {
  ClrAddonsModule,
  DatagridColumnReorderDirective,
  DynamicCellContentComponent,
  DynamicColumn,
  StatePersistenceOptions,
} from '@porscheinformatik/clr-addons';
import { FormsModule } from '@angular/forms';
import { Rider } from './model';

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
})
export class DatagridReorderDemo implements OnInit {
  selected: Rider[] = [];

  @ViewChild('teamTemplate', { static: true }) public teamTemplateRef: TemplateRef<unknown>;
  @ViewChild(ClrDatagrid, { static: true }) public datagrid: ClrDatagrid;

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
    { name: 'name', title: 'Name', formatter: rider => `${rider.name} ${rider.surname}` },
    { name: 'team', title: 'Team' },
    { name: 'hidden', title: 'Hidden', hidden: true },
    { name: 'trophies', title: 'Trophies', component: TrophiesComponent },
  ];

  ngOnInit() {
    this.columns[1].template = this.teamTemplateRef;
  }
}
