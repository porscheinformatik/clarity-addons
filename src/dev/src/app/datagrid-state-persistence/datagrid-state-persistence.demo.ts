import { Component } from '@angular/core';
import { ClrDatagridStateInterface } from '@clr/angular';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'clr-datagrid-state-persistence-demo',
  templateUrl: './datagrid-state-persistence.demo.html',
})
export class DatagridStatePersistenceDemo {
  now = new Date();

  data$ = of(
    [...Array(15).keys()].map(i => ({
      hideableCol: 'item' + i,
      numericCol: i,
      dateCol: new Date(),
      enumCol: 'Enum ' + i,
    }))
  ).pipe(delay(0));

  refresh(state: ClrDatagridStateInterface) {
    console.log('data refresh needed', JSON.stringify(state));
  }
}
