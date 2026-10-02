/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ClrHistoryModel } from './history-model.interface';
import { ClrHistoryNavigationService } from './history-navigation.service';

describe('ClrHistoryNavigationService', () => {
  const browserDocument = { location: { href: '' } };
  let service: ClrHistoryNavigationService;

  beforeEach(() => {
    browserDocument.location.href = 'https://example.com/current';
    TestBed.configureTestingModule({
      providers: [{ provide: DOCUMENT, useValue: browserDocument }],
    });
    service = TestBed.inject(ClrHistoryNavigationService);
  });

  for (const url of ['/invoices/123?view=details#totals', 'https://example.org/other-app', '#totals']) {
    it(`preserves default browser navigation to ${url}`, () => {
      const entry: ClrHistoryModel = {
        username: 'navigation-test',
        tenantId: '1',
        pageName: 'invoice',
        title: 'Invoice',
        url,
      };

      service.navigate(entry);

      expect(browserDocument.location.href).toBe(url);
    });
  }

  it('uses the resolved link destination without changing the original entry', () => {
    const entry: ClrHistoryModel = {
      username: 'navigation-test',
      tenantId: '1',
      pageName: 'invoice',
      title: 'Invoice',
      url: 'invoices/123?view=details#totals',
    };

    service.navigate(entry, 'https://example.com/base/invoices/123?view=details#totals');

    expect(browserDocument.location.href).toBe('https://example.com/base/invoices/123?view=details#totals');
    expect(entry.url).toBe('invoices/123?view=details#totals');
  });
});
