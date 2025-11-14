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
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import SpyObj = jasmine.SpyObj;

type TestObject = { id: string; number: number };

describe('ClrTreetableColumn', () => {
  let component: ClrTreetableColumn<TestObject>;
  let fixture: ComponentFixture<ClrTreetableColumn<TestObject>>;
  let sortProvider: Sort<TestObject>;

  let sortProviderToggleSpy: SpyObj<unknown>;
  let sortOrderChangedSpy: SpyObj<unknown>;

  const ComponentInputs = { sortBy: 'clrTtSortBy', sortOrder: 'clrTtSortOrder' } as const;
  const testComparator: ClrTreetableComparatorInterface<TestObject> = {
    compare: (a: TestObject, b: TestObject) => a?.number - b?.number,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClrTreetableColumn],
      providers: [Sort],
    });

    sortProvider = TestBed.inject(Sort);

    fixture = TestBed.createComponent(ClrTreetableColumn<TestObject>);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();

    sortProviderToggleSpy = spyOn(sortProvider, 'toggle').and.callThrough();
    sortOrderChangedSpy = spyOn(component.clrTtSortOrderChange, 'emit');
  });

  function getSortButton(): DebugElement | null {
    return fixture.debugElement.query(By.css('[data-testId="clrTtSortButton"]'));
  }

  function getSortIndicator(): DebugElement | null {
    return fixture.debugElement.query(By.css('[data-testId="clrTtSortIndicator"]'));
  }

  it(`should initialize with default state, if ${ComponentInputs.sortBy} is not set`, () => {
    const sortIcon: HTMLElement = fixture.nativeElement.querySelector('.sort-icon');

    expect(component).toBeDefined();
    expect(component.clrTtSortBy()).toBeNull();
    expect(component.clrTtSortOrder()).toBe(ClrTreetableSortOrder.UNSORTED);
    expect(sortOrderChangedSpy).not.toHaveBeenCalled();
    expect(sortIcon).toBeFalsy();
  });

  it(`should be sortable when ${ComponentInputs.sortBy} is set`, async () => {
    fixture.componentRef.setInput(ComponentInputs.sortBy, { compare: (a: number, b: number) => a - b });
    await fixture.whenStable();

    const sortBtn = getSortButton();

    expect(component.clrTtSortOrder()).toBe(ClrTreetableSortOrder.UNSORTED);
    expect(sortOrderChangedSpy).not.toHaveBeenCalled();
    expect(sortBtn).toBeTruthy();
  });

  it(`should sort in ascending order when sort button is clicked and no ${ComponentInputs.sortOrder} is provided`, async () => {
    fixture.componentRef.setInput(ComponentInputs.sortBy, testComparator);
    await fixture.whenStable();

    const sortBtn = getSortButton();
    sortBtn.nativeElement.click();
    await fixture.whenStable();

    const sortIndicator = getSortIndicator();

    expect(sortProviderToggleSpy).toHaveBeenCalledWith(testComparator, undefined);
    expect(sortIndicator).toBeDefined();
    expect(sortIndicator.nativeElement.direction).toBe('up');
    expect(sortOrderChangedSpy).toHaveBeenCalledWith(ClrTreetableSortOrder.ASC);
  });

  it(`should sort in ascending order when ${ComponentInputs.sortOrder} is provided with ascending`, async () => {
    fixture.componentRef.setInput(ComponentInputs.sortBy, testComparator);
    fixture.componentRef.setInput(ComponentInputs.sortOrder, ClrTreetableSortOrder.ASC);
    await fixture.whenStable();

    const sortBtn = getSortButton();
    const sortIndicator = getSortIndicator();

    expect(sortProviderToggleSpy).toHaveBeenCalledWith(testComparator, false);
    expect(sortBtn).toBeDefined();
    expect(sortIndicator).toBeDefined();
    expect(sortIndicator.nativeElement.direction).toBe('up');
    expect(sortOrderChangedSpy).toHaveBeenCalledWith(ClrTreetableSortOrder.ASC);
  });

  it(`should sort in descending order when sort button is clicked and ${ComponentInputs.sortOrder} is ascending`, async () => {
    fixture.componentRef.setInput(ComponentInputs.sortBy, testComparator);
    fixture.componentRef.setInput(ComponentInputs.sortOrder, ClrTreetableSortOrder.ASC);
    await fixture.whenStable();

    const sortBtn = getSortButton();
    sortBtn.nativeElement.click();
    await fixture.whenStable();

    const sortIndicator = getSortIndicator();

    expect(sortProviderToggleSpy).toHaveBeenCalledWith(testComparator, undefined);
    expect(sortIndicator).toBeDefined();
    expect(sortIndicator.nativeElement.direction).toBe('down');
    expect(sortOrderChangedSpy).toHaveBeenCalledWith(ClrTreetableSortOrder.DESC);
  });

  it(`should sort in descending order when ${ComponentInputs.sortOrder} is provided with descending`, async () => {
    fixture.componentRef.setInput(ComponentInputs.sortBy, testComparator);
    fixture.componentRef.setInput(ComponentInputs.sortOrder, ClrTreetableSortOrder.DESC);
    await fixture.whenStable();

    const sortBtn = getSortButton();
    const sortIndicator = getSortIndicator();

    expect(sortProviderToggleSpy).toHaveBeenCalledWith(testComparator, true);
    expect(sortBtn).toBeDefined();
    expect(sortIndicator).toBeDefined();
    expect(sortIndicator.nativeElement.direction).toBe('down');
    expect(sortOrderChangedSpy).toHaveBeenCalledWith(ClrTreetableSortOrder.DESC);
  });

  it(`should sort in ascending order when sort button is clicked and ${ComponentInputs.sortOrder} is descending`, async () => {
    fixture.componentRef.setInput(ComponentInputs.sortBy, testComparator);
    fixture.componentRef.setInput(ComponentInputs.sortOrder, ClrTreetableSortOrder.DESC);
    await fixture.whenStable();

    const sortBtn = getSortButton();
    sortBtn.nativeElement.click();
    await fixture.whenStable();

    const sortIndicator = getSortIndicator();

    expect(sortProviderToggleSpy).toHaveBeenCalledWith(testComparator, undefined);
    expect(sortIndicator).toBeDefined();
    expect(sortIndicator.nativeElement.direction).toBe('up');
    expect(sortOrderChangedSpy).toHaveBeenCalledWith(ClrTreetableSortOrder.ASC);
  });

  it(`should clear sorting when ${ComponentInputs.sortOrder} is set to UNSORTED`, async () => {
    const sortProviderClearSpy = spyOn(sortProvider, 'clear').and.callThrough();

    fixture.componentRef.setInput(ComponentInputs.sortBy, testComparator);
    fixture.componentRef.setInput(ComponentInputs.sortOrder, ClrTreetableSortOrder.ASC);
    await fixture.whenStable();

    fixture.componentRef.setInput(ComponentInputs.sortOrder, ClrTreetableSortOrder.UNSORTED);
    await fixture.whenStable();

    const sortBtn = getSortButton();
    const sortIndicator = getSortIndicator();

    expect(sortProviderClearSpy).toHaveBeenCalled();
    expect(component.clrTtSortOrder()).toBe(ClrTreetableSortOrder.UNSORTED);
    expect(sortBtn).toBeDefined();
    expect(sortIndicator).toBeNull();
    expect(sortOrderChangedSpy).toHaveBeenCalledWith(ClrTreetableSortOrder.UNSORTED);
  });

  it('should update aria sort correctly', async () => {
    fixture.componentRef.setInput(ComponentInputs.sortBy, testComparator);
    fixture.componentRef.setInput(ComponentInputs.sortOrder, ClrTreetableSortOrder.ASC);
    await fixture.whenStable();

    const componentElement: HTMLElement = fixture.nativeElement;
    expect(componentElement.ariaSort).toBe('ascending');

    fixture.componentRef.setInput(ComponentInputs.sortOrder, ClrTreetableSortOrder.DESC);
    await fixture.whenStable();
    expect(componentElement.ariaSort).toBe('descending');

    fixture.componentRef.setInput(ComponentInputs.sortOrder, ClrTreetableSortOrder.UNSORTED);
    await fixture.whenStable();
    expect(componentElement.ariaSort).toBe('none');
  });
});
