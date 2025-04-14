import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  ClarityModule,
  ClrDatagrid,
  ClrDatagridPagination,
  ClrDatagridStateInterface,
  DatagridPropertyComparator,
} from '@clr/angular';
import { ClrDatagridStatePersistenceModule } from './datagrid-state-persistence.module';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { ClrEnumFilterComponent, ClrEnumFilterModule } from '../enum-filter';

@Component({
  template: `
    <clr-datagrid
      [clrStatePersistenceKey]="{
        key: storageKey,
        serverDriven: true,
        persistFilters,
        persistPagination,
        persistSort,
        persistColumnWidths
      }"
      [clrPaginationDescription]="'{{first}} - {{last}} of {{total}} entries'"
      (clrDgRefresh)="refreshHandler.next($event)"
    >
      <clr-dg-column id="column1" [clrDgField]="'column1'" [clrDgSortBy]="'column1'">
        <ng-template clrDgHideableColumn><span>column1</span></ng-template>
      </clr-dg-column>
      <clr-dg-column id="column2" [clrDgField]="'column2'" [clrDgSortBy]="'column2'">
        <ng-template clrDgHideableColumn><span>column2</span></ng-template>
      </clr-dg-column>
      <clr-dg-column id="column3" [clrDgField]="'column3'" [clrDgSortBy]="'column3'" [clrDgSortOrder]="-1">
        <ng-template clrDgHideableColumn><span>column3</span></ng-template>
      </clr-dg-column>
      <clr-dg-column id="column4" [clrDgField]="'column4'" [clrDgSortBy]="PROPERTY_COMPARATOR">
        <ng-template clrDgHideableColumn><span>column4</span></ng-template>
      </clr-dg-column>
      <clr-dg-column id="custom-filter-column" [clrDgField]="'custom'" [clrDgSortBy]="'custom'">
        <ng-template clrDgHideableColumn>
          <span>custom</span>
        </ng-template>
        <clr-dg-filter>
          <clr-enum-filter clrProperty="custom" [clrPossibleValues]="['a', 'b', 'c']"></clr-enum-filter>
        </clr-dg-filter>
      </clr-dg-column>
      <clr-dg-column id="hidden" [clrDgField]="'hidden'">
        <ng-template [clrDgHideableColumn]="{ hidden: true }"><span>hidden</span></ng-template>
      </clr-dg-column>

      <clr-dg-footer>
        <clr-dg-pagination [clrDgPageSize]="DEFAULT_PAGE_SIZE">
          <clr-dg-page-size [clrPageSizeOptions]="[10, 15, 20, 50, 100]"></clr-dg-page-size>
        </clr-dg-pagination>
      </clr-dg-footer>
    </clr-datagrid>
  `,
  standalone: false,
})
class TestComponent {
  @ViewChild(ClrDatagridPagination)
  pagination: ClrDatagridPagination;

  @ViewChild(ClrDatagrid)
  datagrid: ClrDatagrid;

  @ViewChild(ClrEnumFilterComponent)
  customFilter: ClrEnumFilterComponent<any>;

  refreshHandler = new BehaviorSubject<ClrDatagridStateInterface>(undefined);

  readonly DEFAULT_PAGE_SIZE = DEFAULT_PAGE_SIZE;
  readonly PROPERTY_COMPARATOR = new DatagridPropertyComparator('column4');

  storageKey: string = PERSISTENCE_KEY;
  persistFilters: boolean | undefined = false;
  persistPagination: boolean | undefined = false;
  persistSort: boolean | undefined = false;
  persistColumnWidths: boolean | undefined = false;
}

const DEFAULT_PAGE_SIZE = 15;
const PERSISTENCE_KEY = 'StatePersistenceKeyDirective';

