/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { TestBed } from '@angular/core/testing';
import { Filters } from './filters';
import { ClrTreetableFilterInterface } from '../interfaces/filter-model';
import { Subject } from 'rxjs';

type Item = { id: number; name: string; value: number };

class StringContainsFilter implements ClrTreetableFilterInterface<Item, string> {
  private readonly changesSubject = new Subject<string>();
  readonly changes = this.changesSubject.asObservable();
  private search = '';

  set(search: string) {
    this.search = search;
    this.changesSubject.next(search);
  }

  isActive(): boolean {
    return this.search.trim().length > 0;
  }

  accepts(item: Item): boolean {
    if (!this.isActive()) {
      return true;
    }
    return item.name.toLowerCase().includes(this.search.toLowerCase());
  }
}

class GreaterThanFilter implements ClrTreetableFilterInterface<Item, number> {
  private readonly changesSubject = new Subject<number>();
  readonly changes = this.changesSubject.asObservable();
  private threshold: number | null = null;

  set(threshold: number | null) {
    this.threshold = threshold;
    this.changesSubject.next(threshold ?? NaN);
  }

  isActive(): boolean {
    return this.threshold != null;
  }

  accepts(item: Item): boolean {
    if (!this.isActive()) {
      return true;
    }
    return item.value > (this.threshold as number);
  }
}

describe('Filters<Item>', () => {
  let service: Filters<Item>;
  let textFilter: StringContainsFilter;
  let numberFilter: GreaterThanFilter;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [Filters] });
    service = TestBed.inject(Filters<Item>);
    textFilter = new StringContainsFilter();
    numberFilter = new GreaterThanFilter();
    TestBed.tick();
  });

  it('should have no active filters initially', () => {
    expect(service.activeFilters().length).toBe(0);
    expect(service.hasActiveFilters()).toBeFalse();
  });

  it('should register a filter and keep it inactive until value set', () => {
    service.register(textFilter);
    TestBed.tick();

    expect(service.activeFilters().length).toBe(0);
    expect(service.hasActiveFilters()).toBeFalse();
  });

  it('should activate filter after setting non-empty value', () => {
    service.register(textFilter);
    textFilter.set('alp');
    TestBed.tick();

    expect(service.activeFilters().length).toBe(1);
    expect(service.hasActiveFilters()).toBeTrue();
  });

  it('should deactivate filter after setting empty value', () => {
    service.register(textFilter);
    textFilter.set('x');
    TestBed.tick();

    textFilter.set(''); // empty -> inactive
    TestBed.tick();

    expect(service.activeFilters().length).toBe(0);
    expect(service.hasActiveFilters()).toBeFalse();
  });

  it('should emit only active filter values via changes$', () => {
    const emissions: unknown[][] = [];
    const sub = service.changes$.subscribe(v => emissions.push(v));

    service.register(textFilter);
    TestBed.tick(); // no active filters -> []

    textFilter.set('a');
    TestBed.tick();

    textFilter.set(''); // inactive
    TestBed.tick();

    textFilter.set('b');
    TestBed.tick();

    sub.unsubscribe();

    expect(emissions.length).toBe(4);
    expect(emissions[0]).toEqual([]);
    expect(emissions[1]).toEqual(['a']);
    expect(emissions[2]).toEqual([]);
    expect(emissions[3]).toEqual(['b']);
  });

  it('should not emit duplicate values (distinctUntilChanged)', () => {
    const emissions: unknown[][] = [];
    const sub = service.changes$.subscribe(v => emissions.push(v));
    service.register(textFilter);

    textFilter.set('x');
    TestBed.tick();
    textFilter.set('x'); // same value -> no new emission
    TestBed.tick();

    sub.unsubscribe();
    expect(emissions.length).toBe(2);
    expect(emissions[0]).toEqual([]);
    expect(emissions[1]).toEqual(['x']);
  });

  it('should handle multiple active filters and preserve order of registration', () => {
    service.register(textFilter);
    service.register(numberFilter);

    textFilter.set('a');
    numberFilter.set(10);
    TestBed.tick();

    const values = service.activeFilters();
    expect(values.length).toBe(2);

    const emissions: unknown[][] = [];
    const sub = service.changes$.subscribe(v => emissions.push(v));
    TestBed.tick();

    sub.unsubscribe();
    expect(emissions[0]).toEqual(['a', 10]);
  });

  it('should remove filter after unregister and update active filters', () => {
    const registeredText = service.register(textFilter);
    const registeredNumber = service.register(numberFilter);

    textFilter.set('z');
    numberFilter.set(5);
    TestBed.tick();

    expect(service.activeFilters().length).toBe(2);

    registeredText.unregister();
    TestBed.tick();

    expect(service.activeFilters().length).toBe(1);
    expect(service.activeFilters()[0]).toBe(registeredNumber.filter);
  });

  it('should ignore invalid primitive values (e.g. blank string) in emissions', () => {
    const emissions: unknown[][] = [];
    service.register(textFilter);
    const sub = service.changes$.subscribe(v => emissions.push(v));

    textFilter.set('   ');
    TestBed.tick();
    textFilter.set('ok');
    TestBed.tick();
    textFilter.set(''); // valid, since empty -> inactive
    TestBed.tick();

    sub.unsubscribe();
    expect(emissions.length).toBe(3);
    expect(emissions[0]).toEqual([]);
    expect(emissions[1]).toEqual(['ok']);
    expect(emissions[2]).toEqual([]);
  });
});
