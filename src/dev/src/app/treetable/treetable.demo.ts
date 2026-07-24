/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, computed, linkedSignal, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { bellIcon, ClarityIcons, infoStandardIcon } from '@clr/angular/icon';
import {
  ClrTreetableComparatorInterface,
  ClrTreetableSortOrder,
  ClrTreetableState,
  ClrTreetableStringFilterFunction,
} from '@porscheinformatik/clr-addons';
import { of, tap } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ClrDatagridComparatorInterface, ClrDatagridSortOrder, ClrDatagridStringFilterInterface } from '@clr/angular';

ClarityIcons.addIcons(infoStandardIcon);
ClarityIcons.addIcons(bellIcon);

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
    [...new Array(30).keys()].map(() => ({
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

  comperator = new TestComparator();
  comperator2 = new TestComparator2();
  sortOrder = ClrTreetableSortOrder.DESC;
  sortOrder2 = ClrTreetableSortOrder.UNSORTED;

  buildTree(groups: number): Tree[] {
    return Array.from({ length: groups }, (_, idx): Tree => {
      const rootId = `1.${idx + 1}`;
      return {
        id: rootId,
        value: { name: `Group ${idx}` },
        parent: null,
        children: [
          {
            id: `${rootId}.1`,
            value: { name: 'B' },
            parent: { id: `1.${idx + 1}` },
            children: [
              {
                id: `${rootId}.1.1`,
                value: { name: 'C' },
                parent: { id: `1.${idx + 1}.1` },
              },
              {
                id: `${rootId}.1.2`,
                value: { name: 'D' },
                parent: { id: `1.${idx + 1}.1` },
                children: [
                  {
                    id: `${rootId}.1.2.1`,
                    value: { name: 'E' },
                    parent: { id: `1.${idx + 1}.1.2` },
                  },
                  {
                    id: `${rootId}.1.2.2`,
                    value: { name: 'F' },
                    parent: { id: `1.${idx + 1}.1.2` },
                  },
                ],
              },
            ],
          },
          {
            id: `${rootId}.2`,
            value: { name: 'A' },
            parent: { id: `1.${idx + 1}` },
            children: [
              { id: `${rootId}.2.1`, value: { name: 'C' }, parent: { id: `1.${idx + 1}.1` } },
              { id: `${rootId}.2.2`, value: { name: 'D' }, parent: { id: `1.${idx + 1}.1` } },
            ],
          },
        ],
      };
    });
  }

  myTree: Tree[] = this.buildTree(1);

  treeIdFilter: ClrTreetableStringFilterFunction<Tree> = (item: Tree, search: string): boolean => {
    return item.id.toLowerCase().includes(search.toLowerCase());
  };

  treeNameFilter: ClrTreetableStringFilterFunction<Tree> = (item: Tree, search: string): boolean => {
    return item?.value?.name?.toLowerCase().includes(search.toLowerCase());
  };

  datagridComperator = new DatagridTestComparator();
  datagridSortOrder = ClrDatagridSortOrder.DESC;
  datagridTreeIdFilter = new DatagridTreeIdFilter();
  datagridTreeNameFilter = new DatagridTreeNameFilter();

  testHidden = signal(false);
  testHidable = computed(() => ({ hidden: this.testHidden() }));
  loading = signal(false);
  rootNodes = linkedSignal<Tree[]>(
    toSignal(
      of(this.myTree).pipe(
        tap(() => this.loading.set(true)),
        delay(2000),
        tap(() => this.loading.set(false))
      )
    )
  );
  selected = signal<Tree[]>([]);
  selectedDg = signal<Tree[]>([]);
  autoParentSelection = signal(true);

  private readonly DEFAULT_CUSTOM_WIDTH: number = 400;
  protected readonly nameColumnWidth = signal(this.DEFAULT_CUSTOM_WIDTH);

  protected getChildren(node: Tree): Tree[] {
    return node?.children || [];
  }

  protected toggleTest(): void {
    this.testHidden.update(value => !value);
  }

  protected nameColumnSizeChange(width: number): void {
    this.nameColumnWidth.set(width);
  }

  protected resetNameColumnWidth(): void {
    this.nameColumnWidth.set(this.DEFAULT_CUSTOM_WIDTH);
  }

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
                children: [
                  {
                    name: 'ChildChild1',
                    type: 'ChildChild',
                    version: 'V1',
                    children: [{ name: 'ChildChildChild1', type: 'ChildChildChild', version: 'V1' }],
                  },
                ],
              },
              { name: 'Child2', type: 'Child', version: 'V1' },
            ],
          },
        ])
    );
  }

  logState(state: ClrTreetableState<Tree>) {
    console.log('Treetable | state', state);
  }

  logValues(...values: unknown[]): void {
    console.log('Treetable | values', ...values);
  }

  toggleLoading() {
    this.loading.update(current => !current);
  }

  toggleAutoParentSelection() {
    this.autoParentSelection.update(current => !current);
  }

  appendRootNode() {
    this.rootNodes.update(current => [
      ...current,
      {
        id: `${current.length}.0`,
        value: { name: `Group ${current.length}` },
        parent: null,
        children: [],
      },
    ]);
  }

  toggleExternallySelected(): void {
    const selected = this.selected();
    if (selected.length === 0) {
      const nodes = this.rootNodes();
      this.selected.set(nodes ? [...nodes[0].children[0].children, ...nodes[0].children[0].children[1].children] : []);
    } else {
      this.selected.set([]);
    }
  }

  testAction() {
    console.log('TreetableDemo | Test action performed!');
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

  getChild(node: any): any[] {
    return node?.child ?? [];
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

class DatagridTestComparator implements ClrDatagridComparatorInterface<Tree> {
  compare(a: Tree, b: Tree): number {
    return a.value.name.localeCompare(b.value.name);
  }
}

class DatagridTreeIdFilter implements ClrDatagridStringFilterInterface<Tree> {
  accepts(item: Tree, search: string): boolean {
    return item.id.toLowerCase().includes(search.toLowerCase());
  }
}

class DatagridTreeNameFilter implements ClrDatagridStringFilterInterface<Tree> {
  accepts(item: Tree, search: string): boolean {
    return item?.value?.name?.toLowerCase().includes(search.toLowerCase());
  }
}
