/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClrTreetableColumn } from './treetable-column';
import { ClrTreetableComparatorInterface } from './interfaces/comparator.interface';
import { Sort } from './providers';
import { ClrTreetableSortOrder } from './enums/sort-order.enum';

export const numberTestComparator: ClrTreetableComparatorInterface<number> = {
  compare: (a: number, b: number) => a - b,
};

describe('ClrTreetableColumn', () => {
  let component: ClrTreetableColumn<number>;
  let fixture: ComponentFixture<ClrTreetableColumn<number>>;
  let sortProvider: Sort<number>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClrTreetableColumn],
      providers: [Sort],
    });

    fixture = TestBed.createComponent(ClrTreetableColumn);
    component = fixture.componentInstance;
    sortProvider = TestBed.inject(Sort);
  });

  it('should initialize with default state', () => {
    expect(component.sortBy).toBeUndefined();
    expect(component.sortOrder).toBe(ClrTreetableSortOrder.UNSORTED);
    expect(component.sortDirection).toBeUndefined();
    expect(component.isSortable).toBeFalse();
  });

  it('should be sortable when sortBy is set', () => {
    component.sortBy = { compare: (a, b) => a - b };
    expect(component.isSortable).toBeTrue();
  });

  it('should sort in ascending order when sort is called', () => {
    component.sortBy = numberTestComparator;

    spyOn(sortProvider, 'toggle').and.callThrough();
    spyOn(component.clrTtSortOrderChange, 'emit');

    component.sort(false);

    expect(sortProvider.toggle).toHaveBeenCalledWith(numberTestComparator, false);
    expect(component.sortOrder).toBe(ClrTreetableSortOrder.ASC);
    expect(component.sortDirection).toBe('up');
    expect(component.clrTtSortOrderChange.emit).toHaveBeenCalledWith(ClrTreetableSortOrder.ASC);
  });

  it('should sort in descending order when sort is called with reverse', () => {
    component.sortBy = numberTestComparator;

    spyOn(sortProvider, 'toggle').and.callThrough();
    spyOn(component.clrTtSortOrderChange, 'emit');

    component.sort(true);

    expect(sortProvider.toggle).toHaveBeenCalledWith(numberTestComparator, true);
    expect(component.sortOrder).toBe(ClrTreetableSortOrder.DESC);
    expect(component.sortDirection).toBe('down');
    expect(component.clrTtSortOrderChange.emit).toHaveBeenCalledWith(ClrTreetableSortOrder.DESC);
  });

  it('should clear sorting when clrTtSortOrder is set to UNSORTED', () => {
    component.sortBy = numberTestComparator;
    component.sortOrder = ClrTreetableSortOrder.ASC;

    spyOn(sortProvider, 'clear').and.callThrough();
    spyOn(component.clrTtSortOrderChange, 'emit');

    component.sortOrder = ClrTreetableSortOrder.UNSORTED;

    expect(sortProvider.clear).toHaveBeenCalled();
    expect(component.sortOrder).toBe(ClrTreetableSortOrder.UNSORTED);
    expect(component.sortDirection).toBeNull();
    expect(component.clrTtSortOrderChange.emit).toHaveBeenCalledWith(ClrTreetableSortOrder.UNSORTED);
  });

  it('should update ariaSort correctly', () => {
    component.sortBy = numberTestComparator;

    component.sortOrder = ClrTreetableSortOrder.ASC;
    expect(component.ariaSort).toBe('ascending');

    component.sortOrder = ClrTreetableSortOrder.DESC;
    expect(component.ariaSort).toBe('descending');

    component.sortOrder = ClrTreetableSortOrder.UNSORTED;
    expect(component.ariaSort).toBe('none');
  });

  it('should react to external sorting changes', () => {
    component.sortBy = numberTestComparator;
    component.sortOrder = ClrTreetableSortOrder.ASC as ClrTreetableSortOrder;

    spyOn(component.clrTtSortOrderChange, 'emit');

    sortProvider.comparator = null;

    expect(component.sortOrder).toBe(ClrTreetableSortOrder.UNSORTED);
    expect(component.sortDirection).toBeNull();
    expect(component.clrTtSortOrderChange.emit).toHaveBeenCalledWith(ClrTreetableSortOrder.UNSORTED);
  });
});
