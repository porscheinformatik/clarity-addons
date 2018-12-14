/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'clr-view-edit-section',
  templateUrl: './view-edit-section.html',
})
export class ClrViewEditSection {
  @Input('clrTitle') _title: string;
  @Input('clrSaveText') _saveText: string = 'Save';
  @Input('clrSaveDisabled') _saveDisabled: boolean = false;
  @Input('clrCancelText') _cancelText: string = 'Cancel';
  @Input('clrEditable') _editable: boolean = true;
  @Input('clrEditMode') _editMode: boolean = false;
  @Input('clrEditIcon') _editIcon: string = 'pencil';

  @Output('clrEditModeChange') _editModeChanged = new EventEmitter(false);
  @Output('clrSectionSubmitted') _submitted = new EventEmitter(false);
  @Output('clrSectionEditCancelled') _cancelled = new EventEmitter(false);

  public onSubmit() {
    this._submitted.emit();
    this.setEditMode(false);
  }

  public onCancel() {
    this._cancelled.emit();
    this.setEditMode(false);
  }

  public onEdit() {
    this.setEditMode(true);
  }

  private setEditMode(mode: boolean) {
    this._editMode = mode;
    this._editModeChanged.emit(this._editMode);
  }
}
