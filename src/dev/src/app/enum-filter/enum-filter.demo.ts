import { Component } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';

@Component({
  selector: 'clr-enum-filter-demo',
  templateUrl: './enum-filter.demo.html',
})
export class EnumFilterDemo {
  dataList = [{ name: 'TestValue2' }, { name: 'TestValue1' }];

  customPossibleValues = ['TestValue2', 'TestValue1', 'TestValue3'];
  customPossibleValuesWithDisplayNames = [
    { value: 'v1', displayValue: 'TestValue1' },
    { value: 'v2', displayValue: 'TestValue2' },
    { value: 'v3', displayValue: 'TestValue3' },
  ];

  preSelectedValues = ['TestValue2', 'TestValueNotPresent'];

  currentFilter = this.preSelectedValues;
  currentFilterDisplayValue: string[] = [];

  filterChanged(value: string[]) {
    this.currentFilter = [...value];
  }

  onClrDgRefresh(state: ClrDatagridStateInterface) {
    this.currentFilterDisplayValue = state.filters?.[0]?.value;
  }
}
