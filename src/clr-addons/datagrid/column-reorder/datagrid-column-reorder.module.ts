import { NgModule } from '@angular/core';
import { DatagridColumnReorderDirective } from './column-reorder.directive';
import { DynamicCellContentComponent } from './dynamic-cell-content.component';

/**
 * @deprecated Compatibility wrapper for NgModule-based consumers. Import the standalone `DatagridColumnReorderDirective`, `DynamicCellContentComponent` directly instead.
 */
@NgModule({
  exports: [DatagridColumnReorderDirective, DynamicCellContentComponent],
  imports: [DatagridColumnReorderDirective, DynamicCellContentComponent],
})
export class ClrDatagridColumnReorderModule {}
