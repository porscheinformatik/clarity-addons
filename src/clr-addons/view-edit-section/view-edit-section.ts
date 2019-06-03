/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { ɵn as IfActiveService } from '@clr/angular';
import { ClrViewEditSectionBlock } from './view-edit-section-block';

@Component({
  selector: 'clr-view-edit-section',
  templateUrl: './view-edit-section.html',
  providers: [IfActiveService],
})
export class ClrViewEditSection implements AfterContentInit {
  @Input('clrTitle') _title: string;
  @Input('clrSaveText') _saveText: string = 'Save';
  @Input('clrPreventModeChangeOnSave') _preventSave: boolean = false;
  @Input('clrCancelText') _cancelText: string = 'Cancel';
  @Input('clrEditable') _editable: boolean = true;
  @Input('clrEditMode') _editMode: boolean = false;
  @Input('clrEditIcon') _editIcon: string = 'pencil';

  @Output('clrEditModeChange') _editModeChanged = new EventEmitter(false);
  @Output('clrSectionSubmitted') _submitted = new EventEmitter(false);
  @Output('clrSectionEditCancelled') _cancelled = new EventEmitter(false);

  @ContentChildren(ClrViewEditSectionBlock) private blocks: QueryList<ClrViewEditSectionBlock>;

  constructor(private ifActiveService: IfActiveService) {}

  ngAfterContentInit(): void {
    console.log(this.blocks);
    if (typeof this.ifActiveService.current === 'undefined' && this.blocks.first) {
      this.blocks.first.activate();
    }
  }

  public onSubmit() {
    this._submitted.emit();
    if (!this._preventSave) {
      this.setEditMode(false);
    }
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
    if (this._editMode) {
      this.blocks.last.activate();
    } else {
      this.blocks.first.activate();
    }
  }
}
