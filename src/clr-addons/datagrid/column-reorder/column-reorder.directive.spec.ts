import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { ClarityModule, ClrDatagrid, ClrDatagridColumn } from '@clr/angular';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClrDatagridColumnReorderModule, DynamicColumn } from '@porscheinformatik/clr-addons';

@Component({
  template: `
    <clr-datagrid
      cdkDropList
      [clrDatagridColumnReorder]="columns"
      (clrDatagridColumnOrderChanged)="columns = $event.columns"
    >
      @for (col of columns; track col.name) {
      <clr-dg-column [clrDgField]="col.name" cdkDrag>
        {{ col.title }}
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
      imports: [ClarityModule, FormsModule, BrowserAnimationsModule, ClrDatagridColumnReorderModule, CdkDropList],
      declarations: [TestComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
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
});
