import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ClrSummaryAreaToggle } from './summary-area-toggle';
import { ClrSummaryAreaStateService } from '../summary-area/summary-area-state.service';
import { ClarityModule } from '@clr/angular';

class MockSummaryAreaStateService {
  private readonly collapsedMap = new Map<string, ReturnType<typeof signal<boolean>>>();
  private readonly defaultKey = 'clrSummaryAreaCollapsed';

  public collapsed(key?: string): ReturnType<typeof signal<boolean>> {
    const storageKey = key || this.defaultKey;
    if (!this.collapsedMap.has(storageKey)) {
      this.collapsedMap.set(storageKey, signal(false));
    }
    return this.collapsedMap.get(storageKey)!;
  }

  public toggle(key?: string): void {
    const collapsedSignal = this.collapsed(key);
    collapsedSignal.update(value => !value);
  }

  public setCollapsed(key: string | undefined, value: boolean): void {
    this.collapsed(key).set(value);
  }
}

@Component({
  template: ` <clr-summary-area-toggle
    [disabled]="disabled"
    [ariaLabel]="'Toggle Summary Area Aria Label'"
    (summaryToggle)="onToggle()"
  ></clr-summary-area-toggle>`,
  standalone: true,
  imports: [ClrSummaryAreaToggle],
})
class TestHostComponent {
  @ViewChild(ClrSummaryAreaToggle) component!: ClrSummaryAreaToggle;
  disabled = false;
  toggleCount = 0;

  onToggle(): void {
    this.toggleCount++;
  }
}

