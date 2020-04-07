/*
 * Copyright (c) 2018-2019 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'clr-view-edit-section',
  templateUrl: './view-edit-section.html',
})
export class ClrViewEditSection {
  @Input('clrTitle') _title: string;
  @Input('clrSaveText') _saveText = 'Save';
  @Input('clrPreventModeChangeOnSave') _preventSave = false;
  @Input('clrCancelText') _cancelText = 'Cancel';
  @Input('clrEditable') _editable = true;
  @Input('clrEditMode') _editMode = false;
  @Input('clrEditIcon') _editIcon = 'pencil';

  @Input('clrViewRef') viewRef: TemplateRef<any>;
  @Input('clrEditRef') editRef: TemplateRef<any>;

  @Output('clrEditModeChange') _editModeChanged = new EventEmitter(false);
  @Output('clrSectionSubmitted') _submitted = new EventEmitter(false);
  @Output('clrSectionEditCancelled') _cancelled = new EventEmitter(false);

  public onSubmit(): void {
    this._submitted.emit();
    if (!this._preventSave) {
      this.setEditMode(false);
    }
  }

  public onCancel(): void {
    this._cancelled.emit();
    this.setEditMode(false);
  }

  public onEdit(): void {
    this.setEditMode(true);
  }

  private setEditMode(mode: boolean): void {
    this._editMode = mode;
    this._editModeChanged.emit(this._editMode);
  }
}
