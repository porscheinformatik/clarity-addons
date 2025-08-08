import {
  AfterContentInit,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
  isSignal,
  OnDestroy,
  QueryList,
  Signal,
} from '@angular/core';
import {
  ClrDatagrid,
  ClrDatagridColumn,
  ClrDatagridComparatorInterface,
  ClrDatagridFilter,
  ClrDatagridFilterInterface,
  ClrDatagridPagination,
  ClrDatagridSortOrder,
  ClrDatagridStateInterface,
  DatagridPropertyComparator,
} from '@clr/angular';
import { ClrDatagridStatePersistenceModel } from './datagrid-state-persistence-model.interface';
import { delay, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { StatePersistenceOptions } from './state-persistence-options.interface';
import { DatagridColumnReorderDirective } from '../column-reorder';

const DATE_TYPE = 'date';

interface FilterValueWithMetadata {
  type: string;
  value: unknown;
}

@Directive({
  selector: '[clrStatePersistenceKey]',
})
export class StatePersistenceKeyDirective implements AfterContentInit, OnDestroy {
  /**
   * Configuration options for the persistence.
   * 'Key' represents the local storage key under which the persistence state is stored.
   *
   * Optional fields with the 'persist' prefix toggle the persistence of the respective datagrid functionality,
   * the default value is always 'true'.
   */
  @Input('clrStatePersistenceKey')
  options: StatePersistenceOptions;

  @Input('clrUseLocalStoreOnly')
  useLocalStoreOnly = false;

  @Input('clrPaginationDescription')
  paginationDescription = '';

  @ContentChild(ClrDatagridPagination)
  pagination: ClrDatagridPagination;

  @ContentChild(ClrDatagridPagination, { read: ElementRef })
  paginationElem: ElementRef;

  @ContentChildren(ClrDatagridFilter, { descendants: true })
  customFilters: QueryList<ClrDatagridFilter>;

  @ContentChildren(ClrDatagridColumn, { read: ElementRef })
  gridColumnRefs: QueryList<ElementRef>;

  @ContentChildren(ClrDatagridColumn)
  gridColumns: QueryList<ClrDatagridColumn>;

  canShowPaginationDescription = false;
  warnedAboutCustomDescription = false;
  destroy$ = new Subject<void>();

  private readonly datagrid = inject(ClrDatagrid);
  private readonly reorderDirective = inject(DatagridColumnReorderDirective, { optional: true });

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
    const volatileDataState = this.getVolatileDataState();
    const localStorageState = this.getLocalStorageState();

    this.initFilter(volatileDataState);
    this.initSorting(localStorageState);
    this.initDatagridPersister();

    const columnWidthPersistenceEnabled = this.options.persistColumnWidths ?? false;
    if (columnWidthPersistenceEnabled) {
      this.initColumnWidths(localStorageState);
    }

    const columnOrderPersistenceEnabled = this.options.persistColumnOrder ?? false;
    if (columnOrderPersistenceEnabled && !!this.reorderDirective) {
      this.initColumnOrderPersister(localStorageState);
      this.initColumnOrder(localStorageState);
    }

    const paginationPersistenceEnabled = this.options.persistPagination ?? true;
    if (this.pagination?.page && paginationPersistenceEnabled) {
      this.initPageSizePersister(localStorageState);
      this.initCurrentPage(volatileDataState);
    }
    this.canShowPaginationDescription = true;
  }

  /**
   * With this method filters can be cleared
   * @param key The key for clrStatePersistenceKey
   * @param useLocalStoreOnly The clrUseLocalStoreOnly indicator
   */
  static clearFilters(key: string, useLocalStoreOnly: boolean): void {
    const data = JSON.parse((useLocalStoreOnly ? localStorage : sessionStorage).getItem(key)) || {};
    data.columns = {};
    (useLocalStoreOnly ? localStorage : sessionStorage).setItem(key, JSON.stringify(data));
  }

  private initPageSizePersister(savedState: ClrDatagridStatePersistenceModel) {
    /* persist page size changes in local storage */
    this.pagination.page.sizeChange.pipe(takeUntil(this.destroy$)).subscribe(pageSize => {
      const state = this.getLocalStorageState();
      state.pageSize = pageSize;
      this.saveLocalStorageState(state);
    });

    /* init page size of datagrid if already persisted in local storage */
    if (savedState.pageSize) {
      this.pagination.page.size = savedState.pageSize;
    }
  }

  private initCurrentPage(savedState: ClrDatagridStatePersistenceModel) {
    /* init current page of datagrid if already persisted */
    if (savedState?.currentPage) {
      this.datagrid.items.change.pipe(take(1)).subscribe(() => (this.pagination.page.current = savedState.currentPage));
    }
  }

  private initFilter(savedState: ClrDatagridStatePersistenceModel): void {
    const filterPersistenceEnabled = this.options.persistFilters ?? true;
    if (savedState.columns && filterPersistenceEnabled) {
      Object.keys(savedState.columns).forEach(prop => {
        const filter = this.getFilter(prop);
        if (filter) {
          /* if the saved value is empty filter send null */
          const savedFilterValue = savedState.columns[prop].filterValue;
          if (savedFilterValue == null) {
            (filter as any)['value'] = null;
          } else {
            Object.keys(savedFilterValue)
              .filter(valueKey => valueKey !== 'property')
              .forEach(valueKey => ((filter as any)[valueKey] = this.parseFilterValue(savedFilterValue[valueKey])));
          }
        }
      });
    }
  }

  private initSorting(savedState: ClrDatagridStatePersistenceModel): void {
    const sortPersistenceEnabled = this.options.persistSort ?? true;
    if (savedState.sortBy && sortPersistenceEnabled) {
      this.datagrid.columns.forEach(column => {
        if (this.getSortProperty(column.sortBy) === savedState.sortBy) {
          column.sortOrder = savedState.sortReverse ? ClrDatagridSortOrder.DESC : ClrDatagridSortOrder.ASC;
        } else {
          column.sortOrder = ClrDatagridSortOrder.UNSORTED;
        }
      });
    }
  }

  private initColumnWidths(savedState: ClrDatagridStatePersistenceModel): void {
    const columnWidthsByField: Record<string, string> | undefined = savedState?.columns
      ? Object.fromEntries(Object.entries(savedState.columns).map(([key, value]) => [key, value.width]))
      : undefined;

    if (this.gridColumns && this.gridColumnRefs && columnWidthsByField !== undefined) {
      for (let i = 0; i < this.gridColumns.length; i++) {
        const col = this.gridColumns.get(i);
        const el = this.gridColumnRefs.get(i)?.nativeElement;

        if ((col?.field && columnWidthsByField[col.field]) || el) {
          el.style.width = columnWidthsByField[col.field];
        }
      }
    }
  }

  private initDatagridPersister() {
    // delay is needed, as onDestroy the filters emit empty values.
    // So delay it to the end of the current cycle, so the directive is also destroyed before it gets the next values
    this.datagrid.refresh.pipe(delay(0), takeUntil(this.destroy$)).subscribe(dgState => {
      this.persistFiltersAndCurrentPage(dgState);
      this.persistSorting(dgState);

      if (this.canShowPaginationDescription) {
        this.updatePaginationDescription();
      }
    });

    this.datagrid.items.change.pipe(takeUntil(this.destroy$)).subscribe(() => this.updatePaginationDescription());
  }

  private initColumnOrderPersister(state: ClrDatagridStatePersistenceModel) {
    this.reorderDirective.columnOrderChanged
      .pipe(
        takeUntil(this.destroy$),
        // we skip the first value (init), because it's already coming from the local storage, so no need to save it again
        filter(({ trigger }) => trigger !== 'init')
      )
      .subscribe(({ columns }) => this.persistColumnOrder(state, columns));
  }

  private initColumnOrder(savedState: ClrDatagridStatePersistenceModel): void {
    if (savedState?.columns) {
      const entries = Object.entries(savedState.columns).map(([key, value]) => [key, value.order] as const);
      this.reorderDirective.initializeColumnOrder(Object.fromEntries(entries));
    }
  }

  private persistFiltersAndCurrentPage(dgState: ClrDatagridStateInterface<unknown>): void {
    const filterPersistenceEnabled = this.options.persistFilters ?? true;
    const paginationPersistenceEnabled = this.options.persistPagination ?? true;
    if (!filterPersistenceEnabled && !paginationPersistenceEnabled) {
      return;
    }

    const state = this.getVolatileDataState();
    state.columns = state.columns || {};

    if (paginationPersistenceEnabled) {
      state.currentPage = dgState.page?.current;
    }

    if (filterPersistenceEnabled) {
      Object.keys(state.columns).forEach(prop => (state.columns[prop].filterValue = undefined));
      dgState.filters?.forEach(filter => {
        const property = this.getFilterPropertyName(filter);
        if (property) {
          state.columns[property] = state.columns[property] || {};
          state.columns[property].filterValue = this.enrichFilterValue(filter);
        }
      });
    }

    this.saveVolatileDataState(state);
  }

  private persistSorting(dgState: ClrDatagridStateInterface<unknown>): void {
    const sortPersistenceEnabled = this.options.persistSort ?? true;
    if (sortPersistenceEnabled) {
      const state = this.getLocalStorageState();
      state.sortBy = this.getSortProperty(dgState.sort?.by);
      state.sortReverse = dgState.sort?.reverse;

      this.saveLocalStorageState(state);
    }
  }

  @HostListener('window:beforeunload')
  private persistColumnWidths(): void {
    const columnWidthPersistenceEnabled = this.options?.persistColumnWidths ?? false;
    if (columnWidthPersistenceEnabled) {
      const state = this.getLocalStorageState();
      state.columns = state.columns || {};

      for (let i = 0; i < this.gridColumns.length; i++) {
        const col = this.gridColumns.get(i);
        const el = this.gridColumnRefs.get(i)?.nativeElement;

        if (el?.style?.width && el.style.width !== '0px' && col?.field) {
          state.columns[col.field] ||= {};
          state.columns[col.field].width = el.style.width;
        }
      }

      this.saveLocalStorageState(state);
    }
  }

  private persistColumnOrder(state: ClrDatagridStatePersistenceModel, columns: { name: string }[]): void {
    state.columns = state.columns || {};

    columns.forEach(({ name }, index) => {
      state.columns[name] = state.columns[name] || {};
      state.columns[name].order = index;
    });

    this.saveLocalStorageState(state);
  }

  /**
   * Pagination description must be set by this directive,
   * otherwise we can't update datagrid values from localStorage
   * without getting ExpressionChangedAfterItHasBeenCheckedError
   */
  private updatePaginationDescription() {
    if (this.paginationElem && this.pagination) {
      const paginationDescElem = (<HTMLElement>this.paginationElem.nativeElement).getElementsByClassName(
        'pagination-description'
      )?.[0];
      if (paginationDescElem) {
        if (!this.warnedAboutCustomDescription && paginationDescElem.textContent.trim().length !== 0) {
          console.error(
            'When using clrStatePersistenceKey directive, you should not use custom pagination description' +
              ' inside pagination component content, but use [clrPaginationDescription] on clr-datagrid'
          );
        }
        this.warnedAboutCustomDescription = true;
        if (this.paginationDescription) {
          paginationDescElem.textContent = this.paginationDescription
            .replace('{{first}}', (this.pagination.firstItem + 1).toString())
            .replace('{{last}}', (this.pagination.lastItem + 1).toString())
            .replace('{{total}}', this.pagination.totalItems.toString());
        }
      }
    }
  }

  /**
   * Gets the state of volatile data. This can be influenced by clrUseLocalStoreOnly.
   */
  getVolatileDataState(): ClrDatagridStatePersistenceModel {
    return JSON.parse(this.getStorageBasedOnInputFlag().getItem(this.options.key)) || {};
  }

  getLocalStorageState(): ClrDatagridStatePersistenceModel {
    return JSON.parse(localStorage.getItem(this.options.key)) || {};
  }

  /**
   * Save the state of volatile data. This can be influenced by clrUseLocalStoreOnly.
   */
  saveVolatileDataState(state: ClrDatagridStatePersistenceModel): void {
    this.getStorageBasedOnInputFlag().setItem(this.options.key, JSON.stringify(state));
  }

  saveLocalStorageState(state: ClrDatagridStatePersistenceModel): void {
    localStorage.setItem(this.options.key, JSON.stringify(state));
  }

  private getStorageBasedOnInputFlag(): Storage {
    return this.useLocalStoreOnly ? localStorage : sessionStorage;
  }

  /**
   * As a date is serialized as string, but not deserialized as date
   * we need to add some meta information to do that manually later
   */
  private enrichFilterValue(filter: Record<string, unknown>) {
    const result = {} as Record<string, unknown>;

    Object.keys(filter).forEach(
      key =>
        (result[key] =
          filter[key] instanceof Date
            ? ({
                type: DATE_TYPE,
                value: filter[key],
              } as FilterValueWithMetadata)
            : filter[key])
    );

    return result;
  }

  /**
   * Parse filter values with meta information like date, which needs manual deserialization to a date object
   */
  private parseFilterValue(value: unknown): unknown {
    return (value as FilterValueWithMetadata)?.type === DATE_TYPE
      ? new Date((value as FilterValueWithMetadata).value as string)
      : value;
  }

  private getFilter(prop: string): ClrDatagridFilterInterface<unknown, unknown> {
    // get default filter or custom filter
    return (
      this.datagrid.columns.find(col => col.field === prop)?.filter ||
      this.customFilters.find(filter => this.getFilterPropertyName(filter.filter) === prop)?.filter
    );
  }

  private getFilterPropertyName(filter: ClrDatagridFilterInterface<unknown, unknown>): string {
    // for NestedProperty we need to get the original property
    const filterWithProp = filter as unknown as { property: unknown };
    return ((filterWithProp.property as Record<string, unknown>)?.prop ||
      this.resolveSignal(filterWithProp.property)) as string;
  }

  private resolveSignal<T>(value: T | Signal<T>): T {
    return isSignal(value) ? value() : value;
  }

  private getSortProperty(sortBy: ClrDatagridComparatorInterface<unknown> | string): string | undefined {
    if (sortBy) {
      if (typeof sortBy === 'string') {
        return sortBy;
      }
      if (sortBy instanceof DatagridPropertyComparator) {
        return sortBy.prop;
      }
    }
    return undefined;
  }

  ngOnDestroy() {
    this.persistColumnWidths();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
