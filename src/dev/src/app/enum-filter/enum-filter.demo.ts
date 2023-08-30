import { Component } from '@angular/core';

@Component({
  selector: 'clr-enum-filter-demo',
  templateUrl: './enum-filter.demo.html',
})
export class EnumFilterDemo {
  dataList = [{ name: 'TestValue2' }, { name: 'TestValue1' }];

  customPossibleValues = ['TestValue2', 'TestValue1', 'TestValue3'];

  preSelectedValues = ['TestValue2', 'TestValueNotPresent'];

  currentFilter = this.preSelectedValues;

  filterChanged(value: string[]) {
    this.currentFilter = [...value];
  }
}
