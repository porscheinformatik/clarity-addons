import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ClrSummaryItemValue } from './summary-item-value';
import { ClarityModule } from '@clr/angular';

@Component({
  template: `
    <clr-summary-item-value
      [icon]="icon"
      [value]="value"
      [clickable]="clickable"
      (clicked)="clickedFn()"
      [tooltip]="tooltip"
      [href]="href"
      [target]="target"
    >
      @if (projectedContent) {
        <span>{{ projectedContent }}</span>
      }
    </clr-summary-item-value>
  `,
  standalone: true,
  imports: [ClrSummaryItemValue, ClarityModule],
})
class TestHostComponent {
  @ViewChild(ClrSummaryItemValue) component!: ClrSummaryItemValue;
  icon: string | undefined;
  value: string | undefined;
  tooltip: string | undefined;
  clickable: boolean | undefined;
  clickedFn: () => void;
  projectedContent: string | undefined;
  href: string | undefined;
  target: string | undefined;
}

@Component({
  template: ` <clr-summary-item-value [icon]="'pencil'" [value]="'Test Value'"></clr-summary-item-value> `,
  standalone: true,
  imports: [ClrSummaryItemValue, ClarityModule],
})
class TestHostInvalidComponent {
  @ViewChild(ClrSummaryItemValue) component!: ClrSummaryItemValue;
}

