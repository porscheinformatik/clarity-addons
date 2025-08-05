import { NgModule } from '@angular/core';
import { DatagridColumnReorderDirective } from './column-reorder.directive';
import { DynamicCellContentComponent } from './dynamic-cell-content.component';

@NgModule({
  exports: [DatagridColumnReorderDirective, DynamicCellContentComponent],
  imports: [DatagridColumnReorderDirective, DynamicCellContentComponent],
})
export class ClrDatagridColumnReorderModule {}