describe('SummaryAreaToggle', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let component: ClrSummaryAreaToggle;
  let mockStateService: MockSummaryAreaStateService;

  beforeEach(async () => {
    mockStateService = new MockSummaryAreaStateService();

    await TestBed.configureTestingModule({
      imports: [TestHostComponent, ClrSummaryAreaToggle, NoopAnimationsModule, ClarityModule],
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

    it('should have default disabled as false', () => {
      expect(component.disabled()).toBe(false);
    });

    it('should have ariaLabel defined', () => {
      expect(component.ariaLabel()).toBe('Toggle Summary Area Aria Label');
    });
  });

  describe('button rendering', () => {
    it('should render a button element', () => {
      const button = fixture.debugElement.query(By.css('button.summary-area-toggle'));
      expect(button).toBeTruthy();
    });

    it('should have type="button" attribute', () => {
      const button = fixture.debugElement.query(By.css('button'));
      expect(button.attributes['type']).toBe('button');
    });

    it('should render cds-icon inside button', () => {
      const icon = fixture.debugElement.query(By.css('cds-icon'));
      expect(icon).toBeTruthy();
    });

    it('should have correct icon shape', () => {
      const icon = fixture.debugElement.query(By.css('cds-icon'));
      expect(icon.attributes['shape']).toBe('angle-double');
    });

    it('should have correct icon size', () => {
      const icon = fixture.debugElement.query(By.css('cds-icon'));
      expect(icon.attributes['size']).toBe('20');
    });

    it('should have correct icon direction', () => {
      const icon = fixture.debugElement.query(By.css('cds-icon'));
      expect(icon.attributes['direction']).toBe('up');
    });
  });

  describe('disabled state', () => {
    it('should not be disabled by default', () => {
      const button = fixture.debugElement.query(By.css('button'));
      expect(button.nativeElement.disabled).toBe(false);
    });

    it('should be disabled when disabled input is true', () => {
      hostComponent.disabled = true;
      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('button'));
      expect(button.nativeElement.disabled).toBe(true);
    });

    it('should not toggle when disabled', () => {
      hostComponent.disabled = true;
      fixture.detectChanges();

      const initialCollapsed = mockStateService.collapsed();
      component.handleToggle();

      expect(mockStateService.collapsed()).toBe(initialCollapsed);
    });

    it('should not emit summaryToggle when disabled', () => {
      hostComponent.disabled = true;
      fixture.detectChanges();

      component.handleToggle();

      expect(hostComponent.toggleCount).toBe(0);
    });
  });

  describe('collapsed state', () => {
    it('should reflect collapsed state from service', () => {
      mockStateService.setCollapsed(undefined, true);
      expect(component.collapsed()).toBe(true);

      mockStateService.setCollapsed(undefined, false);
      expect(component.collapsed()).toBe(false);
    });

    it('should add icon-rotated class when collapsed', () => {
      mockStateService.setCollapsed(undefined, true);
      fixture.detectChanges();

      const icon = fixture.debugElement.query(By.css('cds-icon'));
      expect(icon.nativeElement.classList.contains('icon-rotated')).toBe(true);
    });

    it('should not have icon-rotated class when not collapsed', () => {
      mockStateService.setCollapsed(undefined, false);
      fixture.detectChanges();

      const icon = fixture.debugElement.query(By.css('cds-icon'));
      expect(icon.nativeElement.classList.contains('icon-rotated')).toBe(false);
    });
  });

  describe('aria attributes', () => {
    it('should have aria-label attribute', () => {
      const button = fixture.debugElement.query(By.css('button'));
      expect(button.attributes['aria-label']).toBe('Toggle Summary Area Aria Label');
    });

    it('should have aria-pressed="true" when not collapsed', () => {
      mockStateService.setCollapsed(undefined, false);
      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('button'));
      expect(button.attributes['aria-pressed']).toBe('true');
    });

    it('should have aria-pressed="false" when collapsed', () => {
      mockStateService.setCollapsed(undefined, true);
      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('button'));
      expect(button.attributes['aria-pressed']).toBe('false');
    });
  });

  describe('handleToggle', () => {
    it('should toggle state when called', () => {
      mockStateService.setCollapsed(undefined, false);
      component.handleToggle();
      expect(mockStateService.collapsed()()).toBe(true);

      component.handleToggle();
      expect(mockStateService.collapsed()()).toBe(false);
    });

    it('should emit summaryToggle event when toggled', () => {
      component.handleToggle();
      expect(hostComponent.toggleCount).toBe(1);
    });

    it('should emit summaryToggle event on each toggle', () => {
      component.handleToggle();
      component.handleToggle();
      component.handleToggle();
      expect(hostComponent.toggleCount).toBe(3);
    });

    it('should prevent default event behavior', () => {
      const mockEvent = jasmine.createSpyObj('Event', ['preventDefault']);
      component.handleToggle(mockEvent);
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it('should work without event parameter', () => {
      expect(() => component.handleToggle()).not.toThrow();
    });
  });

  describe('click interaction', () => {
    it('should toggle when button is clicked', () => {
      mockStateService.setCollapsed(undefined, false);
      fixture.detectChanges();

      const button = fixture.debugElement.query(By.css('button'));
      button.nativeElement.click();
      fixture.detectChanges();

      expect(mockStateService.collapsed()()).toBe(true);
    });

    it('should emit summaryToggle when button is clicked', () => {
      const button = fixture.debugElement.query(By.css('button'));
      button.nativeElement.click();

      expect(hostComponent.toggleCount).toBe(1);
    });

    it('should not toggle when button is clicked while disabled', () => {
      hostComponent.disabled = true;
      fixture.detectChanges();

      const initialCollapsed = mockStateService.collapsed();

      // Manually trigger handleToggle since disabled buttons don't fire click events
      component.handleToggle();

      expect(mockStateService.collapsed()).toBe(initialCollapsed);
    });
  });

  describe('keyboard interaction', () => {
    it('should toggle on Enter key', () => {
      mockStateService.setCollapsed(undefined, false);
      const event = new KeyboardEvent('keydown', { key: 'Enter' });

      component.handleKeydown(event);

      expect(mockStateService.collapsed()()).toBe(true);
    });

    it('should toggle on Space key', () => {
      mockStateService.setCollapsed(undefined, false);
      const event = new KeyboardEvent('keydown', { key: ' ' });

      component.handleKeydown(event);

      expect(mockStateService.collapsed()()).toBe(true);
    });

    it('should not toggle on other keys', () => {
      mockStateService.setCollapsed(undefined, false);
      const event = new KeyboardEvent('keydown', { key: 'Tab' });

      component.handleKeydown(event);

      expect(mockStateService.collapsed()()).toBe(false);
    });

    it('should emit summaryToggle on Enter key', () => {
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      component.handleKeydown(event);

      expect(hostComponent.toggleCount).toBe(1);
    });

    it('should emit summaryToggle on Space key', () => {
      const event = new KeyboardEvent('keydown', { key: ' ' });
      component.handleKeydown(event);

      expect(hostComponent.toggleCount).toBe(1);
    });

    it('should not emit summaryToggle on other keys', () => {
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      component.handleKeydown(event);

      expect(hostComponent.toggleCount).toBe(0);
    });

    it('should not toggle on Enter key when disabled', () => {
      hostComponent.disabled = true;
      fixture.detectChanges();

      const initialCollapsed = mockStateService.collapsed()();
      const event = new KeyboardEvent('keydown', { key: 'Enter' });

      component.handleKeydown(event);

      expect(mockStateService.collapsed()()).toBe(initialCollapsed);
    });
  });

  describe('CSS classes', () => {
    it('should have summary-area-toggle class on button', () => {
      const button = fixture.debugElement.query(By.css('button'));
      expect(button.nativeElement.classList.contains('summary-area-toggle')).toBe(true);
    });

    it('should have icon-rotate class on icon', () => {
      const icon = fixture.debugElement.query(By.css('cds-icon'));
      expect(icon.nativeElement.classList.contains('icon-rotate')).toBe(true);
    });

    it('should have summary-area-icon class on icon', () => {
      const icon = fixture.debugElement.query(By.css('cds-icon'));
      expect(icon.nativeElement.classList.contains('summary-area-icon')).toBe(true);
    });
  });

  describe('integration with SummaryAreaStateService', () => {
    it('should call state.toggle() when toggling', () => {
      spyOn(mockStateService, 'toggle').and.callThrough();
      component.handleToggle();
      expect(mockStateService.toggle).toHaveBeenCalled();
    });

    it('should not call state.toggle() when disabled', () => {
      hostComponent.disabled = true;
      fixture.detectChanges();

      spyOn(mockStateService, 'toggle');
      component.handleToggle();
      expect(mockStateService.toggle).not.toHaveBeenCalled();
    });
  });
});

