/*
 * Copyright (c) 2018-2022 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClrLetterAvatar } from './letter-avatar';

describe('LetterAvatarComponent', () => {
  let component: ClrLetterAvatar;
  let fixture: ComponentFixture<ClrLetterAvatar>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ClrLetterAvatar],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClrLetterAvatar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('default name', () => {
    component.name = 'Test User';
    expect(component.getInitials()).toEqual('TU');
  });

  it('single name', () => {
    component.name = 'Test';
    expect(component.getInitials()).toEqual('T');
  });

  it('long name', () => {
    component.name = 'Walter White Edson Arantes do Nascimento';
    expect(component.getInitials()).toEqual('WW');
  });

  it('name with numbers', () => {
    component.name = '11 22 33 44 55';
    expect(component.getInitials()).toEqual('12');
  });

  it('empty name', () => {
    component.name = '';
    expect(component.getInitials()).toEqual('');
  });
});
