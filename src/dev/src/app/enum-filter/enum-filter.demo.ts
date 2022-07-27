import { Component } from '@angular/core';

@Component({
  selector: 'clr-enum-filter-demo',
  templateUrl: './enum-filter.demo.html',
})
export class EnumFilterDemo {
  dataList = [{ name: 'TestValue1' }, { name: 'TestValue2' }];

  customPossibleValues = ['TestValue1', 'TestValue2', 'TestValue3'];

  preSelectedValues = ['TestValue2'];

  currentFilter = this.preSelectedValues;

  filterChanged(value: string[]) {
    this.currentFilter = [...value];
  }
}
