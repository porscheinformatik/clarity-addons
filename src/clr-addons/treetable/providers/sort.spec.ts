/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Sort, TreetableSortState } from './sort';
import { ClrTreetableComparatorInterface } from '../interfaces/comparator.interface';
import { TestBed } from '@angular/core/testing';

type Item = { id: number; subItems?: Item[] };

class IdComparator implements ClrTreetableComparatorInterface<Item> {
  compare(a: Item, b: Item): number {
    return a.id - b.id;
  }
}

describe('Sort<Item>', () => {
  let service: Sort<Item>;
  let comparator: IdComparator;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [Sort] });
    service = TestBed.inject(Sort<Item>);
    comparator = new IdComparator();

    TestBed.flushEffects();
  });

  it('should have initial empty sort state', () => {
    const state = service.sortState();
    expect(state.comparator).toBeNull();
    expect(state.reverse).toBeFalse();
  });

  it('should set comparator and default reverse=false', () => {
    service.toggle(comparator);
    const state = service.sortState();
    expect(state.comparator).toBe(comparator);
    expect(state.reverse).toBeFalse();
  });

  it('should toggle reverse when same comparator was toggled again', () => {
    service.toggle(comparator);
    service.toggle(comparator);
    expect(service.sortState().reverse).toBeTrue();
  });

  it('should force reverse=true for the first sort', () => {
    service.toggle(comparator, true);
    expect(service.sortState().reverse).toBeTrue();
  });

  it('should force reverse=false even after a reverse=true', () => {
    service.toggle(comparator, true);
    service.toggle(comparator, false);
    expect(service.sortState().reverse).toBeFalse();
  });

  it('should clear comparator', () => {
    service.toggle(comparator);
    service.clear();
    expect(service.sortState().comparator).toBeNull();
  });

  it('should compare with active comparator forward', () => {
    service.toggle(comparator);
    const a: Item = { id: 1 };
    const b: Item = { id: 2 };
    expect(service.compare(a, b)).toBeLessThan(0);
  });

  it('should compare reversed when reverse=true', () => {
    service.toggle(comparator, true);
    const a: Item = { id: 1 };
    const b: Item = { id: 2 };
    expect(service.compare(a, b)).toBeGreaterThan(0);
  });

  it('should return 0 compare when no comparator is set', () => {
    const a: Item = { id: 5 };
    const b: Item = { id: 1 };
    expect(service.compare(a, b)).toBe(0);
  });

  it('should emit sort state changes via changes$', () => {
    const emissions: TreetableSortState<Item>[] = [];
    const sub = service.changes$.subscribe(state => {
      console.log('emission', state);
      emissions.push(state);
    });

    // Initial (unsorted)
    TestBed.flushEffects();

    // Set comparator (ASC)
    service.toggle(comparator);
    TestBed.flushEffects();

    // Toggle reverse (DESC)
    service.toggle(comparator);
    TestBed.flushEffects();

    // Force reverse stays true
    service.toggle(comparator, true);
    TestBed.flushEffects();

    // Force reverse false (ASC)
    service.toggle(comparator, false);
    TestBed.flushEffects();

    // Clear comparator (UNSORTED)
    service.clear();
    TestBed.flushEffects();

    sub.unsubscribe();

    expect(emissions.length).toBe(5);

    expect(emissions[0]).toEqual({ comparator: null, reverse: false });
    expect(emissions[1]).toEqual({ comparator, reverse: false });
    expect(emissions[2]).toEqual({ comparator, reverse: true });
    expect(emissions[3]).toEqual({ comparator, reverse: false });
    expect(emissions[4]).toEqual({ comparator: null, reverse: false });
  });
});
