import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule, ClrFormsModule } from '@clr/angular';
import { ClrAddonsModule } from '@porscheinformatik/clr-addons';
import { UtilsModule } from '../../../utils/utils.module';
import { DocWrapperModule } from '../_doc-wrapper/doc-wrapper.module';

import { ColorsDemo } from './colors.demo';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    ClrFormsModule,
    ClrAddonsModule,
    UtilsModule,
    DocWrapperModule,
    RouterModule.forChild([{ path: '', component: ColorsDemo }]),
  ],
  declarations: [ColorsDemo],
  exports: [ColorsDemo],
})
export class ColorsDemoModule {}
