import { Component, QueryList, ViewChildren } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule, ClrDatagridHideableColumn } from '@clr/angular';
import { By } from '@angular/platform-browser';
import { ColumnHiddenStatePersistenceDirective } from './column-hidden-state-persistence.directive';
import { DatagridFieldDirective } from './datagrid-field.directive';
import { StatePersistenceKeyDirective } from './state-persistence-key.directive';

const PERSISTENCE_KEY = 'ColumnHiddenStatePersistenceDirective';

@Component({
  template: `
    <clr-datagrid
      [clrStatePersistenceKey]="{
        key: PERSISTENCE_KEY,
        serverDriven: true,
        persistHiddenColumns,
        persistSort: false,
        persistPagination: false,
        persistFilters: false,
      }"
    >
      <clr-dg-column id="column1" [clrDgField]="'column1'">
        <ng-template clrDgHideableColumn><span>column1</span></ng-template>
      </clr-dg-column>
      <clr-dg-column id="column2" [clrDgField]="'column2'">
        <ng-template clrDgHideableColumn><span>column2</span></ng-template>
      </clr-dg-column>
      <clr-dg-column id="column3">
        <ng-template clrDgHideableColumn><span>column3</span></ng-template>
      </clr-dg-column>
      <clr-dg-column id="column4" [clrDgField]="'column4'">
        <span>column4</span>
      </clr-dg-column>
      <clr-dg-column id="column5" [clrDgField]="'column5'">
        <ng-template clrDgHideableColumn [clrDgHidden]="true"><span>column5</span></ng-template>
      </clr-dg-column>
      <clr-dg-column id="column6" [clrDgField]="'column6'">
        <ng-template clrDgHideableColumn [clrDgHidden]="true"><span>column5</span></ng-template>
      </clr-dg-column>
      <clr-dg-column id="column7" [clrDgFieldKey]="'column7'">
        <ng-template clrDgHideableColumn><span>column7</span></ng-template>
      </clr-dg-column>
    </clr-datagrid>
  `,
  imports: [
    ClarityModule,
    FormsModule,
    ColumnHiddenStatePersistenceDirective,
    DatagridFieldDirective,
    StatePersistenceKeyDirective,
  ],
})
class TestComponent {
  @ViewChildren(ClrDatagridHideableColumn)
  hideableColumnDirectives: QueryList<ClrDatagridHideableColumn>;

  readonly PERSISTENCE_KEY = PERSISTENCE_KEY;

  persistHiddenColumns: boolean | undefined = undefined;
}

describe('ColumnHiddenStatePersistenceDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ClarityModule,
        FormsModule,
        BrowserAnimationsModule,
        ColumnHiddenStatePersistenceDirective,
        DatagridFieldDirective,
        StatePersistenceKeyDirective,
        TestComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('Nothing persisted', () => {
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('#column1')).nativeElement.classList.contains('datagrid-hidden-column')
    ).toBe(false);
    expect(
      fixture.debugElement.query(By.css('#column2')).nativeElement.classList.contains('datagrid-hidden-column')
    ).toBe(false);
    expect(
      fixture.debugElement.query(By.css('#column3')).nativeElement.classList.contains('datagrid-hidden-column')
    ).toBe(false);
    expect(
      fixture.debugElement.query(By.css('#column4')).nativeElement.classList.contains('datagrid-hidden-column')
    ).toBe(false);
    expect(
      fixture.debugElement.query(By.css('#column5')).nativeElement.classList.contains('datagrid-hidden-column')
    ).toBe(true);
    expect(
      fixture.debugElement.query(By.css('#column7')).nativeElement.classList.contains('datagrid-hidden-column')
    ).toBe(false);
  });

  it('Loaded from storage', () => {
    const storageModel =
      '{"columns":{"column1": {"hidden":true}, "column2": {"hidden":false}, "column6": {"hidden":false}, "column7": {"hidden":true}}}';
    localStorage.setItem(PERSISTENCE_KEY, storageModel);

    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('#column1')).nativeElement.classList.contains('datagrid-hidden-column')
    ).toBe(true);
    expect(
      fixture.debugElement.query(By.css('#column2')).nativeElement.classList.contains('datagrid-hidden-column')
    ).toBe(false);
    expect(
      fixture.debugElement.query(By.css('#column3')).nativeElement.classList.contains('datagrid-hidden-column')
    ).toBe(false);
    expect(
      fixture.debugElement.query(By.css('#column4')).nativeElement.classList.contains('datagrid-hidden-column')
    ).toBe(false);
    expect(
      fixture.debugElement.query(By.css('#column5')).nativeElement.classList.contains('datagrid-hidden-column')
    ).toBe(true);
    expect(
      fixture.debugElement.query(By.css('#column6')).nativeElement.classList.contains('datagrid-hidden-column')
    ).toBe(false);
    expect(
      fixture.debugElement.query(By.css('#column7')).nativeElement.classList.contains('datagrid-hidden-column')
    ).toBe(true);
  });

  it('Persisted to storage', () => {
    fixture.detectChanges();

    fixture.componentInstance.hideableColumnDirectives.get(0).clrDgHidden = true;
    fixture.componentInstance.hideableColumnDirectives.get(2).clrDgHidden = true;
    fixture.componentInstance.hideableColumnDirectives.get(3).clrDgHidden = false;
    fixture.componentInstance.hideableColumnDirectives.get(5).clrDgHidden = true;

    expect(
      fixture.debugElement.query(By.css('#column1')).nativeElement.classList.contains('datagrid-hidden-column')
    ).toBe(true);
    expect(
      fixture.debugElement.query(By.css('#column2')).nativeElement.classList.contains('datagrid-hidden-column')
    ).toBe(false);
    expect(
      fixture.debugElement.query(By.css('#column3')).nativeElement.classList.contains('datagrid-hidden-column')
    ).toBe(true);
    expect(
      fixture.debugElement.query(By.css('#column4')).nativeElement.classList.contains('datagrid-hidden-column')
    ).toBe(false);
    expect(
      fixture.debugElement.query(By.css('#column5')).nativeElement.classList.contains('datagrid-hidden-column')
    ).toBe(false);
    expect(
      fixture.debugElement.query(By.css('#column7')).nativeElement.classList.contains('datagrid-hidden-column')
    ).toBe(true);

    const storageModel = localStorage.getItem(PERSISTENCE_KEY);
    expect(storageModel).toBe(
      '{"columns":{"column1":{"hidden":true},"column5":{"hidden":false},"column7":{"hidden":true}}}'
    );
  });

  it("doesn't load from storage when 'persistHiddenColumns' is set to false", () => {
    fixture.componentInstance.persistHiddenColumns = false;
    const storageModel = '{"columns":{"column1": {"hidden":true}, "column5": {"hidden":false}}}';
    localStorage.setItem(PERSISTENCE_KEY, storageModel);
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('#column1')).nativeElement.classList.contains('datagrid-hidden-column')
    ).toBe(false);
    expect(
      fixture.debugElement.query(By.css('#column5')).nativeElement.classList.contains('datagrid-hidden-column')
    ).toBe(true);
  });

  it("doesn't persist to storage when 'persistHiddenColumns' is set to false", () => {
    fixture.componentInstance.persistHiddenColumns = false;
    fixture.detectChanges();

    fixture.componentInstance.hideableColumnDirectives.get(0).clrDgHidden = true;
    fixture.componentInstance.hideableColumnDirectives.get(2).clrDgHidden = true;
    fixture.componentInstance.hideableColumnDirectives.get(3).clrDgHidden = false;

    const storageModel = localStorage.getItem(PERSISTENCE_KEY);
    expect(storageModel).toBe(null);
  });
});
