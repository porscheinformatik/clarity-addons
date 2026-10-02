/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, DebugElement, Injectable } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import {
  ClrHistory,
  ClrHistoryHttpService,
  ClrHistoryModel,
  ClrHistoryModule,
  ClrHistoryNavigationService,
  ClrHistoryService,
  HISTORY_TOKEN,
} from './index';

@Injectable()
class DeferredHistoryNavigationService extends ClrHistoryNavigationService {
  pendingEntries: ClrHistoryModel[] = [];
  pendingDestinations: string[] = [];

  override navigate(entry: ClrHistoryModel, url = entry.url): void {
    this.pendingEntries.push(entry);
    this.pendingDestinations.push(url);
  }
}

@Component({
  selector: 'test-history-wrapper',
  template: `<clr-history [clrUsername]="'navigation-test'" [clrTenantId]="'1'"></clr-history>`,
  standalone: false,
})
class HistoryWrapper {}

@Component({
  template: `
    <test-history-wrapper></test-history-wrapper>
    <clr-history-pinned [clrUsername]="'navigation-test'" [clrTenantId]="'1'"></clr-history-pinned>
  `,
  providers: [
    DeferredHistoryNavigationService,
    { provide: ClrHistoryNavigationService, useExisting: DeferredHistoryNavigationService },
  ],
  standalone: false,
})
class HistoryNavigationHost {}

