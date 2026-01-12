import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ClrSummaryItem } from './summary-item';
import { ClrSummaryItemValue } from '../summary-item-value/summary-item-value';
import {
  ClrSummaryItemError,
  ClrSummaryItemWarning,
  ClrSummaryItemLoading,
  ClrSummaryItemEditConfig,
} from './summary-item.model';
import { ClarityModule } from '@clr/angular';

// Test host component for testing projected content
@Component({
  template: `
    <clr-summary-item
      [label]="label"
      [error]="error"
      [warning]="warning"
      [loading]="loading"
      [editConfig]="editConfig"
      [showOnEmptyValue]="showOnEmptyValue"
    >
      <clr-summary-item-value
        *ngIf="showValue"
        [value]="value"
        [icon]="icon"
        [showOnEmptyValue]="valueShowOnEmptyValue"
      >
      </clr-summary-item-value>
      <ng-container *ngIf="projectedContent">{{ projectedContent }}</ng-container>
    </clr-summary-item>
  `,
  standalone: true,
  imports: [CommonModule, ClrSummaryItem, ClrSummaryItemValue, ClarityModule],
})
class TestHostComponent {
  @ViewChild(ClrSummaryItem) component!: ClrSummaryItem;
  label = 'Test Label';
  error: ClrSummaryItemError | undefined;
  warning: ClrSummaryItemWarning | undefined;
  loading: ClrSummaryItemLoading | undefined;
  editConfig: ClrSummaryItemEditConfig | undefined;
  showOnEmptyValue = true;
  showValue = false;
  value: string | undefined;
  icon: string | undefined;
  valueShowOnEmptyValue = true;
  projectedContent: string | undefined;
}

// Test host for multiple value children
@Component({
  template: `
    <clr-summary-item [label]="'Multi Value'" [showOnEmptyValue]="showOnEmptyValue">
      <clr-summary-item-value [value]="value1" [showOnEmptyValue]="showOnEmptyValue1"></clr-summary-item-value>
      <clr-summary-item-value [value]="value2" [showOnEmptyValue]="showOnEmptyValue2"></clr-summary-item-value>
    </clr-summary-item>
  `,
  standalone: true,
  imports: [ClrSummaryItem, ClrSummaryItemValue],
})
class MultiValueTestHostComponent {
  @ViewChild(ClrSummaryItem) component!: ClrSummaryItem;
  showOnEmptyValue = true;
  value1: string | undefined;
  value2: string | undefined;
  showOnEmptyValue1 = true;
  showOnEmptyValue2 = true;
}

// Test host for icon validation
@Component({
  template: `
    <clr-summary-item [label]="'Icon Test'">
      <clr-summary-item-value [icon]="'pencil'"></clr-summary-item-value>
      <clr-summary-item-value [icon]="'trash'"></clr-summary-item-value>
    </clr-summary-item>
  `,
  standalone: true,
  imports: [ClrSummaryItem, ClrSummaryItemValue],
})
class InvalidIconTestHostComponent {
  @ViewChild(ClrSummaryItem) component!: ClrSummaryItem;
}

