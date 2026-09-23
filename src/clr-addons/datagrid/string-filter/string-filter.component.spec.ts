import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ClarityModule, ClrCommonStringsService, ClrDatagrid, ClrDatagridFilter } from '@clr/angular';
import { ClrFilterClearButtonModule } from '../util/filter-clear-button';
import { ClrStringFilterComponent } from './string-filter.component';

interface Item {
  name: string;
  nested?: { name: string };
}

@Component({
  template: `
    <clr-datagrid>
      <clr-dg-column [clrDgField]="'name'">
        <clr-dg-filter>
          <clr-string-filter clrProperty="name" [(clrFilterValue)]="filterValue"></clr-string-filter>
        </clr-dg-filter>
      </clr-dg-column>

      <clr-dg-row *clrDgItems="let data of dataList" [clrDgItem]="data">
        <clr-dg-cell>{{ data.name }}</clr-dg-cell>
      </clr-dg-row>
    </clr-datagrid>
  `,
  standalone: false,
})
class TestComponent {
  dataList: Item[] = [{ name: 'Alpha' }, { name: 'Beta' }, { name: 'Gamma' }];
  filterValue = '';

  @ViewChild(ClrStringFilterComponent) component: ClrStringFilterComponent<Item>;
  @ViewChild(ClrDatagrid) datagrid: ClrDatagrid;
  @ViewChild(ClrDatagridFilter) filter: ClrDatagridFilter;
}

describe('ClrStringFilterComponent', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ClarityModule, FormsModule, ClrFilterClearButtonModule],
      declarations: [TestComponent, ClrStringFilterComponent],
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
    fixture.componentInstance.component.onInput('AL');
    tick(499);
    fixture.detectChanges();

    expect(fixture.componentInstance.datagrid.rows.length).toBe(3);
  }));

  it('filters case-insensitively (substring) after the debounce elapses', fakeAsync(() => {
    fixture.componentInstance.component.onInput('AL');
    tick(500);
    fixture.detectChanges();

    expect(fixture.componentInstance.datagrid.rows.length).toBe(1);
  }));

  it('clearFilter resets the value immediately, without waiting for the debounce', fakeAsync(() => {
    fixture.componentInstance.component.onInput('AL');
    tick(500);
    fixture.detectChanges();
    expect(fixture.componentInstance.datagrid.rows.length).toBe(1);

    fixture.componentInstance.component.clearFilter();
    fixture.detectChanges();

    expect(fixture.componentInstance.datagrid.rows.length).toBe(3);
    expect(fixture.componentInstance.component.isActive()).toBeFalse();
  }));

  it('applies external clrFilterValue changes immediately, without debounce', fakeAsync(() => {
    const component = new ClrStringFilterComponent<Item>(TestBed.inject(ClrCommonStringsService), {
      setFilter: () => undefined,
      openChange: new EventEmitter<boolean>(),
    } as unknown as ClrDatagridFilter);
    component.property = 'name';
    component.value = 'beta';
    tick();

    expect(component.accepts({ name: 'Beta' })).toBeTrue();
    expect(component.accepts({ name: 'Gamma' })).toBeFalse();

    component.ngOnDestroy();
  }));

  it('supports nested properties via clrProperty', fakeAsync(() => {
    const component = fixture.componentInstance.component;
    component.property = 'nested.name';
    component.onInput('al');
    tick(500);

    expect(component.accepts({ name: 'x', nested: { name: 'Alpha' } })).toBeTrue();
    expect(component.accepts({ name: 'x', nested: { name: 'Beta' } })).toBeFalse();
  }));

  it('exposes state for persistence', fakeAsync(() => {
    const component = new ClrStringFilterComponent<Item>(TestBed.inject(ClrCommonStringsService), {
      setFilter: () => undefined,
      openChange: new EventEmitter<boolean>(),
    } as unknown as ClrDatagridFilter);
    component.property = 'name';
    component.value = 'gamma';
    tick();

    expect(component.state.property).toBeDefined();
    expect(component.state.value).toBe('gamma');

    component.ngOnDestroy();
  }));

  it('external reset cancels an in-flight debounced keystroke even when the reset value equals the currently-applied value', fakeAsync(() => {
    const component = fixture.componentInstance.component;
    // no filter applied yet, so the "reset" value below is deliberately '' (equal to the current applied state)
    component.onInput('AL');
    tick(200); // debounce still pending (500ms)

    component.value = ''; // external reset; matches current _rawValue but must still cancel the pending 'AL'
    tick();

    tick(500); // let any stale debounced emission (if the bug were present) fire

    expect(component.value).toBe('');
    expect(component.state.value).toBe('');
    expect(component.isActive()).toBeFalse();
  }));

  it('focuses the input when the filter is opened', fakeAsync(() => {
    fixture.componentInstance.filter.open = true;
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const input: HTMLInputElement = document.querySelector('[data-testid="string-filter-input"]');
    expect(document.activeElement).toBe(input);
  }));
});
