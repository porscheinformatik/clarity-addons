/*
 * Copyright (c) 2018-2022 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'clr-view-edit-section',
  templateUrl: './view-edit-section.html',
  animations: [
    trigger('collapseExpandAnimation', [
      transition(':enter', [
        style({ opacity: 0, height: 0, overflow: 'hidden' }),
        animate('300ms', style({ opacity: 1, height: '*' })),
      ]),
      transition(':leave', [
        style({ opacity: 1, height: '*', overflow: 'hidden' }),
        animate('300ms', style({ opacity: 0, height: 0 })),
      ]),
    ]),
    trigger('rotateIcon', [
      state('true', style({ transform: 'rotate(0)' })),
      state('false', style({ transform: 'rotate(180deg)' })),
      transition('true => false', animate('300ms ease-out')),
      transition('false => true', animate('300ms ease-in')),
    ]),
  ],
})
export class ClrViewEditSection {
  @Input('clrTitle') _title: string;
  @Input('clrSaveText') _saveText = 'Save';
  @Input('clrPreventModeChangeOnSave') _preventSave = false;
  @Input('clrCancelText') _cancelText = 'Cancel';
  @Input('clrEditable') _editable = true;
  @Input('clrEditIcon') _editIcon = 'pencil';
  @Input('clrIsCollapsible') _isCollapsible = false;

  @Input('clrViewRef') viewRef: TemplateRef<any>;
  @Input('clrEditRef') editRef: TemplateRef<any>;

  @Output('clrIsCollapsedChange') _isCollapsedChange = new EventEmitter<boolean>();
  @Output('clrEditModeChange') _editModeChanged = new EventEmitter(false);
  @Output('clrSectionSubmitted') _submitted = new EventEmitter(false);
  @Output('clrSectionEditCancelled') _cancelled = new EventEmitter(false);

  @Input('clrIsCollapsed')
  public set _isCollapsed(value: boolean) {
    if (this._isCollapsible) {
      this.__isCollapsed = value;
    }
  }

  public get _isCollapsed(): boolean {
    return this.__isCollapsed;
  }

  @Input('clrEditMode')
  public set _editMode(value: boolean) {
    this.__editMode = value;

    if (value) {
      this.toggleCollapsed(false);
    }
  }

  public get _editMode(): boolean {
    return this.__editMode;
  }

  private __editMode = false;
  private __isCollapsed = false;

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
    this.toggleCollapsed(false);
  }

  private setEditMode(mode: boolean): void {
    this._editMode = mode;
    this._editModeChanged.emit(this._editMode);
  }

  private toggleCollapsed(collapsed: boolean) {
    this._isCollapsed = collapsed;
    this._isCollapsedChange.emit(this._isCollapsed);
  }

  onCollapseExpand(): void {
    if (this._isCollapsed) {
      this.toggleCollapsed(false);
    } else {
      this.toggleCollapsed(true);
    }
  }
}
