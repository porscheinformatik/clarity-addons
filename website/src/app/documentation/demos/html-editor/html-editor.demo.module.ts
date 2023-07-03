import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule, ClrFormsModule } from '@clr/angular';
import { ClrAddonsModule } from '@porscheinformatik/clr-addons';
import { UtilsModule } from '../../../utils/utils.module';
import { DocWrapperModule } from '../_doc-wrapper/doc-wrapper.module';
import { HtmlEditorDemo } from './html-editor.demo';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
    ClrFormsModule,
    UtilsModule,
    DocWrapperModule,
    RouterModule.forChild([{ path: '', component: HtmlEditorDemo }]),
    ClrAddonsModule,
  ],
  declarations: [HtmlEditorDemo],
  exports: [HtmlEditorDemo],
})
export class HtmlEditorDemoModule {}
