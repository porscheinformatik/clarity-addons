import {
  AfterViewInit,
  Directive,
  inject,
  Input,
  IterableDiffers,
  signal,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { NgForOf, NgForOfContext } from '@angular/common';
import { Subscription } from 'rxjs';
//import { toObservable } from '@angular/core/rxjs-interop';
import { Items } from './providers';
import { toObservable } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[clrDataTreetableItems]',
  standalone: false,
})
export class DataTreetableItemsDirective<T> implements AfterViewInit {
  _items = signal([]);

  @Input()
  get clrDataTreetableItems(): T[] {
    return this._items();
  }
  set clrDataTreetableItems(items: T[]) {
    if (items == null || items.length === 0) {
      return;
    }
    this.items.addItems = items;
    this.items.smartenUp();

    this._items.set(items);
    console.log('SET ITEMS', items);
  }

  private iterableProxy: NgForOf<T>;
  private subscriptions: Subscription[] = [];

  //private differ: IterableDiffer<T> | null = null;

  private items = inject(Items<T>);
  //private _rawItems: T[];

  constructor(public template: TemplateRef<NgForOfContext<T>>, public differs: IterableDiffers, vcr: ViewContainerRef) {
    this.iterableProxy = new NgForOf<T>(vcr, template, differs);
    this.subscriptions.push(
      toObservable(this._items).subscribe((newItems: T[]) => {
        this.iterableProxy.ngForOf = newItems;
        this.iterableProxy.ngDoCheck();
      })
    );
  }

  /*
  @Input('clrDataTreetableItemsOf')
  set rawItems(items: T[]) {
    this._rawItems = items ? items : []; // local copy for ngOnChange diffing
  }

  @Input('clrDataTreetableItemsOfTrackBy')
  set trackBy(value: TrackByFunction<T>) {
    this.iterableProxy.ngForTrackBy = value;
  }

   */

  ngAfterViewInit() {
    /*
    if (!this.differ) {
      this.differ = this.differs.find(this._rawItems).create(this.iterableProxy.ngForTrackBy);
    }
    if (this.differ) {
      const changes = this.differ.diff(this._rawItems);
      if (changes) {
        // TODO: not very efficient right now,
        // but premature optimization is the root of all evil.
      }
    }

     */
  }
}
