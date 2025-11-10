/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { computed, inject, Injectable, signal } from '@angular/core';
import { Sort } from './sort';
import { ClrTreetableChildrenFunction, mapToInternalTree, ClrTreetableTreeNode } from '../interfaces/treetable-model';
import { Filters } from './filters';
import { merge } from 'rxjs';
import { ClrTreetableSelectedState } from '../enums/selection-type';

@Injectable()
export class TreetableDataStateService<T extends object> {
  private readonly _filters = inject(Filters<T>);
  private readonly _sort = inject(Sort<T>);

  private readonly _dataSource = signal<{ items: T[]; getChildren: ClrTreetableChildrenFunction<T> }>(undefined);
  private readonly _stickyIndeterminate = signal(false);

  private readonly _treetableNodes = computed(() => {
    const dataSource = this._dataSource();
    const stickyIndeterminate = this._stickyIndeterminate();
    if (dataSource) {
      return dataSource.items.map(item => mapToInternalTree(item, dataSource.getChildren, stickyIndeterminate));
    }
    return [];
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

  constructor() {}

  setDataSource(items: T[], getChildren: ClrTreetableChildrenFunction<T>) {
    this._dataSource.set({ items, getChildren });
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
