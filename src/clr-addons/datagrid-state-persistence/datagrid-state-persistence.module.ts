import { NgModule } from '@angular/core';
import { ColumnHiddenStatePersistenceDirective } from './column-hidden-state-persistence.directive';
import { DatagridFieldDirective } from './datagrid-field.directive';
import { StatePersistenceKeyDirective } from './state-persistence-key.directive';

@NgModule({
  declarations: [ColumnHiddenStatePersistenceDirective, DatagridFieldDirective, StatePersistenceKeyDirective],
  exports: [ColumnHiddenStatePersistenceDirective, DatagridFieldDirective, StatePersistenceKeyDirective],
})
export class ClrDatagridStatePersistenceModule {}
