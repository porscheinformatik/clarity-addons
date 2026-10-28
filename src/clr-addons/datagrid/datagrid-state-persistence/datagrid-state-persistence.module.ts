import { NgModule } from '@angular/core';
import { ColumnHiddenStatePersistenceDirective } from './column-hidden-state-persistence.directive';
import { DatagridFieldDirective } from './datagrid-field.directive';
import { StatePersistenceKeyDirective } from './state-persistence-key.directive';

/**
 * @deprecated Compatibility wrapper for NgModule-based consumers. Import the standalone `ColumnHiddenStatePersistenceDirective`, `DatagridFieldDirective`, `StatePersistenceKeyDirective` directly instead.
 */
@NgModule({
  imports: [ColumnHiddenStatePersistenceDirective, DatagridFieldDirective, StatePersistenceKeyDirective],
  exports: [ColumnHiddenStatePersistenceDirective, DatagridFieldDirective, StatePersistenceKeyDirective],
})
export class ClrDatagridStatePersistenceModule {}
