import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { RouterModule } from '@angular/router';

import { UtilsModule } from '../../../utils/utils.module';
import { DocWrapperModule } from '../_doc-wrapper/doc-wrapper.module';
import { ProgressBarDemo } from './progress-bar.demo';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    UtilsModule,
    DocWrapperModule,
    RouterModule.forChild([{ path: '', component: ProgressBarDemo }]),
    ProgressBarDemo,
  ],
  exports: [ProgressBarDemo],
})
export class ProgressBarDemoModule {}
