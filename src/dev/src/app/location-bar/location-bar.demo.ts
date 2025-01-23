/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, OnInit } from '@angular/core';
import { LocationBarNode, SearchResultModel } from '@porscheinformatik/clr-addons';
import { DemoLocationBarComplexNodeId, DemoLocationBarNodeId } from './model';
import { DemoLocationBarContentProvider } from './content-provider';
import { SearchResponseModel } from '@porscheinformatik/clr-addons';

@Component({
  selector: 'clr-location-bar-demo',
  templateUrl: './location-bar.demo.html',
  standalone: false,
})
export class LocationBarDemo implements OnInit {
  roots1: LocationBarNode<DemoLocationBarNodeId>[];
  roots2: LocationBarNode<DemoLocationBarNodeId>[];
  rootsLazy: LocationBarNode<DemoLocationBarNodeId>[];
  rootsLongTexts: LocationBarNode<DemoLocationBarNodeId>[];
  rootsManyItems: LocationBarNode<DemoLocationBarNodeId>[];
  searchableRoot: LocationBarNode<DemoLocationBarComplexNodeId>[];

  searchResultItems: SearchResultModel[] = [];

  constructor(private contentProvider: DemoLocationBarContentProvider) {}

  ngOnInit() {
    this.contentProvider.getSearchPerformed().subscribe(response => this.onSearch(response));
    this.buildRoots1();
    this.buildRoots2();
    this.buildRootsLazy();
    this.buildRootsLongTexts();
    this.buildRootsManyItems();
    this.buildSearchableRoot();
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
    const l11 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId('l1.1'), 'L1.1', false, true);
    const l111 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId('l1.1.1'), 'L1.1.1');
    const l112 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId('l1.1.2'), 'L1.1.2');

    l11.setChildren([l111, l112]);
    l1.setChildren([l11]);

    this.roots2 = [l1];
  }

  private buildRootsLazy() {
    const l1 = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId('l1'), 'L1');
    const lazy = new LocationBarNode<DemoLocationBarNodeId>(new DemoLocationBarNodeId('lazy'), 'Lazy');

    l1.setChildren([lazy]);

    this.rootsLazy = [l1];
  }

  private buildRootsLongTexts() {
    const l1 = new LocationBarNode<DemoLocationBarNodeId>(
      new DemoLocationBarNodeId('long1'),
      'L1 This is a pretty long text to show that we should also handle this case',
      false,
      true
    );
    const l11 = new LocationBarNode<DemoLocationBarNodeId>(
      new DemoLocationBarNodeId('long1.1'),
      'L1.1 This is another pretty long text to show that we should also handle this case'
    );
    const l12 = new LocationBarNode<DemoLocationBarNodeId>(
      new DemoLocationBarNodeId('long1.2'),
      'L1.2 This is another pretty long text to show that we should also handle this case'
    );
    const l112 = new LocationBarNode<DemoLocationBarNodeId>(
      new DemoLocationBarNodeId('long1.1.2'),
      'L1.1.2 This is a pretty long text to show that we should also handle this case'
    );

    l11.setChildren([l112]);
    l1.setChildren([l11, l12]);

    this.rootsLongTexts = [l1];
  }

  private buildRootsManyItems() {
    const l1 = new LocationBarNode<DemoLocationBarNodeId>(
      new DemoLocationBarNodeId('long1'),
      'L1 This one has a LOT of sub-items',
      false,
      true
    );

    const children: LocationBarNode<DemoLocationBarNodeId>[] = [...Array(50).keys()].map(v => {
      const id = v + 1;
      return new LocationBarNode<DemoLocationBarNodeId>(
        new DemoLocationBarNodeId(`id${id}`),
        `L1.${id} Sub-item ${id}`,
        true,
        false
      );
    });
    l1.setChildren(children);

    this.rootsManyItems = [l1];
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