describe('SummaryAreaToggleComponent - standalone tests', () => {
  let component: ClrSummaryAreaToggle;
  let fixture: ComponentFixture<ClrSummaryAreaToggle>;
  let mockStateService: MockSummaryAreaStateService;

  beforeEach(async () => {
    mockStateService = new MockSummaryAreaStateService();

    await TestBed.configureTestingModule({
      imports: [ClrSummaryAreaToggle, NoopAnimationsModule, ClarityModule],
      providers: [{ provide: ClrSummaryAreaStateService, useValue: mockStateService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ClrSummaryAreaToggle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create standalone component', () => {
    expect(component).toBeTruthy();
  });

  it('should have summaryToggle output', () => {
    expect(component.summaryToggle).toBeTruthy();
  });

  it('should emit from summaryToggle on toggle', () => {
    let emitted = false;
    component.summaryToggle.subscribe(() => {
      emitted = true;
    });

    component.handleToggle();

    expect(emitted).toBe(true);
  });
});

@Component({
  template: `<clr-summary-area-toggle
    [localStorageKey]="storageKey"
    (summaryToggle)="onToggle()"
  ></clr-summary-area-toggle>`,
  standalone: true,
  imports: [ClrSummaryAreaToggle],
})
class LocalStorageKeyTestHostComponent {
  @ViewChild(ClrSummaryAreaToggle) component!: ClrSummaryAreaToggle;
  storageKey = 'customStorageKey';
  toggleCount = 0;

  onToggle(): void {
    this.toggleCount++;
  }
}

describe('SummaryAreaToggleComponent - localStorageKey tests', () => {
  let hostComponent: LocalStorageKeyTestHostComponent;
  let fixture: ComponentFixture<LocalStorageKeyTestHostComponent>;
  let component: ClrSummaryAreaToggle;
  let mockStateService: MockSummaryAreaStateService;

  beforeEach(async () => {
    mockStateService = new MockSummaryAreaStateService();

    await TestBed.configureTestingModule({
      imports: [LocalStorageKeyTestHostComponent, ClrSummaryAreaToggle, NoopAnimationsModule, ClarityModule],
      providers: [{ provide: ClrSummaryAreaStateService, useValue: mockStateService }],
    }).compileComponents();

    fixture = TestBed.createComponent(LocalStorageKeyTestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
    component = hostComponent.component;
  });

  it('should have default localStorageKey when not provided', async () => {
    // Create a new component without custom key
    const defaultFixture = TestBed.createComponent(ClrSummaryAreaToggle);
    defaultFixture.detectChanges();
    expect(defaultFixture.componentInstance.localStorageKey()).toBe('clrSummaryAreaCollapsed');
  });

  it('should accept custom localStorageKey input', () => {
    expect(component.localStorageKey()).toBe('customStorageKey');
  });

  it('should use custom localStorageKey when toggling', () => {
    spyOn(mockStateService, 'toggle').and.callThrough();
    component.handleToggle();
    expect(mockStateService.toggle).toHaveBeenCalledWith('customStorageKey');
  });

  it('should use custom localStorageKey when reading collapsed state', () => {
    spyOn(mockStateService, 'collapsed').and.callThrough();
    component.collapsed();
    expect(mockStateService.collapsed).toHaveBeenCalledWith('customStorageKey');
  });

  it('should maintain separate collapsed states for different keys', () => {
    // Set custom key to collapsed
    mockStateService.setCollapsed('customStorageKey', true);
    // Set default key to not collapsed
    mockStateService.setCollapsed('clrSummaryAreaCollapsed', false);

    expect(component.collapsed()).toBe(true);

    // Change to different key
    hostComponent.storageKey = 'clrSummaryAreaCollapsed';
    fixture.detectChanges();

    expect(component.collapsed()).toBe(false);
  });

  it('should toggle only the state for its own localStorageKey', () => {
    // Initialize both keys
    mockStateService.setCollapsed('customStorageKey', false);
    mockStateService.setCollapsed('otherKey', false);

    component.handleToggle();

    expect(mockStateService.collapsed('customStorageKey')()).toBe(true);
    expect(mockStateService.collapsed('otherKey')()).toBe(false);
  });
});
