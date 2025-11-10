/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { computed, inject, Injectable, signal } from '@angular/core';
import { Sort } from './sort';
import { ClrTreetableChildrenFunction, ClrTreetableTreeNode, mapToInternalTree } from '../interfaces/treetable-model';
import { Filters } from './filters';
import { combineLatest, map, merge } from 'rxjs';
import { ClrTreetableSelectedState } from '../enums/selection-type';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';

@Injectable()
export class TreetableDataStateService<T extends object> {
  private readonly _filters = inject(Filters<T>);
  private readonly _sort = inject(Sort<T>);

  private readonly _dataSource = signal<{ items: T[]; getChildren: ClrTreetableChildrenFunction<T> }>(undefined);
  private readonly _selectedItems = signal<T[]>([]);
  private readonly _stickyIndeterminate = signal(false);

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

    const passesAllFilters = (node: ClrTreetableTreeNode<T>) =>
      activeFilters.every(filter => filter.accepts(node.value));

    const filterTree = (nodes: ClrTreetableTreeNode<T>[]): ClrTreetableTreeNode<T>[] => {
      const result: ClrTreetableTreeNode<T>[] = [];
      for (const node of nodes) {
        const children = filterTree(node.children);
        if (children.length > 0 || passesAllFilters(node)) {
          const cloned = Object.assign(Object.create(Object.getPrototypeOf(node)), node, { children });
          result.push(cloned);
        }
      }
      return result;
    };

    return filterTree(treetableNodes);
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
    const traversalFn = (nodes: ClrTreetableTreeNode<T>[]): void => {
      for (const node of nodes) {
        if (node.selected() === ClrTreetableSelectedState.SELECTED) {
          result.push(node.value);
        }
        if (!node.isLeaf) {
          traversalFn(node.children);
        }
      }
    };
    traversalFn(this.displayedNodes());
    return result;
  });

  readonly changes$ = merge(this._filters.changes$, this._sort.changes$);

  constructor() {
    const externallySelectedItems$ = toObservable(this._selectedItems).pipe(map(items => new Set(items)));
    const treetableNodes$ = toObservable(this._treetableNodes);
    const handleExternalSelect$ = combineLatest([externallySelectedItems$, treetableNodes$]);

    // This stream handles the external setting of selected nodes. Realistically this will only run once in the
    // beginning, if some nodes need to be selected from the start (e.g. restoring treetable state from local storage).
    // The subscribe function only runs, if the selectedItems differ in length to the currently selectedNodes.
    handleExternalSelect$
      .pipe(
        map(([selectedItems, treetableNodes]) => ({
          items: selectedItems,
          ttNodes: treetableNodes,
          selectedNodes: this.selectedNodes(),
        })),
        filter(({ items, ttNodes }) => items.size > 0 && ttNodes.length > 0),
        filter(({ items, selectedNodes }) => items.size !== selectedNodes.length),
        takeUntilDestroyed()
      )
      .subscribe(({ items, ttNodes }) => {
        const traversalFn = (nodes: ClrTreetableTreeNode<T>[]): void => {
          for (const node of nodes) {
            if (items.has(node.value)) {
              items.delete(node.value);
              node.setSelected(ClrTreetableSelectedState.SELECTED);
            }
            if (!node.isLeaf && items.size > 0) {
              traversalFn(node.children);
            }
          }
        };

        traversalFn(ttNodes);
      });
  }

  setDataSource(items: T[], getChildren: ClrTreetableChildrenFunction<T>) {
    this._dataSource.set({ items, getChildren });
  }

  setSelectedItems(items: T[]) {
    this._selectedItems.set(items);
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
}
