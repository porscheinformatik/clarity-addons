/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, Input, ContentChild, TemplateRef, Output, EventEmitter } from '@angular/core';

export interface ClrGenericQuickListItem {
  id: any;
}

@Component({
  selector: 'clr-generic-quick-list',
  host: { '[class.generic-quick-list]': 'true', '[class.clr-form-control]': 'true' },
  templateUrl: './generic-quick-list.html',
})
export class ClrGenericQuickList<T extends ClrGenericQuickListItem> {
  @Input('clrAllItems') allItems = <T[]>[];
  @Input('clrAddLabel') addLabel = 'ADD (Translate me)';
  @Input('clrAddPossible') addPossible = true;
  @Input('clrBlankItem') blankItem = <any>{};
  @Input('clrControlClasses') controlClasses;
  @Input('clrRequired') required = false;

  @Output('clrAdded') added = new EventEmitter();
  @Output('clrRemoved') removed = new EventEmitter();

  @ContentChild(TemplateRef, { static: false }) itemTemplate: TemplateRef<any>;

  ngOnInit() {
    if (this.required && this.allItems.length === 0) {
      this.addItem();
    }
  }

  addItem() {
    const newItem = { ...this.blankItem };
    newItem.id = Math.ceil(Math.random() * 100000);
    this.allItems.push(newItem);
    this.added.emit(newItem);
  }

  removeItem(item: T) {
    this.allItems.splice(this.allItems.indexOf(item), 1);
    this.removed.emit(item);
  }
}
