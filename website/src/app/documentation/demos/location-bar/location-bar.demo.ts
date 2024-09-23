/*
 * Copyright (c) 2018-2024 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, OnInit } from '@angular/core';
import { LocationBarNode, SearchResultModel, SearchResponseModel } from '@porscheinformatik/clr-addons';
import { ClarityDocComponent } from '../clarity-doc';
import { DemoLocationBarNodeId, DemoLocationBarComplexNodeId } from './model';
import { DemoLocationBarContentProvider } from './content-provider';

const STANDARD_EXAMPLE = `
<clr-location-bar [clrRoots]="roots1"></clr-location-bar>
`;

const STANDARD_TS_EXAMPLE = `
private buildRoots1() {
  const l1 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1"), "L1");
  const l11 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1.1"), "L1.1");
  const l111 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1.1.1"), "L1.1.1");
  const l112 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1.1.2"), "L1.1.2");
  const l12 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1.2"), "L1.2");
  const l121 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1.2.1"), "L1.2.1");

  const l2 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l2"), "L2");
  const l21 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l2.1"), "L2.1");

  l12.setChildren([l121]);
  l11.setChildren([l111, l112]);
  l1.setChildren([l11, l12]);

  l2.setChildren([l21]);

  this.roots1 = [l1, l2];
}
`;

const STANDARD_ID_EXAMPLE = `
export class DemoLocationBarNodeId extends NodeId {
  constructor(public id: string) {
    super();
  }

  equals(other: DemoLocationBarNodeId): boolean {
    return this.id === other.id;
  }
}
`;

const PRE_EXAMPLE = `
<clr-location-bar [clrRoots]="roots2"></clr-location-bar>
`;

const PRE_TS_EXAMPLE = `
private buildRoots2() {
  const l1 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1"), "L1", false, true);
  const l11 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1.1"), "L1.1", true, true);
  const l111 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1.1.1"), "L1.1.1");
  const l112 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1.1.2"), "L1.1.2");

  l11.setChildren([l111, l112]);
  l1.setChildren([l11]);

  this.roots2 = [l1];
}
`;

const LAZY_EXAMPLE = `
<clr-location-bar [clrRoots]="rootsLazy"></clr-location-bar>
`;

const LAZY_TS_EXAMPLE = `
private buildRootsLazy() {
  const l1 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("l1"), "L1");
  const lazy = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId("lazy"), "Not lazy");

  l1.setChildren([lazy]);

  this.rootsLazy = [l1];
}
`;

const LAZY_CONTENT_PROVIDER = `
@Injectable({ providedIn: "root" })
export class DemoLocationBarContentProvider extends LocationBarContentProvider<DemoLocationBarNodeId> {
  constructor() {
    super();
  }

  getLazyChildren(node: LocationBarNode<DemoLocationBarNodeId>): Observable<LocationBarNode<DemoLocationBarNodeId>[]> {
    if (node.id.id === "lazy") {
      return of([new LocationBarNode(new DemoLocationBarNodeId("lazyChild"), "Lazy child")]);
    }
    return of([]);
  }
}
`;

const LAZY_PROVIDER_MODULE = `
@NgModule({
  ...
  providers: [{ provide: CONTENT_PROVIDER, useExisting: DemoLocationBarContentProvider }]
})
export class LocationBarDemoModule {}
`;

const SEARCH_EXAMPLE = `
<clr-location-bar [clrRoots]="searchableRoot"
                  [clrSearchRequest]="{ minCharacters: 3,
                          searchResultItemRef: searchResultItemRef,
                          placeholder: 'My demo placeholder'}"
                  [clrSearchResultItems]="searchResultItems"
                  (clrSearchItemChanged)="searchChanged($event)">
  <ng-template #searchResultItemRef let-searchResultItem>
   {{searchResultItem.name}}
   <span *ngIf="searchResultItem.label" class="label label-light-blue"> {{searchResultItem.label}}</span>
  </ng-template>
</clr-location-bar>
`;

const SEARCH_TS_EXAMPLE = `
 ngOnInit() {
    this.buildSearchableRoot();
    
    /* receive search event */
    this.contentProvider.getSearchPerformed().subscribe(response => this.onSearch(response));
  }
  
   private buildSearchableRoot(): void {
    const child1 = new LocationBarNode<DemoLocationBarComplexNodeId>(new DemoLocationBarComplexNodeId('1', 'Searchable child 1', 'child 1 code'), 'Searchable child 1');
    const child11 = new LocationBarNode<DemoLocationBarComplexNodeId>(new DemoLocationBarComplexNodeId('11', 'Searchable child 1 child 1', 'child 11 code'), 'Searchable child 1 child 1');
    const child12 = new LocationBarNode<DemoLocationBarComplexNodeId>(new DemoLocationBarComplexNodeId('12', 'Searchable child 1 child 2', 'child 12 code'), 'Searchable child 1 child 2');


    const child2 = new LocationBarNode<DemoLocationBarComplexNodeId>(new DemoLocationBarComplexNodeId('2', 'Searchable child 2', 'child 2 code'), 'Searchable child 2');
    const child21 = new LocationBarNode<DemoLocationBarComplexNodeId>(new DemoLocationBarComplexNodeId('21', 'Searchable child 2 child 1', 'child 21 code'), 'Searchable child 2 child 1');

    const root = new LocationBarNode<DemoLocationBarComplexNodeId>(new DemoLocationBarComplexNodeId('0', 'Searchable root', 'root code'), 'Searchable root');

    child1.setChildren([child11, child12]);
    child2.setChildren([child21]);
    root.setChildren([child1, child2]);
    this.searchableRoot = [root]
  }
