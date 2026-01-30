import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component, ViewChild, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ClrSummaryArea } from './summary-area';
import { ClrSummaryItem } from '../summary-item/summary-item';
import { ClrSummaryItemValue } from '../summary-item-value/summary-item-value';
import { ClrSummaryAreaStateService } from './summary-area-state.service';
import { ClrSummaryAreaError, ClrSummaryAreaWarning, ClrSummaryAreaLoading } from './summary-area.model';
import { ClarityModule } from '@clr/angular';

class MockSummaryAreaStateService {
  private _collapsed = signal(false);
  public collapsed() {
    return this._collapsed;
  }
  public setCollapsed(value: boolean): void {
    this._collapsed.set(value);
  }
}

// Test host component with multiple items
@Component({
  template: `
    <clr-summary-area [rows]="rows" [error]="error" [warning]="warning" [loading]="loading">
      @for (item of items; track item.label) {
      <clr-summary-item [label]="item.label">
        <clr-summary-item-value [value]="item.value"></clr-summary-item-value>
      </clr-summary-item>
      }
    </clr-summary-area>
  `,
  standalone: true,
  imports: [ClrSummaryArea, ClrSummaryItem, ClrSummaryItemValue, ClarityModule],
})
class TestHostComponent {
  @ViewChild(ClrSummaryArea) component!: ClrSummaryArea;
  rows: 1 | 2 | 3 = 3;
  error: ClrSummaryAreaError | undefined;
  warning: ClrSummaryAreaWarning | undefined;
  loading: ClrSummaryAreaLoading | undefined;
  items = [
    { label: 'Item 1', value: 'Value 1' },
    { label: 'Item 2', value: 'Value 2' },
    { label: 'Item 3', value: 'Value 3' },
  ];
}

// Test host with many items
@Component({
  template: `
    <clr-summary-area [rows]="3">
      @for(i of manyItems; track i) {
      <clr-summary-item [label]="'Item ' + i">
        <clr-summary-item-value [value]="'Value ' + i"></clr-summary-item-value>
      </clr-summary-item>
      }
    </clr-summary-area>
  `,
  standalone: true,
  imports: [ClrSummaryArea, ClrSummaryItem, ClrSummaryItemValue],
})
class ManyItemsTestHostComponent {
  @ViewChild(ClrSummaryArea) component!: ClrSummaryArea;
  manyItems = Array.from({ length: 20 }, (_, i) => i + 1);
}

