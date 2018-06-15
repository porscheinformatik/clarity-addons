/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

import { ClrViewEditSection } from './view-edit-section';

describe('ViewEditSectionComponent', () => {
  let component: ClrViewEditSection;
  let fixture: ComponentFixture<ClrViewEditSection>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClrViewEditSection],
      imports: [ClarityModule, FormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClrViewEditSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
