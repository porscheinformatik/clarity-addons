/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { TreetableItemsDirective } from './treetable-items';
import { TreetableDataStateService, Sort } from './providers';

@Component({
  template: `
    <ul>
      <li *clrTtItems="let n of numbers; trackBy: trackBy">{{ n }}</li>
    </ul>
  `,
  standalone: false,
})
class TreetableItemsDirectiveTest {
  @ViewChild(TreetableItemsDirective) treetableItems: TreetableItemsDirective<number>;

  numbers = [5, 1, 3, 2, 4];

  trackBy = (_: number, item: number) => item;
}

describe('TreetableItemsDirective', () => {
  let component: TreetableItemsDirectiveTest;
  let fixture: ComponentFixture<TreetableItemsDirectiveTest>;
  let mockItems: jasmine.SpyObj<TreetableDataStateService<number>>;
  let mockSort: jasmine.SpyObj<Sort<number>>;

  beforeEach(() => {
    mockItems = jasmine.createSpyObj('Items', ['addItems']);
    mockSort = jasmine.createSpyObj('Sort', ['compare', 'comperator']);

    TestBed.configureTestingModule({
      declarations: [TreetableItemsDirective, TreetableItemsDirectiveTest],
      providers: [
        { provide: TreetableDataStateService, useValue: mockItems },
        { provide: Sort, useValue: mockSort },
      ],
    });

    fixture = TestBed.createComponent(TreetableItemsDirectiveTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set when clrTtItems is updated', () => {
    component.treetableItems.clrTtItems = component.numbers;

    expect(mockItems.addItems).toHaveBeenCalledWith(component.numbers);
    expect(component.treetableItems.clrTtItems).toEqual(component.numbers);
  });
  it('should set and sort when clrTtItems is updated', () => {
    mockSort.compare.and.callFake((a: number, b: number) => a - b);

    Object.defineProperty(mockSort, 'comparator', {
      get: () => ({ compare: (a: number, b: number) => a - b }),
      set: _ => {},
    });

    component.treetableItems.clrTtItems = component.numbers;

    const sorted = [1, 2, 3, 4, 5];
    expect(mockItems.addItems).toHaveBeenCalledWith(sorted);
    expect(component.treetableItems.clrTtItems).toEqual(sorted);
  });

  it('should not set items if input is null or empty', () => {
    component.numbers = [];
    component.treetableItems.clrTtItems = component.numbers;

    expect(mockItems.addItems).not.toHaveBeenCalled();
    expect(component.treetableItems.clrTtItems).toEqual([]);
  });

  it('should update trackBy function', () => {
    const trackByFn = (index: number, _: number) => index;

    component.treetableItems.trackBy = trackByFn;

    expect(component.treetableItems['_iterableProxy'].ngForTrackBy).toBe(trackByFn);
  });

  it('should update ngForOf when items changes', () => {
    const newItems = [10, 20, 30];

    component.treetableItems.clrTtItems = newItems;
    fixture.detectChanges();

    expect(component.treetableItems['_iterableProxy']['_ngForOf']).toEqual(newItems);
  });
});
