import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ControlWarningComponent } from './control-warning.component';
import { ClrAddonsModule } from '@porscheinformatik/clr-addons';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ControlWarningComponent],
  imports: [
    CommonModule,
    ClrAddonsModule,
    RouterModule.forChild([{ path: '', component: ControlWarningComponent }]),
    ClarityModule,
    FormsModule,
  ],
})
export class ControlWarningDemoModule {}
