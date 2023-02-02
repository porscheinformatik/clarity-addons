import { Component, HostListener, ViewChild } from '@angular/core';
import { ClrDatagrid, ClrDatagridStateInterface } from '@clr/angular';
import { of, tap } from 'rxjs';
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
  ).pipe(
    delay(0),
    tap(() => (this.total = 100))
  );

  total = 0;

  @ViewChild(ClrDatagrid) dataGrid: ClrDatagrid;

  @HostListener('window:resize')
  onResize() {
    this.dataGrid?.resize();
  }

  refresh(state: ClrDatagridStateInterface) {
    console.log('data refresh needed', JSON.stringify(state));
  }
}
