import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlWarningDemo } from './control-warning.demo';
import { ClarityModule } from '@clr/angular';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClrAutocompleteOffModule, ClrFormModule } from '@porscheinformatik/clr-addons';
import { ClrControlWarningModule } from '../../../../clr-addons/clr-control-warning';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    RouterModule.forChild([{ path: '', component: ControlWarningDemo }]),
    ReactiveFormsModule,
    ClrFormModule,
    ClrAutocompleteOffModule,
    FormsModule,
    ClrControlWarningModule,
    TranslateModule,
  ],
  exports: [ControlWarningDemo, TranslateModule],
  declarations: [ControlWarningDemo],
})
export class ControlWarningDemoModule {}
