import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ControlWarningDemo } from './control-warning.demo';
import { ClrAddonsModule } from '@porscheinformatik/clr-addons';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocWrapperModule } from '../_doc-wrapper/doc-wrapper.module';

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
  ],
  exports: [ControlWarningDemo],
})
export class ControlWarningDemoModule {}
