/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {Component} from "@angular/core";
import { ClarityDocComponent } from "../clarity-doc";

const NO_SELECT_ALL_HTML = `
<clr-datagrid class="datagrid-no-select-all" [(clrDgSelected)]="selected">
    <clr-dg-column>Description</clr-dg-column>
    <clr-dg-row clrDgItem="1"><clr-dg-cell>Item 1</clr-dg-cell></clr-dg-row>
    <clr-dg-row clrDgItem="2"><clr-dg-cell>Item 2</clr-dg-cell></clr-dg-row>
    <clr-dg-row clrDgItem="3"><clr-dg-cell>Item 3</clr-dg-cell></clr-dg-row>
    <clr-dg-row clrDgItem="4"><clr-dg-cell>Item 4</clr-dg-cell></clr-dg-row>
    <clr-dg-row clrDgItem="5"><clr-dg-cell>Item 5</clr-dg-cell></clr-dg-row>
</clr-datagrid>`

const FIX_DATAGRID_HEIGHT = `
.datagrid-host {
  height: 478px;
}
.datagrid {
  height: 470px;
}`

const SERVER_DRIVEN_DATAGRID_HTML = `
<clr-datagrid id="activity-datagrid" (clrDgRefresh)="onRefresh($event)" [(clrDgSelected)]="selected">
.....
<clr-dg-footer>
    <clr-dg-column-toggle>
      <clr-dg-column-toggle-title>{{"tasks.activityDatagrid.showHide" | translate}}</clr-dg-column-toggle-title>
      <clr-dg-column-toggle-button>{{"tasks.activityDatagrid.selectAll" | translate}}</clr-dg-column-toggle-button>
    </clr-dg-column-toggle>
    <clr-dg-pagination #pagination [clrDgTotalItems]="activityResults.hitCount">
      {{pagination.firstItem + 1}} - {{pagination.lastItem + 1}}
      of {{activityResults.hitCount}} {{"tasks.activityDatagrid.paging.title" | translate}}
    </clr-dg-pagination>
  </clr-dg-footer>
</clr-datagrid>`

const SERVER_DRIVEN_DATAGRID_TS = `
import { ClrDatagridSortOrder, ClrDatagridStateInterface } from '@clr/angular';
.....
private onRefresh(state: ClrDatagridStateInterface): void {
    this.loading = true;
    const filters: { [prop: string]: any[] } = {};
    if (state.filters) {
      const statusFilter = state.filters[0] as ActivityListStatusFilterComponent;
      if (!!statusFilter.getActivityStatusFilter().handled && !statusFilter.getActivityStatusFilter().open) {
        this.searchParams.handled = ActivitySearchParametersPDTO.HandledEnum.HANDLED;
      }
    }
    if (state.sort) {
      this.searchParams.sortColumn = state.sort.by as SortColumnEnum;
      if (!!state.sort.reverse) {
        this.searchParams.sortDirection = ActivitySearchParametersPDTO.SortDirectionEnum.DESC;
      } else {
        this.searchParams.sortDirection = ActivitySearchParametersPDTO.SortDirectionEnum.ASC;
      }
    }
    if (!!state.page) {
      this.searchParams.offset = state.page.from;
    }
    this.activityListService.getActivities(this.searchParams).subscribe(result => {
      this.activityResults = result;
      this.loading = false;
    }, catchError(error => {
      this.loading = false;
      return throwError(error);
    }));
  }`

@Component({
    selector: "clr-datagrid-demo-docu",
    templateUrl: "./datagrid.demo.html",
    host: {
        "[class.content-area]": "true",
        "[class.dox-content-panel]": "true"
    }
})
export class DatagridDemo extends ClarityDocComponent {
    noSelectAllExample = NO_SELECT_ALL_HTML;
    fixDatagridHeight = FIX_DATAGRID_HEIGHT;
    serverDrivenDatagridHtml = SERVER_DRIVEN_DATAGRID_HTML;
    serverDrivenDatagridTs = SERVER_DRIVEN_DATAGRID_TS;
    selected: any[] = [];

    constructor() {
        super("datagrid");
    }
}
