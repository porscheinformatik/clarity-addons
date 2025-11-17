/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ClrTreetableComparatorInterface } from './comparator.interface';

/**
 * Represents the current state of the Treetable.
 *
 * @template T Type of the data elements.
 * @template F Type of the filter return value, default is <code>unknown</code>.
 * @property sort Current sort state or null, if no sort is active.
 *  - comparator, the comparator used for sorting.
 *  - reverse true, if it should be sorted in descending order.
 *  Default: null.
 * @property filters Array with the current active filter values. Empty if no filters are active.
 *  Default: [].
 */
export interface ClrTreetableState<T, F = unknown> {
  sort: { comparator: ClrTreetableComparatorInterface<T>; reverse: boolean } | null;
  filters: F[];
}
