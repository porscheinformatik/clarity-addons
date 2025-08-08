import { NgModule } from '@angular/core';
import { DatagridColumnReorderDirective } from './column-reorder.directive';
import { DynamicCellContentComponent } from './dynamic-cell-content.component';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';

@NgModule({
  declarations: [DatagridColumnReorderDirective, DynamicCellContentComponent],
  exports: [DatagridColumnReorderDirective, DynamicCellContentComponent],
  imports: [NgComponentOutlet, NgTemplateOutlet],
})
export class ClrDatagridColumnReorderModule {}
