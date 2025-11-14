import { ClrTreetableSelectedState } from '../enums/selection-type';
import { linkedSignal, signal } from '@angular/core';

/**
 * Internal counter for generating unique node ids.
 */
let treeNodeIdCounter = 0;

/**
 * Creates a unique id for a tree node instance.
 */
function uniqueTreeNodeIdFactory(): string {
  return `clr-treetable-node-${treeNodeIdCounter++}`;
}

/**
 * Function type that returns the direct children of a data node.
 */
export type ClrTreetableChildrenFunction<T extends object> = (node: T) => Array<T>;

/**
 * Represents a single tree node inside the treetable.
 * Maintains derived selection state (SELECTED / UNSELECTED / INDETERMINATE) based on:
 *  - Manual selection of this node.
 *  - Aggregated selection states of all descendants.
 * Selection propagation to descendants happens only on explicit setSelected calls.
 */
export class ClrTreetableTreeNode<T extends object> {
  public readonly id = uniqueTreeNodeIdFactory();
  public readonly value: T;
  public parent: ClrTreetableTreeNode<T> | null = null;
  public children: ClrTreetableTreeNode<T>[] = [];

  /**
   * If true, the node will stay INDETERMINATE even when all descendants are selected
   * unless it was manually selected.
   */
  private readonly stickyIndeterminate: boolean;
  private readonly manuallySelected = signal(false);

  public selected = linkedSignal<ClrTreetableSelectedState>(() => {
    const isManuallySelected = this.manuallySelected();

    let allChildrenSelected = true;
    let anyChildSelected = false;

    for (const child of this.children) {
      switch (child.selected()) {
        case ClrTreetableSelectedState.SELECTED:
          anyChildSelected = true;
          break;
        case ClrTreetableSelectedState.INDETERMINATE:
          anyChildSelected = true;
          allChildrenSelected = false;
          break;
        case ClrTreetableSelectedState.UNSELECTED:
        default:
          allChildrenSelected = false;
          break;
      }

      if (!allChildrenSelected && anyChildSelected) {
        break;
      }
    }

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
    value: T,
    parent: ClrTreetableTreeNode<T> | null = null,
    children: ClrTreetableTreeNode<T>[] = [],
    stickyIndeterminate: boolean = false
  ) {
    this.value = value;
    this.parent = parent;
    this.children = children;
    this.stickyIndeterminate = stickyIndeterminate;
  }

  /**
   * Depth level in the tree (root = 0).
   */
  get depth(): number {
    return this.parent ? this.parent.depth + 1 : 0;
  }

  /**
   * True if this node has no children.
   */
  get isLeaf(): boolean {
    return this.children?.length === 0;
  }

  /**
   * Sets the selection state for this node and propagates to all descendants (except INDETERMINATE).
   * @param state Desired selection state.
   */
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

  /**
   * Returns all descendants as a flat generator.
   */
  public *getFlatDescendants(): Generator<ClrTreetableTreeNode<T>> {
    for (const child of this.children) {
      yield child;
      if (!child.isLeaf) {
        yield* child.getFlatDescendants();
      }
    }
  }

  /**
   * Recursively applies a selected/unselected state to all descendants.
   */
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
 * Internal recursive helper building the internal tree node structure.
 */
function mapToInternalTreeRecursive<T extends object>(
  value: T,
  getChildren: ClrTreetableChildrenFunction<T>,
  parent: ClrTreetableTreeNode<T> | null,
  stickyIndeterminate: boolean
): ClrTreetableTreeNode<T> {
  const node = new ClrTreetableTreeNode(value, parent, [], stickyIndeterminate);
  const rawChildren: T[] = getChildren(value) || [];
  node.children = rawChildren.map(child => mapToInternalTreeRecursive(child, getChildren, node, stickyIndeterminate));
  return node;
}

/**
 * Creates an internal tree node hierarchy from a raw data object.
 *
 * @param value Root raw data object.
 * @param getChildren Function returning direct children of a node.
 * @param stickyIndeterminate Whether to keep INDETERMINATE even if all descendants become selected.
 */
export function mapToInternalTree<T extends object>(
  value: T,
  getChildren: ClrTreetableChildrenFunction<T>,
  stickyIndeterminate: boolean
): ClrTreetableTreeNode<T> {
  return mapToInternalTreeRecursive(value, getChildren, null, stickyIndeterminate);
}
