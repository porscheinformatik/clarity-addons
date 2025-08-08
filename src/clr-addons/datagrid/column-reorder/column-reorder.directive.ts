import {
  ContentChildren,
  DestroyRef,
  Directive,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  QueryList,
} from '@angular/core';
import { CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';
import { ClrDatagrid, ClrDatagridColumn } from '@clr/angular';

@Directive({
  selector: '[clrDatagridColumnReorder]',
  host: {
    '[class.datagrid-column-reorder]': 'true',
  },
  standalone: false,
})
export class DatagridColumnReorderDirective<T extends { name: string }> implements OnInit {
  @Input('clrDatagridColumnReorder') columnDefinitions: T[] = [];

  @Output('clrDatagridColumnOrderChanged') columnOrderChanged = new EventEmitter<{
    columns: T[];
    from?: number;
    to?: number;
    trigger: 'init' | 'drag';
  }>();

  @ContentChildren(ClrDatagridColumn) public clrColumns: QueryList<ClrDatagridColumn>;

  private readonly cdkDropList = inject(CdkDropList);
  private readonly datagrid = inject(ClrDatagrid);
  private readonly destroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    // Needs to be "mixed", because with horizontal/vertical, Angular sorts the items in a visual order,
    // which confuses up the order of hidden columns and resize bars. We enforce the axis to be horizontal,
    // so it does not matter anyway.
    this.cdkDropList.orientation = 'mixed';
    this.cdkDropList.sortPredicate = this.canBeSorted;
    this.cdkDropList.lockAxis = 'x';

    this.cdkDropList.dropped
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(event => this.isDragItemDgColumn(event.item))
      )
      .subscribe(event => this.updateColumnOrder(event.previousIndex, event.currentIndex));

    // do not allow reordering columns when detail view is open (only one column is shown anyways)
    this.datagrid.detailService.stateChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(detailState => (this.cdkDropList.disabled = detailState));
  }

  public initializeColumnOrder(storedOrder: Record<string, number>) {
    const orderedColumns = this.reconcileColumnOrder(this.columnDefinitions, storedOrder);
    this.columnOrderChanged.emit({ columns: orderedColumns, trigger: 'init' });

    // after change detection, columns need to be rerendered first
    setTimeout(() => this.updateSeparatorVisibility(), 0);
  }

  // This is needed in case there is a new column, which is not stored in the storage.
  // In that case we put it at the end of the list.
  private reconcileColumnOrder(allColumns: T[], storedOrder: Record<string, number>): T[] {
    const orderedColumns = allColumns
      .filter(col => col.name in storedOrder)
      .sort((a, b) => storedOrder[a.name] - storedOrder[b.name]);

    const newColumns = allColumns.filter(col => !(col.name in storedOrder));

    return [...orderedColumns, ...newColumns];
  }

  private updateColumnOrder(dragPreviousIndex: number, dragCurrentIndex: number): void {
    // we need to divide the indexes by two, because each column has two draggable elements:
    // - the column itself and the resize handle
    const from = dragPreviousIndex / 2;
    const to = Math.floor((dragCurrentIndex + 1) / 2);
    if (from === to) {
      // no change, do nothing
      return;
    }

    const columnDefinitionCopy = [...this.columnDefinitions];
    moveItemInArray(columnDefinitionCopy, from, to);
    this.columnOrderChanged.emit({ columns: columnDefinitionCopy, from, to, trigger: 'drag' });

    // after change detection, columns need to be rerendered first
    setTimeout(() => this.updateSeparatorVisibility(), 0);
  }

  // show separator for all but the last visible column
  private updateSeparatorVisibility(): void {
    const visibleColumns = this.clrColumns.filter(col => !col.isHidden);
    visibleColumns.forEach((col, index) => (col.showSeparator = index < visibleColumns.length - 1));
  }

  // this makes sure that resize handles do not mess up the layout when dragging
  private readonly canBeSorted = (_index: number, drag: CdkDrag<unknown>, _drop: CdkDropList<unknown[]>): boolean =>
    this.isDragItemDgColumn(drag);

  private isDragItemDgColumn(item: CdkDrag<unknown>): boolean {
    return item.element.nativeElement.tagName === 'CLR-DG-COLUMN';
  }
}
