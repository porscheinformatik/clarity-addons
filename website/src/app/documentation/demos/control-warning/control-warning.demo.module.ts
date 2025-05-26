import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ControlWarningDemo } from './control-warning.demo';
import { ClrAddonsModule } from '@porscheinformatik/clr-addons';
import { ClarityModule, ClrCommonFormsModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocWrapperModule } from '../_doc-wrapper/doc-wrapper.module';
import { UtilsModule } from '../../../utils/utils.module';

@NgModule({
  declarations: [ControlWarningDemo],
  imports: [
    CommonModule,
    ClrAddonsModule,
    RouterModule.forChild([{ path: '', component: ControlWarningDemo }]),
    ClarityModule,
    FormsModule,
    DocWrapperModule,
    ReactiveFormsModule,
    UtilsModule,
    AsyncPipe,
    ClrCommonFormsModule,
    FormsModule,
  ],
  exports: [ControlWarningDemo],
})
export class ControlWarningDemoModule {}
