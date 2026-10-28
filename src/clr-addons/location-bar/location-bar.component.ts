import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ClarityIcons, ClrIcon, organizationIcon } from '@clr/angular';
import { ReplaySubject } from 'rxjs';
import { LocationBarNode, NodeId } from './location-bar.model';
import { SearchRequestModel, SearchResultModel } from './location-bar.search.model';
import { LocationBarNodeComponent } from './location-bar-node/location-bar-node.component';
import { AsyncPipe } from '@angular/common';

ClarityIcons.addIcons(organizationIcon);

@Component({
  selector: 'clr-location-bar',
  templateUrl: './location-bar.component.html',
  imports: [ClrIcon, LocationBarNodeComponent, AsyncPipe],
})
export class LocationBarComponent<T extends NodeId> implements OnChanges {
  root$ = new ReplaySubject<LocationBarNode<T>>();

  rootsLoaded = false;

  @Input('clrIconShape') iconShape = 'organization';
  @Input('clrIconTitle') iconTitle = '';
  @Input('clrSearchRequest') searchRequest: SearchRequestModel;
  @Input('clrSearchResultItems') searchResultItems: SearchResultModel[] = [];

  @Input('clrRoots')
  set roots(roots: LocationBarNode<T>[]) {
    this.rootsLoaded = roots != null;
    const internalRoot = new LocationBarNode(null, null, false);
    internalRoot.setChildren(roots ?? []);
    if (roots?.length === 1) {
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
