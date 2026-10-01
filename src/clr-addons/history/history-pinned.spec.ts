/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { of } from 'rxjs';
import { ClrHistoryModel } from './history-model.interface';
import { ClrHistoryNavigationService } from './history-navigation.service';
import { ClrHistoryPinned } from './history-pinned';
import { ClrHistoryHttpService, HISTORY_TOKEN } from './history.http.service';
import { ClrHistoryService } from './history.service';

describe('ClrHistoryPinned navigation', () => {
  const historyEntry: ClrHistoryModel = {
    username: 'navigation-test',
    tenantId: '1',
    pageName: 'invoice',
    title: 'Invoice',
    url: '/invoices/123?view=details#totals',
  };
  let fixture: ComponentFixture<ClrHistoryPinned>;
  let selectedEntries: ClrHistoryModel[];
  let selectedDestinations: string[];

  beforeEach(async () => {
    const historyHttpService = jasmine.createSpyObj<ClrHistoryHttpService>('ClrHistoryHttpService', [
      'getHistory',
      'addHistoryEntry',
      'removeFromHistory',
    ]);
    historyHttpService.getHistory.and.returnValue(of([historyEntry]));
    selectedEntries = [];
    selectedDestinations = [];

    await TestBed.configureTestingModule({
      imports: [CommonModule, ClarityModule],
      declarations: [ClrHistoryPinned],
      providers: [
        ClrHistoryService,
        { provide: HISTORY_TOKEN, useValue: historyHttpService },
        {
          provide: ClrHistoryNavigationService,
          useValue: {
            navigate: (entry: ClrHistoryModel, url = entry.url) => {
              selectedEntries.push(entry);
              selectedDestinations.push(url);
            },
          },
        },
      ],
    }).compileComponents();

    TestBed.inject(ClrHistoryService).setHistoryPinned(historyEntry.username, true);
    fixture = TestBed.createComponent(ClrHistoryPinned);
    fixture.componentRef.setInput('clrUsername', historyEntry.username);
    fixture.componentRef.setInput('clrTenantId', historyEntry.tenantId);
    fixture.detectChanges();
  });

  it('prevents ordinary link navigation so an application can defer leaving the page', () => {
    const event = new MouseEvent('click', { button: 0, cancelable: true });

    fixture.debugElement.query(By.css('a')).triggerEventHandler('click', event);

    expect(event.defaultPrevented).toBeTrue();
    expect(selectedEntries).toEqual([historyEntry]);
  });

  it('keeps the original href available for native browser navigation', () => {
    expect(fixture.debugElement.query(By.css('a')).nativeElement.getAttribute('href')).toBe(
      '/invoices/123?view=details#totals'
    );
  });

  it('preserves the browser-resolved destination of relative links under a base URL', () => {
    const relativeEntry = { ...historyEntry, url: 'invoices/123?view=details#totals' };
    const base = document.createElement('base');
    base.href = '/history-navigation-base/';
    document.head.prepend(base);

    try {
      fixture.componentInstance.historyElements$.next([relativeEntry]);
      fixture.detectChanges();
      const event = new MouseEvent('click', { button: 0, cancelable: true });

      fixture.debugElement.query(By.css('a')).triggerEventHandler('click', event);

      expect(selectedEntries).toEqual([relativeEntry]);
      expect(selectedDestinations).toEqual([
        `${window.location.origin}/history-navigation-base/invoices/123?view=details#totals`,
      ]);
    } finally {
      base.remove();
    }
  });

  it('leaves the current page unchanged when the navigation provider defers the request', () => {
    const currentUrl = window.location.href;
    const event = new MouseEvent('click', { button: 0, cancelable: true });

    fixture.debugElement.query(By.css('a')).triggerEventHandler('click', event);

    expect(window.location.href).toBe(currentUrl);
    expect(selectedEntries).toEqual([historyEntry]);
  });

  it('delegates keyboard-generated link activation', () => {
    const event = new MouseEvent('click', { button: 0, detail: 0, cancelable: true });

    fixture.debugElement.query(By.css('a')).triggerEventHandler('click', event);

    expect(event.defaultPrevented).toBeTrue();
    expect(selectedEntries).toEqual([historyEntry]);
  });

  for (const testCase of [
    { description: 'Control-click', init: { ctrlKey: true } },
    { description: 'Command-click', init: { metaKey: true } },
    { description: 'Shift-click', init: { shiftKey: true } },
    { description: 'Alt-click', init: { altKey: true } },
    { description: 'middle-click', init: { button: 1 } },
    { description: 'right-click', init: { button: 2 } },
  ]) {
    it(`preserves native ${testCase.description} behavior`, () => {
      const event = new MouseEvent('click', { button: 0, cancelable: true, ...testCase.init });

      fixture.debugElement.query(By.css('a')).triggerEventHandler('click', event);

      expect(event.defaultPrevented).toBeFalse();
      expect(selectedEntries).toEqual([]);
    });
  }

  it('does not navigate when another handler already canceled the click', () => {
    const event = new MouseEvent('click', { button: 0, cancelable: true });
    event.preventDefault();

    fixture.debugElement.query(By.css('a')).triggerEventHandler('click', event);

    expect(selectedEntries).toEqual([]);
  });

  it('surfaces provider errors without falling back to native link navigation', () => {
    const error = new Error('Navigation failed');
    const currentUrl = window.location.href;
    const event = new MouseEvent('click', { button: 0, cancelable: true });
    spyOn(TestBed.inject(ClrHistoryNavigationService), 'navigate').and.throwError(error);

    expect(() => fixture.componentInstance.select(historyEntry, event)).toThrow(error);
    expect(event.defaultPrevented).toBeTrue();
    expect(window.location.href).toBe(currentUrl);
  });
});
