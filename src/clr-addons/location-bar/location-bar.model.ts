/**
 * The abstract base class for all identifier types
 */
export abstract class NodeId {
  /**
   * @param other The other instance to check for equality
   */
  abstract equals(other: NodeId): boolean;
}

/**
 * The data structure of the location bar component. A location bar node holds the data of
 * a single node of the location bar. The type of the nodes id is generic and is determined
 * by the user of the location bar component (e.g. can be a combined identifier). Each node
 * can have a parent node (except the root node) and an array of children (except leaf nodes).
 */
export class LocationBarNode<T extends NodeId> {
  private selectedChild: LocationBarNode<T>;
  private children: LocationBarNode<T>[];

  /**
   * @param id The generic identifier of the node
   * @param label The label to visualize the node
   * @param selectable Indicator whether the node is selectable
   * @param preSelected Indicator whether the node is pre-selected
   */
  constructor(
    public id: T,
    public label: string,
    public selectable: boolean = true,
    public preSelected: boolean = false
  ) {}

  /**
   * Returns the children of this node. If the children has not been determined so far, null will
   * be returned. If this node does not have any children, an empty array will be returned.
   */
  getChildren(): LocationBarNode<T>[] {
    return this.children;
  }

  /**
   * Sets the children for this node
   * @param children The children to be set for this node
   * @return This node instance to support a fluent API
   */
  setChildren(children: LocationBarNode<T>[]) {
    this.children = children || [];
  }

  /**
   * Sets the new selected child
   * @param selectedChild The child to be selected
   */
  setSelectedChild(selectedChild: LocationBarNode<T>) {
    if (this.selectedChild && !selectedChild) {
      this.selectedChild.setSelectedChild(null);
    }
    this.selectedChild = selectedChild;
  }

  /**
   * @returns The currently selected child
   */
  getSelectedChild(): LocationBarNode<T> {
    return this.selectedChild;
  }

  /**
   * @param other The other instance to check for equality
   */
  equals(other: LocationBarNode<T>): boolean {
    return this.id.equals(other.id);
  }
}