describe('SummaryAreaComponent', () => {
  let mockStateService: MockSummaryAreaStateService;

  beforeEach(() => {
    mockStateService = new MockSummaryAreaStateService();
  });

  describe('Basic functionality', () => {
    let hostComponent: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;
    let component: ClrSummaryArea;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          TestHostComponent,
          ClrSummaryArea,
          ClrSummaryItem,
          ClrSummaryItemValue,
          NoopAnimationsModule,
          ClarityModule,
        ],
        providers: [{ provide: ClrSummaryAreaStateService, useValue: mockStateService }],
      }).compileComponents();

      fixture = TestBed.createComponent(TestHostComponent);
      hostComponent = fixture.componentInstance;
      fixture.detectChanges();
      component = hostComponent.component;
    });

    describe('initialization', () => {
      it('should create the component', () => {
        expect(component).toBeTruthy();
      });

      it('should have default rows as 3', () => {
        expect(component.rows()).toBe(3);
      });

      it('should inject SummaryAreaStateService', () => {
        expect(component.isCollapsed).toBeTruthy();
      });

      it('should have items query list', () => {
        expect(component.items).toBeTruthy();
      });
    });

    describe('collapsed state', () => {
      it('should show content when not collapsed', () => {
        mockStateService.setCollapsed(false);
        fixture.detectChanges();

        const panels = fixture.debugElement.query(By.css('.summary-area-panels'));
        expect(panels).toBeTruthy();
      });

      it('should hide content when collapsed', () => {
        mockStateService.setCollapsed(true);
        fixture.detectChanges();

        const panels = fixture.debugElement.query(By.css('.summary-area-panels'));
        expect(panels).toBeTruthy();
        expect(panels.classes['is-active']).toBeFalsy();
      });

      it('should toggle collapsed state via service', () => {
        expect(component.isCollapsed()).toBe(false);
        mockStateService.setCollapsed(true);
        expect(component.isCollapsed()).toBe(true);
        mockStateService.setCollapsed(false);
        expect(component.isCollapsed()).toBe(false);
      });
    });

    describe('rows input', () => {
      it('should accept rows input', () => {
        hostComponent.rows = 2;
        fixture.detectChanges();
        expect(component.rows()).toBe(2);
      });

      it('should update currentRows based on items', fakeAsync(() => {
        hostComponent.rows = 2;
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        // currentRows is calculated based on items
        expect(component.currentRows).toBeDefined();
      }));
    });

    describe('visibleItems', () => {
      it('should return items array', () => {
        fixture.detectChanges();
        expect(component.visibleItems.length).toBe(3);
      });

      it('should limit items to max (5 * rows)', fakeAsync(() => {
        // With 3 items and rows=3, max is 15
        expect(component.visibleItems.length).toBe(3);
      }));
    });
  });

  describe('Error state', () => {
    let hostComponent: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;
    let component: ClrSummaryArea;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          TestHostComponent,
          ClrSummaryArea,
          ClrSummaryItem,
          ClrSummaryItemValue,
          NoopAnimationsModule,
          ClarityModule,
        ],
        providers: [{ provide: ClrSummaryAreaStateService, useValue: mockStateService }],
      }).compileComponents();

      fixture = TestBed.createComponent(TestHostComponent);
      hostComponent = fixture.componentInstance;
      fixture.detectChanges();
      component = hostComponent.component;
    });

    it('should have hasError as false when no error is set', () => {
      expect(component.hasError).toBe(false);
    });

    it('should have hasError as false when error is set but not active', () => {
      hostComponent.error = { active: signal(false), text: 'Error text' };
      fixture.detectChanges();
      expect(component.hasError).toBe(false);
    });

    it('should have hasError as true when error is active', () => {
      hostComponent.error = { active: signal(true), text: 'Error text' };
      fixture.detectChanges();
      expect(component.hasError).toBe(true);
    });

    it('should render error alert when error is active', () => {
      hostComponent.error = { active: signal(true), text: 'Error occurred' };
      fixture.detectChanges();

      const errorAlert = fixture.debugElement.query(By.css('.summary-area-alert clr-alert'));
      expect(errorAlert).toBeTruthy();
    });

    it('should use default error text when not provided', () => {
      hostComponent.error = { active: signal(true) };
      fixture.detectChanges();
      expect(component.errorText).toBe('Error');
    });

    it('should use custom error text when provided', () => {
      hostComponent.error = { active: signal(true), text: 'Custom error message' };
      fixture.detectChanges();
      expect(component.errorText).toBe('Custom error message');
    });

    it('should have errorClick as undefined when no click handler', () => {
      hostComponent.error = { active: signal(true), text: 'Error' };
      fixture.detectChanges();
      expect(component.errorClick).toBeUndefined();
    });

    it('should have errorClick defined when click handler is provided', () => {
      const clickFn = (): void => {};
      hostComponent.error = { active: signal(true), text: 'Error', click: clickFn };
      fixture.detectChanges();
      expect(component.errorClick).toBe(clickFn);
    });

    it('should have errorLinkText as undefined when not provided', () => {
      hostComponent.error = { active: signal(true), text: 'Error' };
      fixture.detectChanges();
      expect(component.errorLinkText).toBeUndefined();
    });

    it('should have errorLinkText when provided', () => {
      hostComponent.error = { active: signal(true), text: 'Error', linkText: 'Fix it' };
      fixture.detectChanges();
      expect(component.errorLinkText).toBe('Fix it');
    });

    it('should render alert-text and alert-action when both text and click are provided', () => {
      hostComponent.error = { active: signal(true), text: 'Error', click: (): void => {}, linkText: 'Fix' };
      fixture.detectChanges();

      const alertText = fixture.debugElement.query(By.css('.alert-text'));
      const alertAction = fixture.debugElement.query(By.css('.alert-action'));
      expect(alertText).toBeTruthy();
      expect(alertAction).toBeTruthy();
    });

    it('should render only alert-action when click is provided without linkText', () => {
      hostComponent.error = { active: signal(true), text: 'Error', click: (): void => {} };
      fixture.detectChanges();

      const alertAction = fixture.debugElement.query(By.css('.alert-action'));
      expect(alertAction).toBeTruthy();
    });

    it('should render only alert-text when no click is provided', () => {
      hostComponent.error = { active: signal(true), text: 'Error' };
      fixture.detectChanges();

      const alertText = fixture.debugElement.query(By.css('.alert-text'));
      const alertAction = fixture.debugElement.query(By.css('.alert-action'));
      expect(alertText).toBeTruthy();
      expect(alertAction).toBeFalsy();
    });

    it('should hide grid panel when error is active', () => {
      hostComponent.error = { active: signal(true), text: 'Error' };
      fixture.detectChanges();

      const gridPanel = fixture.debugElement.query(By.css('.summary-area-panel--grid.is-active'));
      expect(gridPanel).toBeFalsy();
    });

    it('should show state panel when error is active', () => {
      hostComponent.error = { active: signal(true), text: 'Error' };
      fixture.detectChanges();

      const statePanel = fixture.debugElement.query(By.css('.summary-area-panel--state.is-active'));
      expect(statePanel).toBeTruthy();
    });
  });

  describe('Warning state', () => {
    let hostComponent: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;
    let component: ClrSummaryArea;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          TestHostComponent,
          ClrSummaryArea,
          ClrSummaryItem,
          ClrSummaryItemValue,
          NoopAnimationsModule,
          ClarityModule,
        ],
        providers: [{ provide: ClrSummaryAreaStateService, useValue: mockStateService }],
      }).compileComponents();

      fixture = TestBed.createComponent(TestHostComponent);
      hostComponent = fixture.componentInstance;
      fixture.detectChanges();
      component = hostComponent.component;
    });

    it('should have hasWarning as false when no warning is set', () => {
      expect(component.hasWarning).toBe(false);
    });

    it('should have hasWarning as false when warning is set but not active', () => {
      hostComponent.warning = { active: signal(false), text: 'Warning text' };
      fixture.detectChanges();
      expect(component.hasWarning).toBe(false);
    });

    it('should have hasWarning as true when warning is active', () => {
      hostComponent.warning = { active: signal(true), text: 'Warning text' };
      fixture.detectChanges();
      expect(component.hasWarning).toBe(true);
    });

    it('should render warning alert when warning is active', () => {
      hostComponent.warning = { active: signal(true), text: 'Warning occurred' };
      fixture.detectChanges();

      const warningAlert = fixture.debugElement.query(By.css('.summary-area-alert clr-alert'));
      expect(warningAlert).toBeTruthy();
    });

    it('should use default warning text when not provided', () => {
      hostComponent.warning = { active: signal(true) };
      fixture.detectChanges();
      expect(component.warningText).toBe('Warning');
    });

    it('should use custom warning text when provided', () => {
      hostComponent.warning = { active: signal(true), text: 'Custom warning message' };
      fixture.detectChanges();
      expect(component.warningText).toBe('Custom warning message');
    });

    it('should have warningClick as undefined when no click handler', () => {
      hostComponent.warning = { active: signal(true), text: 'Warning' };
      fixture.detectChanges();
      expect(component.warningClick).toBeUndefined();
    });

    it('should have warningClick defined when click handler is provided', () => {
      const clickFn = (): void => {};
      hostComponent.warning = { active: signal(true), text: 'Warning', click: clickFn };
      fixture.detectChanges();
      expect(component.warningClick).toBe(clickFn);
    });

    it('should have warningLinkText as undefined when not provided', () => {
      hostComponent.warning = { active: signal(true), text: 'Warning' };
      fixture.detectChanges();
      expect(component.warningLinkText).toBeUndefined();
    });

    it('should have warningLinkText when provided', () => {
      hostComponent.warning = { active: signal(true), text: 'Warning', linkText: 'Acknowledge' };
      fixture.detectChanges();
      expect(component.warningLinkText).toBe('Acknowledge');
    });

    it('should prioritize error over warning', () => {
      hostComponent.error = { active: signal(true), text: 'Error' };
      hostComponent.warning = { active: signal(true), text: 'Warning' };
      fixture.detectChanges();

      expect(component.hasError).toBe(true);
      expect(component.hasWarning).toBe(false); // hasWarning returns false when hasError is true
    });

    it('should hide grid panel when warning is active', () => {
      hostComponent.warning = { active: signal(true), text: 'Warning' };
      fixture.detectChanges();

      const gridPanel = fixture.debugElement.query(By.css('.summary-area-panel--grid.is-active'));
      expect(gridPanel).toBeFalsy();
    });

    it('should show state panel when warning is active', () => {
      hostComponent.warning = { active: signal(true), text: 'Warning' };
      fixture.detectChanges();

      const statePanel = fixture.debugElement.query(By.css('.summary-area-panel--state.is-active'));
      expect(statePanel).toBeTruthy();
    });
  });

  describe('Loading state', () => {
    let hostComponent: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;
    let component: ClrSummaryArea;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          TestHostComponent,
          ClrSummaryArea,
          ClrSummaryItem,
          ClrSummaryItemValue,
          NoopAnimationsModule,
          ClarityModule,
        ],
        providers: [{ provide: ClrSummaryAreaStateService, useValue: mockStateService }],
      }).compileComponents();

      fixture = TestBed.createComponent(TestHostComponent);
      hostComponent = fixture.componentInstance;
      fixture.detectChanges();
      component = hostComponent.component;
    });

    it('should have hasLoading as false when no loading is set', () => {
      expect(component.hasLoading).toBe(false);
    });

    it('should have hasLoading as false when loading is set but not active', () => {
      hostComponent.loading = { active: false };
      fixture.detectChanges();
      expect(component.hasLoading).toBe(false);
    });

    it('should have hasLoading as true when loading is active', () => {
      hostComponent.loading = { active: true };
      fixture.detectChanges();
      expect(component.hasLoading).toBe(true);
    });

    it('should render loading spinner when loading is active', () => {
      hostComponent.loading = { active: true };
      fixture.detectChanges();

      const loadingContainer = fixture.debugElement.query(By.css('.summary-area-loading'));
      expect(loadingContainer).toBeTruthy();

      const spinner = fixture.debugElement.query(By.css('clr-spinner'));
      expect(spinner).toBeTruthy();
    });

    it('should use default loading text when not provided', () => {
      hostComponent.loading = { active: true };
      fixture.detectChanges();
      expect(component.loadingText).toBe('Loading...');
    });

    it('should use custom loading text when provided', () => {
      hostComponent.loading = { active: true, text: 'Fetching data...' };
      fixture.detectChanges();
      expect(component.loadingText).toBe('Fetching data...');
    });

    it('should display loading text in template', () => {
      hostComponent.loading = { active: true, text: 'Please wait...' };
      fixture.detectChanges();

      const loadingText = fixture.debugElement.query(By.css('.loading-text'));
      expect(loadingText.nativeElement.textContent).toContain('Please wait...');
    });

    it('should hide grid panel when loading is active', () => {
      hostComponent.loading = { active: true };
      fixture.detectChanges();

      const gridPanel = fixture.debugElement.query(By.css('.summary-area-panel--grid.is-active'));
      expect(gridPanel).toBeFalsy();
    });

    it('should show state panel when loading is active', () => {
      hostComponent.loading = { active: true };
      fixture.detectChanges();

      const statePanel = fixture.debugElement.query(By.css('.summary-area-panel--state.is-active'));
      expect(statePanel).toBeTruthy();
    });

    it('should prioritize loading over error', () => {
      hostComponent.loading = { active: true };
      hostComponent.error = { active: signal(true), text: 'Error' };
      fixture.detectChanges();

      expect(component.hasLoading).toBe(true);
      expect(component.hasError).toBe(false);
    });

    it('should prioritize loading over warning', () => {
      hostComponent.loading = { active: true };
      hostComponent.warning = { active: signal(true), text: 'Warning' };
      fixture.detectChanges();

      expect(component.hasLoading).toBe(true);
      expect(component.hasWarning).toBe(false);
    });

    it('should prioritize loading over both error and warning', () => {
      hostComponent.loading = { active: true };
      hostComponent.error = { active: signal(true), text: 'Error' };
      hostComponent.warning = { active: signal(true), text: 'Warning' };
      fixture.detectChanges();

      expect(component.hasLoading).toBe(true);
      expect(component.hasError).toBe(false);
      expect(component.hasWarning).toBe(false);

      const spinner = fixture.debugElement.query(By.css('clr-spinner'));
      expect(spinner).toBeTruthy();

      const errorAlert = fixture.debugElement.query(By.css('clr-alert[clrAlertType="danger"]'));
      expect(errorAlert).toBeFalsy();

      const warningAlert = fixture.debugElement.query(By.css('clr-alert[clrAlertType="warning"]'));
      expect(warningAlert).toBeFalsy();
    });

    it('should show error when loading becomes inactive', () => {
      hostComponent.loading = { active: true };
      hostComponent.error = { active: signal(true), text: 'Error' };
      fixture.detectChanges();

      expect(component.hasLoading).toBe(true);
      expect(component.hasError).toBe(false);

      hostComponent.loading = { active: false };
      fixture.detectChanges();

      expect(component.hasLoading).toBe(false);
      expect(component.hasError).toBe(true);
    });
  });

  describe('Grid layout', () => {
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          TestHostComponent,
          ClrSummaryArea,
          ClrSummaryItem,
          ClrSummaryItemValue,
          NoopAnimationsModule,
          ClarityModule,
        ],
        providers: [{ provide: ClrSummaryAreaStateService, useValue: mockStateService }],
      }).compileComponents();

      fixture = TestBed.createComponent(TestHostComponent);
      fixture.detectChanges();
    });

    it('should render summary grid', () => {
      const grid = fixture.debugElement.query(By.css('.summary-grid'));
      expect(grid).toBeTruthy();
    });

    it('should have CSS variable for columns', () => {
      const grid = fixture.debugElement.query(By.css('.summary-grid'));
      const style = grid.nativeElement.style.getPropertyValue('--columns');
      expect(style).toBeTruthy();
    });

    it('should have CSS variable for rows', () => {
      const grid = fixture.debugElement.query(By.css('.summary-grid'));
      const style = grid.nativeElement.style.getPropertyValue('--rows');
      expect(style).toBeTruthy();
    });

    it('should show grid panel when no error or warning', () => {
      const gridPanel = fixture.debugElement.query(By.css('.summary-area-panel--grid.is-active'));
      expect(gridPanel).toBeTruthy();
    });

    it('should render projected summary items', () => {
      fixture.detectChanges();
      // Items are rendered via *ngTemplateOutlet, so check for the rendered item containers
      const items = fixture.debugElement.queryAll(By.css('.summary-item'));
      expect(items.length).toBe(3);
    });
  });

  describe('Many items', () => {
    let hostComponent: ManyItemsTestHostComponent;
    let fixture: ComponentFixture<ManyItemsTestHostComponent>;
    let component: ClrSummaryArea;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          ManyItemsTestHostComponent,
          ClrSummaryArea,
          ClrSummaryItem,
          ClrSummaryItemValue,
          NoopAnimationsModule,
        ],
        providers: [{ provide: ClrSummaryAreaStateService, useValue: mockStateService }],
      }).compileComponents();

      fixture = TestBed.createComponent(ManyItemsTestHostComponent);
      hostComponent = fixture.componentInstance;
      fixture.detectChanges();
      component = hostComponent.component;
    });

    it('should limit visible items to max (5 * rows)', () => {
      // With rows=3, max is 15
      expect(component.visibleItems.length).toBe(15);
    });

    it('should have 20 total items but only show 15', () => {
      expect(component.items.length).toBe(20);
      expect(component.visibleItems.length).toBe(15);
    });
  });

  describe('CSS structure', () => {
    let hostComponent: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          TestHostComponent,
          ClrSummaryArea,
          ClrSummaryItem,
          ClrSummaryItemValue,
          NoopAnimationsModule,
          ClarityModule,
        ],
        providers: [{ provide: ClrSummaryAreaStateService, useValue: mockStateService }],
      }).compileComponents();

      fixture = TestBed.createComponent(TestHostComponent);
      hostComponent = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have summary-area-panels class', () => {
      const panels = fixture.debugElement.query(By.css('.summary-area-panels'));
      expect(panels).toBeTruthy();
    });

    it('should have summary-area-panel--state class', () => {
      const statePanel = fixture.debugElement.query(By.css('.summary-area-panel--state'));
      expect(statePanel).toBeTruthy();
    });

    it('should have summary-area-panel--grid class', () => {
      const gridPanel = fixture.debugElement.query(By.css('.summary-area-panel--grid'));
      expect(gridPanel).toBeTruthy();
    });

    it('should have summary-area-container class', () => {
      const container = fixture.debugElement.query(By.css('.summary-area-container'));
      expect(container).toBeTruthy();
    });

    it('should add is-error class when error is active', () => {
      hostComponent.error = { active: signal(true), text: 'Error' };
      fixture.detectChanges();

      const statePanel = fixture.debugElement.query(By.css('.summary-area-panel--state.is-error'));
      expect(statePanel).toBeTruthy();
    });

    it('should add is-warning class when warning is active', () => {
      hostComponent.warning = { active: signal(true), text: 'Warning' };
      fixture.detectChanges();

      const statePanel = fixture.debugElement.query(By.css('.summary-area-panel--state.is-warning'));
      expect(statePanel).toBeTruthy();
    });
  });

  describe('ARIA attributes', () => {
    let hostComponent: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          TestHostComponent,
          ClrSummaryArea,
          ClrSummaryItem,
          ClrSummaryItemValue,
          NoopAnimationsModule,
          ClarityModule,
        ],
        providers: [{ provide: ClrSummaryAreaStateService, useValue: mockStateService }],
      }).compileComponents();

      fixture = TestBed.createComponent(TestHostComponent);
      hostComponent = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have aria-hidden="true" on state panel when no error or warning', () => {
      const statePanel = fixture.debugElement.query(By.css('.summary-area-panel--state'));
      expect(statePanel.attributes['aria-hidden']).toBe('true');
    });

    it('should have aria-hidden="false" on state panel when error is active', () => {
      hostComponent.error = { active: signal(true), text: 'Error' };
      fixture.detectChanges();

      const statePanel = fixture.debugElement.query(By.css('.summary-area-panel--state'));
      expect(statePanel.attributes['aria-hidden']).toBe('false');
    });

    it('should have aria-hidden="false" on grid panel when no error or warning', () => {
      const gridPanel = fixture.debugElement.query(By.css('.summary-area-panel--grid'));
      expect(gridPanel.attributes['aria-hidden']).toBe('false');
    });

    it('should have aria-hidden="true" on grid panel when error is active', () => {
      hostComponent.error = { active: signal(true), text: 'Error' };
      fixture.detectChanges();

      const gridPanel = fixture.debugElement.query(By.css('.summary-area-panel--grid'));
      expect(gridPanel.attributes['aria-hidden']).toBe('true');
    });

    it('should have inert attribute on state panel when not active', () => {
      const statePanel = fixture.debugElement.query(By.css('.summary-area-panel--state'));
      expect(statePanel.attributes['inert']).toBeDefined();
    });

    it('should not have inert attribute on state panel when error is active', () => {
      hostComponent.error = { active: signal(true), text: 'Error' };
      fixture.detectChanges();

      const statePanel = fixture.debugElement.query(By.css('.summary-area-panel--state'));
      expect(statePanel.attributes['inert']).toBeUndefined();
    });
  });

  describe('Window resize', () => {
    let hostComponent: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;
    let component: ClrSummaryArea;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          TestHostComponent,
          ClrSummaryArea,
          ClrSummaryItem,
          ClrSummaryItemValue,
          NoopAnimationsModule,
          ClarityModule,
        ],
        providers: [{ provide: ClrSummaryAreaStateService, useValue: mockStateService }],
      }).compileComponents();

      fixture = TestBed.createComponent(TestHostComponent);
      hostComponent = fixture.componentInstance;
      fixture.detectChanges();
      component = hostComponent.component;
    });

    it('should have onResize method', () => {
      expect(component.onResize).toBeDefined();
    });

    it('should call onResize on window resize when not collapsed', () => {
      spyOn(component, 'onResize').and.callThrough();
      mockStateService.setCollapsed(false);
      fixture.detectChanges();

      window.dispatchEvent(new Event('resize'));

      expect(component.onResize).toHaveBeenCalled();
    });
  });

  describe('Alert click handlers', () => {
    let hostComponent: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          TestHostComponent,
          ClrSummaryArea,
          ClrSummaryItem,
          ClrSummaryItemValue,
          NoopAnimationsModule,
          ClarityModule,
        ],
        providers: [{ provide: ClrSummaryAreaStateService, useValue: mockStateService }],
      }).compileComponents();

      fixture = TestBed.createComponent(TestHostComponent);
      hostComponent = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should call errorClick when alert action is clicked', () => {
      const clickSpy = jasmine.createSpy('errorClick');
      hostComponent.error = { active: signal(true), text: 'Error', click: clickSpy };
      fixture.detectChanges();

      const alertAction = fixture.debugElement.query(By.css('.alert-action'));
      alertAction.nativeElement.click();

      expect(clickSpy).toHaveBeenCalled();
    });

    it('should call warningClick when alert action is clicked', () => {
      const clickSpy = jasmine.createSpy('warningClick');
      hostComponent.warning = { active: signal(true), text: 'Warning', click: clickSpy };
      fixture.detectChanges();

      const alertAction = fixture.debugElement.query(By.css('.alert-action'));
      alertAction.nativeElement.click();

      expect(clickSpy).toHaveBeenCalled();
    });

    it('should call errorClick on Enter keydown', () => {
      const clickSpy = jasmine.createSpy('errorClick');
      hostComponent.error = { active: signal(true), text: 'Error', click: clickSpy };
      fixture.detectChanges();

      const alertAction = fixture.debugElement.query(By.css('.alert-action'));
      alertAction.triggerEventHandler('keydown.enter', {});

      expect(clickSpy).toHaveBeenCalled();
    });
  });
});

describe('SummaryAreaComponent - standalone tests', () => {
  let component: ClrSummaryArea;
  let fixture: ComponentFixture<ClrSummaryArea>;
  let mockStateService: MockSummaryAreaStateService;

  beforeEach(async () => {
    mockStateService = new MockSummaryAreaStateService();

    await TestBed.configureTestingModule({
      imports: [ClrSummaryArea, NoopAnimationsModule, ClarityModule],
      providers: [{ provide: ClrSummaryAreaStateService, useValue: mockStateService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ClrSummaryArea);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create standalone component', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty visibleItems when no content projected', () => {
    expect(component.visibleItems.length).toBe(0);
  });

  it('should have isCollapsed signal from service', () => {
    expect(component.isCollapsed()).toBe(false);
    mockStateService.setCollapsed(true);
    expect(component.isCollapsed()).toBe(true);
  });
});
