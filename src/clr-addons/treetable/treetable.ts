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
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  Output,
  QueryList,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClrTreetableColumn } from './treetable-column';
import { ClrTreetableRow } from './treetable-row';
import { SelectionType } from './enums/selection-type';
import { Items, Selection, Sort } from './providers';
import { TreetableItemsDirective } from './treetable-items';

@Component({
  selector: 'clr-treetable',
  templateUrl: './treetable.html',
  host: { '[class.empty]': 'empty', '[class.treetable-host]': 'true' },
  standalone: false,
  providers: [Selection, Items, Sort],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClrTreetable<T> implements AfterViewInit, OnDestroy {
  public readonly selection = inject(Selection<T>);
  private readonly items = inject(Items<T>);

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
  private destroyed$ = new Subject<void>();

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
    this.selection.change.subscribe(items => {
      this.selectedChanged.emit(items);
    });

    //items changed, therefore we need to update the items in the directives
    // in order to display them right again -> e.g when sorting changed
    this.items.change.subscribe((allItems: T[][]) => {
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

  get allSelected() {
    return this.selection.isAllSelected();
  }
  set allSelected(_: boolean) {
    /**
     * This is a setter but we ignore the value.
     * It's strange, but it lets us have an indeterminate state where only
     * some of the items are selected.
     */
    this.selection.toggleAll();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  protected readonly SelectionType = SelectionType;
}
