/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { ClrHistoryHttpImplService } from './history.http.impl.service';
import { HISTORY_TOKEN } from './history.http.service';
import { provideClrHistory } from './history.providers';
import { ClrHistoryService } from './history.service';

describe('provideClrHistory', () => {
  it('provides the service and the default backend without importing a module', () => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideClrHistory('/api/history')] });

    expect(TestBed.inject(ClrHistoryService)).toBeTruthy();
    expect(TestBed.inject(HISTORY_TOKEN)).toBeInstanceOf(ClrHistoryHttpImplService);
  });
});
