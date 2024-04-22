import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ControlWarningDemo } from './control-warning.demo';
import { ClrAddonsModule } from 'src/clr-addons';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ControlWarningDemo],
  imports: [
    CommonModule,
    ClrAddonsModule,
    RouterModule.forChild([{ path: '', component: ControlWarningDemo }]),
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ControlWarningDemoModule {}