describe('History navigation provider scope', () => {
  const historyEntry: ClrHistoryModel = {
    username: 'navigation-test',
    tenantId: '1',
    pageName: 'invoice',
    title: 'Invoice',
    url: '/invoices/123?view=details#totals',
  };
  let fixture: ComponentFixture<HistoryNavigationHost>;
  let navigation: DeferredHistoryNavigationService;

  function openDropdown(): DebugElement {
    fixture.debugElement.query(By.css('[data-testid="history-trigger"]')).nativeElement.click();
    fixture.detectChanges();
    return fixture.debugElement.query(By.css('[data-testid="history-option-Invoice"]'));
  }

  beforeEach(async () => {
    const historyHttpService = jasmine.createSpyObj<ClrHistoryHttpService>('ClrHistoryHttpService', [
      'getHistory',
      'addHistoryEntry',
      'removeFromHistory',
    ]);
    historyHttpService.getHistory.and.returnValue(of([historyEntry]));

    await TestBed.configureTestingModule({
      imports: [ClrHistoryModule],
      declarations: [HistoryWrapper, HistoryNavigationHost],
      providers: [ClrHistoryService, { provide: HISTORY_TOKEN, useValue: historyHttpService }],
    }).compileComponents();

    TestBed.inject(ClrHistoryService).setHistoryPinned(historyEntry.username, true);
    fixture = TestBed.createComponent(HistoryNavigationHost);
    navigation = fixture.debugElement.injector.get(DeferredHistoryNavigationService);
    fixture.detectChanges();
  });

  it('lets a page-scoped provider defer dropdown navigation through a wrapper', () => {
    const currentUrl = window.location.href;
    const entry = openDropdown();
    const event = new MouseEvent('click', { button: 0, bubbles: true, cancelable: true });

    entry.nativeElement.dispatchEvent(event);

    expect(navigation.pendingEntries).toEqual([historyEntry]);
    expect(window.location.href).toBe(currentUrl);
    expect(event.defaultPrevented).toBeTrue();
    expect(TestBed.inject(ClrHistoryNavigationService)).not.toBe(navigation);
  });

  it('renders dropdown entries as native links with their original destinations', () => {
    const link: HTMLAnchorElement = openDropdown().nativeElement;

    expect(link.tagName).toBe('A');
    expect(link.getAttribute('href')).toBe('/invoices/123?view=details#totals');
    expect(link.textContent.trim()).toBe('Invoice');
    expect(link.classList.contains('dropdown-item')).toBeTrue();
    expect(link.hasAttribute('target')).toBeFalse();
  });

  for (const testCase of [
    { description: 'Control-click', init: { ctrlKey: true } },
    { description: 'Command-click', init: { metaKey: true } },
    { description: 'Shift-click', init: { shiftKey: true } },
    { description: 'Alt-click', init: { altKey: true } },
    { description: 'middle-click', init: { button: 1 } },
    { description: 'right-click', init: { button: 2 } },
  ]) {
    it(`preserves native dropdown ${testCase.description} behavior without requesting same-tab navigation`, () => {
      const entry = openDropdown();
      const event = new MouseEvent('click', { button: 0, cancelable: true, ...testCase.init });

      entry.triggerEventHandler('click', event);

      expect(event.defaultPrevented).toBeFalse();
      expect(navigation.pendingEntries).toEqual([]);
    });
  }

  it('does not navigate from a dropdown click already canceled by another handler', () => {
    const entry = openDropdown();
    const event = new MouseEvent('click', { button: 0, cancelable: true });
    event.preventDefault();

    entry.triggerEventHandler('click', event);

    expect(navigation.pendingEntries).toEqual([]);
  });

  it('keeps the existing dropdown same-tab destination under a document base URL', () => {
    const relativeEntry = { ...historyEntry, url: 'invoices/123?view=details#totals' };
    const history = fixture.debugElement.query(By.directive(ClrHistory)).injector.get(ClrHistory);
    history.historyElements$.next([relativeEntry]);
    const base = document.createElement('base');
    base.href = '/history-navigation-base/';
    document.head.prepend(base);

    try {
      const link = openDropdown();
      const event = new MouseEvent('click', { button: 0, cancelable: true });

      link.triggerEventHandler('click', event);

      expect(link.nativeElement.href).toBe(
        `${window.location.origin}/history-navigation-base/invoices/123?view=details#totals`
      );
      expect(navigation.pendingEntries).toEqual([relativeEntry]);
      expect(navigation.pendingDestinations).toEqual(['invoices/123?view=details#totals']);
      expect(event.defaultPrevented).toBeTrue();
    } finally {
      base.remove();
    }
  });

  for (const key of ['Enter', ' ']) {
    it(`delegates dropdown ${key === ' ' ? 'Space' : key} activation exactly once`, fakeAsync(() => {
      const entry = openDropdown();
      tick();

      entry.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
      tick();
      fixture.detectChanges();

      expect(navigation.pendingEntries).toEqual([historyEntry]);
      expect(fixture.debugElement.query(By.css('[data-testid="history-menu"]'))).toBeNull();
    }));
  }

  it('closes the dropdown after ordinary selection while keeping a deferred request on the current page', fakeAsync(() => {
    const currentUrl = window.location.href;
    const entry = openDropdown();
    tick();

    entry.nativeElement.click();
    tick();
    fixture.detectChanges();

    expect(navigation.pendingEntries).toEqual([historyEntry]);
    expect(window.location.href).toBe(currentUrl);
    expect(fixture.debugElement.query(By.css('[data-testid="history-menu"]'))).toBeNull();
  }));

  it('uses the same page-scoped provider for pinned history', () => {
    const currentUrl = window.location.href;
    const event = new MouseEvent('click', { button: 0, cancelable: true });

    fixture.debugElement
      .query(By.css('[data-testid="history-pinned-link-Invoice"]'))
      .triggerEventHandler('click', event);

    expect(navigation.pendingEntries).toEqual([historyEntry]);
    expect(event.defaultPrevented).toBeTrue();
    expect(window.location.href).toBe(currentUrl);
  });

  it('does not navigate when toggling the history pin', () => {
    fixture.debugElement.query(By.directive(ClrHistory)).injector.get(ClrHistory).togglePinHistory();

    expect(navigation.pendingEntries).toEqual([]);
  });

  it('keeps the dropdown pin action as a button without a link destination', () => {
    openDropdown();
    const pinButton: HTMLButtonElement = fixture.debugElement.query(
      By.css('[data-testid="history-pin-toggle"]')
    ).nativeElement;

    expect(pinButton.tagName).toBe('BUTTON');
    expect(pinButton.hasAttribute('href')).toBeFalse();
  });

  it('surfaces dropdown navigation errors without performing a hard redirect', () => {
    const currentUrl = window.location.href;
    const error = new Error('Navigation failed');
    spyOn(navigation, 'navigate').and.throwError(error);
    const history = fixture.debugElement.query(By.directive(ClrHistory)).injector.get(ClrHistory);

    expect(() => history.select(historyEntry)).toThrow(error);
    expect(window.location.href).toBe(currentUrl);
  });
});
