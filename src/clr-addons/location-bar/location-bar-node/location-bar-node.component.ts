import { Component, EventEmitter, Inject, Input, Optional, Output } from '@angular/core';
import { angleIcon, ClarityIcons, treeViewIcon } from '@cds/core/icon';
import '@cds/core/icon/register.js';
import { of } from 'rxjs';
import { LocationBarNode, NodeId } from '../location-bar.model';
import { CONTENT_PROVIDER, LocationBarContentProvider } from '../location-bar.provider';

ClarityIcons.addIcons(treeViewIcon, angleIcon);

/**
 * Component which renders a node of the location bar.
 */
@Component({
  selector: 'clr-location-bar-node',
  templateUrl: './location-bar-node.component.html',
  host: { '[class.location-bar-node]': 'true' },
})
export class LocationBarNodeComponent<T extends NodeId> {
  /**
   * The parent node of this component
   */
  private _parentNode: LocationBarNode<T>;

  constructor(@Inject(CONTENT_PROVIDER) @Optional() private contentProvider: LocationBarContentProvider<T>) {}

  /**
   * Emits selection changes
   */
  @Output() selectionChanged = new EventEmitter<T[]>();

  /**
   * The selectable nodes
   */
  selectableChilds: LocationBarNode<T>[] = [];

  focus: boolean;

  @Input()
  set parentNode(parentNode: LocationBarNode<T>) {
    this._parentNode = parentNode;
    if (this._parentNode) {
      const children$ = this._parentNode.getChildren() ? of(this._parentNode.getChildren()) : this.getLazyChildren();

      children$.toPromise().then(nodes => this.prepareChildren(nodes || []));
    }
  }

  get parentNode(): LocationBarNode<T> {
    return this._parentNode;
  }

  private getLazyChildren() {
    return this.contentProvider ? this.contentProvider.getLazyChildren(this._parentNode) : of([]);
  }

  private prepareChildren(nodes: LocationBarNode<T>[]) {
    this._parentNode.setChildren(nodes);
    /* when no node is selected search within the children for the first child to be pre-selected */
    if (!this._parentNode.getSelectedChild()) {
      for (const node of nodes) {
        if (node.preSelected) {
          this._parentNode.setSelectedChild(node);
          node.preSelected = false;
          break;
        }
      }
    }
    this.selectableChilds = nodes.filter(n => n.selectable);
  }

  /**
   * Listens for selection changes of child components and re-emits the selection event.
   * @param selection The changed selection of child components
   */
  onSelectionChanged(selection: T[]) {
    selection.unshift(this._parentNode.getSelectedChild().id);
    this.selectionChanged.emit(selection);
  }

  /**
   * Selects the given node
   * node
   * @param selectedNode The selected child node.
   */
  selectNode(selectedNode: LocationBarNode<T>) {
    if (selectedNode) {
      selectedNode.setSelectedChild(null);
      this._parentNode.setSelectedChild(selectedNode);
      this.notifySelectionChanged(selectedNode);
    }
  }

  /**
   * Method called internally to emit the selection event
   * @param selectedNode The node which has been selected
   */
  private notifySelectionChanged(selectedNode: LocationBarNode<T>) {
    this.selectionChanged.emit([selectedNode.id]);
  }
}
