import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
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
class TestComponentCustomValuesWithDisplayValues {
  dataList = [{ name: 'TestValue1' }, { name: 'TestValue2' }];

  customPossibleValues = [
    { value: 'TestValue1', displayValue: 'Test Value 1' },
    { value: 'TestValue2', displayValue: 'Test Value 2' },
    { value: 'TestValue3', displayValue: 'Test Value 3' },
  ];

  @ViewChild(ClrEnumFilterComponent) component: ClrEnumFilterComponent<{ name: string }>;
  @ViewChild(ClrDatagrid) datagrid: ClrDatagrid;
}

@Component({
  template: `
    <body>
      <clr-datagrid>
        <clr-dg-column [clrDgField]="'name'">
          <clr-dg-filter>
            <clr-enum-filter clrProperty="name" [clrFilterValues]="preselectedValues"> </clr-enum-filter>
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
  dataList = [{ name: 'TestValue1' }, { name: 'TestValue2' }, { name: 'TestValue3' }];

  preselectedValues = ['TestValue1', 'TestValue3'];

  @ViewChild(ClrEnumFilterComponent) component: ClrEnumFilterComponent<{ name: string }>;
  @ViewChild(ClrDatagrid) datagrid: ClrDatagrid;
}

describe('EnumFilterComponent', () => {
  describe('Derived possible values', () => {
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ClarityModule, FormsModule],
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

      fixture.componentInstance.component.onChange({ value: 'TestValue1', displayValue: 'TestValue1' }, true);
      fixture.detectChanges();

      expect(fixture.componentInstance.datagrid.rows.length).toBe(1);
    });
  });

  describe('Custom possible values', () => {
    let fixture: ComponentFixture<TestComponentCustomValues>;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ClarityModule, FormsModule],
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

      fixture.componentInstance.component.onChange({ value: 'TestValue1', displayValue: 'TestValue1' }, true);
      fixture.detectChanges();

      expect(fixture.componentInstance.datagrid.rows.length).toBe(1);
    });
  });

  describe('custom possible values with display names', () => {
    let fixture: ComponentFixture<TestComponentCustomValuesWithDisplayValues>;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ClarityModule, FormsModule],
        declarations: [TestComponentCustomValuesWithDisplayValues, ClrEnumFilterComponent],
        providers: [],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(TestComponentCustomValuesWithDisplayValues);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(fixture.componentInstance.component).toBeTruthy();
    });

    it('should provide display values', () => {
      expect(
        (<{ value: string; displayValue: string }>fixture.componentInstance.component.possibleValues[0]).displayValue
      ).toBe('Test Value 1');
    });

    it('filter a value', async () => {
      expect(fixture.componentInstance.datagrid.rows.length).toBe(2);
      expect(fixture.componentInstance.component.possibleValues.length).toBe(3);

      fixture.componentInstance.component.onChange({ value: 'TestValue1', displayValue: 'TestValue1' }, true);
      fixture.detectChanges();

      expect(fixture.componentInstance.datagrid.rows.length).toBe(1);
    });
  });

  describe('Preselected values', () => {
    let fixture: ComponentFixture<TestComponentPreselectedValues>;

    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ClarityModule, FormsModule],
        declarations: [TestComponentPreselectedValues, ClrEnumFilterComponent],
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
