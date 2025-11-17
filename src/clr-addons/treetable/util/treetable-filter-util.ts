/**
 * Helper function to check if a primitive filter value is valid. Complex objects will always be valid.
 * This function is a fallback for primitive values, if a custom filter does not set the isActive method correctly.
 *
 * @param value the value to check
 */
export function isValidFilterValue(value: unknown): boolean {
  if (value == null || value === false) {
    return false;
  }
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  if (typeof value === 'number') {
    return !Number.isNaN(value);
  }
  return true;
}

/**
 * Comparator for distinctUntilChanged on the filter values stream.
 * Emits only when:
 *  - Array length changes, or
 *  - A primitive value at some index changes, or
 *  - Any element is non-primitive (object / function / array) -> always treated as changed.
 *
 * Rationale:
 * Objects/arrays are assumed to have unstable identity/content; any occurrence triggers a new emission.
 *
 * @param prev Previous emitted array of active filter values.
 * @param curr Current emitted array of active filter values.
 * @returns true if both arrays should be considered equal (no new emission), false otherwise.
 */
export function areFiltersDistinct(prev: unknown[], curr: unknown[]): boolean {
  if (prev === curr) {
    return true;
  }
  if (!Array.isArray(prev) || !Array.isArray(curr)) {
    return false;
  }
  if (prev.length !== curr.length) {
    return false;
  }

  const isPrimitive = (v: unknown): boolean => v == null || (typeof v !== 'object' && typeof v !== 'function');

  for (let i = 0; i < prev.length; i++) {
    const a = prev[i];
    const b = curr[i];

    // Non-primitive anywhere => force emission
    if (!isPrimitive(a) || !isPrimitive(b)) {
      return false;
    }

    if (!Object.is(a, b)) {
      return false;
    }
  }
  return true;
}
