/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Observable } from 'rxjs';

/**
 * Describes a filter that can be registered with the Treetable.
 * @template T The type of the item in the treetable.
 * @template S The type of the filter's value/state (e.g., string, number, etc.).
 */
export interface ClrTreetableFilterInterface<T, S = unknown> {
  /**
   * An observable that emits whenever the filter's state changes.
   */
  readonly changes: Observable<S>;

  /**
   * Checks if the filter is currently active.
   * @returns `true` if the filter is active, otherwise `false`.
   */
  isActive(): boolean;

  /**
   * Determines if a given item passes the filter's criteria.
   * @param item The item to test.
   * @returns `true` if the item is accepted, otherwise `false`.
   */
  accepts(item: T): boolean;

  /**
   * Checks if the filter is the same as another. Handy for testing.
   * @param other The filter to test equality against.
   * @returns `true` if the filters are equal, otherwise `false`.
   */
  equals?(other: ClrTreetableFilterInterface<T>): boolean;
}

/**
 * A function type that defines how to filter an item of a Treetable based on a string search value.
 * @template T The type of the item in the treetable.
 * @param item The item to be tested against the filter.
 * @param search The string value used for filtering.
 * @returns `true` if the item matches the filter criteria, otherwise `false`.
 */
export type ClrTreetableStringFilterFunction<T> = (item: T, search: string) => boolean;
