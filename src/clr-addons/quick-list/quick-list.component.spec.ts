/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClrQuickListComponent } from './quick-list.component';
import { AddOptionComponent } from './add-option.component';
import { FormsModule } from '@angular/forms';
import { ClarityModule, ClrFormsModule } from '@clr/angular';

describe('ClrQuickListComponent', () => {
  let component: ClrQuickListComponent;
  let fixture: ComponentFixture<ClrQuickListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ClarityModule, ClrFormsModule],
      declarations: [ClrQuickListComponent, AddOptionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClrQuickListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
