/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';

import { ClrMainNavGroup } from './main-nav-group';

describe('ClrMainNavGroupComponent', () => {
  let component: ClrMainNavGroup;
  let fixture: ComponentFixture<ClrMainNavGroup>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClrMainNavGroup],
      imports: [ClarityModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClrMainNavGroup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
