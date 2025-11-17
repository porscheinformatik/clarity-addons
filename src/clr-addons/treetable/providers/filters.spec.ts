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
    TestBed.flushEffects();
  });

  it('should have no active filters initially', () => {
    expect(service.activeFilters().length).toBe(0);
    expect(service.hasActiveFilters()).toBeFalse();
  });

  it('should register a filter and keep it inactive until value set', () => {
    service.register(textFilter);
    TestBed.flushEffects();

    expect(service.activeFilters().length).toBe(0);
    expect(service.hasActiveFilters()).toBeFalse();
  });

  it('should activate filter after setting non-empty value', () => {
    service.register(textFilter);
    textFilter.set('alp');
    TestBed.flushEffects();

    expect(service.activeFilters().length).toBe(1);
    expect(service.hasActiveFilters()).toBeTrue();
  });

  it('should deactivate filter after setting empty value', () => {
    service.register(textFilter);
    textFilter.set('x');
    TestBed.flushEffects();

    textFilter.set(''); // empty -> inactive
    TestBed.flushEffects();

    expect(service.activeFilters().length).toBe(0);
    expect(service.hasActiveFilters()).toBeFalse();
  });

  it('should emit only active filter values via changes$', () => {
    const emissions: unknown[][] = [];
    const sub = service.changes$.subscribe(v => emissions.push(v));

    service.register(textFilter);
    TestBed.flushEffects(); // no active filters -> []

    textFilter.set('a');
    TestBed.flushEffects();

    textFilter.set(''); // inactive
    TestBed.flushEffects();

    textFilter.set('b');
    TestBed.flushEffects();

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
    TestBed.flushEffects();
    textFilter.set('x'); // same value -> no new emission
    TestBed.flushEffects();

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
    TestBed.flushEffects();

    const values = service.activeFilters();
    expect(values.length).toBe(2);

    const emissions: unknown[][] = [];
    const sub = service.changes$.subscribe(v => emissions.push(v));
    TestBed.flushEffects();

    sub.unsubscribe();
    expect(emissions[0]).toEqual(['a', 10]);
  });

  it('should remove filter after unregister and update active filters', () => {
    const registeredText = service.register(textFilter);
    const registeredNumber = service.register(numberFilter);

    textFilter.set('z');
    numberFilter.set(5);
    TestBed.flushEffects();

    expect(service.activeFilters().length).toBe(2);

    registeredText.unregister();
    TestBed.flushEffects();

    expect(service.activeFilters().length).toBe(1);
    expect(service.activeFilters()[0]).toBe(registeredNumber.filter);
  });

  it('should ignore invalid primitive values (e.g. blank string) in emissions', () => {
    const emissions: unknown[][] = [];
    service.register(textFilter);
    const sub = service.changes$.subscribe(v => emissions.push(v));

    textFilter.set('   ');
    TestBed.flushEffects();
    textFilter.set('ok');
    TestBed.flushEffects();
    textFilter.set(''); // valid, since empty -> inactive
    TestBed.flushEffects();

    sub.unsubscribe();
    expect(emissions.length).toBe(3);
    expect(emissions[0]).toEqual([]);
    expect(emissions[1]).toEqual(['ok']);
    expect(emissions[2]).toEqual([]);
  });
});
