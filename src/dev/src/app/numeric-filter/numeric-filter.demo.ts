import { Component } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';

interface Item {
  name: string;
  amount: number;
  nested: { amount: number };
}

@Component({
  selector: 'clr-numeric-filter-demo',
  templateUrl: './numeric-filter.demo.html',
  standalone: false,
})
export class NumericFilterDemo {
  dataList: Item[] = [
    { name: 'Item 1', amount: 1, nested: { amount: 1 } },
    { name: 'Item 2', amount: 5, nested: { amount: 5 } },
    { name: 'Item 3', amount: 10, nested: { amount: 10 } },
    { name: 'Item 4', amount: 25, nested: { amount: 25 } },
  ];

  amountFilterValue: [number | null, number | null] = [null, null];
  currentFilterDisplayValue: [number | null, number | null];

  onClrDgRefresh(state: ClrDatagridStateInterface) {
    this.currentFilterDisplayValue = state.filters?.[0]?.value;
  }
}
