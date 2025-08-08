/*
 * Copyright (c) 2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { TrophiesComponent } from './trophies.component';
import { CommonModule } from '@angular/common';
import { ClrDatagridModule } from '@clr/angular';
import { ClrAddonsModule, DynamicColumn, StatePersistenceOptions } from '@porscheinformatik/clr-addons';
import { FormsModule } from '@angular/forms';
import { Rider } from './model';
import { delay, Observable, of, tap } from 'rxjs';

@Component({
  selector: 'clr-datagrid-reorder-demo',
  templateUrl: './datagrid-reorder.demo.html',
  imports: [CommonModule, ClrAddonsModule, FormsModule, CdkDropList, CdkDrag, ClrDatagridModule],
})
export class DatagridReorderDemo implements OnInit {
  selected: Rider[] = [];

  @ViewChild('teamTemplate', { static: true }) public teamTemplateRef: TemplateRef<unknown>;

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

  SERVER_DRIVEN_OPTIONS = {
    ...this.OPTIONS,
    key: 'datagrid.demo.reorder.serverDriven',
    serverDriven: true,
  };

  data: Rider[] = [
    { name: 'Tadej', surname: 'Pogacar', team: 'UAD', trophies: ['crown', 'car'] },
    { name: 'Jonas', surname: 'Vingegaard', team: 'TVL', trophies: ['star'] },
    { name: 'Remco', surname: 'Evenepoel', team: 'SOQ', trophies: ['airplane'] },
    { name: 'Primoz', surname: 'Roglic', team: 'RBH' },
  ];

  data$: Observable<Rider[]>;

  columns: DynamicColumn<Rider>[] = [
    { name: 'name', title: 'Name', formatter: rider => `${rider.name} ${rider.surname}` },
    { name: 'team', title: 'Team' },
    { name: 'hidden', title: 'Hidden', hidden: true },
    { name: 'trophies', title: 'Trophies', component: TrophiesComponent },
  ];

  loading = false;

  ngOnInit() {
    this.columns[1].template = this.teamTemplateRef;
  }

  getAsyncRiderData(): Observable<Rider[]> {
    return of(this.data).pipe(
      tap(() => (this.loading = true)),
      delay(2000),
      tap(() => (this.loading = false))
    );
  }
}
