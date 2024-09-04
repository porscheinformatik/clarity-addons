import { Component } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';

@Component({
  selector: 'clr-enum-filter-demo',
  templateUrl: './enum-filter.demo.html',
})
export class EnumFilterDemo {
  dataList = [{ name: 'TestValue2' }, { name: 'TestValue1' }];
  dataListWithEmpty = [{ name: 'TestValue2' }, { name: 'TestValue1' }, { name: '' }];

  customPossibleValues = ['TestValue2', 'TestValue1', 'TestValue3'];
  customPossibleValuesWithDisplayNames = [
    { value: 'v1', displayValue: 'TestValue1' },
    { value: 'v2', displayValue: 'TestValue2' },
    { value: 'v3', displayValue: 'TestValue3' },
  ];

  preSelectedValues = ['TestValue2', 'TestValueNotPresent'];
  preSelectedValuesWithEmpty = ['TestValue2', ''];

  currentFilter = this.preSelectedValues;
  currentFilterDisplayValue: string[] = [];

  possibleValuesWithEmpty = ['TestValue1', ''];

  filterChanged(value: string[]) {
    this.currentFilter = [...value];
  }

  onClrDgRefresh(state: ClrDatagridStateInterface) {
    this.currentFilterDisplayValue = state.filters?.[0]?.value;
  }
}
