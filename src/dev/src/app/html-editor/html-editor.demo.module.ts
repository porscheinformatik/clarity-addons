/*
 * Copyright (c) 2018-2023 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ClarityModule } from '@clr/angular';
import { ClrAddonsModule, ClrHtmlEditorModule } from '@porscheinformatik/clr-addons';

import { HtmlEditorDemo } from './html-editor.demo';

@NgModule({
  imports: [
    CommonModule,
    ClarityModule,
    ClrAddonsModule,
    FormsModule,
    ClrHtmlEditorModule,
    RouterModule.forChild([{ path: '', component: HtmlEditorDemo }]),
  ],
  declarations: [HtmlEditorDemo],
  exports: [HtmlEditorDemo],
})
export class HtmlEditorDemoModule {}
