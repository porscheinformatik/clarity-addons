/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  Output,
  QueryList,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClrDataTreeTableColumn } from './data-treetable-column';
import { ClrDataTreeTableRow } from './data-treetable-row';
import { DataTreetableItemsDirective } from './data-treetable-items.directive';
import { Selection } from './providers/selection';
import { Items, Sort, StateDebouncer } from './providers';
import { SelectionType } from './enums/selection-type';

@Component({
  selector: 'clr-data-treetable',
  templateUrl: './data-treetable.html',
  host: { '[class.empty]': 'empty', '[class.data-treetable-host]': 'true' },
  standalone: false,
  providers: [Selection, Sort, StateDebouncer, Items],
})
export class ClrDataTreeTable<T = any> implements AfterViewInit, OnDestroy {
  @Input() clrClickableRows = true;
  @Input('clrHideHeader') hideHeader = false;

  @ContentChildren(ClrDataTreeTableColumn, { descendants: true })
  ttColumns: QueryList<ClrDataTreeTableRow>;

  empty = true;
  hasActionOverflow = false;

  private _ttRows: QueryList<ClrDataTreeTableRow>;
  private destroyed$ = new Subject<void>();

  @ContentChildren(ClrDataTreeTableRow, { descendants: true })
  set ttRows(items: QueryList<ClrDataTreeTableRow>) {
    this._ttRows = items;
    this.hasActionOverflow = false;
    this.initClickableRows();
    this.initEmpty();
    this.initActionOverflow();
  }

  @ContentChildren(DataTreetableItemsDirective, { descendants: true }) iterator: QueryList<
    DataTreetableItemsDirective<T>
  >;

  @Output('clrDtSelectedChange') selectedChanged = new EventEmitter<T[]>(false);
  private readonly selection = inject(Selection<T>);
  private readonly items = inject(Items<T>);
  @Input('clrDtSelected')
  set selected(value: T[] | undefined) {
    if (value) {
      this.selection.selectionType = SelectionType.Multi;
    }
    this.selection.updateCurrent(value, false);
  }

  ngAfterViewInit() {
    this.selection.change.subscribe(s => {
      this.selectedChanged.emit(s as T[]);
    });

    console.log(this.items);
    console.log('ITERATOR', this.iterator);
    /*
    this.items.change.subscribe((items: T[]) => {
      if(items == null) {
        return;
      }

      items.forEach((itemList: T[], index) => {
        this.iterator.toArray()[index]._items.set(itemList);
      })
    });


 */

    this.items.change.subscribe((allItems: T[][]) => {
      const directives = this.iterator.toArray(); // Convert QueryList to array
      directives.forEach((directive, index) => {
        if (allItems[index]) {
          const sortedItems = [...allItems[index]];
          directive._items.set(sortedItems);
        }
      });
    });
  }

  @Output('clrDgCustomSelectAll') customSelectAll = new EventEmitter<boolean>();
  @Input('clrDgCustomSelectAllEnabled') customSelectAllEnabled = false;

  get allSelected() {
    return this.selection.isAllSelected();
  }
  set allSelected(value: boolean) {
    if (this.customSelectAllEnabled) {
      this.customSelectAll.emit(value);
    } else {
      /**
       * This is a setter but we ignore the value.
       * It's strange, but it lets us have an indeterminate state where only
       * some of the items are selected.
       */
      this.selection.toggleAll();
    }
  }

  private initClickableRows(): void {
    if (this._ttRows) {
      this._ttRows.forEach(ttRow => {
        ttRow.clickable = this.clrClickableRows;
      });
    }
  }

  private initEmpty(): void {
    this.empty = this._ttRows.length === 0;
  }

  private initActionOverflow() {
    this._ttRows.forEach(row => {
      this.setActionOverflow(row.showActionOverflow);
      row.hasActionOverflow.pipe(takeUntil(this.destroyed$)).subscribe((hasActionOverflow: boolean) => {
        this.setActionOverflow(hasActionOverflow);
      });
    });
  }

  private setActionOverflow(hasActionOverflow: boolean) {
    if (!this.hasActionOverflow && hasActionOverflow) {
      this.hasActionOverflow = true;
      // setTimeout needed, as this method needs to change data which shouldn't be changed anymore in this cycle
      setTimeout(() => {
        if (this.hasActionOverflow) {
          this._ttRows.forEach(ttRow => (ttRow.showActionOverflow = true));
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
