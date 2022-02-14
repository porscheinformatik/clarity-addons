import { LocationBarNode, NodeId } from './location-bar.model';
import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';

export const CONTENT_PROVIDER = new InjectionToken<any>('CONTENT_PROVIDER');

/**
 * Interface denoting the contract between the location bar component and
 * its users. The content provider offers callback methods for the location bar
 * component to gather the content to be displayed.
 */
export abstract class LocationBarContentProvider<T extends NodeId> {
  /**
   * Determines the children of the given node. This will only be called if the children of the node are falsy.
   * This enables lazy loading of children. This method should not return a falsy value but at least an empty array.
   *
   * @param node The children of this node should be determined
   */
  abstract getLazyChildren(node: LocationBarNode<T>): Observable<LocationBarNode<T>[]>;
}
