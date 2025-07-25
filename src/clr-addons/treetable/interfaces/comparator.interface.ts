/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

export interface ClrTreetableComparatorInterface<T> {
  compare(a: T, b: T): number;
}
