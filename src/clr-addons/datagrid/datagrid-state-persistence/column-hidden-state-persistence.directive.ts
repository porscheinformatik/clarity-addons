import { Directive, OnInit, Optional } from '@angular/core';
import { DatagridFieldDirective } from './datagrid-field.directive';
import { ClrDatagrid, ClrDatagridHideableColumn } from '@clr/angular';
import { StatePersistenceKeyDirective } from './state-persistence-key.directive';
import { ClrDatagridStatePersistenceModel } from './datagrid-state-persistence-model.interface';

@Directive({
  selector: '[clrDgHideableColumn]',
})
export class ColumnHiddenStatePersistenceDirective implements OnInit {
  constructor(
    @Optional() private columnDirective: DatagridFieldDirective,
    @Optional() private statePersistenceKey: StatePersistenceKeyDirective,
    private datagrid: ClrDatagrid,
    private hideableColumnDirective: ClrDatagridHideableColumn
  ) {}

  ngOnInit() {
    if (this.statePersistenceKey?.clrStatePersistenceKey && this.columnDirective?.clrDgField) {
      /* set hidden states from local storage (if existing) */
      this.initHiddenState();

      /* listen to state changes and persist in local storage */
      this.hideableColumnDirective.hiddenChange.subscribe(hidden => {
        this.setHiddenState(hidden);
      });
    }
  }

  private initHiddenState() {
    /* read grid state if existing */
    const persistedGridStateJson = localStorage.getItem(this.statePersistenceKey.clrStatePersistenceKey);
    if (persistedGridStateJson !== null) {
      const persistedGridState = JSON.parse(persistedGridStateJson) as ClrDatagridStatePersistenceModel;

      /* read column state if existing */
      if (persistedGridState.columns && persistedGridState.columns[this.columnDirective.clrDgField]) {
        /* read column hidden state if existing */
        const persistedColumnHiddenState = persistedGridState.columns[this.columnDirective.clrDgField].hidden;
        if (persistedColumnHiddenState !== undefined) {
          this.hideableColumnDirective.clrDgHidden = persistedColumnHiddenState === true;
        }
      }
    }
  }

  private setHiddenState(hidden: boolean) {
    if (!this.datagrid?.detailService?.isOpen) {
      /* read grid state if existing */
      const persistedGridStateJson = localStorage.getItem(this.statePersistenceKey.clrStatePersistenceKey);
      let persistedGridState = {} as ClrDatagridStatePersistenceModel;
      if (persistedGridStateJson !== null) {
        persistedGridState = JSON.parse(persistedGridStateJson) as ClrDatagridStatePersistenceModel;
      }

      /* read column state if existing */
      if (!persistedGridState.columns) {
        persistedGridState.columns = {};
      }
      let persistedColumnState = persistedGridState.columns[this.columnDirective.clrDgField];
      if (!persistedColumnState) {
        persistedColumnState = {};
        persistedGridState.columns[this.columnDirective.clrDgField] = persistedColumnState;
      }

      /* set column hidden state and persist in local storage */
      persistedColumnState.hidden = hidden;
      localStorage.setItem(this.statePersistenceKey.clrStatePersistenceKey, JSON.stringify(persistedGridState));
    }
  }
}
