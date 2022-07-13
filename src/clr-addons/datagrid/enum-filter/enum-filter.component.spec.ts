import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ClarityModule, ClrDatagrid } from '@clr/angular';
import { ClrEnumFilterComponent } from './enum-filter.component';

@Component({
  template: `
    <clr-datagrid>
      <clr-dg-column [clrDgField]="'name'">
        <clr-dg-filter>
          <clr-enum-filter clrProperty="name"> </clr-enum-filter>
        </clr-dg-filter>
      </clr-dg-column>

      <clr-dg-row *clrDgItems="let data of dataList" [clrDgItem]="data">
        <clr-dg-cell>{{ data.name }}</clr-dg-cell>
      </clr-dg-row>
    </clr-datagrid>
  `,
})
class TestComponent {
  dataList = [{ name: 'TestValue1' }, { name: 'TestValue2' }];

  @ViewChild(ClrEnumFilterComponent) component: ClrEnumFilterComponent<{ name: string }>;
  @ViewChild(ClrDatagrid) datagrid: ClrDatagrid;
}

@Component({
  template: `
    <clr-datagrid>
      <clr-dg-column [clrDgField]="'name'">
        <clr-dg-filter>
          <clr-enum-filter clrProperty="name" [clrPossibleValues]="customPossibleValues"> </clr-enum-filter>
        </clr-dg-filter>
      </clr-dg-column>

      <clr-dg-row *clrDgItems="let data of dataList" [clrDgItem]="data">
        <clr-dg-cell>{{ data.name }}</clr-dg-cell>
      </clr-dg-row>
    </clr-datagrid>
  `,
})
class TestComponentCustomValues {
  dataList = [{ name: 'TestValue1' }, { name: 'TestValue2' }];

  customPossibleValues = ['TestValue1', 'TestValue2', 'TestValue3'];

  @ViewChild(ClrEnumFilterComponent) component: ClrEnumFilterComponent<{ name: string }>;
  @ViewChild(ClrDatagrid) datagrid: ClrDatagrid;
}

describe('EnumFilterComponent', () => {
  describe('Derived possible values', () => {
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ClarityModule],
        declarations: [TestComponent, ClrEnumFilterComponent],
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

    it('filter a value', async () => {
      expect(fixture.componentInstance.datagrid.rows.length).toBe(2);
      expect(fixture.componentInstance.component.possibleValues.length).toBe(2);

      fixture.componentInstance.component.onChange('TestValue1', true);
      fixture.detectChanges();

      expect(fixture.componentInstance.datagrid.rows.length).toBe(1);
    });
  });

  describe('Custom possible values', () => {
    let fixture: ComponentFixture<TestComponentCustomValues>;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ClarityModule],
        declarations: [TestComponentCustomValues, ClrEnumFilterComponent],
        providers: [],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TestComponentCustomValues);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(fixture.componentInstance.component).toBeTruthy();
    });

    it('filter a value', async () => {
      expect(fixture.componentInstance.datagrid.rows.length).toBe(2);
      expect(fixture.componentInstance.component.possibleValues.length).toBe(3);

      fixture.componentInstance.component.onChange('TestValue1', true);
      fixture.detectChanges();

      expect(fixture.componentInstance.datagrid.rows.length).toBe(1);
    });
  });
});