describe('StatePersistenceKeyDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClarityModule,
        FormsModule,
        BrowserAnimationsModule,
        ClrDatagridStatePersistenceModule,
        ClrEnumFilterModule,
      ],
      declarations: [TestComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
  });

  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  describe('page size persistence', () => {
    it('should have a default page size', () => {
      fixture.detectChanges();
      expect(fixture.componentInstance.pagination).toBeTruthy();
      expect(fixture.componentInstance.pagination.page.size).toBe(DEFAULT_PAGE_SIZE);
    });

    it('should load from local storage', waitForAsync(() => {
      const localStorageKey = PERSISTENCE_KEY + '-should-load-pagination';
      const storageModel = '{"pageSize":50,"columns":{"column1": {"hidden":true}}}';
      localStorage.setItem(localStorageKey, storageModel);

      fixture.componentInstance.storageKey = localStorageKey;
      fixture.componentInstance.persistPagination = true;
      fixture.detectChanges();

      expect(fixture.componentInstance.pagination).toBeTruthy();
      setTimeout(() => {
        expect(fixture.componentInstance.pagination.page.size).toBe(50);
      });
    }));

    it('should persist to local storage', () => {
      const localStorageKey = PERSISTENCE_KEY + '-should-persist-pagination';
      fixture.componentInstance.storageKey = localStorageKey;
      fixture.componentInstance.persistPagination = true;
      fixture.detectChanges();
      fixture.componentInstance.pagination.pageSize = 100;

      expect(fixture.componentInstance.pagination).toBeTruthy();
      expect(fixture.componentInstance.pagination.page.size).toBe(100);

      const storageModel = localStorage.getItem(localStorageKey);
      expect(storageModel).toBe('{"pageSize":100}');
    });

    it("should not load from local storage when 'persistPagination' is false", fakeAsync(() => {
      const localStorageKey = PERSISTENCE_KEY + '-should-not-load-pagination';
      const storageModel = '{"pageSize":50,"columns":{}}';
      localStorage.setItem(localStorageKey, storageModel);

      fixture.componentInstance.storageKey = localStorageKey;
      fixture.componentInstance.persistPagination = false;
      fixture.detectChanges();
      tick();

      expect(fixture.componentInstance.pagination.page.size).toBe(DEFAULT_PAGE_SIZE);
    }));

    it("should not persist to local storage when 'persistPagination' is false", () => {
      const localStorageKey = PERSISTENCE_KEY + '-should-not-persist-pagination';
      fixture.componentInstance.storageKey = localStorageKey;
      fixture.componentInstance.persistPagination = false;
      fixture.detectChanges();
      fixture.componentInstance.pagination.pageSize = 100;

      expect(fixture.componentInstance.pagination.page.size).toBe(100);

      const storageModel = localStorage.getItem(localStorageKey);
      expect(storageModel).toBeNull();
    });
  });

  it('updates the pagination description', waitForAsync(() => {
    fixture.componentInstance.persistPagination = true;
    const storageModel = '{"pageSize":50}';
    localStorage.setItem(PERSISTENCE_KEY, storageModel);

    fixture.detectChanges();

    expect(fixture.componentInstance.pagination).toBeTruthy();
    setTimeout(() => {
      expect(fixture.componentInstance.pagination.page.size).toBe(50);
      expect(fixture.debugElement.query(By.css('.pagination-description')).nativeElement.textContent).toEqual(
        '1 - 50 of 0 entries'
      );
    }, 1);
  }));

  describe('sort persistence', () => {
    it('should keep a default sort column and sort order', fakeAsync(() => {
      fixture.componentInstance.persistSort = true;
      fixture.detectChanges();

      tick();
      const actual = fixture.componentInstance.refreshHandler.value;
      expect(actual.sort.by).toBe('column3');
      expect(actual.sort.reverse).toBe(true);
    }));

    it('should load from local storage', fakeAsync(() => {
      const localStorageKey = PERSISTENCE_KEY + '-should-load-sort';
      const storageModel = '{"sortBy":"column1","sortReverse":false,"columns":{}}';
      localStorage.setItem(localStorageKey, storageModel);

      fixture.componentInstance.storageKey = localStorageKey;
      fixture.componentInstance.persistSort = true;
      fixture.detectChanges();

      tick();
      const actual = fixture.componentInstance.refreshHandler.value;
      expect(actual.sort.by).toBe('column1');
      expect(actual.sort.reverse).toBe(false);
    }));

    it('should persist to local storage', fakeAsync(() => {
      const localStorageKey = PERSISTENCE_KEY + '-should-persist-sort';
      fixture.componentInstance.storageKey = localStorageKey;
      fixture.componentInstance.persistSort = true;
      fixture.detectChanges();

      fixture.debugElement.query(By.css('#column2 button')).nativeElement.click();
      tick();
      let storageModel = localStorage.getItem(localStorageKey);
      expect(storageModel).toBe('{"sortBy":"column2","sortReverse":false}');

      fixture.debugElement.query(By.css('#column2 button')).nativeElement.click();
      tick();
      storageModel = localStorage.getItem(localStorageKey);
      expect(storageModel).toBe('{"sortBy":"column2","sortReverse":true}');
    }));

    it('should load from local storage when clrDgSortBy is a comparator', fakeAsync(() => {
      const localStorageKey = PERSISTENCE_KEY + '-should-load-sorting-comparator';
      const storageModel = '{"sortBy":"column4","sortReverse":true,"columns":{}}';
      localStorage.setItem(localStorageKey, storageModel);

      fixture.componentInstance.storageKey = localStorageKey;
      fixture.componentInstance.persistSort = true;
      fixture.detectChanges();

      tick();
      const actual = fixture.componentInstance.refreshHandler.value;
      expect(actual.sort.by).toBe('column4');
      expect(actual.sort.reverse).toBe(true);
    }));

    it('should persist to local storage when clrDgSortBy is a comparator', fakeAsync(() => {
      const localStorageKey = PERSISTENCE_KEY + '-should-persist-sort-comparator';
      fixture.componentInstance.storageKey = localStorageKey;
      fixture.componentInstance.persistSort = true;
      fixture.detectChanges();

      fixture.debugElement.query(By.css('#column4 button')).nativeElement.click();
      tick();
      const storageModel = localStorage.getItem(localStorageKey);
      expect(storageModel).toBe('{"sortBy":"column4","sortReverse":false}');
    }));

    it("should not load from local storage when 'persistSort' is false", fakeAsync(() => {
      const localStorageKey = PERSISTENCE_KEY + '-should-not-load-sorting';
      const storageModel = '{"sortBy":"column1","sortReverse":false,"columns":{}}';
      localStorage.setItem(localStorageKey, storageModel);

      fixture.componentInstance.storageKey = localStorageKey;
      fixture.componentInstance.persistSort = false;
      fixture.detectChanges();

      tick();
      const actual = fixture.componentInstance.refreshHandler.value;
      expect(actual.sort.by).toBe('column3');
      expect(actual.sort.reverse).toBe(true);
    }));

    it("should not persist to local storage when 'persistSort' is false", fakeAsync(() => {
      const localStorageKey = PERSISTENCE_KEY + '-should-not-persist-sort';
      fixture.componentInstance.storageKey = localStorageKey;
      fixture.componentInstance.persistSort = false;
      fixture.detectChanges();

      fixture.debugElement.query(By.css('#column2 button')).nativeElement.click();
      tick();
      const storageModel = localStorage.getItem(localStorageKey);
      expect(storageModel).toBeNull();
    }));
  });

  describe('column width persistence', () => {
    it('should apply column widths from local storage', () => {
      const localStorageKey = PERSISTENCE_KEY + '-should-apply-column-widths';
      localStorage.setItem(
        localStorageKey,
        JSON.stringify({
          columns: {
            column1: { width: '100px' },
            hidden: { width: '200px' },
          },
        })
      );

      fixture.componentInstance.storageKey = localStorageKey;
      fixture.componentInstance.persistColumnWidths = true;
      fixture.detectChanges();

      const firstColumn = fixture.nativeElement.querySelector('#column1');
      const hiddenColumn = fixture.nativeElement.querySelector('#hidden');

      expect(firstColumn.style.width).toBe('100px');
      expect(hiddenColumn.style.width).toBe('200px');
    });

    it('should save column width to local storage', () => {
      const localStorageKey = PERSISTENCE_KEY + '-should-save-column-width';
      fixture.componentInstance.storageKey = localStorageKey;
      fixture.componentInstance.persistColumnWidths = true;
      fixture.detectChanges();

      const firstColumn = fixture.nativeElement.querySelector('#column1');
      const hiddenColumn = fixture.nativeElement.querySelector('#hidden');

      firstColumn.style.width = '100px';
      hiddenColumn.style.width = '200px';
      fixture.detectChanges();

      fixture.destroy();

      const storageContent = JSON.parse(localStorage.getItem(localStorageKey));
      expect(storageContent.columns).toEqual({
        column1: { width: '100px' },
        hidden: { width: '200px' },
      });
    });

    [false, undefined].forEach(value => {
      it('should not load from local storage if "persistColumnWidths" is ' + value, () => {
        const localStorageKey = PERSISTENCE_KEY + '-should-not-load-column-widths-' + value;
        localStorage.setItem(
          localStorageKey,
          JSON.stringify({
            columns: {
              column1: { width: '100px' },
              hidden: { width: '200px' },
            },
          })
        );

        fixture.componentInstance.storageKey = localStorageKey;
        fixture.componentInstance.persistColumnWidths = value;
        fixture.detectChanges();

        const firstColumn = fixture.nativeElement.querySelector('#column1');
        const hiddenColumn = fixture.nativeElement.querySelector('#hidden');

        expect(firstColumn.style.width).not.toBe('100px');
        expect(hiddenColumn.style.width).not.toBe('200px');
      });
    });

    [false, undefined].forEach(value => {
      it('should not persist to local storage if "persistColumnWidths" is ' + value, () => {
        const localStorageKey = PERSISTENCE_KEY + '-should-not-persist-width-' + value;
        fixture.componentInstance.storageKey = localStorageKey;
        fixture.componentInstance.persistColumnWidths = value;
        fixture.detectChanges();

        const firstColumn = fixture.nativeElement.querySelector('#column1');
        const hiddenColumn = fixture.nativeElement.querySelector('#hidden');

        firstColumn.style.width = '100px';
        hiddenColumn.style.width = '200px';
        fixture.detectChanges();

        fixture.destroy();

        const storageContent = JSON.parse(localStorage.getItem(localStorageKey));
        expect(storageContent?.columns?.column1).toBeUndefined();
        expect(storageContent?.columns?.hidden).toBeUndefined();
      });
    });
  });

  describe('filter persistence', () => {
    it('should apply filter values from session storage', () => {
      const storageKey = PERSISTENCE_KEY + '-should-apply-filter';
      sessionStorage.setItem(
        storageKey,
        JSON.stringify({
          columns: {
            custom: { filterValue: { property: 'custom', value: ['a', 'b'] } },
            column1: { filterValue: { property: 'column1', value: 'test value' } },
          },
        })
      );

      fixture.componentInstance.storageKey = storageKey;
      fixture.componentInstance.persistFilters = true;
      fixture.detectChanges();

      const dgState = fixture.componentInstance.refreshHandler.value;
      expectFilterValue(dgState, 'custom', ['a', 'b']);
      expectFilterValue(dgState, 'column1', 'test value');
    });

    function expectFilterValue(dgState: ClrDatagridStateInterface, field: string, value: unknown): void {
      const filterValue = dgState.filters.find(f => f.property === field);
      expect(filterValue).not.toBeUndefined();
      expect(filterValue.property).toEqual(field);
      expect(filterValue.value).toEqual(value);
    }

    it('should persist filter values to session storage', fakeAsync(() => {
      const storageKey = PERSISTENCE_KEY + '-should-persist-filter';
      fixture.componentInstance.storageKey = storageKey;
      fixture.componentInstance.persistFilters = true;
      fixture.detectChanges();

      fixture.componentInstance.customFilter.onChange({ value: 'a', displayValue: 'a' }, true);
      fixture.detectChanges();

      tick(1);
      flushMicrotasks();

      const storageContent = JSON.parse(sessionStorage.getItem(storageKey));
      expect(storageContent?.columns?.custom).toEqual({ filterValue: { property: 'custom', value: ['a'] } });
    }));
  });
});
