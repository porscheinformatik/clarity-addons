import { Directive, OnInit, Optional } from '@angular/core';
import { DatagridFieldDirective } from './datagrid-field.directive';
import { ClrDatagrid, ClrDatagridHideableColumn } from '@clr/angular';
import { StatePersistenceKeyDirective } from './state-persistence-key.directive';

type DatagridState = { [key: string]: ColumnState };

interface ColumnState {
  hidden?: boolean;
}

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
    /* 1. read grid state if existing */
    const persistedGridStateJson = localStorage.getItem(this.statePersistenceKey.clrStatePersistenceKey);
    if (persistedGridStateJson != null) {
      const persistedGridState = JSON.parse(persistedGridStateJson);

      /* 2. read column state if existing */
      const persistedColumnState = persistedGridState[this.columnDirective.clrDgField];
      if (persistedColumnState) {
        /* 3. read column hidden state if existing */
        const persistedColumnHiddenState = persistedColumnState['hidden'];
        if (persistedColumnHiddenState) {
          this.hideableColumnDirective.clrDgHidden = persistedColumnHiddenState === true;
        }
      }
    }
  }

  private setHiddenState(hidden: boolean) {
    if (!this.datagrid?.detailService?.isOpen) {
      /* 1. read grid state if existing */
      const persistedGridStateJson = localStorage.getItem(this.statePersistenceKey.clrStatePersistenceKey);
      let persistedGridState = {} as DatagridState;
      if (persistedGridStateJson != null) {
        persistedGridState = JSON.parse(persistedGridStateJson);
      }

      /* 2. read column state if existing */
      let persistedColumnState = persistedGridState[this.columnDirective.clrDgField];
      if (!persistedColumnState) {
        persistedColumnState = {};
        persistedGridState[this.columnDirective.clrDgField] = persistedColumnState;
      }

      /* 3. set column hidden state and persist in local storage */
      persistedColumnState['hidden'] = hidden;
      localStorage.setItem(this.statePersistenceKey.clrStatePersistenceKey, JSON.stringify(persistedGridState));
    }
  }
}