describe('SummaryItemValue', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let component: ClrSummaryItemValue;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, ClrSummaryItemValue, NoopAnimationsModule, ClarityModule],
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

    it('should have hasProjectedContent as false initially', () => {
      expect(component.isTextOverflowing).toBe(false);
    });

    it('should have tooltipSize on size md', () => {
      expect(component.tooltipSize).toBe('md');
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
    it('should return false when icon is set', () => {
      hostComponent.icon = 'pencil';
      hostComponent.value = undefined;
      hostComponent.projectedContent = undefined;
      fixture.detectChanges();
      expect(component.hasMeaningfulContent).toBe(false);
    });

    it('should return true when value is set', () => {
      hostComponent.value = 'Test Value';
      hostComponent.icon = undefined;
      hostComponent.projectedContent = undefined;
      fixture.detectChanges();
      expect(component.hasMeaningfulContent).toBe(true);
    });

    it('should return true when projected content is present', () => {
      hostComponent.icon = undefined;
      hostComponent.value = undefined;
      hostComponent.projectedContent = 'Projected Text';
      fixture.changeDetectorRef.detectChanges();
      component.checkProjectedContent(); // Manually trigger content check since MutationObserver doesn't fire in tests
      fixture.changeDetectorRef.detectChanges();
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
    it('should return false when icon is set', () => {
      hostComponent.icon = 'pencil';
      hostComponent.value = undefined;
      hostComponent.projectedContent = undefined;
      fixture.detectChanges();
      expect(component.shouldHide).toBe(false);
    });

    it('should return false when value is set', () => {
      hostComponent.value = 'Test Value';
      hostComponent.icon = undefined;
      hostComponent.projectedContent = undefined;
      fixture.detectChanges();
      expect(component.shouldHide).toBe(false);
    });

    it('should return false when projected content is present', () => {
      hostComponent.projectedContent = 'Projected Text';
      hostComponent.icon = undefined;
      hostComponent.value = undefined;
      fixture.changeDetectorRef.detectChanges();
      component.checkProjectedContent(); // Manually trigger content check since MutationObserver doesn't fire in tests
      fixture.changeDetectorRef.detectChanges();
      expect(component.shouldHide).toBe(false);
    });

    it('should return true when icon, value are not set and has no projected content', () => {
      hostComponent.value = undefined;
      hostComponent.icon = undefined;
      hostComponent.projectedContent = undefined;
      fixture.detectChanges();
      expect(component.shouldHide).toBe(true);
    });
  });

  describe('isHidden HostBinding', () => {
    it('should add hidden class when shouldHide is true', () => {
      hostComponent.value = undefined;
      hostComponent.icon = undefined;
      hostComponent.projectedContent = undefined;
      fixture.detectChanges();

      const hostElement = fixture.debugElement.query(By.directive(ClrSummaryItemValue));
      expect(hostElement.nativeElement.classList.contains('hidden')).toBe(true);
    });

    it('should not add hidden class when shouldHide is false', () => {
      hostComponent.value = 'Test Value';
      fixture.detectChanges();

      const hostElement = fixture.debugElement.query(By.directive(ClrSummaryItemValue));
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

    it('should render icon with click handler when clicked and clickable is provided', () => {
      const clickSpy = jasmine.createSpy('clickedFn');
      hostComponent.icon = 'pencil';
      hostComponent.clickable = true;
      hostComponent.clickedFn = clickSpy;
      fixture.detectChanges();

      const iconElement = fixture.debugElement.query(By.css('cds-icon.value-link'));
      expect(iconElement).toBeTruthy();

      iconElement.nativeElement.click();
      expect(clickSpy).toHaveBeenCalled();
    });

    it('should render icon without click styling when clicked handler without positive clickable value is provided', () => {
      const clickSpy = jasmine.createSpy('clickedFn');
      hostComponent.icon = 'pencil';
      hostComponent.clickable = false;
      hostComponent.clickedFn = clickSpy;
      fixture.detectChanges();

      const iconElement = fixture.debugElement.query(By.css('cds-icon.value-icon-neutral'));
      expect(iconElement).toBeTruthy();
    });

    it('should render icon without click styling when no clicked handler and no clickable value is provided', () => {
      hostComponent.icon = 'pencil';
      hostComponent.clickable = false;
      hostComponent.clickedFn = undefined;
      fixture.detectChanges();

      const iconElement = fixture.debugElement.query(By.css('cds-icon.value-icon-neutral'));
      expect(iconElement).toBeTruthy();
    });

    it('should render icon wrapped in <a> when href is provided', () => {
      hostComponent.icon = 'pencil';
      hostComponent.href = 'https://example.com';
      fixture.detectChanges();

      const anchorElement = fixture.debugElement.query(By.css('a.value-icon-link'));
      const iconElement = fixture.debugElement.query(By.css('a.value-icon-link cds-icon'));
      expect(anchorElement).toBeTruthy();
      expect(anchorElement.attributes['href']).toBe('https://example.com');
      expect(iconElement).toBeTruthy();
    });

    it('should set target on icon <a> wrapper when target is provided', () => {
      hostComponent.icon = 'pencil';
      hostComponent.href = 'https://example.com';
      hostComponent.target = '_blank';
      fixture.detectChanges();

      const anchorElement = fixture.debugElement.query(By.css('a.value-icon-link'));
      expect(anchorElement.attributes['target']).toBe('_blank');
    });

    it('should emit clicked when icon href and clickable are both set', () => {
      const clickSpy = jasmine.createSpy('clickedFn');
      hostComponent.icon = 'pencil';
      hostComponent.href = 'https://example.com';
      hostComponent.clickable = true;
      hostComponent.clickedFn = clickSpy;
      fixture.detectChanges();

      const anchorElement = fixture.debugElement.query(By.css('a.value-icon-link'));
      anchorElement.triggerEventHandler('click', new MouseEvent('click'));
      expect(clickSpy).toHaveBeenCalled();
    });

    it('should render tooltip on icon <a> wrapper when href and tooltip are both provided', () => {
      hostComponent.icon = 'pencil';
      hostComponent.href = 'https://example.com';
      hostComponent.tooltip = 'Edit';
      fixture.detectChanges();

      const tooltipElement = fixture.debugElement.query(By.css('clr-tooltip'));
      const anchorElement = fixture.debugElement.query(By.css('a.value-icon-link'));
      expect(tooltipElement).toBeTruthy();
      expect(anchorElement).toBeTruthy();
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

    it('should render value as link when clicked handler and positive clickable value is provided', () => {
      const clickSpy = jasmine.createSpy();
      hostComponent.value = 'Clickable Value';
      hostComponent.clickable = true;
      hostComponent.clickedFn = clickSpy;
      fixture.detectChanges();

      const linkElement = fixture.debugElement.query(By.css('.value-link'));
      expect(linkElement).toBeTruthy();

      linkElement.nativeElement.click();
      expect(clickSpy).toHaveBeenCalled();
    });

    it('should not render value as link when clicked handler but no positive clickable value is provided', () => {
      const clickSpy = jasmine.createSpy('clickedFn');
      hostComponent.value = 'Plain Value';
      hostComponent.clickable = false;
      hostComponent.clickedFn = clickSpy;
      fixture.detectChanges();

      const linkElement = fixture.debugElement.query(By.css('.value-link'));
      expect(linkElement).toBeFalsy();
    });

    it('should not render value as link when no clicked handler is provided', () => {
      hostComponent.value = 'Plain Value';
      hostComponent.clickable = false;
      hostComponent.clickedFn = undefined;
      fixture.detectChanges();

      const linkElement = fixture.debugElement.query(By.css('.value-link'));
      expect(linkElement).toBeFalsy();
    });
  });

  describe('href / target rendering', () => {
    it('should render an <a> element when href is provided', () => {
      hostComponent.value = 'Link Value';
      hostComponent.href = 'https://example.com';
      fixture.detectChanges();

      const anchorElement = fixture.debugElement.query(By.css('a.value.value-link'));
      expect(anchorElement).toBeTruthy();
      expect(anchorElement.attributes['href']).toBe('https://example.com');
    });

    it('should set target attribute on <a> when target is provided', () => {
      hostComponent.value = 'Link Value';
      hostComponent.href = 'https://example.com';
      hostComponent.target = '_blank';
      fixture.detectChanges();

      const anchorElement = fixture.debugElement.query(By.css('a.value.value-link'));
      expect(anchorElement).toBeTruthy();
      expect(anchorElement.attributes['target']).toBe('_blank');
    });

    it('should not set target attribute when target is not provided', () => {
      hostComponent.value = 'Link Value';
      hostComponent.href = 'https://example.com';
      hostComponent.target = undefined;
      fixture.detectChanges();

      const anchorElement = fixture.debugElement.query(By.css('a.value.value-link'));
      expect(anchorElement).toBeTruthy();
      expect(anchorElement.attributes['target']).toBeFalsy();
    });

    it('should emit clicked when href and clickable are both set and link is clicked', () => {
      const clickSpy = jasmine.createSpy('clickedFn');
      hostComponent.value = 'Link Value';
      hostComponent.href = 'https://example.com';
      hostComponent.clickable = true;
      hostComponent.clickedFn = clickSpy;
      fixture.detectChanges();

      const anchorElement = fixture.debugElement.query(By.css('a.value.value-link'));
      anchorElement.triggerEventHandler('click', new MouseEvent('click'));
      expect(clickSpy).toHaveBeenCalled();
    });

    it('should not emit clicked when href is set but clickable is false', () => {
      const clickSpy = jasmine.createSpy('clickedFn');
      hostComponent.value = 'Link Value';
      hostComponent.href = 'https://example.com';
      hostComponent.clickable = false;
      hostComponent.clickedFn = clickSpy;
      fixture.detectChanges();

      const anchorElement = fixture.debugElement.query(By.css('a.value.value-link'));
      anchorElement.triggerEventHandler('click', new MouseEvent('click'));
      expect(clickSpy).not.toHaveBeenCalled();
    });

    it('should render tooltip on <a> element when href and tooltip are both provided', () => {
      hostComponent.value = 'Link Value';
      hostComponent.href = 'https://example.com';
      hostComponent.tooltip = 'Open link';
      fixture.detectChanges();

      const tooltipElement = fixture.debugElement.query(By.css('clr-tooltip'));
      const anchorElement = fixture.debugElement.query(By.css('a.value.value-link'));
      expect(tooltipElement).toBeTruthy();
      expect(anchorElement).toBeTruthy();
    });

    it('should render <span> (not <a>) when href is not provided', () => {
      hostComponent.value = 'Plain Value';
      hostComponent.href = undefined;
      fixture.detectChanges();

      const anchorElement = fixture.debugElement.query(By.css('a.value'));
      const spanElement = fixture.debugElement.query(By.css('span.value'));
      expect(anchorElement).toBeFalsy();
      expect(spanElement).toBeTruthy();
    });
  });

  describe('projected content', () => {
    it('should return true when projected content is present', () => {
      hostComponent.icon = undefined;
      hostComponent.value = undefined;
      hostComponent.projectedContent = 'Projected Text';
      fixture.changeDetectorRef.detectChanges();
      component.checkProjectedContent(); // Manually trigger content check since MutationObserver doesn't fire in tests
      fixture.changeDetectorRef.detectChanges();
      expect(component.hasMeaningfulContent).toBe(true);
    });

    it('should render projected content when icon and value text are not provided', () => {
      hostComponent.icon = undefined;
      hostComponent.value = undefined;
      hostComponent.projectedContent = 'Projected Text';
      fixture.detectChanges();

      const projectedWrapper = fixture.debugElement.query(By.css('.projected-wrapper'));
      expect(projectedWrapper).toBeTruthy();
      expect(projectedWrapper.nativeElement.textContent.trim()).toBe('Projected Text');
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

    it('should not render tooltip content when tooltip is not provided', () => {
      hostComponent.value = 'Test Value';
      hostComponent.tooltip = undefined;
      fixture.detectChanges();

      const tooltipContent = fixture.debugElement.query(By.css('clr-tooltip-content'));
      expect(tooltipContent).toBeFalsy();
    });
  });

  describe('validation', () => {
    it('should throw error when both icon and value are set', () => {
      expect(() => {
        const invalidFixture = TestBed.createComponent(TestHostInvalidComponent);
        invalidFixture.detectChanges();
      }).toThrowError('SummaryItemValue: You cannot define both icon and value. Only one is allowed.');
    });
  });

  describe('HostBinding classes', () => {
    it('should add has-icon class when icon is set', () => {
      hostComponent.icon = 'pencil';
      fixture.detectChanges();

      const hostElement = fixture.debugElement.query(By.directive(ClrSummaryItemValue));
      expect(hostElement.nativeElement.classList.contains('has-icon')).toBe(true);
    });

    it('should add has-text class when value is set', () => {
      hostComponent.value = 'Test Value';
      fixture.detectChanges();

      const hostElement = fixture.debugElement.query(By.directive(ClrSummaryItemValue));
      expect(hostElement.nativeElement.classList.contains('has-text')).toBe(true);
    });

    it('should not have has-icon class when no icon', () => {
      hostComponent.icon = undefined;
      fixture.detectChanges();

      const hostElement = fixture.debugElement.query(By.directive(ClrSummaryItemValue));
      expect(hostElement.nativeElement.classList.contains('has-icon')).toBe(false);
    });

    it('should not have has-text class when no value', () => {
      hostComponent.value = undefined;
      fixture.detectChanges();

      const hostElement = fixture.debugElement.query(By.directive(ClrSummaryItemValue));
      expect(hostElement.nativeElement.classList.contains('has-text')).toBe(false);
    });
  });

  describe('priority of content types', () => {
    it('should prioritize icon over projected content', () => {
      hostComponent.icon = 'pencil';
      hostComponent.projectedContent = 'Projected Text';
      fixture.detectChanges();

      const iconElement = fixture.debugElement.query(By.css('cds-icon'));
      expect(iconElement).toBeTruthy();
    });

    it('should prioritize value over projected content', () => {
      hostComponent.value = 'Test Value';
      hostComponent.projectedContent = 'Projected Text';
      fixture.detectChanges();

      const valueElement = fixture.debugElement.query(By.css('.value'));
      expect(valueElement).toBeTruthy();
      expect(valueElement.nativeElement.textContent.trim()).toBe('Test Value');
    });
  });
});
