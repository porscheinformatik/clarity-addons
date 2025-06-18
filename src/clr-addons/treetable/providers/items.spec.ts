import { TestBed } from '@angular/core/testing';
import { Items } from './items';
import { Sort } from './sort';
import { Subject } from 'rxjs';

const unsortedItems1 = [3, 1, 2];
const unsortedItems2 = [5, 4, 6];

describe('Items', () => {
  let items: Items<number>;
  let mockSort: jasmine.SpyObj<Sort<number>>;
  let sortChangeSubject: Subject<void>;

  beforeEach(() => {
    sortChangeSubject = new Subject<void>();
    mockSort = jasmine.createSpyObj('Sort', ['compare'], {
      change: sortChangeSubject.asObservable(),
      comparator: null,
    });

    TestBed.configureTestingModule({
      providers: [{ provide: Sort, useValue: mockSort }, Items],
    });

    items = TestBed.inject(Items);
  });

  it('should initialize with empty arrays', () => {
    expect(items.all).toEqual([]);
    expect(items.displayed).toEqual([]);
  });

  it('should add items and emit changes', () => {
    const spy = jasmine.createSpy('changeSpy');
    items.change.subscribe(spy);

    items.addItems(unsortedItems1);
    items.addItems(unsortedItems2);

    expect(items.all).toEqual([unsortedItems1, unsortedItems2]);
    expect(items.displayed).toEqual([unsortedItems1, unsortedItems2]);

    expect(spy).toHaveBeenCalledWith([unsortedItems1]);
    expect(spy).toHaveBeenCalledWith([unsortedItems1, unsortedItems2]);
  });

  it('should sort items when sort changes and comparator is defined', () => {
    mockSort.compare.and.callFake((a: number, b: number) => a - b);

    Object.defineProperty(mockSort, 'comparator', {
      get: () => ({ compare: (a: number, b: number) => a - b }),
      set: _ => {},
    });

    items.addItems(unsortedItems1);
    items.addItems(unsortedItems2);

    sortChangeSubject.next();

    expect(items.displayed).toEqual([
      [1, 2, 3],
      [4, 5, 6],
    ]);
    expect(items.all).toEqual([unsortedItems1, unsortedItems2]);
  });

  it('should not sort items when sort changes and comparator is undefined', () => {
    items.addItems(unsortedItems1);
    items.addItems(unsortedItems2);

    sortChangeSubject.next();

    expect(items.displayed).toEqual([unsortedItems1, unsortedItems2]);
    expect(items.all).toEqual([unsortedItems1, unsortedItems2]);
  });

  it('should not sort items when sort changes and items have not been initialized', () => {
    sortChangeSubject.next();

    expect(items.displayed).toEqual([]);
    expect(items.all).toEqual([]);
  });
});
