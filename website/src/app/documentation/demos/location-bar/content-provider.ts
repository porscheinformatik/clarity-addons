import { Injectable } from '@angular/core';
import { LocationBarContentProvider, LocationBarNode, SearchResponseModel } from '@porscheinformatik/clr-addons';
import { Observable, of, ReplaySubject } from 'rxjs';
import { DemoLocationBarNodeId } from './model';
import { DemoLocationBarComplexNodeId } from '../../../../../../src/dev/src/app/location-bar/model';

/**
 * The content provider to be connected with the location bar.
 */
@Injectable({ providedIn: 'root' })
export class DemoLocationBarContentProvider extends LocationBarContentProvider<DemoLocationBarNodeId> {
  private searchPerformed$ = new ReplaySubject<SearchResponseModel<DemoLocationBarComplexNodeId>>(1);

  constructor() {
    super();
  }

  getLazyChildren(node: LocationBarNode<DemoLocationBarNodeId>): Observable<LocationBarNode<DemoLocationBarNodeId>[]> {
    if (node.id.id === 'lazy') {
      return of([new LocationBarNode(new DemoLocationBarNodeId('lazyChild'), 'Lazy child')]);
    }
    return of([]);
  }

  searchPerformed(response: SearchResponseModel<DemoLocationBarComplexNodeId>): void {
    this.searchPerformed$.next(response);
  }

  getSearchPerformed(): Observable<SearchResponseModel<DemoLocationBarComplexNodeId>> {
    return this.searchPerformed$;
  }
}
