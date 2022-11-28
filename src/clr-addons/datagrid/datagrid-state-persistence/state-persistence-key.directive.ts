import { AfterContentInit, ContentChild, ContentChildren, Directive, Input, OnDestroy, QueryList } from '@angular/core';
import { ClrDatagrid, ClrDatagridFilter, ClrDatagridPagination } from '@clr/angular';
import { ClrDatagridStatePersistenceModel } from './datagrid-state-persistence-model.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const DATE_TYPE = 'date';

@Directive({
  selector: '[clrStatePersistenceKey]',
})
export class StatePersistenceKeyDirective implements AfterContentInit, OnDestroy {
  @Input('clrStatePersistenceKey')
  options: { key: string; serverDriven: boolean };

  @ContentChild(ClrDatagridPagination)
  pagination: ClrDatagridPagination;

  @ContentChildren(ClrDatagridFilter, { descendants: true })
  customFilters: QueryList<ClrDatagridFilter>;

  destroy$ = new Subject<void>();

  constructor(private datagrid: ClrDatagrid) {}

  ngAfterContentInit() {
    if (this.options.serverDriven) {
      this.init();
    } else {
      setTimeout(() => {
        this.init();
      });
    }
  }

  private init() {
    const sessionState = this.getSessionState();
    const localStorageState = this.getLocalStorageState();

    this.initFilter(sessionState);
    this.initDatagridPersister();

    if (this.pagination && this.pagination.page) {
      this.initPageSizePersister(localStorageState);
      this.initCurrentPage(sessionState);
    }
  }

  private initPageSizePersister(savedState: ClrDatagridStatePersistenceModel) {
    /* persist page size changes in local storage */
    this.pagination.page.sizeChange.pipe(takeUntil(this.destroy$)).subscribe(pageSize => {
      const state = this.getLocalStorageState();
      state.pageSize = pageSize;
      localStorage.setItem(this.options.key, JSON.stringify(state));
    });

    /* init page size of datagrid if already persisted in local storage */
    if (savedState.pageSize) {
      this.pagination.page.size = savedState.pageSize;
    }
  }

  private initCurrentPage(savedState: ClrDatagridStatePersistenceModel) {
    /* init current page of datagrid if already persisted */
    if (savedState?.currentPage) {
      this.pagination.page.current = savedState.currentPage;
    }
  }

  private initFilter(savedState: ClrDatagridStatePersistenceModel) {
    if (savedState.columns) {
      Object.keys(savedState.columns).forEach(prop => {
        const filter = this.getFilter(prop);
        if (filter) {
          const savedFilterValue = savedState.columns[prop].filterValue || {};
          Object.keys(savedFilterValue)
            .filter(valueKey => valueKey !== 'property')
            .forEach(valueKey => ((filter as any)[valueKey] = this.parseFilterValue(savedFilterValue[valueKey])));
        }
      });
    }
  }

  private initDatagridPersister() {
    this.datagrid.refresh.pipe(takeUntil(this.destroy$)).subscribe(dgState => {
      const state = this.getSessionState();

      state.currentPage = dgState.page?.current;
      state.columns = state.columns || {};
      Object.keys(state.columns).forEach(prop => (state.columns[prop].filterValue = undefined));
      dgState.filters?.forEach(filter => {
        const property = this.getFilterPropertyName(filter);
        if (property) {
          state.columns[property] = state.columns[property] || {};
          state.columns[property].filterValue = this.enrichFilterValue(filter);
        }
      });

      sessionStorage.setItem(this.options.key, JSON.stringify(state));
    });
  }

  getSessionState(): ClrDatagridStatePersistenceModel {
    return JSON.parse(sessionStorage.getItem(this.options.key)) || {};
  }

  getLocalStorageState(): ClrDatagridStatePersistenceModel {
    return JSON.parse(localStorage.getItem(this.options.key)) || {};
  }

  /**
   * As a date is serialized as string, but not deserialized as date
   * we need to add some meta information to do that manually later
   */
  private enrichFilterValue(filter: any) {
    const result = {} as any;

    Object.keys(filter).forEach(
      key =>
        (result[key] =
          filter[key] instanceof Date
            ? {
                type: DATE_TYPE,
                value: filter[key],
              }
            : filter[key])
    );

    return result;
  }

  /**
   * Parse filter values with meta information like date, which needs manual deserialization to a date object
   */
  private parseFilterValue(value: any) {
    return value?.type === DATE_TYPE ? new Date(value.value) : value;
  }

  private getFilter(prop: string) {
    // get default filter or custom filter
    return (
      this.datagrid.columns.find(col => col.field === prop)?.filter ||
      this.customFilters.find(filter => this.getFilterPropertyName(filter.filter) === prop)?.filter
    );
  }

  private getFilterPropertyName(filter: any) {
    // for NestedProperty we need to get the original property
    return filter.property?.prop || filter.property;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
