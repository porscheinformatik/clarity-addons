/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClrIconAvatar } from './icon-avatar';

describe('IconAvatarComponent', () => {
  let component: ClrIconAvatar;
  let fixture: ComponentFixture<ClrIconAvatar>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ClrIconAvatar],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClrIconAvatar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should use default shape if none provided', () => {
    component.shape = undefined;
    expect(component.getShape()).toBe('user');
  });

  it('should use provided shape', () => {
    component.shape = 'check';
    expect(component.getShape()).toBe('check');
  });

  it('should use default size if none provided', () => {
    component.size = undefined as any;
    expect(component.size).toBeUndefined();
  });

  it('should apply width and height styles', () => {
    component.size = 40;
    fixture.detectChanges();
    component.ngAfterViewInit();
    const el = component.avatarElement.nativeElement;
    expect(el.style.width).toBe('40px');
    expect(el.style.height).toBe('40px');
  });
});
