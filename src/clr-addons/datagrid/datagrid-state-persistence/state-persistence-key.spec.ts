import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule, ClrDatagridPagination } from '@clr/angular';
import { ClrDatagridStatePersistenceModule } from './datagrid-state-persistence.module';

@Component({
  template: `
    <clr-datagrid [clrStatePersistenceKey]="{ key: 'StatePersistenceKeyDirective', serverDriven: true }">
      <clr-dg-column id="column1" [clrDgField]="'column1'">
        <ng-template clrDgHideableColumn><span>column1</span></ng-template>
      </clr-dg-column>

      <clr-dg-footer>
        <clr-dg-pagination #pagination [clrDgPageSize]="15">
          <clr-dg-page-size [clrPageSizeOptions]="[10, 15, 20, 50, 100]"></clr-dg-page-size>
        </clr-dg-pagination>
      </clr-dg-footer>
    </clr-datagrid>
  `,
})
class TestComponent {
  @ViewChild(ClrDatagridPagination)
  pagination: ClrDatagridPagination;
}

describe('StatePersistenceKeyDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClarityModule, FormsModule, BrowserAnimationsModule, ClrDatagridStatePersistenceModule],
      declarations: [TestComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('Default page size', () => {
    expect(fixture.componentInstance.pagination).toBeTruthy();
    expect(fixture.componentInstance.pagination.page.size).toBe(15);
  });

  it('Page size loaded from storage', () => {
    const storageModel = '{"pageSize":50,"columns":{"column1": {"hidden":true}}}';
    localStorage.setItem('StatePersistenceKeyDirective', storageModel);

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.pagination).toBeTruthy();
    setTimeout(() => {
      expect(fixture.componentInstance.pagination.page.size).toBe(50);
    });
  });

  it('Page size persisted to storage', () => {
    fixture.componentInstance.pagination.pageSize = 100;

    expect(fixture.componentInstance.pagination).toBeTruthy();
    expect(fixture.componentInstance.pagination.page.size).toBe(100);

    const storageModel = localStorage.getItem('StatePersistenceKeyDirective');
    expect(storageModel).toBe('{"pageSize":100}');
  });
});
