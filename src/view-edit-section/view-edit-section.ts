/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'clr-view-edit-section',
  templateUrl: './view-edit-section.html',
  styles: [':host ::ng-deep form .view-edit-section .form-group > input { flex-grow: 1; }'],
})
export class ClrViewEditSection {
  @Input('clrTitle') title: string;
  @Input('clrEditMode') editMode: boolean = false;

  @Output('clrSectionSubmitted') submitted = new EventEmitter(false);
  @Output('clrSectionEditCancelled') cancelled = new EventEmitter(false);

  public onSubmit() {
    this.submitted.emit();
    this.editMode = false;
  }

  public onCancel() {
    this.cancelled.emit();
    this.editMode = false;
  }

  public onEdit() {
    this.editMode = true;
  }
}
