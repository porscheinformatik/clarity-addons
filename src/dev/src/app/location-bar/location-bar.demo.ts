/*
 * Copyright (c) 2018-2024 Porsche Informatik. All Rights Reserved.
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
})
export class LocationBarDemo implements OnInit {
  roots1: LocationBarNode<DemoLocationBarComplexNodeId>[];
  roots2: LocationBarNode<DemoLocationBarNodeId>[];
  rootsLazy: LocationBarNode<DemoLocationBarNodeId>[];
  rootsLongTexts: LocationBarNode<DemoLocationBarNodeId>[];
  rootsManyItems: LocationBarNode<DemoLocationBarNodeId>[];

  searchResultItems: SearchResultModel[] = [];

  constructor(private contentProvider: DemoLocationBarContentProvider) {}

  ngOnInit() {
    this.contentProvider.getSearchPerformed().subscribe(response => this.onSearch(response));
    this.buildRoots1();
    this.buildRoots2();
    this.buildRootsLazy();
    this.buildRootsLongTexts();
    this.buildRootsManyItems();
  }

  private buildRoots1() {
    const austria = new LocationBarNode<DemoLocationBarComplexNodeId>(
      new DemoLocationBarComplexNodeId('1', 'Austria', ''),
      'Austria'
    );

    const austriaTG1 = new LocationBarNode<DemoLocationBarComplexNodeId>(
      new DemoLocationBarComplexNodeId('11', 'RL2-ACC - ATDEVACC2 - Release 2 Acceptance', 'ATDEV1'),
      'RL2-ACC - ATDEVACC2 - Release 2 Acceptance'
    );
    const austriaTG1Tenant1 = new LocationBarNode<DemoLocationBarComplexNodeId>(
      new DemoLocationBarComplexNodeId('111', 'CROSS 3 Acceptance Release 2', ''),
      'CROSS 3 Acceptance Release 2'
    );
    const austriaTG1Tenant2 = new LocationBarNode<DemoLocationBarComplexNodeId>(
      new DemoLocationBarComplexNodeId('112', 'CROSS 3/VU3 Acceptance Release 2', ''),
      'CROSS 3/VU3 Acceptance Release 2'
    );

    const austriaTG2 = new LocationBarNode<DemoLocationBarComplexNodeId>(
      new DemoLocationBarComplexNodeId('12', 'MST-PT1 - ATDEV01 - Master Development', 'ATDEV2'),
      'MST-PT1 - ATDEV01 - Master Development'
    );
    const austriaTG2Tenant1 = new LocationBarNode<DemoLocationBarComplexNodeId>(
      new DemoLocationBarComplexNodeId('121', 'Copy test3 DEV', ''),
      'Copy test3 DEV'
    );
    const austriaTG2Tenant2 = new LocationBarNode<DemoLocationBarComplexNodeId>(
      new DemoLocationBarComplexNodeId('122', '01_New_ tenant_for_NIU', ''),
      '01_New_ tenant_for_NIU'
    );

    const belgium = new LocationBarNode<DemoLocationBarComplexNodeId>(
      new DemoLocationBarComplexNodeId('21', 'Belgium', ''),
      'Belgium'
    );

    const belgiumTG1 = new LocationBarNode<DemoLocationBarComplexNodeId>(
      new DemoLocationBarComplexNodeId('211', 'Belgium - Release', 'BGDEV1'),
      'BGDEVACC - Release'
    );
    const belgiumTG2 = new LocationBarNode<DemoLocationBarComplexNodeId>(
      new DemoLocationBarComplexNodeId('212', 'CD - BG', 'ACCDEV04'),
      'CD - BG'
    );

    const global = new LocationBarNode<DemoLocationBarComplexNodeId>(
      new DemoLocationBarComplexNodeId('000', 'Global', ''),
      'Global'
    );

    austriaTG1.setChildren([austriaTG1Tenant1, austriaTG1Tenant2]);
    austriaTG2.setChildren([austriaTG2Tenant1, austriaTG2Tenant2]);
    austria.setChildren([austriaTG1, austriaTG2]);

    belgium.setChildren([belgiumTG1, belgiumTG2]);

    global.setChildren([austria, belgium]);

    this.roots1 = [global];
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
      const found = attributes.find(attr => attr.value.toUpperCase().startsWith(response.text.toUpperCase()));
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
}
