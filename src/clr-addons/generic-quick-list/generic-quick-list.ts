/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import {
  Component,
  Input,
  ContentChild,
  TemplateRef,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList,
  AfterViewInit,
  OnInit,
  ElementRef,
} from '@angular/core';

export interface ClrGenericQuickListItem {
  id: any;
}

@Component({
  selector: 'clr-generic-quick-list',
  host: { '[class.generic-quick-list]': 'true', '[class.clr-form-control]': 'true' },
  templateUrl: './generic-quick-list.html',
})
export class ClrGenericQuickList<T extends ClrGenericQuickListItem> implements OnInit, AfterViewInit {
  @Input('clrAllItems') allItems = [] as T[];
  @Input('clrAddLabel') addLabel = 'ADD (Translate me)';
  @Input('clrAddPossible') addPossible = true;
  @Input('clrBlankItem') blankItem = {} as any;
  @Input('clrControlClasses') controlClasses: string;
  @Input('clrMandatory') required = false;
  @Input() readonly: string;

  @Output('clrAdded') added = new EventEmitter();
  @Output('clrRemoved') removed = new EventEmitter();

  @ContentChild(TemplateRef) itemTemplate: TemplateRef<any>;
  @ViewChildren('row') itemRows: QueryList<ElementRef>;

  rowCountFocus: number;

  ngOnInit(): void {
    if (this.required && this.allItems.length === 0) {
      this.addItem();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.setFocusOnAdd(), 1);
  }

  addItem(): void {
    const newItem = { ...this.blankItem };
    newItem.id = Math.ceil(Math.random() * 100000);
    this.allItems.push(newItem);
    this.added.emit(newItem);
  }

  removeItem(item: T): void {
    this.allItems.splice(this.allItems.indexOf(item), 1);
    this.removed.emit(item);
  }

  setFocusOnAdd(): void {
    this.rowCountFocus = this.itemRows.length;
    this.itemRows.changes.subscribe((els: QueryList<ElementRef>) => {
      if (els.length > this.rowCountFocus && !!els.last) {
        const firstFocusable = els.last.nativeElement.querySelector(
          "button, a, input, select, textarea, [tabindex]:not([tabindex='-1'])"
        );
        if (firstFocusable) {
          firstFocusable.focus();
        }
      }
      this.rowCountFocus = els.length;
    });
  }
}
