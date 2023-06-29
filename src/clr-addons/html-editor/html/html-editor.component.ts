import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AngularEditorComponent, AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'clr-html-editor',
  templateUrl: './html-editor.component.html',
  styleUrls: ['./html-editor.component.scss'],
})
export class HtmlEditorComponent {
  @Input()
  htmlContent: string;
  @Input()
  config = {
    toolbarHiddenButtons: [['insertImage', 'insertVideo', 'fontName']],
    placeholder: '',
    sanitize: false,
    editable: true,
  } as AngularEditorConfig;

  @Output() public htmlChanged = new EventEmitter<string>();

  @ViewChild(AngularEditorComponent) angularEditor: AngularEditorComponent;

  onChange(event: string) {
    this.htmlChanged.emit(event);
  }
}
