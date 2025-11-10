/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Selection } from './selection';
import { TreetableDataStateService } from './treetable-data-state.service';
import { SelectionType } from '../enums/selection-type';

describe('Selection', () => {
  let selection: Selection<number>;
  let mockItems: jasmine.SpyObj<TreetableDataStateService<number>>;

  beforeEach(() => {
    mockItems = jasmine.createSpyObj('Items', ['displayed'], { displayed: [] });

    TestBed.configureTestingModule({
      providers: [{ provide: TreetableDataStateService, useValue: mockItems }, Selection],
    });

    selection = TestBed.inject(Selection);
  });

  it('should initialize with no selection', () => {
    expect(selection.current).toBeUndefined();
    expect(selection.selectionType).toBe(SelectionType.None);
  });

  it('should select and deselect individual items', () => {
    selection.selectionType = SelectionType.Multi;

    Object.defineProperty(mockItems, 'displayed', {
      get: () => [
        [1, 2],
        [3, 4],
      ],
    });

    selection.setSelected(1, true);
    expect(selection.current).toEqual([1]);

    selection.setSelected(3, true);
    expect(selection.current).toEqual([1, 3]);

    selection.setSelected(1, false);
    expect(selection.current).toEqual([3]);
  });

  it('should toggle all items', () => {
    selection.selectionType = SelectionType.Multi;

    Object.defineProperty(mockItems, 'displayed', {
      get: () => [
        [1, 2],
        [3, 4],
      ],
    });
    selection.toggleAll();

    expect(selection.current).toEqual([1, 2, 3, 4]);

    selection.toggleAll();
    expect(selection.current).toEqual([]);
  });

  it('should emit changes when selection is updated', fakeAsync(() => {
    const changeSpy = jasmine.createSpy('changeSpy');
    selection.change.subscribe(changeSpy);

    selection.selectionType = SelectionType.Multi;

    Object.defineProperty(mockItems, 'displayed', {
      get: () => [
        [1, 2],
        [3, 4],
      ],
    });

    selection.setSelected(1, true);
    selection.setSelected(3, true);

    tick(); // simulate async passage of time for debounce

    expect(changeSpy).toHaveBeenCalledWith([1, 3]);
  }));

  it('should detect if all displayed items are selected', () => {
    selection.selectionType = SelectionType.Multi;

    Object.defineProperty(mockItems, 'displayed', {
      get: () => [
        [1, 2],
        [3, 4],
      ],
    });

    selection.toggleAll();

    expect(selection.isAllSelected()).toBeTrue();

    selection.setSelected(1, false);

    expect(selection.isAllSelected()).toBeFalse();
  });
});
