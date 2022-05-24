/*
 * Copyright (c) 2018-2022 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ClrIconModule } from '@clr/angular';

import { ClrBrandAvatar } from './brand-avatar';

describe('BrandAvatarComponent', () => {
  let component: ClrBrandAvatar;
  let fixture: ComponentFixture<ClrBrandAvatar>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ClrIconModule],
      declarations: [ClrBrandAvatar],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClrBrandAvatar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('clean brand name should be uppercase', () => {
    expect(ClrBrandAvatar.getCleanBrandName('test')).toEqual('TEST');
  });

  it('clean brand name should ignore spaces', () => {
    expect(ClrBrandAvatar.getCleanBrandName('TE   S T')).toEqual('TEST');
  });

  it('clean brand name should ignore hyphens', () => {
    expect(ClrBrandAvatar.getCleanBrandName('T-E-S-T')).toEqual('TEST');
  });

  it('clean brand name should ignore underscores', () => {
    expect(ClrBrandAvatar.getCleanBrandName('T_E_S_T')).toEqual('TEST');
  });

  it('clean brand name should ignore Š', () => {
    expect(ClrBrandAvatar.getCleanBrandName('T_E_Š_T')).toEqual('TEST');
  });

  it('clean brand name should abbreviate VOLKSWAGEN', () => {
    expect(ClrBrandAvatar.getCleanBrandName('VOLKSWAGEN')).toEqual('VW');
  });

  it('clean brand name should abbreviate NUTZFAHRZEUGE', () => {
    expect(ClrBrandAvatar.getCleanBrandName('NUTZFAHRZEUGE')).toEqual('N');
  });

  it('clean brand name should abbreviate DAS WELTAUTO', () => {
    expect(ClrBrandAvatar.getCleanBrandName('DAS WELTAUTO')).toEqual('DWA');
  });
});
