/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

import { ClrPager } from './pager';

describe('PagerComponent', () => {
  let component: ClrPager;
  let fixture: ComponentFixture<ClrPager>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClrPager],
      imports: [ClarityModule, FormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClrPager);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate last correctly', () => {
    component.totalItems = 20;
    component.pageSize = 5;
    expect(component.last).toBe(4);
  });

  it('should move to next page', () => {
    component.totalItems = 20;
    component.pageSize = 5;
    component.next();
    expect(component.page).toBe(2);
  });

  it('should move to previous page', () => {
    component.totalItems = 20;
    component.pageSize = 5;
    component.page = 4;
    component.previous();
    expect(component.page).toBe(3);
  });

  it('should fire page change event twice', () => {
    spyOn(component.pageChange, 'emit');
    component.totalItems = 20;
    component.pageSize = 5;
    component.next();
    expect(component.pageChange.emit).toHaveBeenCalledTimes(2);
  });
});
