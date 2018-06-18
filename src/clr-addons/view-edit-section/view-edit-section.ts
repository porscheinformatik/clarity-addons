/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'clr-view-edit-section',
  templateUrl: './view-edit-section.html',
  /* change standard input behaviour inside view-edit section to grow to the end of the card */
  styles: [':host ::ng-deep form .view-edit-section .form-group > input { flex-grow: 1; }'],
})
export class ClrViewEditSection {
  @Input('clrTitle') _title: string;
  @Input('clrEditMode') _editMode: boolean = false;

  @Output('clrSectionSubmitted') _submitted = new EventEmitter(false);
  @Output('clrSectionEditCancelled') _cancelled = new EventEmitter(false);

  public onSubmit() {
    this._submitted.emit();
    this._editMode = false;
  }

  public onCancel() {
    this._cancelled.emit();
    this._editMode = false;
  }

  public onEdit() {
    this._editMode = true;
  }
}
