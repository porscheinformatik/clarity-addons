/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule, ClrFormsModule } from '@clr/angular';
import { ClrAddonsModule } from '@porscheinformatik/clr-addons';

import { ReadonlyDemo } from './readonly.demo';
import { DocWrapperModule } from '../_doc-wrapper/doc-wrapper.module';
import { RouterModule } from '@angular/router';
import { UtilsModule } from '../../../utils/utils.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
    DocWrapperModule,
    RouterModule.forChild([{ path: '', component: ReadonlyDemo }]),
    FormsModule,
    ClrFormsModule,
    ClarityModule,
    ClrAddonsModule,
  ],
  declarations: [ReadonlyDemo],
  exports: [ReadonlyDemo],
})
export class ReadonlyDemoModule {}
