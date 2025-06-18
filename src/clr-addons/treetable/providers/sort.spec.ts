import { Sort } from './sort';
import { ClrTreetableComparatorInterface } from '../interfaces/comparator.interface';

describe('Sort', () => {
  let sort: Sort<number>;
  let comparator: ClrTreetableComparatorInterface<number>;

  beforeEach(() => {
    sort = new Sort<number>();
    comparator = {
      compare: (a: number, b: number) => a - b,
    };
  });

  it('should initialize with default state', () => {
    expect(sort.comparator).toBeUndefined();
    expect(sort.reverse).toBeFalse();
  });

  it('should set comparator and emit change', () => {
    const changeSpy = jasmine.createSpy('changeSpy');
    sort.change.subscribe(changeSpy);

    sort.comparator = comparator;
    expect(sort.comparator).toBe(comparator);
  });

  it('should toggle sorting order', done => {
    sort.comparator = comparator;

    sort.change.subscribe(currentSort => {
      expect(currentSort.reverse).toBeTrue();
      done();
    });

    sort.toggle(comparator);
    expect(sort.reverse).toBeTrue();
  });

  it('should toggle sorting order with forceReverse', done => {
    sort.comparator = comparator;

    sort.change.subscribe(currentSort => {
      expect(currentSort.reverse).toBeTrue();
      done();
    });

    sort.toggle(comparator, true);
    expect(sort.reverse).toBeTrue();
  });

  it('should clear sorting and emit change', done => {
    sort.comparator = comparator;

    sort.change.subscribe(currentSort => {
      expect(currentSort.comparator).toBeNull();
      done();
    });

    sort.clear();
    expect(sort.comparator).toBeNull();
  });

  it('should compare values correctly in ascending order', () => {
    sort.comparator = comparator;
    expect(sort.compare(1, 2)).toBeLessThan(0);
    expect(sort.compare(2, 1)).toBeGreaterThan(0);
    expect(sort.compare(1, 1)).toBe(0);
  });

  it('should compare values correctly in descending order', () => {
    sort.comparator = comparator;
    sort.reverse = true;
    expect(sort.compare(1, 2)).toBeGreaterThan(0);
    expect(sort.compare(2, 1)).toBeLessThan(0);
    expect(sort.compare(1, 1)).toBe(0);
  });
});
