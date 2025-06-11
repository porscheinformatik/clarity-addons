/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, OnInit } from '@angular/core';
import { ClarityIcons, infoStandardIcon } from '@cds/core/icon';
import { ClrDatagridComparatorInterface, ClrDatagridSortOrder } from '@clr/angular';
ClarityIcons.addIcons(infoStandardIcon);

export type Elem = {
  name: string;
};

export type Tree = {
  id: string;
  value?: Elem;
  parent?: Tree | null;
  children?: Tree[];
};

@Component({
  selector: 'data-treetable-demo',
  templateUrl: './data-treetable.demo.html',
  standalone: false,
})
export class DataTreetableDemo implements OnInit {
  rootNodes: Tree[] = [] as any[];
  comperator = new TestComparator();
  sortOrder = ClrDatagridSortOrder.DESC;

  myTree: Tree[] = Array.from({ length: 1 }, (_, index) => {
    return JSON.parse(
      JSON.stringify({
        id: `1-${index + 1}`, // Assign unique IDs for each duplicate
        value: { name: 'Root1' },
        parent: null,
        children: [
          {
            id: `1.${index + 1}.1`,
            value: { name: 'B' },
            parent: { id: `1-${index + 1}` },
            children: [
              {
                id: `1.${index + 1}.1.1`,
                value: { name: 'D' },
                parent: { id: `1.${index + 1}.1` },
              },
              {
                id: `1.${index + 1}.1.2`,
                value: { name: 'C' },
                parent: { id: `1.${index + 1}.1` },
              },
            ],
          },
          {
            id: `1.${index + 1}.2`,
            value: { name: 'A' },
            parent: { id: `1-${index + 1}` },
          },
        ],
      })
    );
  });

  selected = this.myTree;

  ngOnInit(): void {
    setTimeout(() => (this.rootNodes = this.myTree));
  }
}

class TestComparator implements ClrDatagridComparatorInterface<Tree> {
  compare(a: Tree, b: Tree): number {
    return a.value.name.localeCompare(b.value.name);
  }
}
