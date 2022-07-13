import { AfterContentInit, ContentChild, Directive, Input } from '@angular/core';
import { ClrDatagridPagination } from '@clr/angular';
import { ClrDatagridStatePersistenceModel } from './datagrid-state-persistence-model.interface';

@Directive({
  selector: '[clrStatePersistenceKey]',
})
export class StatePersistenceKeyDirective implements AfterContentInit {
  @Input()
  clrStatePersistenceKey: string;

  @ContentChild(ClrDatagridPagination)
  pagination: ClrDatagridPagination;

  ngAfterContentInit() {
    if (this.pagination && this.pagination.page) {
      /* persist page size changes in local storage */
      this.pagination.page.sizeChange.subscribe(pageSize => {
        let state = JSON.parse(localStorage.getItem(this.clrStatePersistenceKey)) as ClrDatagridStatePersistenceModel;
        if (!state) {
          state = {} as ClrDatagridStatePersistenceModel;
        }
        state.pageSize = pageSize;
        localStorage.setItem(this.clrStatePersistenceKey, JSON.stringify(state));
      });

      /* init page size of datagrid if already persisted in local storage */
      const state = JSON.parse(localStorage.getItem(this.clrStatePersistenceKey));
      if (state && state.pageSize) {
        /* postpone set size to other cycle as it is already set in this change detection cycle */
        setTimeout(() => (this.pagination.page.size = state.pageSize));
      }
    }
  }
}
