/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { Component, signal } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ClrTreetableColumn, ClrTreetableModule } from '@porscheinformatik/clr-addons';
import { ClrTreetableStringFilter } from './treetable-string-filter';

type Item = { name: string };

@Component({
  template: `
    <clr-treetable>
      <clr-tt-column>
        {{ columnTitle() }}

        <clr-tt-string-filter
          [clrTtStringFilter]="filterFn"
          [clrTtFilterLabel]="label()"
          [clrTtFilterValue]="initialValue()"
        ></clr-tt-string-filter>
      </clr-tt-column>
    </clr-treetable>
  `,
  standalone: false,
})
class HostTestComponent {
  readonly label = signal<string>('');
  readonly initialValue = signal<string>('');
  readonly columnTitle = signal<string>('Name');
  filterFn = (item: Item, search: string) => item.name.toLowerCase().includes(search);
}

describe('ClrTreetableStringFilter', () => {
  const TEST_IDS = {
    columnFilterBtn: '[data-testId="clrTtToggleFilterButton"]',
    stringFilterInput: '[data-testId="clrTtStringFilterInput"]',
    stringFilterClearBtn: '[data-testId="clrTtStringFilterClearBtn"]',
  } as const;

  const DEBOUNCE: number = 300 as const;

  let fixture: ComponentFixture<HostTestComponent>;
  let host: HostTestComponent;

  const openFilterPopover = () => {
    const toggleBtn: HTMLButtonElement = fixture.debugElement.query(By.css(TEST_IDS.columnFilterBtn)).nativeElement;
    toggleBtn.click();
    fixture.detectChanges();
  };

  const queryFilterComponent = (): ClrTreetableStringFilter<Item> | undefined => {
    const debugEl = fixture.debugElement.query(By.directive(ClrTreetableStringFilter));
    return debugEl?.componentInstance;
  };

  const queryInput = (): HTMLInputElement => document.querySelector(TEST_IDS.stringFilterInput) as HTMLInputElement;

  const queryClearBtn = (): HTMLButtonElement =>
    document.querySelector(TEST_IDS.stringFilterClearBtn) as HTMLButtonElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HostTestComponent],
      imports: [ClarityModule, FormsModule, ClrTreetableModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostTestComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not render filter input before toggle click', () => {
    const input = queryInput();
    expect(input).toBeNull();
  });

  it('should render filter input in portal after toggle click (not inside column)', () => {
    openFilterPopover();
    const input = queryInput();
    expect(input).toBeTruthy();

    const columnEl: HTMLElement = fixture.debugElement.query(By.directive(ClrTreetableColumn)).nativeElement;
    expect(columnEl.contains(input)).toBeFalse();
  });

  it('should create filter component after opening', () => {
    openFilterPopover();
    const filterComponent = queryFilterComponent();
    expect(filterComponent).toBeDefined();
  });

  it('should be inactive initially without value', () => {
    openFilterPopover();
    const filterComponent = queryFilterComponent();
    expect(filterComponent.isActive()).toBeFalse();
  });

  it('should emit initial value once after opening and be active', fakeAsync(() => {
    host.initialValue.set('hello');
    fixture.detectChanges();

    openFilterPopover();
    const filterComponent = queryFilterComponent();

    const emissions: string[] = [];
    const sub = filterComponent.changes.subscribe(v => emissions.push(v));

    tick(DEBOUNCE);
    TestBed.flushEffects();

    expect(emissions.length).toBe(1);
    expect(emissions[0]).toBe('hello');
    expect(filterComponent.isActive()).toBeTrue();
    sub.unsubscribe();
  }));

  it('should become active after user input', fakeAsync(() => {
    openFilterPopover();
    const filterComponent = queryFilterComponent();

    const input = queryInput();
    input.value = 'abc';
    input.dispatchEvent(new Event('input'));
    tick(DEBOUNCE);
    TestBed.flushEffects();

    expect(filterComponent.isActive()).toBeTrue();
  }));

  it('should debounce rapid successive inputs and emit only last value', fakeAsync(() => {
    openFilterPopover();
    const filterComponent = queryFilterComponent();

    const emissions: string[] = [];
    const sub = filterComponent.changes.subscribe(v => emissions.push(v));

    const input = queryInput();
    input.value = 'a';
    input.dispatchEvent(new Event('input'));
    input.value = 'ab';
    input.dispatchEvent(new Event('input'));
    input.value = 'abc';
    input.dispatchEvent(new Event('input'));

    tick(DEBOUNCE);
    TestBed.flushEffects();

    expect(emissions.length).toBe(1);
    expect(emissions[0]).toBe('abc');
    sub.unsubscribe();
  }));

  it('should clear the filter and become inactive', fakeAsync(() => {
    openFilterPopover();
    const filterComponent = queryFilterComponent();

    const input = queryInput();
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    tick(DEBOUNCE);

    expect(filterComponent.isActive()).toBeTrue();

    const clearBtn = queryClearBtn();
    clearBtn.click();
    tick(DEBOUNCE);
    TestBed.flushEffects();

    expect(filterComponent.isActive()).toBeFalse();
    expect(host.initialValue()).toBe('');
  }));

  it('should accept all items when inactive', () => {
    const items: Item[] = [{ name: 'alpha' }, { name: 'beta' }];

    openFilterPopover();
    const filterComponent = queryFilterComponent();

    expect(filterComponent.isActive()).toBeFalse();
    for (const item of items) {
      expect(filterComponent.accepts(item)).toBeTrue();
    }
  });

  it('should filter items correctly when active', fakeAsync(() => {
    const items: Item[] = [{ name: 'apple' }, { name: 'banana' }, { name: 'apricot' }];

    openFilterPopover();
    const filterComponent = queryFilterComponent();

    const input = queryInput();
    input.value = 'ap';
    input.dispatchEvent(new Event('input'));
    tick(DEBOUNCE);
    TestBed.flushEffects();

    expect(filterComponent.isActive()).toBeTrue();
    const results = items.map(i => filterComponent.accepts(i));
    expect(results).toEqual([true, false, true]);
  }));

  it('should use explicit label when provided', () => {
    host.label.set('Custom Label');
    fixture.detectChanges();

    openFilterPopover();
    const labelEl: HTMLLabelElement = document.querySelector('.treetable-filter label[for="filter"]');
    expect(labelEl.textContent.trim()).toBe('Custom Label');
  });
});
