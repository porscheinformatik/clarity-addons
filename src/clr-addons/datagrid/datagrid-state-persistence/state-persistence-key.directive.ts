import {
  AfterContentInit,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  QueryList,
} from '@angular/core';
import { ClrDatagrid, ClrDatagridFilter, ClrDatagridFilterInterface, ClrDatagridPagination } from '@clr/angular';
import { ClrDatagridStatePersistenceModel } from './datagrid-state-persistence-model.interface';
import { delay, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const DATE_TYPE = 'date';

interface FilterValueWithMetadata {
  type: string;
  value: unknown;
}

@Directive({
  selector: '[clrStatePersistenceKey]',
})
export class StatePersistenceKeyDirective implements AfterContentInit, OnDestroy {
  @Input('clrStatePersistenceKey')
  options: { key: string; serverDriven: boolean };

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

  canShowPaginationDescription = false;
  warnedAboutCustomDescription = false;
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
    const volatileDataState = this.getVolatileDataState();
    const localStorageState = this.getLocalStorageState();

    this.initFilter(volatileDataState);
    this.initDatagridPersister();

    if (this.pagination && this.pagination.page) {
      this.initPageSizePersister(localStorageState);
      this.initCurrentPage(volatileDataState);
    }
    this.canShowPaginationDescription = true;
  }

  /**
   *Withthismethodfilterscanbecleared
   *@param key The key for clrStatePersistenceKey
   *@param useLocalStoreOnly The clrUseLocalStoreOnly indicator
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
    // delay is needed, as onDestroy the filters emit empty values.
    // So delay it to the end of the current cycle, so the directive is also destroyed before it gets the next values
    this.datagrid.refresh.pipe(delay(0), takeUntil(this.destroy$)).subscribe(dgState => {
      const state = this.getVolatileDataState();

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

      (this.useLocalStoreOnly ? localStorage : sessionStorage).setItem(this.options.key, JSON.stringify(state));
      if (this.canShowPaginationDescription) {
        this.updatePaginationDescription();
      }
    });

    this.datagrid.items.change.pipe(takeUntil(this.destroy$)).subscribe(() => this.updatePaginationDescription());
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
    return JSON.parse((this.useLocalStoreOnly ? localStorage : sessionStorage).getItem(this.options.key)) || {};
  }

  getLocalStorageState(): ClrDatagridStatePersistenceModel {
    return JSON.parse(localStorage.getItem(this.options.key)) || {};
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
    return ((filterWithProp.property as Record<string, unknown>)?.prop || filterWithProp.property) as string;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
