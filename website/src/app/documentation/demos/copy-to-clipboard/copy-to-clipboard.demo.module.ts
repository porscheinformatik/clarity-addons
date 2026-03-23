/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { ClrAddonsModule, ClrCopyToClipboard } from '@porscheinformatik/clr-addons';
import { UtilsModule } from '../../../utils/utils.module';
import { DocWrapperModule } from '../_doc-wrapper/doc-wrapper.module';
import { CopyToClipboardDemo } from './copy-to-clipboard.demo';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    ClrAddonsModule,
    ClrCopyToClipboard,
    DocWrapperModule,
    UtilsModule,
    RouterModule.forChild([{ path: '', component: CopyToClipboardDemo }]),
  ],
  declarations: [CopyToClipboardDemo],
  exports: [CopyToClipboardDemo],
})
export class CopyToClipboardDemoModule {}
