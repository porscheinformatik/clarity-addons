import { Injectable } from '@angular/core';
import { LocationBarContentProvider, LocationBarNode } from '@porscheinformatik/clr-addons';
import { Observable, of } from 'rxjs';
import { DemoLocationBarNodeId } from './model';

/**
 * The content provider to be connected with the location bar.
 */
@Injectable({ providedIn: 'root' })
export class DemoLocationBarContentProvider extends LocationBarContentProvider<DemoLocationBarNodeId> {
  constructor() {
    super();
  }

  getLazyChildren(node: LocationBarNode<DemoLocationBarNodeId>): Observable<LocationBarNode<DemoLocationBarNodeId>[]> {
    if (node.id.id === 'lazy') {
      return of([new LocationBarNode(new DemoLocationBarNodeId('lazyChild'), 'Lazy child')]);
    }
    return of([]);
  }
}
