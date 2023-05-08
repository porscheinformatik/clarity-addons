import { Directive, OnDestroy, OnInit, Optional } from '@angular/core';
import { DatagridFieldDirective } from './datagrid-field.directive';
import { ClrDatagrid, ClrDatagridHideableColumn } from '@clr/angular';
import { StatePersistenceKeyDirective } from './state-persistence-key.directive';
import { ClrDatagridStatePersistenceModel } from './datagrid-state-persistence-model.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[clrDgHideableColumn]',
})
export class ColumnHiddenStatePersistenceDirective implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();

  constructor(
    @Optional() private columnDirective: DatagridFieldDirective,
    @Optional() private statePersistenceKey: StatePersistenceKeyDirective,
    private datagrid: ClrDatagrid,
    private hideableColumnDirective: ClrDatagridHideableColumn
  ) {}

  ngOnInit() {
    const persistenceEnabled = this.statePersistenceKey?.options?.persistHiddenColumns ?? true;
    if (this.statePersistenceKey?.options.key && this.columnDirective?.clrDgField && persistenceEnabled) {
      /* set hidden states from local storage (if existing) */
      this.initHiddenState();

      /* listen to state changes and persist in local storage */
      this.hideableColumnDirective.hiddenChange.pipe(takeUntil(this.destroy$)).subscribe(hidden => {
        this.setHiddenState(hidden);
      });
    }
  }

  private initHiddenState() {
    /* read grid state if existing */
    const persistedGridState = this.readStoredState();

    /* read column state if existing */
    if (persistedGridState?.columns?.[this.columnDirective.clrDgField]) {
      /* read column hidden state if existing */
      const persistedColumnHiddenState = persistedGridState.columns[this.columnDirective.clrDgField].hidden;
      if (persistedColumnHiddenState !== undefined) {
        this.hideableColumnDirective.clrDgHidden = persistedColumnHiddenState === true;
      }
    }
  }

  private setHiddenState(hidden: boolean) {
    if (!this.datagrid?.detailService?.isOpen) {
      /* read grid state if existing */
      const persistedGridState = this.readStoredState();

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
      localStorage.setItem(this.statePersistenceKey.options.key, JSON.stringify(persistedGridState));
    }
  }

  private readStoredState(): ClrDatagridStatePersistenceModel {
    return JSON.parse(localStorage.getItem(this.statePersistenceKey.options.key)) || {};
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
