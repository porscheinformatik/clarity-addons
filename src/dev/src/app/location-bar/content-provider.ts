import { Injectable } from '@angular/core';
import { LocationBarContentProvider, LocationBarNode, SearchResponseModel } from '@porscheinformatik/clr-addons';
import { Observable, of, ReplaySubject } from 'rxjs';
import { DemoLocationBarNodeId } from './model';

/**
 * The content provider to be connected with the location bar.
 */
@Injectable({ providedIn: 'root' })
export class DemoLocationBarContentProvider extends LocationBarContentProvider<DemoLocationBarNodeId> {
  searchPerformed$ = new ReplaySubject<SearchResponseModel<DemoLocationBarNodeId>>(1);

  constructor() {
    super();
  }

  getLazyChildren(node: LocationBarNode<DemoLocationBarNodeId>): Observable<LocationBarNode<DemoLocationBarNodeId>[]> {
    if (node.id.id === 'lazy') {
      return of([new LocationBarNode(new DemoLocationBarNodeId('lazyChild'), 'Lazy child')]);
    }
    return of([]);
  }

  searchPerformed(response: SearchResponseModel<DemoLocationBarNodeId>) {
    this.searchPerformed$.next(response);
  }

  getSearchPerformed(): Observable<SearchResponseModel<DemoLocationBarNodeId>> {
    return this.searchPerformed$.asObservable();
  }
}
