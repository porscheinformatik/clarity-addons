/*
 * Copyright (c) 2018-2020 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClrHistory } from './history';
import { RouterTestingModule } from '@angular/router/testing';
import { ClrHistoryService } from './history.service';

describe('ClrHistory', () => {
  let component: ClrHistory;
  let fixture: ComponentFixture<ClrHistory>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ClrHistoryService],
      imports: [RouterTestingModule],
      declarations: [ClrHistory],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClrHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
