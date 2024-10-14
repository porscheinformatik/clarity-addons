import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  Optional,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { angleIcon, ClarityIcons, treeViewIcon } from '@cds/core/icon';
import '@cds/core/icon/register.js';
import { of } from 'rxjs';
import { LocationBarNode, NodeId } from '../location-bar.model';
import { CONTENT_PROVIDER, LocationBarContentProvider } from '../location-bar.provider';
import { SearchRequestModel, SearchResultModel } from '../location-bar.search.model';
import { LocationBarSearchComponent } from '../location-bar-search/location-bar-search.component';

ClarityIcons.addIcons(treeViewIcon, angleIcon);

/**
 * Component which renders a node of the location bar.
 */
@Component({
  selector: 'clr-location-bar-node',
  templateUrl: './location-bar-node.component.html',
  host: { '[class.location-bar-node]': 'true' },
})
export class LocationBarNodeComponent<T extends NodeId> implements OnChanges {
  /**
   * The parent node of this component
   */
  private _parentNode: LocationBarNode<T>;

  /**
   * The selectable nodes
   */
  selectableChilds: LocationBarNode<T>[] = [];

  searchText: string;

  focus: boolean;

  readonly SEARCH_ITEM_STORAGE_KEY: string = 'searchedItem';

  /* inputs */
  @Input()
  set parentNode(parentNode: LocationBarNode<T>) {
    this._parentNode = parentNode;
    if (this._parentNode) {
      const children$ = this._parentNode.getChildren() ? of(this._parentNode.getChildren()) : this.getLazyChildren();

      children$.toPromise().then(nodes => this.prepareChildren(nodes || []));
    }
  }
  @Input('clrSearchResultItems') searchResultItems: SearchResultModel[] = [];
  @Input('clrSearchRequest') searchRequest: SearchRequestModel;

  /* outputs */
  /**
   * Emits selection changes
   */
  @Output() selectionChanged = new EventEmitter<T[]>();
  @Output() searchItemChanged = new EventEmitter<SearchResultModel>();

  @ViewChild('locationBarSearch') set locationBarSearch(search: LocationBarSearchComponent) {
    if (search) {
      search.focusInput();
    }
  }

  constructor(@Inject(CONTENT_PROVIDER) @Optional() public contentProvider: LocationBarContentProvider<T>) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.searchResultItems) {
      this.searchResultItems = changes.searchResultItems.currentValue;
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

  onSearch(text: string) {
    this.searchText = text;
    this.contentProvider.searchPerformed({ text: text, searchableNodes: this._parentNode.getChildren() });
  }

  displaySearchResult(): boolean {
    return this.searchResultItems.length !== 0 || !!this.searchText;
  }

  resetSearch(): void {
    this.searchResultItems = [];
    this.searchText = '';
  }

  onSearchItemChanged(item: SearchResultModel): void {
    let searchedItem: SearchResultModel;
    if (item) {
      searchedItem = item;
      localStorage.setItem(this.SEARCH_ITEM_STORAGE_KEY, JSON.stringify(item));
    } else {
      const storageItem = localStorage.getItem(this.SEARCH_ITEM_STORAGE_KEY);
      if (storageItem) {
        searchedItem = JSON.parse(storageItem);
      }
    }
    this.searchItemChanged.emit(searchedItem);
  }
}
