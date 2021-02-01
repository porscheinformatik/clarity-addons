/*
 * Copyright (c) 2018-2021 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ClrHistory } from './history';
import { RouterTestingModule } from '@angular/router/testing';
import { ClrHistoryService } from './history.service';
import { ClrHistoryModel } from './history-model.interface';
import { ClarityModule } from '@clr/angular';

describe('ClrHistory', () => {
  let component: ClrHistory;
  let fixture: ComponentFixture<ClrHistory>;
  let historyService: ClrHistoryService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [ClrHistoryService],
        imports: [RouterTestingModule, ClarityModule],
        declarations: [ClrHistory],
      }).compileComponents();

      fixture = TestBed.createComponent(ClrHistory);
      historyService = fixture.debugElement.injector.get<ClrHistoryService>(ClrHistoryService);
      fixture.detectChanges();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ClrHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add', () => {
    const historyEntry: ClrHistoryModel = {
      username: 'admin',
      context: { ['applicationName']: 'TEST' },
      pageName: 'test1',
      title: 'test1',
      url: 'url1',
    };
    historyService.addHistoryEntry(historyEntry);
    expect(historyService.getHistory('admin', { ['applicationName']: 'TEST' }).length).toEqual(1);
  });

  it('reset', () => {
    const historyEntry: ClrHistoryModel = {
      username: 'admin',
      context: { ['applicationName']: 'TEST' },
      pageName: 'test2',
      title: 'test1',
      url: 'url1',
    };
    historyService.addHistoryEntry(historyEntry);
    historyService.resetHistory();
    expect(historyService.getHistory('admin', { ['applicationName']: 'TEST' }).length).toEqual(0);
  });
});
