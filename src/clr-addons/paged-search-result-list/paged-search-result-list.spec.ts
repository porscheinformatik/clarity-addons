/*
 * Copyright (c) 2018-2021 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

import { ClrPagedSearchResultList } from './paged-search-result-list';
import { ClrPagerModule } from '../pager';

describe('PagedSearchResultListComponent', () => {
  let component: ClrPagedSearchResultList;
  let fixture: ComponentFixture<ClrPagedSearchResultList>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ClrPagedSearchResultList],
        imports: [ClarityModule, FormsModule, ClrPagerModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ClrPagedSearchResultList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
