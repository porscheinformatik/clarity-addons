import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AngularEditorComponent, AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'clr-html-editor',
  templateUrl: './html-editor.component.html',
  host: {
    '[class.html-editor]': 'true',
  },
})
export class ClrHtmlEditorComponent {
  @Input()
  public clrHtmlContent: string;
  @Input()
  public clrConfig = {
    toolbarHiddenButtons: [['insertImage', 'insertVideo', 'fontName']],
    placeholder: '',
    sanitize: false,
    editable: true,
  } as AngularEditorConfig;

  @Output() public clrHtmlChanged = new EventEmitter<string>();

  @ViewChild(AngularEditorComponent) angularEditor: AngularEditorComponent;

  onChange(event: string) {
    this.clrHtmlChanged.emit(event);
  }
}
