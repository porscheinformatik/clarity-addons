import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { ClarityModule, ClrDatagrid, ClrDatagridColumn } from '@clr/angular';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClrDatagridStatePersistenceModule } from '../datagrid-state-persistence/datagrid-state-persistence.module';
import { DynamicColumn } from '@porscheinformatik/clr-addons';

const PERSISTENCE_KEY = 'ColumnReorderDirective';

@Component({
  template: `
    <clr-datagrid
      cdkDropList
      [clrStatePersistenceKey]="{
        key: storageKey,
        serverDriven: true,
        persistHiddenColumns: false,
        persistSort: false,
        persistPagination: false,
        persistFilters: false,
        persistColumnOrder,
      }"
      [clrDatagridColumnReorder]="columns"
      (clrDatagridColumnOrderChanged)="columns = $event.columns"
    >
      @for (col of columns; track col.name) {
      <clr-dg-column [clrDgField]="col.name" cdkDrag>
        <ng-container *clrDgHideableColumn="{ hidden: col.hidden }">{{ col.title }}</ng-container>
      </clr-dg-column>
      }
      <clr-dg-row *clrDgItems="let item of items" [clrDgItem]="item" [clrDgSelectable]="true">
        @for (col of columns; track col.name) {
        <clr-dg-cell>{{ item }}</clr-dg-cell>
        }
      </clr-dg-row>
    </clr-datagrid>
  `,
  standalone: false,
})
class TestComponent {
  @ViewChildren(ClrDatagridColumn) clrColumns: QueryList<ClrDatagridColumn>;
  @ViewChildren(ClrDatagridColumn, { read: ElementRef }) clrColumnsElRefs: QueryList<ElementRef>;
  @ViewChild(ClrDatagrid) datagrid: ClrDatagrid;
  @ViewChild(CdkDropList) dropList: CdkDropList;

  storageKey: string = PERSISTENCE_KEY;
  persistColumnOrder: boolean | undefined = undefined;

  columns: DynamicColumn<string>[] = [
    { name: 'column1', title: 'Column1', formatter: v => v },
    { name: 'column2', title: 'Column2', formatter: v => v },
    { name: 'hidden', title: 'Hidden', formatter: v => v },
    { name: 'column4', title: 'Column4', formatter: v => v },
  ];

  items: string[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
}

describe('ColumnReorderDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClarityModule, FormsModule, BrowserAnimationsModule, ClrDatagridStatePersistenceModule, CdkDropList],
      declarations: [TestComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(fixture).toBeTruthy();
  });

  it('should persist column order if enabled', () => {
    const storageKey = PERSISTENCE_KEY + '-should-persist-order';
    fixture.componentInstance.persistColumnOrder = true;
    fixture.componentInstance.storageKey = storageKey;
    fixture.detectChanges();

    fixture.componentInstance.dropList.dropped.emit(createCdkDropEvent(0, 1));
    fixture.detectChanges();

    let persistedState = localStorage.getItem(storageKey);
    expect(persistedState).toEqual(
      '{"columns":{"column2":{"order":0},"column1":{"order":1},"hidden":{"order":2},"column4":{"order":3}}}'
    );

    fixture.componentInstance.dropList.dropped.emit(createCdkDropEvent(2, 0));
    fixture.detectChanges();

    persistedState = localStorage.getItem(storageKey);
    expect(persistedState).toEqual(
      '{"columns":{"column2":{"order":1},"column1":{"order":0},"hidden":{"order":2},"column4":{"order":3}}}'
    );
  });

  it('should not persist column order if disabled', () => {
    const storageKey = PERSISTENCE_KEY + '-should-not-persist-order';
    fixture.componentInstance.persistColumnOrder = false;
    fixture.componentInstance.storageKey = storageKey;
    fixture.detectChanges();

    fixture.componentInstance.dropList.dropped.emit(createCdkDropEvent(0, 1));
    fixture.detectChanges();

    expect(localStorage.getItem(storageKey)).toBeNull();
  });

  it('should init column order if enabled', () => {
    const storageKey = PERSISTENCE_KEY + '-should-init-order';
    localStorage.setItem(
      storageKey,
      '{"columns":{"column2":{"order":3},"column1":{"order":1},"hidden":{"order":2},"column4":{"order":0}}}'
    );
    fixture.componentInstance.persistColumnOrder = true;
    fixture.componentInstance.storageKey = storageKey;
    fixture.detectChanges();

    expect(fixture.componentInstance.columns.map(c => c.name)).toEqual(['column4', 'column1', 'hidden', 'column2']);
  });

  it('should not init column order if disabled', () => {
    const storageKey = PERSISTENCE_KEY + '-should-not-init-order';
    localStorage.setItem(
      storageKey,
      '{"columns":{"column2":{"order":3},"column1":{"order":1},"hidden":{"order":2},"column4":{"order":0}}}'
    );
    fixture.componentInstance.persistColumnOrder = false;
    fixture.componentInstance.storageKey = storageKey;
    fixture.detectChanges();

    expect(fixture.componentInstance.columns.map(c => c.name)).toEqual(['column1', 'column2', 'hidden', 'column4']);
  });

  it('should prevent reordering when detail pane is open', () => {
    fixture.detectChanges();
    fixture.componentInstance.datagrid.detailService.open('Item 1');
    fixture.detectChanges();

    expect(fixture.componentInstance.dropList.disabled).toBeTrue();
    let visibleColumnFields = fixture.componentInstance.clrColumns.filter(col => !col.isHidden).map(col => col.field);
    expect(visibleColumnFields).toEqual(['column1']);

    fixture.componentInstance.datagrid.detailService.close();
    fixture.detectChanges();

    expect(fixture.componentInstance.dropList.disabled).toBeFalse();
    visibleColumnFields = fixture.componentInstance.clrColumns.filter(col => !col.isHidden).map(col => col.field);
    expect(visibleColumnFields).toEqual(['column1', 'column2', 'hidden', 'column4']);
  });

  function createCdkDropEvent(previousIndex: number, currentIndex: number): CdkDragDrop<unknown> {
    return {
      previousIndex,
      currentIndex,
      item: createCdkDrag(),
    } as CdkDragDrop<unknown>;
  }

  function createCdkDrag(): CdkDrag<unknown> {
    return {
      element: fixture.componentInstance.clrColumnsElRefs.get(0),
    } as CdkDrag<unknown>;
  }
});
