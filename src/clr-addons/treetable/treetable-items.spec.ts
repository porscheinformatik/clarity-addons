import type { MockedObject } from 'vitest';
/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { TreetableItemsDirective } from './treetable-items';
import { TreetableDataStateService } from './providers';
import { ClrTreetableRecursionService } from './providers/treetable-recursion.service';

type Item = {
  id: number;
  subItems: Item[];
};

@Component({
  template: `
    <ul>
      <li #template *clrTtItems="let item of items(); getChildren: getSubItems">{{ item }}</li>
    </ul>
  `,
  standalone: false,
})
class TreetableItemsDirectiveTest {
  items = signal<Item[]>([
    { id: 1, subItems: [] },
    { id: 2, subItems: [] },
  ]);
  getSubItems = (item: Item): Item[] => item?.subItems ?? [];
}

describe('TreetableItemsDirective', () => {
  let component: TreetableItemsDirectiveTest;
  let fixture: ComponentFixture<TreetableItemsDirectiveTest>;

  let mockDataState: Partial<MockedObject<TreetableDataStateService<Item>>>;
  let mockRecursion: Partial<MockedObject<ClrTreetableRecursionService<Item>>>;

  beforeEach(() => {
    mockDataState = {
      setDataSource: vi.fn().mockName('TreetableDataStateService.setDataSource'),
    };
    mockRecursion = {
      setTemplate: vi.fn().mockName('ClrTreetableRecursionService.setTemplate'),
    };

    TestBed.configureTestingModule({
      declarations: [TreetableItemsDirective, TreetableItemsDirectiveTest],
      providers: [
        { provide: TreetableDataStateService, useValue: mockDataState },
        { provide: ClrTreetableRecursionService, useValue: mockRecursion },
      ],
    });

    fixture = TestBed.createComponent(TreetableItemsDirectiveTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should setup data source and recursion service correctly', () => {
    const expectedItemDataSource = component.items();
    const expectedGetChildrenDataSource = component.getSubItems;

    expect(mockDataState.setDataSource).toHaveBeenCalledWith(expectedItemDataSource, expectedGetChildrenDataSource);
  });
});
