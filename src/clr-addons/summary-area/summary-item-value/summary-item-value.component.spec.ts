import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ClrSummaryItemValueComponent } from './summary-item-value.component';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';

// Test host component for testing projected content
@Component({
  template: `
    <clr-summary-item-value
      [value]="value"
      [icon]="icon"
      [click]="clickFn"
      [tooltip]="tooltip"
      [showOnEmptyValue]="showOnEmptyValue"
    >
      <ng-container *ngIf="projectedContent">{{ projectedContent }}</ng-container>
    </clr-summary-item-value>
  `,
  standalone: true,
  imports: [CommonModule, ClrSummaryItemValueComponent, ClarityModule],
})
class TestHostComponent {
  @ViewChild(ClrSummaryItemValueComponent) component!: ClrSummaryItemValueComponent;
  value: string | undefined;
  icon: string | undefined;
  clickFn: (() => void) | undefined;
  tooltip: string | undefined;
  showOnEmptyValue = true;
  projectedContent: string | undefined;
}

describe('SummaryItemValueComponent', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let component: ClrSummaryItemValueComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, ClrSummaryItemValueComponent, NoopAnimationsModule, ClarityModule],
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
  });

  describe('hasIcon', () => {
    it('should return true when icon is set', () => {
      hostComponent.icon = 'pencil';
      fixture.detectChanges();
      expect(component.hasIcon).toBe(true);
    });

    it('should return false when icon is undefined', () => {
      hostComponent.icon = undefined;
      fixture.detectChanges();
      expect(component.hasIcon).toBe(false);
    });

    it('should return false when icon is empty string', () => {
      hostComponent.icon = '';
      fixture.detectChanges();
      expect(component.hasIcon).toBe(false);
    });

    it('should return false when icon is whitespace only', () => {
      hostComponent.icon = '   ';
      fixture.detectChanges();
      expect(component.hasIcon).toBe(false);
    });
  });

  describe('hasText', () => {
    it('should return true when value is set', () => {
      hostComponent.value = 'Test Value';
      fixture.detectChanges();
      expect(component.hasText).toBe(true);
    });

    it('should return false when value is undefined', () => {
      hostComponent.value = undefined;
      fixture.detectChanges();
      expect(component.hasText).toBe(false);
    });

    it('should return false when value is empty string', () => {
      hostComponent.value = '';
      fixture.detectChanges();
      expect(component.hasText).toBe(false);
    });

    it('should return false when value is whitespace only', () => {
      hostComponent.value = '   ';
      fixture.detectChanges();
      expect(component.hasText).toBe(false);
    });
  });

  describe('hasMeaningfulContent', () => {
    it('should return true when icon is set', () => {
      hostComponent.icon = 'pencil';
      fixture.detectChanges();
      expect(component.hasMeaningfulContent).toBe(true);
    });

    it('should return true when value is set', () => {
      hostComponent.value = 'Test Value';
      fixture.detectChanges();
      expect(component.hasMeaningfulContent).toBe(true);
    });

    it('should return true when projected content is present', () => {
      hostComponent.projectedContent = 'Projected Text';
      fixture.detectChanges();
      expect(component.hasMeaningfulContent).toBe(true);
    });

    it('should return false when no content is present', () => {
      hostComponent.value = undefined;
      hostComponent.icon = undefined;
      hostComponent.projectedContent = undefined;
      fixture.detectChanges();
      expect(component.hasMeaningfulContent).toBe(false);
    });
  });

  describe('shouldHide', () => {
    it('should return false when showOnEmptyValue is true', () => {
      hostComponent.showOnEmptyValue = true;
      fixture.detectChanges();
      expect(component.shouldHide).toBe(false);
    });

    it('should return true when showOnEmptyValue is false and no content', () => {
      hostComponent.showOnEmptyValue = false;
      hostComponent.value = undefined;
      hostComponent.icon = undefined;
      hostComponent.projectedContent = undefined;
      fixture.detectChanges();
      expect(component.shouldHide).toBe(true);
    });

    it('should return false when showOnEmptyValue is false but has value', () => {
      hostComponent.showOnEmptyValue = false;
      hostComponent.value = 'Test Value';
      fixture.detectChanges();
      expect(component.shouldHide).toBe(false);
    });

    it('should return false when showOnEmptyValue is false but has icon', () => {
      hostComponent.showOnEmptyValue = false;
      hostComponent.icon = 'pencil';
      fixture.detectChanges();
      expect(component.shouldHide).toBe(false);
    });

    it('should return false when showOnEmptyValue is false but has projected content', () => {
      hostComponent.showOnEmptyValue = false;
      hostComponent.projectedContent = 'Projected Text';
      fixture.detectChanges();
      expect(component.shouldHide).toBe(false);
    });
  });

  describe('showPlaceholder', () => {
    it('should return true when showOnEmptyValue is true and no content', () => {
      hostComponent.showOnEmptyValue = true;
      hostComponent.value = undefined;
      hostComponent.icon = undefined;
      hostComponent.projectedContent = undefined;
      fixture.detectChanges();
      expect(component.showPlaceholder).toBe(true);
    });

    it('should return false when showOnEmptyValue is false', () => {
      hostComponent.showOnEmptyValue = false;
      fixture.detectChanges();
      expect(component.showPlaceholder).toBe(false);
    });

    it('should return false when has value', () => {
      hostComponent.showOnEmptyValue = true;
      hostComponent.value = 'Test Value';
      fixture.detectChanges();
      expect(component.showPlaceholder).toBe(false);
    });

    it('should return false when has icon', () => {
      hostComponent.showOnEmptyValue = true;
      hostComponent.icon = 'pencil';
      fixture.detectChanges();
      expect(component.showPlaceholder).toBe(false);
    });
  });

  describe('isHidden HostBinding', () => {
    it('should add hidden class when shouldHide is true', () => {
      hostComponent.showOnEmptyValue = false;
      hostComponent.value = undefined;
      hostComponent.icon = undefined;
      fixture.detectChanges();

      const hostElement = fixture.debugElement.query(By.directive(ClrSummaryItemValueComponent));
      expect(hostElement.nativeElement.classList.contains('hidden')).toBe(true);
    });

    it('should not add hidden class when shouldHide is false', () => {
      hostComponent.showOnEmptyValue = true;
      fixture.detectChanges();

      const hostElement = fixture.debugElement.query(By.directive(ClrSummaryItemValueComponent));
      expect(hostElement.nativeElement.classList.contains('hidden')).toBe(false);
    });
  });

  describe('icon rendering', () => {
    it('should render icon when icon is set', () => {
      hostComponent.icon = 'pencil';
      fixture.detectChanges();

      const iconElement = fixture.debugElement.query(By.css('cds-icon'));
      expect(iconElement).toBeTruthy();
      expect(iconElement.attributes['shape']).toBe('pencil');
    });

    it('should render icon with click handler when click is provided', () => {
      const clickSpy = jasmine.createSpy('clickFn');
      hostComponent.icon = 'pencil';
      hostComponent.clickFn = clickSpy;
      fixture.detectChanges();

      const iconElement = fixture.debugElement.query(By.css('cds-icon.value-link'));
      expect(iconElement).toBeTruthy();

      iconElement.nativeElement.click();
      expect(clickSpy).toHaveBeenCalled();
    });

    it('should render icon without click styling when no click handler', () => {
      hostComponent.icon = 'pencil';
      hostComponent.clickFn = undefined;
      fixture.detectChanges();

      const iconElement = fixture.debugElement.query(By.css('cds-icon.value-icon-neutral'));
      expect(iconElement).toBeTruthy();
    });
  });

  describe('value rendering', () => {
    it('should render value text when value is set', () => {
      hostComponent.value = 'Test Value';
      fixture.detectChanges();

      const valueElement = fixture.debugElement.query(By.css('.value'));
      expect(valueElement).toBeTruthy();
      expect(valueElement.nativeElement.textContent.trim()).toBe('Test Value');
    });

    it('should render value as link when click is provided', () => {
      const clickSpy = jasmine.createSpy('clickFn');
      hostComponent.value = 'Clickable Value';
      hostComponent.clickFn = clickSpy;
      fixture.detectChanges();

      const linkElement = fixture.debugElement.query(By.css('.value-link'));
      expect(linkElement).toBeTruthy();

      linkElement.nativeElement.click();
      expect(clickSpy).toHaveBeenCalled();
    });

    it('should not render value as link when no click handler', () => {
      hostComponent.value = 'Plain Value';
      hostComponent.clickFn = undefined;
      fixture.detectChanges();

      const linkElement = fixture.debugElement.query(By.css('.value-link'));
      expect(linkElement).toBeFalsy();
    });
  });

  describe('placeholder rendering', () => {
    it('should render placeholder when no content and showOnEmptyValue is true', () => {
      hostComponent.showOnEmptyValue = true;
      hostComponent.value = undefined;
      hostComponent.icon = undefined;
      hostComponent.projectedContent = undefined;
      fixture.detectChanges();

      const placeholder = fixture.debugElement.query(By.css('.value-placeholder'));
      expect(placeholder).toBeTruthy();
      expect(placeholder.nativeElement.textContent.trim()).toBe('—');
    });

    it('should not render placeholder when showOnEmptyValue is false', () => {
      hostComponent.showOnEmptyValue = false;
      hostComponent.value = undefined;
      hostComponent.icon = undefined;
      fixture.detectChanges();

      const placeholder = fixture.debugElement.query(By.css('.value-placeholder'));
      expect(placeholder).toBeFalsy();
    });

    it('should not render placeholder when has value', () => {
      hostComponent.showOnEmptyValue = true;
      hostComponent.value = 'Test Value';
      fixture.detectChanges();

      const placeholder = fixture.debugElement.query(By.css('.value-placeholder'));
      expect(placeholder).toBeFalsy();
    });
  });

  describe('projected content', () => {
    it('should detect projected content', () => {
      hostComponent.projectedContent = 'Projected Text';
      fixture.detectChanges();

      expect(component.hasProjectedContent).toBe(true);
    });

    it('should render projected content', () => {
      hostComponent.projectedContent = 'Projected Text';
      fixture.detectChanges();

      const projectedWrapper = fixture.debugElement.query(By.css('.projected-wrapper'));
      expect(projectedWrapper).toBeTruthy();
      expect(projectedWrapper.nativeElement.textContent.trim()).toBe('Projected Text');
    });

    it('should not show placeholder when projected content exists', () => {
      hostComponent.showOnEmptyValue = true;
      hostComponent.projectedContent = 'Projected Text';
      fixture.detectChanges();

      const placeholder = fixture.debugElement.query(By.css('.value-placeholder'));
      expect(placeholder).toBeFalsy();
    });
  });

  describe('tooltip', () => {
    it('should render tooltip for icon when tooltip is provided', () => {
      hostComponent.icon = 'pencil';
      hostComponent.tooltip = 'Edit this item';
      fixture.detectChanges();

      const tooltipTrigger = fixture.debugElement.query(By.css('clr-tooltip'));
      expect(tooltipTrigger).toBeTruthy();
    });

    it('should render tooltip for value when tooltip is provided', () => {
      hostComponent.value = 'Test Value';
      hostComponent.tooltip = 'Full value text';
      fixture.detectChanges();

      const tooltipTrigger = fixture.debugElement.query(By.css('clr-tooltip'));
      expect(tooltipTrigger).toBeTruthy();
    });

    it('should not render tooltip when tooltip is not provided', () => {
      hostComponent.value = 'Test Value';
      hostComponent.tooltip = undefined;
      fixture.detectChanges();

      const tooltipTrigger = fixture.debugElement.query(By.css('clr-tooltip'));
      expect(tooltipTrigger).toBeFalsy();
    });
  });

  describe('validation', () => {
    it('should throw error when both icon and value are set', () => {
      @Component({
        template: `<clr-summary-item-value [value]="'text'" [icon]="'pencil'"></clr-summary-item-value>`,
        standalone: true,
        imports: [ClrSummaryItemValueComponent],
      })
      class InvalidTestComponent {}

      TestBed.configureTestingModule({
        imports: [InvalidTestComponent, NoopAnimationsModule],
      });

      expect(() => {
        const invalidFixture = TestBed.createComponent(InvalidTestComponent);
        invalidFixture.detectChanges();
      }).toThrowError('SummaryItemValueComponent: You cannot define both icon and value. Only one is allowed.');
    });
  });

  describe('HostBinding classes', () => {
    it('should add has-icon class when icon is set', () => {
      hostComponent.icon = 'pencil';
      fixture.detectChanges();

      const hostElement = fixture.debugElement.query(By.directive(ClrSummaryItemValueComponent));
      expect(hostElement.nativeElement.classList.contains('has-icon')).toBe(true);
    });

    it('should add has-text class when value is set', () => {
      hostComponent.value = 'Test Value';
      fixture.detectChanges();

      const hostElement = fixture.debugElement.query(By.directive(ClrSummaryItemValueComponent));
      expect(hostElement.nativeElement.classList.contains('has-text')).toBe(true);
    });

    it('should not have has-icon class when no icon', () => {
      hostComponent.icon = undefined;
      fixture.detectChanges();

      const hostElement = fixture.debugElement.query(By.directive(ClrSummaryItemValueComponent));
      expect(hostElement.nativeElement.classList.contains('has-icon')).toBe(false);
    });

    it('should not have has-text class when no value', () => {
      hostComponent.value = undefined;
      fixture.detectChanges();

      const hostElement = fixture.debugElement.query(By.directive(ClrSummaryItemValueComponent));
      expect(hostElement.nativeElement.classList.contains('has-text')).toBe(false);
    });
  });

  describe('keyboard accessibility', () => {
    it('should trigger click on Enter keydown for icon with click handler', () => {
      const clickSpy = jasmine.createSpy('clickFn');
      hostComponent.icon = 'pencil';
      hostComponent.clickFn = clickSpy;
      fixture.detectChanges();

      const iconElement = fixture.debugElement.query(By.css('cds-icon.value-link'));
      iconElement.triggerEventHandler('keydown.enter', {});
      expect(clickSpy).toHaveBeenCalled();
    });

    it('should trigger click on Enter keydown for value with click handler', () => {
      const clickSpy = jasmine.createSpy('clickFn');
      hostComponent.value = 'Clickable Value';
      hostComponent.clickFn = clickSpy;
      fixture.detectChanges();

      const valueElement = fixture.debugElement.query(By.css('.value-link'));
      valueElement.triggerEventHandler('keydown.enter', {});
      expect(clickSpy).toHaveBeenCalled();
    });

    it('should have tabindex on clickable icon', () => {
      hostComponent.icon = 'pencil';
      hostComponent.clickFn = (): void => {};
      fixture.detectChanges();

      const iconElement = fixture.debugElement.query(By.css('cds-icon.value-link'));
      expect(iconElement.attributes['tabindex']).toBe('0');
    });
  });

  describe('priority of content types', () => {
    it('should prioritize icon over value', () => {
      hostComponent.icon = 'pencil';
      hostComponent.value = undefined;
      fixture.detectChanges();

      const iconElement = fixture.debugElement.query(By.css('cds-icon'));
      const valueElement = fixture.debugElement.query(By.css('.value:not(.value-placeholder)'));
      expect(iconElement).toBeTruthy();
      expect(valueElement).toBeFalsy();
    });

    it('should prioritize value over projected content', () => {
      hostComponent.value = 'Test Value';
      hostComponent.projectedContent = 'Projected Text';
      fixture.detectChanges();

      const valueElement = fixture.debugElement.query(By.css('.value:not(.value-placeholder)'));
      expect(valueElement).toBeTruthy();
      expect(valueElement.nativeElement.textContent.trim()).toBe('Test Value');
    });
  });
});
