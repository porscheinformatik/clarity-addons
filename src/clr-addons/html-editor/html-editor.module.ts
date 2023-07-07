import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClrHtmlEditorComponent } from './html';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ClrHtmlEditorComponent],
  imports: [CommonModule, HttpClientModule, AngularEditorModule, FormsModule, ReactiveFormsModule],
  exports: [ClrHtmlEditorComponent],
})
export class ClrHtmlEditorModule {}
