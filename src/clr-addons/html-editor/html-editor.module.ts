import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtmlEditorComponent } from './html/html-editor.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HtmlEditorComponent],
  imports: [CommonModule, HttpClientModule, AngularEditorModule, FormsModule, ReactiveFormsModule],
  exports: [HtmlEditorComponent],
})
export class ClrHtmlEditorModule {}