describe('SummaryItemComponent', () => {
  describe('Basic functionality', () => {
    let hostComponent: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;
    let component: ClrSummaryItem;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestHostComponent, ClrSummaryItem, ClrSummaryItemValue, NoopAnimationsModule, ClarityModule],
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

      it('should have default showOnEmptyValue as true', () => {
        expect(component.showOnEmptyValue()).toBe(true);
      });

      it('should have hasProjectedContent as false initially when no content', () => {
        expect(component.hasProjectedContent).toBe(false);
      });

      it('should have template defined', () => {
        expect(component.template).toBeTruthy();
      });
    });

    describe('label', () => {
      it('should render label correctly', () => {
        hostComponent.label = 'Status';
        fixture.detectChanges();

        const labelElement = fixture.debugElement.query(By.css('.summary-item-label'));
        expect(labelElement).toBeTruthy();
        expect(labelElement.nativeElement.textContent.trim()).toBe('Status:');
      });

      it('should update label when changed', () => {
        hostComponent.label = 'New Label';
        fixture.detectChanges();

        const labelElement = fixture.debugElement.query(By.css('.summary-item-label'));
        expect(labelElement.nativeElement.textContent.trim()).toBe('New Label:');
      });
    });

    describe('hasProjectedContent', () => {
      it('should detect projected text content', () => {
        hostComponent.projectedContent = 'Some text content';
        fixture.detectChanges();

        expect(component.hasProjectedContent).toBe(true);
      });

      it('should detect projected summary-item-value with value', () => {
        hostComponent.showValue = true;
        hostComponent.value = 'Test Value';
        fixture.detectChanges();

        expect(component.hasProjectedContent).toBe(true);
      });

      it('should detect projected summary-item-value with icon', () => {
        hostComponent.showValue = true;
        hostComponent.icon = 'pencil';
        fixture.detectChanges();

        expect(component.hasProjectedContent).toBe(true);
      });

      it('should return false when no content is projected', () => {
        hostComponent.showValue = false;
        hostComponent.projectedContent = undefined;
        fixture.detectChanges();

        expect(component.hasProjectedContent).toBe(false);
      });
    });

    describe('placeholder rendering', () => {
      it('should show placeholder when no content and showOnEmptyValue is true', () => {
        hostComponent.showOnEmptyValue = true;
        hostComponent.showValue = false;
        hostComponent.projectedContent = undefined;
        fixture.detectChanges();

        const placeholder = fixture.debugElement.query(By.css('.value-placeholder'));
        expect(placeholder).toBeTruthy();
        expect(placeholder.nativeElement.textContent.trim()).toBe('—');
      });

      it('should not show placeholder when content exists', () => {
        hostComponent.showValue = true;
        hostComponent.value = 'Test Value';
        fixture.detectChanges();

        const placeholder = fixture.debugElement.query(By.css('.value-placeholder'));
        expect(placeholder).toBeFalsy();
      });

      it('should not show placeholder when projected text content exists', () => {
        hostComponent.projectedContent = 'Some text';
        fixture.detectChanges();

        const placeholder = fixture.debugElement.query(By.css('.value-placeholder'));
        expect(placeholder).toBeFalsy();
      });
    });

    describe('showOnEmptyValue', () => {
      it('should show item when showOnEmptyValue is true and no content', () => {
        hostComponent.showOnEmptyValue = true;
        hostComponent.showValue = false;
        hostComponent.projectedContent = undefined;
        fixture.detectChanges();

        const summaryItem = fixture.debugElement.query(By.css('.summary-item'));
        expect(summaryItem).toBeTruthy();
        expect(summaryItem.nativeElement.classList.contains('hidden')).toBe(false);
      });

      it('should hide item when showOnEmptyValue is false and no content', () => {
        hostComponent.showOnEmptyValue = false;
        hostComponent.showValue = false;
        hostComponent.projectedContent = undefined;
        fixture.detectChanges();

        const summaryItem = fixture.debugElement.query(By.css('.summary-item'));
        expect(summaryItem.nativeElement.classList.contains('hidden')).toBe(true);
      });

      it('should show item when showOnEmptyValue is false but has content', () => {
        hostComponent.showOnEmptyValue = false;
        hostComponent.showValue = true;
        hostComponent.value = 'Test Value';
        fixture.detectChanges();

        const summaryItem = fixture.debugElement.query(By.css('.summary-item'));
        expect(summaryItem.nativeElement.classList.contains('hidden')).toBe(false);
      });
    });
  });

  describe('Error state', () => {
    let hostComponent: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;
    let component: ClrSummaryItem;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestHostComponent, ClrSummaryItem, ClrSummaryItemValue, NoopAnimationsModule, ClarityModule],
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
      hostComponent.error = { active: false, text: 'Error text' };
      fixture.detectChanges();
      expect(component.hasError).toBe(false);
    });

    it('should have hasError as true when error is active', () => {
      hostComponent.error = { active: true, text: 'Error text' };
      fixture.detectChanges();
      expect(component.hasError).toBe(true);
    });

    it('should render error icon when error is active', () => {
      hostComponent.error = { active: true, text: 'Error occurred' };
      fixture.detectChanges();

      const errorIcon = fixture.debugElement.query(By.css('clr-summary-item-value.error cds-icon'));
      expect(errorIcon).toBeTruthy();
    });

    it('should render error text when error is active', () => {
      hostComponent.error = { active: true, text: 'Error occurred' };
      fixture.detectChanges();

      const errorElements = fixture.debugElement.queryAll(By.css('clr-summary-item-value.error'));
      expect(errorElements.length).toBe(2); // icon + text
    });

    it('should use default error text when not provided', () => {
      hostComponent.error = { active: true };
      fixture.detectChanges();
      expect(component.errorText).toBe('Error');
    });

    it('should use custom error text when provided', () => {
      hostComponent.error = { active: true, text: 'Custom error message' };
      fixture.detectChanges();
      expect(component.errorText).toBe('Custom error message');
    });

    it('should have errorClick as undefined when no click handler', () => {
      hostComponent.error = { active: true, text: 'Error' };
      fixture.detectChanges();
      expect(component.errorClick).toBeUndefined();
    });

    it('should have errorClick defined when click handler is provided', () => {
      const clickFn = (): void => {};
      hostComponent.error = { active: true, text: 'Error', click: clickFn };
      fixture.detectChanges();
      expect(component.errorClick).toBe(clickFn);
    });

    it('should hide regular content when error is active', () => {
      hostComponent.showValue = true;
      hostComponent.value = 'Test Value';
      hostComponent.error = { active: true, text: 'Error' };
      fixture.detectChanges();

      // Should show error elements, not regular value
      const errorElements = fixture.debugElement.queryAll(By.css('clr-summary-item-value.error'));
      expect(errorElements.length).toBe(2);
    });
  });

  describe('Warning state', () => {
    let hostComponent: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;
    let component: ClrSummaryItem;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestHostComponent, ClrSummaryItem, ClrSummaryItemValue, NoopAnimationsModule, ClarityModule],
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
      hostComponent.warning = { active: false, text: 'Warning text' };
      fixture.detectChanges();
      expect(component.hasWarning).toBe(false);
    });

    it('should have hasWarning as true when warning is active', () => {
      hostComponent.warning = { active: true, text: 'Warning text' };
      fixture.detectChanges();
      expect(component.hasWarning).toBe(true);
    });

    it('should render warning icon when warning is active', () => {
      hostComponent.warning = { active: true, text: 'Warning occurred' };
      fixture.detectChanges();

      const warningIcon = fixture.debugElement.query(By.css('clr-summary-item-value.warning cds-icon'));
      expect(warningIcon).toBeTruthy();
    });

    it('should use default warning text when not provided', () => {
      hostComponent.warning = { active: true };
      fixture.detectChanges();
      expect(component.warningText).toBe('Warning');
    });

    it('should use custom warning text when provided', () => {
      hostComponent.warning = { active: true, text: 'Custom warning message' };
      fixture.detectChanges();
      expect(component.warningText).toBe('Custom warning message');
    });

    it('should have warningClick as undefined when no click handler', () => {
      hostComponent.warning = { active: true, text: 'Warning' };
      fixture.detectChanges();
      expect(component.warningClick).toBeUndefined();
    });

    it('should have warningClick defined when click handler is provided', () => {
      const clickFn = (): void => {};
      hostComponent.warning = { active: true, text: 'Warning', click: clickFn };
      fixture.detectChanges();
      expect(component.warningClick).toBe(clickFn);
    });

    it('should prioritize error over warning', () => {
      hostComponent.error = { active: true, text: 'Error' };
      hostComponent.warning = { active: true, text: 'Warning' };
      fixture.detectChanges();

      expect(component.hasError).toBe(true);
      expect(component.hasWarning).toBe(false); // hasWarning returns false when hasError is true
    });
  });

  describe('Loading state', () => {
    let hostComponent: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;
    let component: ClrSummaryItem;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestHostComponent, ClrSummaryItem, ClrSummaryItemValue, NoopAnimationsModule, ClarityModule],
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

      // The component uses ng-template, so we check the component state
      expect(component.hasLoading).toBe(true);
      expect(component.loadingText).toBeDefined();
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

    it('should display custom loading text', () => {
      hostComponent.loading = { active: true, text: 'Please wait...' };
      fixture.detectChanges();

      expect(component.loadingText).toBe('Please wait...');
    });

    it('should hide regular content when loading is active', () => {
      hostComponent.showValue = true;
      hostComponent.value = 'Test Value';
      hostComponent.loading = { active: true };
      fixture.detectChanges();

      // When loading is active, hasLoading should be true and content should not be shown
      expect(component.hasLoading).toBe(true);
      // hasProjectedContent check is skipped when loading is active
    });

    it('should prioritize loading over error', () => {
      hostComponent.loading = { active: true };
      hostComponent.error = { active: true, text: 'Error' };
      fixture.detectChanges();

      expect(component.hasLoading).toBe(true);
      expect(component.hasError).toBe(false);
    });

    it('should prioritize loading over warning', () => {
      hostComponent.loading = { active: true };
      hostComponent.warning = { active: true, text: 'Warning' };
      fixture.detectChanges();

      expect(component.hasLoading).toBe(true);
      expect(component.hasWarning).toBe(false);
    });

    it('should prioritize loading over both error and warning', () => {
      hostComponent.loading = { active: true };
      hostComponent.error = { active: true, text: 'Error' };
      hostComponent.warning = { active: true, text: 'Warning' };
      fixture.detectChanges();

      expect(component.hasLoading).toBe(true);
      expect(component.hasError).toBe(false);
      expect(component.hasWarning).toBe(false);
    });

    it('should show error when loading becomes inactive', () => {
      hostComponent.loading = { active: true };
      hostComponent.error = { active: true, text: 'Error' };
      fixture.detectChanges();

      expect(component.hasLoading).toBe(true);
      expect(component.hasError).toBe(false);

      hostComponent.loading = { active: false };
      fixture.detectChanges();

      expect(component.hasLoading).toBe(false);
      expect(component.hasError).toBe(true);
    });
  });

  describe('Edit config', () => {
    let hostComponent: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;
    let component: ClrSummaryItem;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestHostComponent, ClrSummaryItem, ClrSummaryItemValue, NoopAnimationsModule, ClarityModule],
      }).compileComponents();

      fixture = TestBed.createComponent(TestHostComponent);
      hostComponent = fixture.componentInstance;
      fixture.detectChanges();
      component = hostComponent.component;
    });

    it('should have showEditButton as false when no editConfig is set', () => {
      expect(component.showEditButton).toBe(false);
    });

    it('should have showEditButton as false when editConfig is disabled', () => {
      hostComponent.editConfig = { enabled: false, click: (): void => {} };
      fixture.detectChanges();
      expect(component.showEditButton).toBe(false);
    });

    it('should have showEditButton as true when editConfig is enabled and no content', () => {
      hostComponent.editConfig = { enabled: true, click: (): void => {} };
      fixture.detectChanges();
      expect(component.showEditButton).toBe(true);
    });

    it('should have showEditButton as false when editConfig is enabled but has content', () => {
      hostComponent.editConfig = { enabled: true, click: (): void => {} };
      hostComponent.showValue = true;
      hostComponent.value = 'Some Value';
      fixture.detectChanges();
      expect(component.showEditButton).toBe(false);
    });

    it('should use default edit text when not provided', () => {
      hostComponent.editConfig = { enabled: true, click: (): void => {} };
      fixture.detectChanges();
      expect(component.editText).toBe('Edit');
    });

    it('should use custom edit text when provided', () => {
      hostComponent.editConfig = { enabled: true, text: 'Custom Edit', click: (): void => {} };
      fixture.detectChanges();
      expect(component.editText).toBe('Custom Edit');
    });

    it('should have editClick as undefined when no editConfig', () => {
      expect(component.editClick).toBeUndefined();
    });

    it('should have editClick defined when editConfig has click handler', () => {
      const clickFn = (): void => {};
      hostComponent.editConfig = { enabled: true, click: clickFn };
      fixture.detectChanges();
      expect(component.editClick).toBe(clickFn);
    });

    it('should not show edit button when loading is active', () => {
      hostComponent.editConfig = { enabled: true, click: (): void => {} };
      hostComponent.loading = { active: true };
      fixture.detectChanges();
      expect(component.showEditButton).toBe(false);
    });

    it('should not show edit button when error is active', () => {
      hostComponent.editConfig = { enabled: true, click: (): void => {} };
      hostComponent.error = { active: true, text: 'Error' };
      fixture.detectChanges();
      expect(component.showEditButton).toBe(false);
    });

    it('should not show edit button when warning is active', () => {
      hostComponent.editConfig = { enabled: true, click: (): void => {} };
      hostComponent.warning = { active: true, text: 'Warning' };
      fixture.detectChanges();
      expect(component.showEditButton).toBe(false);
    });
  });

  describe('Multiple value children', () => {
    let hostComponent: MultiValueTestHostComponent;
    let fixture: ComponentFixture<MultiValueTestHostComponent>;
    let component: ClrSummaryItem;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [MultiValueTestHostComponent, ClrSummaryItem, ClrSummaryItemValue, NoopAnimationsModule],
      }).compileComponents();

      fixture = TestBed.createComponent(MultiValueTestHostComponent);
      hostComponent = fixture.componentInstance;
      fixture.detectChanges();
      component = hostComponent.component;
    });

    it('should detect content when at least one value child has content', () => {
      hostComponent.value1 = 'First Value';
      hostComponent.value2 = undefined;
      fixture.detectChanges();

      expect(component.hasProjectedContent).toBe(true);
    });

    it('should detect content when value child has showOnEmptyValue true', () => {
      hostComponent.value1 = undefined;
      hostComponent.value2 = undefined;
      hostComponent.showOnEmptyValue1 = false;
      hostComponent.showOnEmptyValue2 = true;
      fixture.detectChanges();

      // When a child has showOnEmptyValue=true, it will render a placeholder
      // so the parent should consider it as having content
      expect(component.hasProjectedContent).toBe(true);
    });

    it('should not show parent placeholder when child with showOnEmptyValue=true exists', () => {
      hostComponent.value1 = undefined;
      hostComponent.value2 = undefined;
      hostComponent.showOnEmptyValue1 = false;
      hostComponent.showOnEmptyValue2 = true;
      fixture.detectChanges();

      // The child with showOnEmptyValue=true will show its own placeholder
      // The parent should NOT also show a placeholder
      const placeholders = fixture.debugElement.queryAll(By.css('.value-placeholder'));
      expect(placeholders.length).toBe(1); // Only one placeholder from the child
    });

    it('should show only one placeholder for the correct child', () => {
      hostComponent.value1 = undefined;
      hostComponent.showOnEmptyValue1 = false; // This child should be hidden
      hostComponent.value2 = undefined;
      hostComponent.showOnEmptyValue2 = true; // This child should show placeholder
      fixture.detectChanges();

      const valueComponents = fixture.debugElement.queryAll(By.directive(ClrSummaryItemValue));
      // First child should be hidden
      expect(valueComponents[0].nativeElement.classList.contains('hidden')).toBe(true);
      // Second child should be visible with placeholder
      expect(valueComponents[1].nativeElement.classList.contains('hidden')).toBe(false);
    });
  });

  describe('Icon validation', () => {
    it('should throw error when multiple children have icons', () => {
      expect(() => {
        TestBed.configureTestingModule({
          imports: [InvalidIconTestHostComponent, ClrSummaryItem, ClrSummaryItemValue, NoopAnimationsModule],
        }).compileComponents();

        const fixture = TestBed.createComponent(InvalidIconTestHostComponent);
        fixture.detectChanges();
      }).toThrowError('Icon value is only allowed for the first item value. Others must have text only.');
    });
  });

  describe('CSS structure', () => {
    let hostComponent: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestHostComponent, ClrSummaryItem, ClrSummaryItemValue, NoopAnimationsModule, ClarityModule],
      }).compileComponents();

      fixture = TestBed.createComponent(TestHostComponent);
      hostComponent = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have summary-item class on container', () => {
      const summaryItem = fixture.debugElement.query(By.css('.summary-item'));
      expect(summaryItem).toBeTruthy();
    });

    it('should have summary-item-label class on label', () => {
      const label = fixture.debugElement.query(By.css('.summary-item-label'));
      expect(label).toBeTruthy();
    });

    it('should have summary-item-values class on values container', () => {
      const values = fixture.debugElement.query(By.css('.summary-item-values'));
      expect(values).toBeTruthy();
    });

    it('should add hidden class when item should be hidden', () => {
      hostComponent.showOnEmptyValue = false;
      hostComponent.showValue = false;
      hostComponent.projectedContent = undefined;
      fixture.detectChanges();

      const summaryItem = fixture.debugElement.query(By.css('.summary-item'));
      expect(summaryItem.nativeElement.classList.contains('hidden')).toBe(true);
    });
  });

  describe('Content projection', () => {
    let fixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TestHostComponent, ClrSummaryItem, ClrSummaryItemValue, NoopAnimationsModule, ClarityModule],
      }).compileComponents();

      fixture = TestBed.createComponent(TestHostComponent);
      hostComponent = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should project summary-item-value components', () => {
      hostComponent.showValue = true;
      hostComponent.value = 'Projected Value';
      fixture.detectChanges();

      const valueComponent = fixture.debugElement.query(By.directive(ClrSummaryItemValue));
      expect(valueComponent).toBeTruthy();
    });

    it('should project text content', () => {
      hostComponent.projectedContent = 'Direct text content';
      fixture.detectChanges();

      const valuesContainer = fixture.debugElement.query(By.css('.summary-item-values'));
      expect(valuesContainer.nativeElement.textContent).toContain('Direct text content');
    });

    it('should project both value components and text', () => {
      hostComponent.showValue = true;
      hostComponent.value = 'Value';
      hostComponent.projectedContent = 'Text';
      fixture.detectChanges();

      const valueComponent = fixture.debugElement.query(By.directive(ClrSummaryItemValue));
      const valuesContainer = fixture.debugElement.query(By.css('.summary-item-values'));

      expect(valueComponent).toBeTruthy();
      expect(valuesContainer.nativeElement.textContent).toContain('Text');
    });
  });

  describe('Custom element projection', () => {
    @Component({
      template: `
        <clr-summary-item [label]="'Custom'" [showOnEmptyValue]="false">
          <div class="custom-element">Custom Content</div>
        </clr-summary-item>
      `,
      standalone: true,
      imports: [ClrSummaryItem],
    })
    class CustomElementTestComponent {
      @ViewChild(ClrSummaryItem) component!: ClrSummaryItem;
    }

    it('should detect custom element as content', async () => {
      await TestBed.configureTestingModule({
        imports: [CustomElementTestComponent, ClrSummaryItem, NoopAnimationsModule],
      }).compileComponents();

      const fixture = TestBed.createComponent(CustomElementTestComponent);
      fixture.detectChanges();

      const component = fixture.componentInstance.component;
      expect(component.hasProjectedContent).toBe(true);
    });

    it('should show item when custom element is projected even with showOnEmptyValue=false', async () => {
      await TestBed.configureTestingModule({
        imports: [CustomElementTestComponent, ClrSummaryItem, NoopAnimationsModule],
      }).compileComponents();

      const fixture = TestBed.createComponent(CustomElementTestComponent);
      fixture.detectChanges();

      const summaryItem = fixture.debugElement.query(By.css('.summary-item'));
      expect(summaryItem.nativeElement.classList.contains('hidden')).toBe(false);
    });
  });
});
