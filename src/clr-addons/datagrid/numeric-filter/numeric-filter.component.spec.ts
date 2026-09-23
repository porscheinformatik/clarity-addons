import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ClarityModule, ClrCommonStringsService, ClrDatagrid, ClrDatagridFilter } from '@clr/angular';
import { ClrFilterClearButtonModule } from '../util/filter-clear-button';
import { ClrNumericFilterComponent } from './numeric-filter.component';

interface Item {
  amount: number;
  nested?: { amount: number };
}

@Component({
  template: `
    <clr-datagrid>
      <clr-dg-column [clrDgField]="'amount'">
        <clr-dg-filter>
          <clr-numeric-filter clrProperty="amount" [(clrFilterValue)]="filterValue"></clr-numeric-filter>
        </clr-dg-filter>
      </clr-dg-column>

      <clr-dg-row *clrDgItems="let data of dataList" [clrDgItem]="data">
        <clr-dg-cell>{{ data.amount }}</clr-dg-cell>
      </clr-dg-row>
    </clr-datagrid>
  `,
  standalone: false,
})
class TestComponent {
  dataList: Item[] = [{ amount: 1 }, { amount: 5 }, { amount: 10 }];
  filterValue: [number | null, number | null] = [null, null];

  @ViewChild(ClrNumericFilterComponent) component: ClrNumericFilterComponent<Item>;
  @ViewChild(ClrDatagrid) datagrid: ClrDatagrid;
  @ViewChild(ClrDatagridFilter) filter: ClrDatagridFilter;
}

describe('ClrNumericFilterComponent', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ClarityModule, FormsModule, ClrFilterClearButtonModule],
      declarations: [TestComponent, ClrNumericFilterComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance.component).toBeTruthy();
  });

  it('does not filter before the debounce elapses', fakeAsync(() => {
    fixture.componentInstance.component.onLowInput(5);
    tick(499);
    fixture.detectChanges();

    expect(fixture.componentInstance.datagrid.rows.length).toBe(3);
  }));

  it('filters by low bound after the debounce elapses', fakeAsync(() => {
    fixture.componentInstance.component.onLowInput(5);
    tick(500);
    fixture.detectChanges();

    expect(fixture.componentInstance.datagrid.rows.length).toBe(2); // 5, 10
  }));

  it('filters by high bound after the debounce elapses', fakeAsync(() => {
    fixture.componentInstance.component.onHighInput(5);
    tick(500);
    fixture.detectChanges();

    expect(fixture.componentInstance.datagrid.rows.length).toBe(2); // 1, 5
  }));

  it('filters by combined low and high bounds', fakeAsync(() => {
    fixture.componentInstance.component.onLowInput(2);
    fixture.componentInstance.component.onHighInput(9);
    tick(500);
    fixture.detectChanges();

    expect(fixture.componentInstance.datagrid.rows.length).toBe(1); // 5
  }));

  it('clearFilter resets both bounds immediately, without waiting for the debounce', fakeAsync(() => {
    fixture.componentInstance.component.onLowInput(5);
    tick(500);
    fixture.detectChanges();
    expect(fixture.componentInstance.datagrid.rows.length).toBe(2);

    fixture.componentInstance.component.clearFilter();
    fixture.detectChanges();

    expect(fixture.componentInstance.datagrid.rows.length).toBe(3);
    expect(fixture.componentInstance.component.isActive()).toBeFalse();
  }));

  it('applies external clrFilterValue changes immediately, without debounce', fakeAsync(() => {
    const component = new ClrNumericFilterComponent<Item>(TestBed.inject(ClrCommonStringsService), {
      setFilter: () => undefined,
      openChange: new EventEmitter<boolean>(),
    } as unknown as ClrDatagridFilter);
    component.property = 'amount';
    component.value = [5, null];
    tick();

    expect(component.accepts({ amount: 5 })).toBeTrue();
    expect(component.accepts({ amount: 1 })).toBeFalse();

    component.ngOnDestroy();
  }));

  it('supports nested properties via clrProperty', fakeAsync(() => {
    const component = fixture.componentInstance.component;
    component.property = 'nested.amount';
    component.onLowInput(5);
    tick(500);

    expect(component.accepts({ amount: 0, nested: { amount: 10 } })).toBeTrue();
    expect(component.accepts({ amount: 0, nested: { amount: 1 } })).toBeFalse();
  }));

  it('exposes state for persistence', fakeAsync(() => {
    const component = new ClrNumericFilterComponent<Item>(TestBed.inject(ClrCommonStringsService), {
      setFilter: () => undefined,
      openChange: new EventEmitter<boolean>(),
    } as unknown as ClrDatagridFilter);
    component.property = 'amount';
    component.value = [2, 9];
    tick();

    expect(component.state.low).toBe(2);
    expect(component.state.high).toBe(9);

    component.ngOnDestroy();
  }));

  it('emits clrFilterValueChange with the debounced numeric range', fakeAsync(() => {
    const emittedValues: [number | null, number | null][] = [];
    fixture.componentInstance.component.filterValueChange.subscribe(value => emittedValues.push(value));

    fixture.componentInstance.component.onLowInput(2);
    fixture.componentInstance.component.onHighInput(9);
    tick(499);

    expect(emittedValues).toEqual([]);

    tick(1);

    expect(emittedValues).toEqual([[2, 9]]);
    expect(fixture.componentInstance.filterValue).toEqual([2, 9]);
  }));

  it('ignores invalid numeric values', fakeAsync(() => {
    fixture.componentInstance.component.onLowInput('foo' as unknown as number);
    tick(500);
    fixture.detectChanges();

    expect(fixture.componentInstance.component.isActive()).toBeFalse();
    expect(fixture.componentInstance.datagrid.rows.length).toBe(3);
  }));

  it('external reset cancels an in-flight debounced keystroke even when the reset value equals the currently-applied value', fakeAsync(() => {
    const component = fixture.componentInstance.component;
    // no filter applied yet, so the "reset" value below is deliberately [null, null] (equal to the current applied state)
    component.onLowInput(5);
    tick(200); // debounce still pending (500ms)

    component.value = [null, null]; // external reset; matches current bounds but must still cancel the pending low=5
    tick();

    tick(500); // let any stale debounced emission (if the bug were present) fire

    expect(component.state.low).toBeNull();
    expect(component.state.high).toBeNull();
    expect(component.isActive()).toBeFalse();
  }));

  it('focuses the low input when the filter is opened', fakeAsync(() => {
    fixture.componentInstance.filter.open = true;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const input: HTMLInputElement = document.querySelector('[data-testid="numeric-filter-low-input"]');
    expect(document.activeElement).toBe(input);
  }));
});
