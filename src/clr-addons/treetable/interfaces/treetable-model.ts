import { ClrTreetableSelectedState } from '../enums/selection-type';
import { computed, linkedSignal, signal } from '@angular/core';

let treeNodeIdCounter = 0;
function uniqueTreeNodeIdFactory(): string {
  return `clr-treetable-node-${treeNodeIdCounter++}`;
}

export type ClrTreetableChildrenFunction<T extends object> = (node: T) => Array<T>;

export class ClrTreetableTreeNode<T extends object> {
  public id = uniqueTreeNodeIdFactory();

  private readonly stickyIndeterminate: boolean;
  private readonly manuallySelected = signal(false);
  private readonly childSelectionStates = computed(() => this.children.map(child => child.selected()));

  public selected = linkedSignal<ClrTreetableSelectedState>(() => {
    const isManuallySelected = this.manuallySelected();
    const childStates = this.childSelectionStates();
    const allChildrenSelected = childStates.every(state => state === ClrTreetableSelectedState.SELECTED);
    const anyChildSelected = childStates.some(
      state => state === ClrTreetableSelectedState.SELECTED || state === ClrTreetableSelectedState.INDETERMINATE
    );

    if (isManuallySelected && allChildrenSelected) {
      return ClrTreetableSelectedState.SELECTED;
    }

    if (this.isLeaf) {
      return ClrTreetableSelectedState.UNSELECTED;
    }

    if (!anyChildSelected) {
      return ClrTreetableSelectedState.UNSELECTED;
    }

    if (allChildrenSelected && !this.stickyIndeterminate) {
      return ClrTreetableSelectedState.SELECTED;
    }

    return ClrTreetableSelectedState.INDETERMINATE;
  });

  constructor(
    public value: T,
    public parent: ClrTreetableTreeNode<T> | null = null,
    public children: ClrTreetableTreeNode<T>[] = [],
    stickyIndeterminate?: boolean
  ) {
    this.stickyIndeterminate = stickyIndeterminate ?? false;
  }

  get depth(): number {
    return this.parent ? this.parent.depth + 1 : 0;
  }

  get isLeaf(): boolean {
    return this.children?.length === 0;
  }

  public setSelected(state: ClrTreetableSelectedState): void {
    switch (state) {
      case ClrTreetableSelectedState.SELECTED:
        if (!this.manuallySelected()) {
          this.manuallySelected.set(true);
        }
        this.propagateToChildren(true);
        break;
      case ClrTreetableSelectedState.UNSELECTED:
        if (this.manuallySelected()) {
          this.manuallySelected.set(false);
        }
        this.propagateToChildren(false);
        break;
      case ClrTreetableSelectedState.INDETERMINATE:
        break;
    }
  }

  private propagateToChildren(selected: boolean): void {
    for (const child of this.children) {
      child.setSelected(selected ? ClrTreetableSelectedState.SELECTED : ClrTreetableSelectedState.UNSELECTED);
      if (!child.isLeaf) {
        child.propagateToChildren(selected);
      }
    }
  }
}

/**
 * The internal recursive helper. This is where the magic happens.
 * It's generic over T, and K which is the specific child key we're working with.
 */
function mapToInternalTreeRecursive<T extends object>(
  node: T,
  getChildren: ClrTreetableChildrenFunction<T>,
  parent: ClrTreetableTreeNode<T> | null,
  stickyIndeterminate: boolean
): ClrTreetableTreeNode<T> {
  const children: T[] = getChildren(node) || [];

  const internalNode = new ClrTreetableTreeNode(node, parent, [], stickyIndeterminate);

  internalNode.children = children.map(child =>
    mapToInternalTreeRecursive(child, getChildren, internalNode, stickyIndeterminate)
  );

  return internalNode;
}

/**
 * Maps a generic, tree-like object to a standardized InternalTreeNode structure in a type-safe way.
 *
 * @param node The raw data node from the original tree.
 * @returns A new tree structure conforming to the InternalTreeNode interface.
 */
export function mapToInternalTree<T extends object>(
  node: T,
  getChildren: ClrTreetableChildrenFunction<T>,
  stickyIndeterminate: boolean
): ClrTreetableTreeNode<T> {
  const children = getChildren(node) || [];
  if (!(children.length > 0)) {
    return new ClrTreetableTreeNode(node, null, [], stickyIndeterminate);
  }

  return mapToInternalTreeRecursive(node, getChildren, null, stickyIndeterminate);
}
