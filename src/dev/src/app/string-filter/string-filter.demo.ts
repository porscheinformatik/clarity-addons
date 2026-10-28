import { Component } from '@angular/core';
import { ClrDatagridModule, ClrDatagridStateInterface } from '@clr/angular';
import { DatagridFieldDirective, ClrStringFilterComponent } from '@porscheinformatik/clr-addons';

interface Item {
  name: string;
  address: { city: string };
}

@Component({
  selector: 'clr-string-filter-demo',
  templateUrl: './string-filter.demo.html',
  imports: [ClrDatagridModule, DatagridFieldDirective, ClrStringFilterComponent],
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
