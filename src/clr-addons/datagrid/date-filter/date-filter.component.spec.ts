import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ClarityModule, ClrDatagrid } from '@clr/angular';
import { ClrDateFilterComponent } from './date-filter.component';

const today = new Date(Date.now());
const yesterday = new Date(Date.now() - 24 * 1000 * 60 * 60);
const tomorrow = new Date(Date.now() + 24 * 1000 * 60 * 60);

@Component({
  template: `
    <clr-datagrid>
      <clr-dg-column [clrDgField]="'date'">
        <clr-dg-filter>
          <clr-date-filter clrProperty="date"></clr-date-filter>
        </clr-dg-filter>
      </clr-dg-column>

      <clr-dg-row *clrDgItems="let data of dataList" [clrDgItem]="data">
        <clr-dg-cell>{{ data.date }}</clr-dg-cell>
      </clr-dg-row>
    </clr-datagrid>
  `,
})
class TestComponent {
  dataList = [{ date: today }, { date: tomorrow }];

  @ViewChild(ClrDateFilterComponent) component: ClrDateFilterComponent<{ date: Date }>;
  @ViewChild(ClrDatagrid) datagrid: ClrDatagrid;
}

@Component({
  template: `
    <body>
      <clr-datagrid>
        <clr-dg-column [clrDgField]="'date'">
          <clr-dg-filter>
            <clr-date-filter clrProperty="date" [(clrFilterValue)]="filterValue"></clr-date-filter>
          </clr-dg-filter>
        </clr-dg-column>

        <clr-dg-row *clrDgItems="let data of dataList" [clrDgItem]="data">
          <clr-dg-cell>{{ data.name }}</clr-dg-cell>
        </clr-dg-row>
      </clr-datagrid>
    </body>
  `,
})
class TestComponentPreselectedValues {
  dataList = [{ date: yesterday }, { date: today }, { date: tomorrow }];
  filterValue = [null, today];

  @ViewChild(ClrDateFilterComponent) component: ClrDateFilterComponent<{ date: Date }>;
  @ViewChild(ClrDatagrid) datagrid: ClrDatagrid;
}

describe('DateFilterComponent', () => {
  describe('Default', () => {
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ClarityModule],
        declarations: [TestComponent, ClrDateFilterComponent],
        providers: [],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(fixture.componentInstance.component).toBeTruthy();
    });

    it('filter to value', async () => {
      expect(fixture.componentInstance.datagrid.rows.length).toBe(2);

      fixture.componentInstance.component.to = today;
      fixture.detectChanges();

      expect(fixture.componentInstance.datagrid.rows.length).toBe(1);
    });
  });

  describe('Preselected values', () => {
    let fixture: ComponentFixture<TestComponentPreselectedValues>;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ClarityModule],
        declarations: [TestComponentPreselectedValues, ClrDateFilterComponent],
        providers: [],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TestComponentPreselectedValues);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(fixture.componentInstance.component).toBeTruthy();
    });

    it('preselected values should be filtered', waitForAsync(() => {
      expect(fixture.componentInstance.datagrid.rows.length).toBe(2);
    }));
  });
});
