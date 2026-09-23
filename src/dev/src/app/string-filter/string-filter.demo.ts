import { Component } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';

interface Item {
  name: string;
  address: { city: string };
}

@Component({
  selector: 'clr-string-filter-demo',
  templateUrl: './string-filter.demo.html',
  standalone: false,
})
export class StringFilterDemo {
  dataList: Item[] = [
    { name: 'Alpha', address: { city: 'Vienna' } },
    { name: 'Beta', address: { city: 'Linz' } },
    { name: 'Gamma', address: { city: 'Graz' } },
    { name: 'Delta', address: { city: 'Vienna' } },
  ];

  nameFilterValue = '';
  currentFilterDisplayValue = '';

  onClrDgRefresh(state: ClrDatagridStateInterface) {
    this.currentFilterDisplayValue = state.filters?.[0]?.value;
  }
}
