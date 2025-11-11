/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { computed, inject, Injectable, signal } from '@angular/core';
import { Sort } from './sort';
import { ClrTreetableChildrenFunction, ClrTreetableTreeNode, mapToInternalTree } from '../interfaces/treetable-model';
import { Filters } from './filters';
import { combineLatest, distinctUntilChanged, map, Observable, shareReplay, startWith } from 'rxjs';
import { ClrTreetableSelectedState } from '../enums/selection-type';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';
import { ClrTreetableFilterInterface } from '../interfaces/filter-model';
import { ClrTreetableState } from '../interfaces/treetable-state-model';
import { areTreetableStatesEqual } from '../util/treetable-state-util';

@Injectable()
export class TreetableDataStateService<T extends object> {
  private readonly _filters = inject(Filters<T>);
  private readonly _sort = inject(Sort<T>);

  private readonly _dataSource = signal<{ items: T[]; getChildren: ClrTreetableChildrenFunction<T> }>(undefined);
  private readonly _stickyIndeterminate = signal(false);
  private readonly _itemsExternallySelected = signal<T[]>([]);

  private readonly _treetableNodes = computed(() => {
    const dataSource = this._dataSource();
    const stickyIndeterminate = this._stickyIndeterminate();
    return dataSource
      ? dataSource.items.map(item => mapToInternalTree(item, dataSource.getChildren, stickyIndeterminate))
      : [];
  });

  private readonly _filteredNodes = computed(() => {
    const treetableNodes = this._treetableNodes();
    const activeFilters = this._filters.activeFilters();
    const hasActiveFilters = this._filters.hasActiveFilters();

    if (!hasActiveFilters) {
      return treetableNodes;
    }

    return this.filterTreeRecursively(treetableNodes, activeFilters);
  });

  readonly displayedNodes = computed(() => {
    const nodes = this._filteredNodes();
    const { comparator } = this._sort.sortState();

    if (!comparator) {
      return nodes;
    }

    return this.sortTreeRecursively(nodes);
  });

  readonly areAllNodesSelected = computed(() =>
    this.displayedNodes().every(node => node.selected() === ClrTreetableSelectedState.SELECTED)
  );

  readonly selectedNodes = computed(() => {
    const result: T[] = [];
    this.traverseTreeNodes(this.displayedNodes(), (node: ClrTreetableTreeNode<T>) => {
      if (node.selected() === ClrTreetableSelectedState.SELECTED) {
        result.push(node.value);
      }
    });
    return result;
  });

  readonly changes$: Observable<ClrTreetableState<T>> = combineLatest([
    this._filters.changes$.pipe(startWith([])),
    this._sort.changes$.pipe(startWith({ comparator: null, reverse: false })),
  ]).pipe(
    map(
      ([filterValues, sortState]): ClrTreetableState<T> => ({
        sort: sortState.comparator ? { comparator: sortState.comparator, reverse: sortState.reverse } : null,
        filters: filterValues,
      })
    ),
    distinctUntilChanged((a, b) => areTreetableStatesEqual(a, b)),
    shareReplay(1)
  );

  constructor() {
    // Externally selected has to be handled as a signal, as it is a synchronous change. Simply using a subject instead
    // of a signal results in errors.
    const externallySelectedItems$ = toObservable(this._itemsExternallySelected).pipe(map(items => new Set(items)));
    const treetableNodes$ = toObservable(this._treetableNodes);
    const handleExternalSelect$ = combineLatest([externallySelectedItems$, treetableNodes$]);

    // This stream handles the external setting of selected nodes. Realistically this will only run once in the
    // beginning, if some nodes need to be selected from the start (e.g. restoring treetable state from local storage).
    // The subscribe function only runs, if the selectedItems differ in length to the currently selectedNodes.
    handleExternalSelect$
      .pipe(
        map(([externallySelectedItems, treetableNodes]) => ({
          externallySelectedItems: externallySelectedItems,
          nodes: treetableNodes,
          selectedNodes: this.selectedNodes(),
        })),
        filter(({ externallySelectedItems, nodes }) => externallySelectedItems.size > 0 && nodes.length > 0),
        filter(({ externallySelectedItems, selectedNodes }) => externallySelectedItems.size !== selectedNodes.length),
        takeUntilDestroyed()
      )
      .subscribe(({ externallySelectedItems, nodes }) => {
        this.traverseTreeNodes(
          nodes,
          (node: ClrTreetableTreeNode<T>): void => {
            if (externallySelectedItems.has(node.value)) {
              externallySelectedItems.delete(node.value);
              node.setSelected(ClrTreetableSelectedState.SELECTED);
            }
          },
          (): boolean => externallySelectedItems.size > 0
        );
      });
  }

  setDataSource(items: T[], getChildren: ClrTreetableChildrenFunction<T>) {
    this._dataSource.set({ items, getChildren });
  }

  setExternallySelectedItems(items: T[]) {
    this._itemsExternallySelected.set(items);
  }

  setStickyIndeterminate(value: boolean) {
    this._stickyIndeterminate.set(value);
  }

  toggleSelectForAllDisplayedNodes(): void {
    const toggleState = this.areAllNodesSelected()
      ? ClrTreetableSelectedState.UNSELECTED
      : ClrTreetableSelectedState.SELECTED;

    for (const node of this.displayedNodes()) {
      node.setSelected(toggleState);
    }
  }

  private filterTreeRecursively(
    nodes: ClrTreetableTreeNode<T>[],
    activeFilters: ClrTreetableFilterInterface<T>[]
  ): ClrTreetableTreeNode<T>[] {
    const passesAllFilters = (node: ClrTreetableTreeNode<T>) =>
      activeFilters.every(filter => filter.accepts(node.value));

    const result: ClrTreetableTreeNode<T>[] = [];
    for (const node of nodes) {
      const children = this.filterTreeRecursively(node.children, activeFilters);
      if (children.length > 0 || passesAllFilters(node)) {
        const cloned = Object.assign(Object.create(Object.getPrototypeOf(node)), node, { children });
        result.push(cloned);
      }
    }
    return result;
  }

  private sortTreeRecursively(nodes: ClrTreetableTreeNode<T>[]): ClrTreetableTreeNode<T>[] {
    const sortedNodes = [...nodes].sort((nodeA, nodeB) => this._sort.compare(nodeA.value, nodeB.value));

    return sortedNodes.map(node => {
      if (!node.isLeaf) {
        const cloned: ClrTreetableTreeNode<T> = Object.assign(Object.create(Object.getPrototypeOf(node)), node);
        cloned.children = this.sortTreeRecursively(node.children);
        return cloned;
      }
      return node;
    });
  }

  private traverseTreeNodes(
    nodes: ClrTreetableTreeNode<T>[],
    callBackFn: (node: ClrTreetableTreeNode<T>) => void,
    breakCondition: (node: ClrTreetableTreeNode<T>) => boolean = () => true
  ): void {
    for (const node of nodes) {
      callBackFn(node);

      if (!node.isLeaf && breakCondition(node)) {
        this.traverseTreeNodes(node.children, callBackFn, breakCondition);
      }
    }
  }
}
