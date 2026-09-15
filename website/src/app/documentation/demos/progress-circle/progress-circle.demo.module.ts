import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { RouterModule } from '@angular/router';

import { ClrAddonsModule } from '@porscheinformatik/clr-addons';
import { UtilsModule } from '../../../utils/utils.module';
import { DocWrapperModule } from '../_doc-wrapper/doc-wrapper.module';
import { ProgressCircleDemo } from './progress-circle.demo';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    UtilsModule,
    DocWrapperModule,
    ClrAddonsModule,
    RouterModule.forChild([{ path: '', component: ProgressCircleDemo }]),
  ],
  declarations: [ProgressCircleDemo],
  exports: [ProgressCircleDemo],
})
export class ProgressCircleDemoModule {}
