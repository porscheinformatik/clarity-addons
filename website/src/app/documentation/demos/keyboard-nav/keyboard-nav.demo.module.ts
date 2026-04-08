/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import {
  ClrAddonsModule,
  ClrKeyboardNavCtrlArrowDirective,
  ClrKeyboardNavAltMnemonicDirective,
} from '@porscheinformatik/clr-addons';
import { UtilsModule } from '../../../utils/utils.module';
import { DocWrapperModule } from '../_doc-wrapper/doc-wrapper.module';
import { KeyboardNavDemo } from './keyboard-nav.demo';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClarityModule,
    ClrAddonsModule,
    ClrKeyboardNavCtrlArrowDirective,
    ClrKeyboardNavAltMnemonicDirective,
    UtilsModule,
    DocWrapperModule,
    RouterModule.forChild([{ path: '', component: KeyboardNavDemo }]),
  ],
  declarations: [KeyboardNavDemo],
  exports: [KeyboardNavDemo],
})
export class KeyboardNavDemoModule {}
