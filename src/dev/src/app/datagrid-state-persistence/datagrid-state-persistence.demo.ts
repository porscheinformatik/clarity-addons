import { Component, HostListener, ViewChild } from '@angular/core';
import { ClrDatagrid, ClrDatagridStateInterface } from '@clr/angular';
import { debounceTime, of, Subject } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'clr-datagrid-state-persistence-demo',
  templateUrl: './datagrid-state-persistence.demo.html',
  standalone: false,
})
export class DatagridStatePersistenceDemo {
  now = new Date();

  data$ = new Subject();
  frontendData$ = of(
    [...Array(100).keys()].map(i => ({
      hideableCol: 'item' + i,
      hideableCol2: 'item' + i,
      numericCol: i,
      dateCol: new Date(),
      enumCol: 'Enum ' + i,
    }))
  ).pipe(delay(1));

  reload$ = new Subject<void>();

  state: ClrDatagridStateInterface;
  total = 0;

  @ViewChild(ClrDatagrid) dataGrid: ClrDatagrid;

  ngOnInit() {
    this.reload$.pipe(debounceTime(400)).subscribe(() => {
      console.log('debounced backend reload triggered', JSON.stringify(this.state));
      this.total = 100;
      this.data$.next(
        [...Array(this.state.page.size).keys()].map(i => ({
          hideableCol: 'item' + i,
          hideableCol2: 'item' + i,
          numericCol: i + (this.state.page.current - 1) * this.state.page.size,
          dateCol: new Date(),
          enumCol: 'Enum ' + i,
        }))
      );
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.dataGrid?.resize();
  }

  refresh(state: ClrDatagridStateInterface) {
    this.state = state;
    this.reload$.next();
    console.log('data refresh needed', JSON.stringify(state));
  }
}
