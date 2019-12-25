/*
 * Copyright (c) 2018-2019 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

import { ClrDotPager } from './dot-pager';

describe('DotPagerComponent', () => {
  let component: ClrDotPager;
  let fixture: ComponentFixture<ClrDotPager>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClrDotPager],
      imports: [ClarityModule, FormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClrDotPager);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fire page change event', () => {
    spyOn(component.currentPageChange, 'emit');
    component.pages = 5;
    component.currentPage = 2;
    expect(component.currentPageChange.emit).toHaveBeenCalled();
  });
});
