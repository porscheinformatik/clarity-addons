/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

import { ClrNotification } from './notification';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CNotificationComponent', () => {
  let component: ClrNotification;
  let fixture: ComponentFixture<ClrNotification>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClrNotification],
      imports: [ClarityModule, FormsModule, BrowserAnimationsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClrNotification);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be opened', () => {
    component.open();
    expect(component.isOpen()).toBeTrue();
  });

  it('should be closed', () => {
    component.open();
    component.close();
    expect(component.isOpen()).toBeFalse();
  });
});