`;

const found = { labelPrefix: '', value: '' };
const path = '';
const SEARCH_ALG_EXAMPLE = `
 onSearch(response: SearchResponseModel<DemoLocationBarComplexNodeId>): void {
    if (!response?.text) {
      this.searchResultItems = [];
      return;
    }

    const resultItems: SearchResultModel[] = [];
    const searchNode = (node: LocationBarNode<DemoLocationBarComplexNodeId>, path: string): boolean => {
      if (!node) {
        return false;
      }

      const { id, name, code } = node.id;
      const attributes = [
        { value: name, labelPrefix: '' },
        { value: id, labelPrefix: 'Id' },
        { value: code, labelPrefix: 'Code' },
      ];
      const currentPath = path ? \`${path} / ${name}\` : name;
      const found = attributes.find(attr => attr.value.toUpperCase().includes(response.text.toUpperCase()));
      if (found) {
        resultItems.push({
          id: id,
          name: currentPath,
          code: code,
          label: found.labelPrefix ? \`${found.labelPrefix}: ${found.value}\` : '',
        });
      }

      // Recursively search the node's children
      if (node.getChildren()) {
        for (const child of node.getChildren()) {
          searchNode(child, currentPath);
        }
      }
      return !!found;
    };

    response.searchableNodes.forEach(node => searchNode(node, ''));
    this.searchResultItems = this.reduceSortedResultItems(resultItems);
  }

  private reduceSortedResultItems(resultItems: SearchResultModel[]): SearchResultModel[] {
    if (resultItems.length === 0) {
      return [];
    }

    resultItems.sort((r1, r2) => {
      return r1.name?.localeCompare(r2.name);
    });
    return resultItems.slice(0, 20);
  }

  searchChanged(item: SearchResultModel) {
    console.log("Searched item: " + item);
  }
`;

const SEARCH_CONTENT_PROVIDER = `
@Injectable({ providedIn: "root" })
export class DemoLocationBarContentProvider extends LocationBarContentProvider<DemoLocationBarComplexNodeId> {
  private searchPerformed$ = new ReplaySubject<SearchResponseModel<DemoLocationBarComplexNodeId>>(1);

  constructor() {
    super();
  }

  getLazyChildren(node: LocationBarNode<DemoLocationBarComplexNodeId>): Observable<LocationBarNode<DemoLocationBarComplexNodeId>[]> {
    if (node.id.id === "lazy") {
      return of([new LocationBarNode(new DemoLocationBarComplexNodeId("lazyChild"), "Lazy child")]);
    }
    return of([]);
  }

  searchPerformed(response: SearchResponseModel<DemoLocationBarComplexNodeId>): void {
    this.searchPerformed$.next(response);
  }

  getSearchPerformed(): Observable<SearchResponseModel<DemoLocationBarComplexNodeId>> {
    return this.searchPerformed$;
  }
`;

@Component({
  selector: 'clr-location-bar-demo',
  templateUrl: './location-bar.demo.html',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
})
export class LocationBarDemo extends ClarityDocComponent implements OnInit {
  standardExample = STANDARD_EXAMPLE;
  standardTSExample = STANDARD_TS_EXAMPLE;
  standardIDExample = STANDARD_ID_EXAMPLE;
  preExample = PRE_EXAMPLE;
  preTSExample = PRE_TS_EXAMPLE;
  lazyExample = LAZY_EXAMPLE;
  lazyTSExample = LAZY_TS_EXAMPLE;
  lazyContentProvider = LAZY_CONTENT_PROVIDER;
  providerModule = LAZY_PROVIDER_MODULE;
  searchExample = SEARCH_EXAMPLE;
  searchTSExample = SEARCH_TS_EXAMPLE;
  searchAlgExample = SEARCH_ALG_EXAMPLE;
  searchContentProvider = SEARCH_CONTENT_PROVIDER;

  roots1: LocationBarNode<DemoLocationBarNodeId>[];
  roots2: LocationBarNode<DemoLocationBarNodeId>[];
  rootsLazy: LocationBarNode<DemoLocationBarNodeId>[];
  searchableRoot: LocationBarNode<DemoLocationBarComplexNodeId>[];

  searchResultItems: SearchResultModel[] = [];

  constructor(private contentProvider: DemoLocationBarContentProvider) {
    super('location-bar');
  }

  ngOnInit() {
    this.buildRoots1();
    this.buildRoots2();
    this.buildRootsLazy();
    this.buildSearchableRoot();

    this.contentProvider.getSearchPerformed().subscribe(response => this.onSearch(response));
  }

  private buildRoots1() {
    const l1 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId('l1'), 'L1');
    const l11 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId('l1.1'), 'L1.1');
    const l111 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId('l1.1.1'), 'L1.1.1');
    const l112 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId('l1.1.2'), 'L1.1.2');
    const l12 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId('l1.2'), 'L1.2');
    const l121 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId('l1.2.1'), 'L1.2.1');

    const l2 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId('l2'), 'L2');
    const l21 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId('l2.1'), 'L2.1');

    l12.setChildren([l121]);
    l11.setChildren([l111, l112]);
    l1.setChildren([l11, l12]);

    l2.setChildren([l21]);

    this.roots1 = [l1, l2];
  }

  private buildRoots2() {
    const l1 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId('l1'), 'L1', false, true);
    const l11 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId('l1.1'), 'L1.1', true, true);
    const l111 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId('l1.1.1'), 'L1.1.1');
    const l112 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId('l1.1.2'), 'L1.1.2');

    l11.setChildren([l111, l112]);
    l1.setChildren([l11]);

    this.roots2 = [l1];
  }

  private buildRootsLazy() {
    const l1 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId('l1'), 'L1');
    const lazy = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId('lazy'), 'Not lazy');

    l1.setChildren([lazy]);

    this.rootsLazy = [l1];
  }

  private buildSearchableRoot(): void {
    const child1 = new LocationBarNode<DemoLocationBarComplexNodeId>(
      new DemoLocationBarComplexNodeId('1', 'Searchable child 1', 'child 1 code'),
      'Searchable child 1'
    );
    const child11 = new LocationBarNode<DemoLocationBarComplexNodeId>(
      new DemoLocationBarComplexNodeId('11', 'Searchable child 1 child 1', 'child 11 code'),
      'Searchable child 1 child 1'
    );
    const child12 = new LocationBarNode<DemoLocationBarComplexNodeId>(
      new DemoLocationBarComplexNodeId('12', 'Searchable child 1 child 2', 'child 12 code'),
      'Searchable child 1 child 2'
    );

    const child2 = new LocationBarNode<DemoLocationBarComplexNodeId>(
      new DemoLocationBarComplexNodeId('2', 'Searchable child 2', 'child 2 code'),
      'Searchable child 2'
    );
    const child21 = new LocationBarNode<DemoLocationBarComplexNodeId>(
      new DemoLocationBarComplexNodeId('21', 'Searchable child 2 child 1', 'child 21 code'),
      'Searchable child 2 child 1'
    );

    const root = new LocationBarNode<DemoLocationBarComplexNodeId>(
      new DemoLocationBarComplexNodeId('0', 'Searchable root', 'root code'),
      'Searchable root'
    );

    child1.setChildren([child11, child12]);
    child2.setChildren([child21]);
    root.setChildren([child1, child2]);
    this.searchableRoot = [root];
  }

  onSearch(response: SearchResponseModel<DemoLocationBarComplexNodeId>): void {
    if (!response?.text) {
      this.searchResultItems = [];
      return;
    }

    const resultItems: SearchResultModel[] = [];
    const searchNode = (node: LocationBarNode<DemoLocationBarComplexNodeId>, path: string): boolean => {
      if (!node) {
        return false;
      }

      const { id, name, code } = node.id;
      const attributes = [
        { value: name, labelPrefix: '' },
        { value: id, labelPrefix: 'Id' },
        { value: code, labelPrefix: 'Code' },
      ];
      const currentPath = path ? `${path} / ${name}` : name;
      const found = attributes.find(attr => attr.value.toUpperCase().includes(response.text.toUpperCase()));
      if (found) {
        resultItems.push({
          id: id,
          name: currentPath,
          code: code,
          label: found.labelPrefix ? `${found.labelPrefix}: ${found.value}` : '',
        });
      }

      // Recursively search the node's children
      if (node.getChildren()) {
        for (const child of node.getChildren()) {
          searchNode(child, currentPath);
        }
      }
      return !!found;
    };

    response.searchableNodes.forEach(node => searchNode(node, ''));
    this.searchResultItems = this.reduceSortedResultItems(resultItems);
  }

  private reduceSortedResultItems(resultItems: SearchResultModel[]): SearchResultModel[] {
    if (resultItems.length === 0) {
      return [];
    }

    resultItems.sort((r1, r2) => {
      return r1.name?.localeCompare(r2.name);
    });
    return resultItems.slice(0, 20);
  }

  searchChanged(item: SearchResultModel) {
    console.log('Searched item: ' + item);
  }
}
