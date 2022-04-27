/*
 * Copyright (c) 2018-2022 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClrBreadcrumb } from './breadcrumb';
import { RouterTestingModule } from '@angular/router/testing';

describe('ClrBreadcrumb', () => {
  let component: ClrBreadcrumb;
  let fixture: ComponentFixture<ClrBreadcrumb>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ClrBreadcrumb],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClrBreadcrumb);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
