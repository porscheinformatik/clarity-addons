import { ClrTreetableState } from '../interfaces/treetable-state-model';

/**
 * Compares two sort state objects for equality.
 * Returns true if they are the same reference, both null/undefined,
 * or if both comparator and reverse flag match.
 *
 * @typeParam T - Type of the row data.
 * @param a - First sort state or null.
 * @param b - Second sort state or null.
 * @returns Whether both sort states are equal.
 */
function areSortStatesEqual<T>(a: ClrTreetableState<T>['sort'], b: ClrTreetableState<T>['sort']): boolean {
  if (a === b) {
    return true;
  }
  if (!a || !b) {
    return !a && !b;
  }
  return a.reverse === b.reverse && a.comparator === b.comparator;
}

/**
 * Performs a shallow comparison of two filter value arrays.
 * Treats undefined as an empty array. Order and reference equality of entries matter.
 *
 * @param a - First array of filter values or undefined.
 * @param b - Second array of filter values or undefined.
 * @returns Whether both arrays have the same length and elements.
 */
function areFilterValuesEqual(a?: unknown[], b?: unknown[]): boolean {
  const arrayA = a || [];
  const arrayB = b || [];
  if (arrayA.length !== arrayB.length) {
    return false;
  }
  for (let i = 0; i < arrayA.length; i++) {
    if (arrayA[i] !== arrayB[i]) {
      return false;
    }
  }
  return true;
}

/**
 * Compares two treetable states (sort and filters) for equality.
 *
 * @typeParam T - Type of the tree node values.
 * @param prev - Previous state.
 * @param curr - Current state.
 * @returns Whether both states are considered equal.
 */
export function areTreetableStatesEqual<T>(prev: ClrTreetableState<T>, curr: ClrTreetableState<T>): boolean {
  return areSortStatesEqual(prev.sort, curr.sort) && areFilterValuesEqual(prev.filters, curr.filters);
}
