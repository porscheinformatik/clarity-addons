import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ClarityIcons, organizationIcon } from '@cds/core/icon';
import '@cds/core/icon/register.js';
import { ReplaySubject } from 'rxjs';
import { LocationBarNode, NodeId } from './location-bar.model';
import { SearchRequestModel } from './location-bar.search.model';
import { SearchResultModel } from './location-bar.search.model';

ClarityIcons.addIcons(organizationIcon);

@Component({
  selector: 'clr-location-bar',
  templateUrl: './location-bar.component.html',
})
export class LocationBarComponent<T extends NodeId> implements OnChanges {
  root$ = new ReplaySubject<LocationBarNode<T>>();

  @Input('clrIconShape') iconShape = 'organization';
  @Input('clrIconTitle') iconTitle = '';
  @Input('clrSearchRequest') searchRequest: SearchRequestModel;
  @Input('clrSearchResultItems') searchResultItems: SearchResultModel[] = [];

  @Input('clrRoots')
  set roots(roots: LocationBarNode<T>[]) {
    const internalRoot = new LocationBarNode(null, null, false);
    internalRoot.setChildren(roots);
    if (roots.length === 1) {
      internalRoot.setSelectedChild(roots[0]);
    }
    this.root$.next(internalRoot);
  }

  @Output('clrSelectionChanged') selectionChanged = new EventEmitter<T[]>();
  @Output('clrSearchItemChanged') searchItemChanged = new EventEmitter<SearchResultModel>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.searchResultItems) {
      this.searchResultItems = changes.searchResultItems.currentValue;
    }
  }

  onSelectionChanged(selection: T[]) {
    this.selectionChanged.emit(selection);
  }
}
