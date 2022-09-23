import { Component } from '@angular/core';
import { ClrDatagridNumericFilterInterface, ClrDatagridStringFilterInterface } from '@clr/angular';

interface Item {
  name: string;
  amount: number;
  created: Date;
}

@Component({
  selector: 'clr-datagrid-filters-demo',
  templateUrl: './clr-datagrid-filters-demo.html',
})
export class DatagridFiltersDemo {
  items: Item[] = [
    {
      name: 'Item 1',
      amount: 1,
      created: new Date('1/1/2017'),
    },
    {
      name: 'Item 2',
      amount: 2,
      created: new Date(),
    },
  ];
  createdFilterValue = [new Date(), null];
  titleFilter: ClrDatagridStringFilterInterface<Item> = {
    accepts: (item: Item, search: string) => item.name && item.name.indexOf(search) > 0,
  };
  amountFilter: ClrDatagridNumericFilterInterface<Item> = {
    accepts: (item: Item, low: number, high: number) => item.amount >= low && item.amount <= high,
  };
}
