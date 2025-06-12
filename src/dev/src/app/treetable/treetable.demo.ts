/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, OnInit } from '@angular/core';
import { ClarityIcons, infoStandardIcon } from '@cds/core/icon';
import { of, tap } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ClrTreetableComparatorInterface } from '../../../../clr-addons/treetable/interfaces/comparator.interface';
import { ClrTreetableSortOrder } from '../../../../clr-addons/treetable/enums/sort-order.enum';

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
  selector: 'treetable-demo',
  templateUrl: './treetable.demo.html',
  standalone: false,
})
export class TreetableDemo implements OnInit {
  root = [] as any[];
  veryLongString =
    ' This is a very long string which should show that text will be truncated properly and not overflow its parent';

  data$ = of(
    [...Array(1).keys()].map(() => ({
      col1: 'Vehicle configuration',
      col2: '',
      col3: '18,519.99EUR',
      col4: '20%',
      col5: '19.99EUR',
      col6: '519.99EUR',
      child: [
        {
          col1: 'Audi A1 3-Türer Attraction 1.2 TFSI 63(86) kW(PS) 5-Gang',
          col2: 'EUR 16,750.00',
          col3: '',
          col4: '20%',
          col5: '19.99EUR',
          col6: '519.99EUR',
        },
        {
          col1: 'Florettsilber Metallic Brillantschwarz / granatrot-schwarz-granatrot / schwarz- schwarz / schwarz / titangrau',
          col2: 'EUR 480.00',
          col3: '',
          col4: '20%',
          col5: '19.99EUR',
          col6: '519.99EUR',
        },
      ],
      extras: [
        {
          col1: 'Extra1',
          col2: 'EUR 480.00',
          col3: '',
          col4: '20%',
          col5: '19.99EUR',
          col6: '519.99EUR',
        },
        {
          col1: 'Extra2',
          col2: 'EUR 480.00',
          col3: '',
          col4: '20%',
          col5: '19.99EUR',
          col6: '519.99EUR',
        },
        {
          col1: 'Extra3',
          col2: 'EUR 480.00',
          col3: '',
          col4: '20%',
          col5: '19.99EUR',
          col6: '519.99EUR',
        },
        {
          col1: 'Extra4',
          col2: 'EUR 480.00',
          col3: '',
          col4: '20%',
          col5: '19.99EUR',
          col6: '519.99EUR',
        },
      ],
    }))
  ).pipe(
    delay(500),
    tap(() => (this.total = 100))
  );

  total = 0;

  rootNodes: Tree[] = [] as any[];
  comperator = new TestComparator();
  comperator2 = new TestComparator2();
  sortOrder = ClrTreetableSortOrder.ASC;
  sortOrder2 = ClrTreetableSortOrder.UNSORTED;

  myTree: Tree[] = Array.from({ length: 1 }, (_, index) => {
    return JSON.parse(
      JSON.stringify({
        id: `1.${index + 1}`, // Assign unique IDs for each duplicate
        value: { name: 'Root1' },
        parent: null,
        children: [
          {
            id: `1.${index + 1}.1`,
            value: { name: 'B' },
            parent: { id: `1.${index + 1}` },
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
            parent: { id: `1.${index + 1}` },
          },
        ],
      })
    );
  });

  selected = this.myTree;

  ngOnInit(): void {
    setTimeout(
      () =>
        (this.root = [
          {
            name: 'Parent1',
            type: 'Parent',
            version: 'V1',
            children: [
              {
                name: 'Child1',
                type: 'Child',
                version: 'V1',
                children: [{ name: 'ChildChild1', type: 'ChildChild', version: 'V1' }],
              },
              { name: 'Child2', type: 'Child', version: 'V1' },
            ],
          },
        ])
    );

    this.rootNodes = this.myTree;
  }

  isExpandable(node: any): boolean {
    let expandable = false;
    node.child?.forEach((child: any) => {
      if (child) {
        expandable = true;
      }
    });
    return expandable;
  }

  trackByFn(_: number, item: Tree): string {
    return item.id;
  }
}

class TestComparator implements ClrTreetableComparatorInterface<Tree> {
  compare(a: Tree, b: Tree): number {
    return a.value.name.localeCompare(b.value.name);
  }
}

class TestComparator2 implements ClrTreetableComparatorInterface<Tree> {
  compare(a: Tree, b: Tree): number {
    return a.id.localeCompare(b.id);
  }
}
