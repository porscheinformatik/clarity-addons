import { Component } from '@angular/core';
import { ClrDatagridNumericFilterInterface, ClrDatagridStringFilterInterface } from '@clr/angular';

interface Item {
  name: string;
  amount: number;
  created: Date | string;
  updated: Date | string;
}

@Component({
  selector: 'clr-datagrid-filters-demo',
  templateUrl: './clr-datagrid-filters-demo.html',
  standalone: false,
})
export class DatagridFiltersDemo {
  items: Item[] = [
    {
      name: 'Item 1',
      amount: 1,
      created: new Date('1/1/2017'),
      updated: new Date('1/1/2017'),
    },
    {
      name: 'Item 2',
      amount: 2,
      created: new Date(),
      updated: new Date(),
    },
    {
      name: 'Item 3',
      amount: 3,
      created: '2022-10-01',
      updated: '2022-10-01',
    },
  ];
  createdFilterValue = [new Date(), null];
  updatedFilterValue = [new Date(), null];
  titleFilter: ClrDatagridStringFilterInterface<Item> = {
    accepts: (item: Item, search: string) => item.name && item.name.indexOf(search) > 0,
  };
  amountFilter: ClrDatagridNumericFilterInterface<Item> = {
    accepts: (item: Item, low: number, high: number) => item.amount >= low && item.amount <= high,
  };
}
