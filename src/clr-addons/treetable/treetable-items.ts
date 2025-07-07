/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import {
  ChangeDetectorRef,
  Directive,
  effect,
  inject,
  Input,
  IterableDiffers,
  signal,
  TemplateRef,
  TrackByFunction,
  ViewContainerRef,
} from '@angular/core';
import { NgForOf, NgForOfContext } from '@angular/common';
import { Items, Sort } from './providers';

@Directive({
  selector: '[clrTtItems]',
  standalone: false,
})
export class TreetableItemsDirective<T> {
  private readonly _items = inject(Items<T>);
  private readonly _sort = inject(Sort<T>);
  private readonly _template = inject(TemplateRef<NgForOfContext<T>>);
  private readonly _differs = inject(IterableDiffers);
  private readonly _vcr = inject(ViewContainerRef);
  private readonly _cdr = inject(ChangeDetectorRef);

  private _iterableProxy: NgForOf<T>;

  ttItems = signal([]);
  @Input()
  get clrTtItems(): T[] {
    return this.ttItems();
  }
  set clrTtItems(items: T[]) {
    if (items == null || items.length === 0) {
      return;
    }

    this._items.addItems(items);

    if (this._sort.comparator) {
      this._cdr.detach();
      items.sort((a, b) => this._sort.compare(a, b)); // Sort in place
      this._cdr.reattach();
    }

    this.ttItems.set(items);
  }

  @Input('clrTtItemsTrackBy')
  set trackBy(value: TrackByFunction<T>) {
    this._iterableProxy.ngForTrackBy = value;
  }

  constructor() {
    this._iterableProxy = new NgForOf<T>(this._vcr, this._template, this._differs);

    effect(() => {
      const newItems = this.ttItems();

      if (newItems) {
        this._iterableProxy.ngForOf = newItems;
        this._iterableProxy.ngDoCheck();
      }
    });
  }
}
