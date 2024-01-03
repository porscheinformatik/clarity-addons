import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
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

@Component({
  template: `
    <clr-datagrid
      [clrStatePersistenceKey]="{
        key: PERSISTENCE_KEY,
        serverDriven: true,
        persistFilters,
        persistPagination,
        persistSort
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

      <clr-dg-footer>
        <clr-dg-pagination [clrDgPageSize]="DEFAULT_PAGE_SIZE">
          <clr-dg-page-size [clrPageSizeOptions]="[10, 15, 20, 50, 100]"></clr-dg-page-size>
        </clr-dg-pagination>
      </clr-dg-footer>
    </clr-datagrid>
  `,
})
class TestComponent {
  @ViewChild(ClrDatagridPagination)
  pagination: ClrDatagridPagination;

  @ViewChild(ClrDatagrid)
  datagrid: ClrDatagrid;

  refreshHandler = new BehaviorSubject<ClrDatagridStateInterface>(undefined);

  readonly PERSISTENCE_KEY = PERSISTENCE_KEY;
  readonly DEFAULT_PAGE_SIZE = DEFAULT_PAGE_SIZE;
  readonly PROPERTY_COMPARATOR = new DatagridPropertyComparator('column4');

  persistFilters: boolean | undefined = false;
  persistPagination: boolean | undefined = false;
  persistSort: boolean | undefined = false;
}

const DEFAULT_PAGE_SIZE = 15;
const PERSISTENCE_KEY = 'StatePersistenceKeyDirective';

describe('StatePersistenceKeyDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClarityModule, FormsModule, BrowserAnimationsModule, ClrDatagridStatePersistenceModule],
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
      fixture.componentInstance.persistPagination = true;
      const storageModel = '{"pageSize":50,"columns":{"column1": {"hidden":true}}}';
      localStorage.setItem(PERSISTENCE_KEY, storageModel);

      fixture.detectChanges();

      expect(fixture.componentInstance.pagination).toBeTruthy();
      setTimeout(() => {
        expect(fixture.componentInstance.pagination.page.size).toBe(50);
      });
    }));

    it('should persist to local storage', () => {
      fixture.componentInstance.persistPagination = true;
      fixture.detectChanges();
      fixture.componentInstance.pagination.pageSize = 100;

      expect(fixture.componentInstance.pagination).toBeTruthy();
      expect(fixture.componentInstance.pagination.page.size).toBe(100);

      const storageModel = localStorage.getItem(PERSISTENCE_KEY);
      expect(storageModel).toBe('{"pageSize":100}');
    });

    it("should not load from local storage when 'persistPagination' is false", fakeAsync(() => {
      const storageModel = '{"pageSize":50,"columns":{}}';
      localStorage.setItem(PERSISTENCE_KEY, storageModel);

      fixture.componentInstance.persistPagination = false;
      fixture.detectChanges();
      tick();

      expect(fixture.componentInstance.pagination.page.size).toBe(DEFAULT_PAGE_SIZE);
    }));

    it("should not persist to local storage when 'persistPagination' is false", () => {
      fixture.componentInstance.persistPagination = false;
      fixture.detectChanges();
      fixture.componentInstance.pagination.pageSize = 100;

      expect(fixture.componentInstance.pagination.page.size).toBe(100);

      const storageModel = localStorage.getItem(PERSISTENCE_KEY);
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
      fixture.componentInstance.persistSort = true;
      const storageModel = '{"sortBy":"column1","sortReverse":false,"columns":{}}';
      localStorage.setItem(PERSISTENCE_KEY, storageModel);
      fixture.detectChanges();

      tick();
      const actual = fixture.componentInstance.refreshHandler.value;
      expect(actual.sort.by).toBe('column1');
      expect(actual.sort.reverse).toBe(false);
    }));

    it('should persist to local storage', fakeAsync(() => {
      fixture.componentInstance.persistSort = true;
      fixture.detectChanges();

      fixture.debugElement.query(By.css('#column2 button')).nativeElement.click();
      tick();
      let storageModel = localStorage.getItem(PERSISTENCE_KEY);
      expect(storageModel).toBe('{"sortBy":"column2","sortReverse":false}');

      fixture.debugElement.query(By.css('#column2 button')).nativeElement.click();
      tick();
      storageModel = localStorage.getItem(PERSISTENCE_KEY);
      expect(storageModel).toBe('{"sortBy":"column2","sortReverse":true}');
    }));

    it('should load from local storage when clrDgSortBy is a comparator', fakeAsync(() => {
      fixture.componentInstance.persistSort = true;
      const storageModel = '{"sortBy":"column4","sortReverse":true,"columns":{}}';
      localStorage.setItem(PERSISTENCE_KEY, storageModel);
      fixture.detectChanges();

      tick();
      const actual = fixture.componentInstance.refreshHandler.value;
      expect(actual.sort.by).toBe('column4');
      expect(actual.sort.reverse).toBe(true);
    }));

    it('should persist to local storage when clrDgSortBy is a comparator', fakeAsync(() => {
      fixture.componentInstance.persistSort = true;
      fixture.detectChanges();

      fixture.debugElement.query(By.css('#column4 button')).nativeElement.click();
      tick();
      const storageModel = localStorage.getItem(PERSISTENCE_KEY);
      expect(storageModel).toBe('{"sortBy":"column4","sortReverse":false}');
    }));

    it("should not load from local storage when 'persistSort' is false", fakeAsync(() => {
      fixture.componentInstance.persistSort = false;
      const storageModel = '{"sortBy":"column1","sortReverse":false,"columns":{}}';
      localStorage.setItem(PERSISTENCE_KEY, storageModel);
      fixture.detectChanges();

      tick();
      const actual = fixture.componentInstance.refreshHandler.value;
      expect(actual.sort.by).toBe('column3');
      expect(actual.sort.reverse).toBe(true);
    }));

    it("should not persist to local storage when 'persistSort' is false", fakeAsync(() => {
      fixture.componentInstance.persistSort = false;
      fixture.detectChanges();

      fixture.debugElement.query(By.css('#column2 button')).nativeElement.click();
      tick();
      const storageModel = localStorage.getItem(PERSISTENCE_KEY);
      expect(storageModel).toBeNull();
    }));
  });
});
