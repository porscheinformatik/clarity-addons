/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { ClrTreetableColumn } from './treetable-column';
import { ClrTreetableRow } from './treetable-row';
import { SelectionType } from './enums/selection-type';
import { Items, Selection, Sort } from './providers';
import { TreetableItemsDirective } from './treetable-items';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'clr-treetable',
  templateUrl: './treetable.html',
  host: { '[class.empty]': 'empty', '[class.treetable-host]': 'true' },
  standalone: false,
  providers: [Selection, Items, Sort],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClrTreetable<T> implements AfterViewInit {
  readonly selection = inject(Selection<T>);
  private readonly _items = inject(Items<T>);
  private readonly _destroyRef = inject(DestroyRef);

  @Input() clrClickableRows = true;
  @Input('clrHideHeader') hideHeader = false;
  @Input('clrTtSelected')
  set selected(value: T[] | undefined) {
    if (value) {
      this.selection.selectionType = SelectionType.Multi;
    } else {
      this.selection.selectionType = SelectionType.None;
    }
    this.selection.updateCurrent(value, false);
  }
  @Output('clrTtSelectedChange') selectedChanged = new EventEmitter<T[]>(false);

  @ContentChildren(ClrTreetableColumn, { descendants: true })
  ttColumns: QueryList<ClrTreetableRow<T>>;

  empty = true;
  hasActionOverflow = false;

  private _ttRows: QueryList<ClrTreetableRow<T>>;

  @ContentChildren(ClrTreetableRow, { descendants: true })
  set ttRows(items: QueryList<ClrTreetableRow<T>>) {
    this._ttRows = items;
    this.hasActionOverflow = false;
    this.initClickableRows();
    this.initEmpty();
    this.initActionOverflow();
  }

  @ContentChildren(TreetableItemsDirective, { descendants: true }) iterator: QueryList<TreetableItemsDirective<T>>;

  ngAfterViewInit() {
    this.selection.change.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(items => {
      this.selectedChanged.emit(items);
    });

    //_items changed, therefore we need to update the ttItems in the directives
    // in order to display them right again -> e.g when sorting changed
    this._items.change.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((allItems: T[][]) => {
      const directives = this.iterator.toArray();
      directives.forEach((directive, index) => {
        if (allItems[index]) {
          const sortedItems = [...allItems[index]];
          directive.ttItems.set(sortedItems);
        }
      });
    });
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
      row.hasActionOverflow.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((hasActionOverflow: boolean) => {
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

  get allSelected() {
    return this.selection.isAllSelected();
  }
  set allSelected(_: boolean) {
    /**
     * This is a setter but we ignore the value.
     * It's strange, but it lets us have an indeterminate state where only
     * some of the _items are selected.
     */
    this.selection.toggleAll();
  }

  protected readonly SelectionType = SelectionType;
}
