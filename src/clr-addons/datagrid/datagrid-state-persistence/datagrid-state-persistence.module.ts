import { NgModule } from '@angular/core';
import { ColumnHiddenStatePersistenceDirective } from './column-hidden-state-persistence.directive';
import { DatagridFieldDirective } from './datagrid-field.directive';
import { StatePersistenceKeyDirective } from './state-persistence-key.directive';
import { ColumnOrderPersistenceDirective } from './column-order-persistence.directive';
import { DatagridColumnReorderDirective } from '../column-reorder';

@NgModule({
  declarations: [
    ColumnHiddenStatePersistenceDirective,
    ColumnOrderPersistenceDirective,
    DatagridFieldDirective,
    StatePersistenceKeyDirective,
  ],
  exports: [
    ColumnHiddenStatePersistenceDirective,
    ColumnOrderPersistenceDirective,
    DatagridFieldDirective,
    StatePersistenceKeyDirective,
    DatagridColumnReorderDirective,
  ],
  imports: [DatagridColumnReorderDirective],
})
export class ClrDatagridStatePersistenceModule {}
