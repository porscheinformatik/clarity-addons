/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { TreetableDataStateService } from './treetable-data-state.service';
import { Filters } from './filters';
import { Sort } from './sort';
import { ClrTreetableComparatorInterface } from '../interfaces/comparator.interface';
import { ClrTreetableFilterInterface } from '../interfaces/filter-model';
import { ClrTreetableSelectedState } from '../enums/selection-type';
import { Subject } from 'rxjs';
import { ClrTreetableTreeNode } from '../interfaces/treetable-model';
import { ClrTreetableState } from '../interfaces/treetable-state-model';

type Item = { id: number; name?: string; subItems?: Item[] };

class IdComparator implements ClrTreetableComparatorInterface<Item> {
  compare(a: Item, b: Item): number {
    return a.id - b.id;
  }
}

class NameFilter implements ClrTreetableFilterInterface<Item, string> {
  private readonly changesSubject = new Subject<string>();
  readonly changes = this.changesSubject.asObservable();
  private value = '';

  set(val: string) {
    this.value = val;
    this.changesSubject.next(val);
  }

  isActive(): boolean {
    return !!this.value.trim();
  }

  accepts(item: Item): boolean {
    if (!this.isActive()) {
      return true;
    }
    return (item.name ?? '').toLowerCase().includes(this.value.toLowerCase());
  }
}

function flatten(nodes: ClrTreetableTreeNode<Item>[]): ClrTreetableTreeNode<Item>[] {
  const result: ClrTreetableTreeNode<Item>[] = [];
  for (const node of nodes) {
    result.push(node);
    if (!node.isLeaf) {
      result.push(...flatten(node.children));
    }
  }
  return result;
}

describe('TreetableDataStateService', () => {
  let service: TreetableDataStateService<Item>;
  let filters: Filters<Item>;
  let sort: Sort<Item>;

  const items: Item[] = [
    { id: 3, name: 'Gamma' },
    {
      id: 1,
      name: 'Alpha',
      subItems: [
        { id: 2, name: 'Beta' },
        { id: 5, name: 'Epsilon' },
      ],
    },
    { id: 4, name: 'Delta' },
  ];

  const getSubItems = (i: Item) => i.subItems ?? [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreetableDataStateService, Filters, Sort],
    });
    service = TestBed.inject(TreetableDataStateService<Item>);
    filters = TestBed.inject(Filters<Item>);
    sort = TestBed.inject(Sort<Item>);
  });

  it('should contain initial state without data source', () => {
    expect(service.displayedNodes().length).toBe(0);
    expect(service.selectedNodes().length).toBe(0);
    expect(service.areAllNodesSelected()).toBeTrue(); // .every on empty array => true
  });

  it('should set data source and create nodes', () => {
    service.setDataSource(items, getSubItems);

    expect(service.displayedNodes().length).toBe(3);

    const flat = flatten(service.displayedNodes());

    expect(flat.length).toBe(3 + 2); // 3 roots + 2 children
    for (const node of flat) {
      expect(node.selected()).toBe(ClrTreetableSelectedState.UNSELECTED);
    }
  });

  it('should select external selection marked nodes', () => {
    service.setDataSource(items, getSubItems);
    service.setExternallySelectedItems([items[1], items[1].subItems[0]]); // Alpha + Beta

    const flat = flatten(service.displayedNodes());
    const alphaNode = flat.find(node => node.value.id === 1);
    const betaNode = flat.find(node => node.value.id === 2);

    TestBed.flushEffects();

    expect(alphaNode.selected()).toBe(ClrTreetableSelectedState.SELECTED);
    expect(betaNode.selected()).toBe(ClrTreetableSelectedState.SELECTED);
  });

  it('should select all nodes and deselects again', () => {
    service.setDataSource(items, getSubItems);
    expect(service.areAllNodesSelected()).toBeFalse();

    service.toggleSelectionForDisplayedNodes();
    expect(service.areAllNodesSelected()).toBeTrue();

    service.toggleSelectionForDisplayedNodes();
    expect(service.areAllNodesSelected()).toBeFalse();
  });

  it('should cascade selecting parent selects children', () => {
    service.setDataSource(items, getSubItems);

    const rootAlpha = service.displayedNodes().find(node => node.value.id === 1);
    rootAlpha.setSelected(ClrTreetableSelectedState.SELECTED);

    const beta = rootAlpha.children.find(child => child.value.id === 2);
    const epsilon = rootAlpha.children.find(child => child.value.id === 5);

    expect(beta.selected()).toBe(ClrTreetableSelectedState.SELECTED);
    expect(epsilon.selected()).toBe(ClrTreetableSelectedState.SELECTED);
  });

  it('should sort id by ASC/DESC', () => {
    service.setDataSource(items, getSubItems);

    const comp = new IdComparator();

    sort.toggle(comp, false);
    const ascIds = service.displayedNodes().map(node => node.value.id);
    expect(ascIds).toEqual([1, 3, 4]);

    sort.toggle(comp); // reverse => true
    const descIds = service.displayedNodes().map(node => node.value.id);
    expect(descIds).toEqual([4, 3, 1]);
  });

  it('should reduces displayed nodes depending on filter', () => {
    service.setDataSource(items, getSubItems);

    const filter = new NameFilter();
    filters.register(filter);

    expect(service.displayedNodes().length).toBe(3);

    filter.set('ta'); // matches Beta and Delta

    // Beta is a child; parent with matching child is kept
    const displayed = flatten(service.displayedNodes()).map(node => node.value.name);
    expect(displayed).toContain('Alpha');
    expect(displayed).toContain('Beta');
    expect(displayed).toContain('Delta');
    expect(displayed).not.toContain('Gamma');
  });

  it('should emit changes after sort and filter (audit time)', fakeAsync(() => {
    service.setDataSource(items, getSubItems);

    const comp = new IdComparator();
    const filter = new NameFilter();
    filters.register(filter);

    const emissions: ClrTreetableState<Item>[] = [];
    service.changes$.subscribe(state => emissions.push(state));
    TestBed.flushEffects();

    // set sort
    sort.toggle(comp, false);
    TestBed.flushEffects();

    // activate filter
    filter.set('a');
    TestBed.flushEffects();

    // auditTime 500ms + skip(1) => must wait >500ms
    tick(600);

    expect(emissions.length).toBe(1);
    expect(emissions[0].sort).toBeTruthy();
    expect(emissions[0].filters.length).toBe(1);
  }));
});
