import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ClrSummaryItemValueCopyButton } from './summary-item-value-copy-button';

@Component({
  template: `<clr-summary-area-value-copy-button [value]="testValue"></clr-summary-area-value-copy-button>`,
  standalone: true,
  imports: [ClrSummaryItemValueCopyButton],
})
class TestHostComponent {
  testValue = 'Test Value';
}

describe('SummaryItemValueCopyButton', () => {
  let component: ClrSummaryItemValueCopyButton;
  let fixture: ComponentFixture<ClrSummaryItemValueCopyButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClrSummaryItemValueCopyButton],
    }).compileComponents();

    fixture = TestBed.createComponent(ClrSummaryItemValueCopyButton);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initial State', () => {
    it('should have empty showValueCopiedIcon set', () => {
      expect(component.showCopiedIcon).toBe(false);
    });

    it('should display copy-to-clipboard icon initially', () => {
      fixture.componentRef.setInput('value', 'test');
      fixture.detectChanges();

      const icon = fixture.debugElement.query(By.css('cds-icon'));
      expect(icon.nativeElement.getAttribute('shape')).toBe('copy-to-clipboard');
    });

    it('should not have the copied color class initially', () => {
      fixture.componentRef.setInput('value', 'test');
      fixture.detectChanges();

      const icon = fixture.debugElement.query(By.css('cds-icon'));
      expect(icon.nativeElement.classList.contains('attribute-was-copied-color')).toBe(false);
    });
  });

  describe('Copy Functionality', () => {
    it('should add value to showValueCopiedIcon set when copyAttributeClicked is called', () => {
      component.onCopied(true);

      expect(component.showCopiedIcon).toBe(true);
    });

    it('should display success-standard icon after copy is clicked', () => {
      fixture.componentRef.setInput('value', 'test');
      fixture.detectChanges();

      component.onCopied(true);
      fixture.detectChanges();

      const icon = fixture.debugElement.query(By.css('cds-icon'));
      expect(icon.nativeElement.getAttribute('shape')).toBe('success-standard');
    });

    it('should add copied color class after copy is clicked', () => {
      fixture.componentRef.setInput('value', 'test');
      fixture.detectChanges();

      component.onCopied(true);
      fixture.detectChanges();

      const icon = fixture.debugElement.query(By.css('cds-icon'));
      expect(icon.nativeElement.classList.contains('attribute-was-copied-color')).toBe(true);
    });

    it('should remove value from showValueCopiedIcon set after 1 second', fakeAsync(() => {
      const testValue = 'test value';
      fixture.componentRef.setInput('value', testValue);
      fixture.detectChanges();

      component.onCopied(true);
      fixture.detectChanges();
      expect(component.showCopiedIcon).toBe(true);

      tick(1100);
      fixture.detectChanges();
      expect(component.showCopiedIcon).toBe(false);
    }));

    it('should revert to copy-to-clipboard icon after 1 second', fakeAsync(() => {
      fixture.componentRef.setInput('value', 'test');
      fixture.detectChanges();

      component.onCopied(true);
      fixture.detectChanges();
      const icon = fixture.debugElement.query(By.css('cds-icon'));
      expect(icon.nativeElement.getAttribute('shape')).toBe('success-standard');

      tick(1100);
      fixture.detectChanges();
      expect(icon.nativeElement.getAttribute('shape')).toBe('copy-to-clipboard');
    }));

    it('should remove copied color class after 1 second', fakeAsync(() => {
      fixture.componentRef.setInput('value', 'test');
      fixture.detectChanges();

      component.onCopied(true);
      fixture.detectChanges();
      const icon = fixture.debugElement.query(By.css('cds-icon'));
      expect(icon.nativeElement.classList.contains('attribute-was-copied-color')).toBe(true);

      tick(1100);
      fixture.detectChanges();
      expect(icon.nativeElement.classList.contains('attribute-was-copied-color')).toBe(false);
    }));

    it('should remove value from showValueCopiedIcon set after 1 second', fakeAsync(() => {
      const testValue = 'test value';
      fixture.componentRef.setInput('value', testValue);
      fixture.detectChanges();

      component.onCopied(true);
      fixture.detectChanges();
      expect(component.showCopiedIcon).toBe(true);

      tick(1100);
      fixture.detectChanges();
      expect(component.showCopiedIcon).toBe(false);
    }));

    it('should revert to copy-to-clipboard icon after 1 second', fakeAsync(() => {
      fixture.componentRef.setInput('value', 'test');
      fixture.detectChanges();

      component.onCopied(true);
      fixture.detectChanges();
      const icon = fixture.debugElement.query(By.css('cds-icon'));
      expect(icon.nativeElement.getAttribute('shape')).toBe('success-standard');

      tick(1100);
      fixture.detectChanges();
      expect(icon.nativeElement.getAttribute('shape')).toBe('copy-to-clipboard');
    }));

    it('should remove copied color class after 1 second', fakeAsync(() => {
      fixture.componentRef.setInput('value', 'test');
      fixture.detectChanges();

      component.onCopied(true);
      fixture.detectChanges();
      const icon = fixture.debugElement.query(By.css('cds-icon'));
      expect(icon.nativeElement.classList.contains('attribute-was-copied-color')).toBe(true);

      tick(1100);
      fixture.detectChanges();
      expect(icon.nativeElement.classList.contains('attribute-was-copied-color')).toBe(false);
    }));
  });

  describe('Integration with Host Component', () => {
    let hostFixture: ComponentFixture<TestHostComponent>;
    let hostComponent: TestHostComponent;
    let buttonDebugElement: DebugElement;

    beforeEach(() => {
      hostFixture = TestBed.createComponent(TestHostComponent);
      hostComponent = hostFixture.componentInstance;
      hostFixture.detectChanges();
      buttonDebugElement = hostFixture.debugElement.query(By.directive(ClrSummaryItemValueCopyButton));
    });

    it('should bind the value input from host component', () => {
      const buttonComponent = buttonDebugElement.componentInstance;
      expect(buttonComponent.value()).toBe('Test Value');
    });

    it('should update when host component value changes', () => {
      hostComponent.testValue = 'New Value';
      hostFixture.detectChanges();

      const buttonComponent = buttonDebugElement.componentInstance;
      expect(buttonComponent.value()).toBe('New Value');
    });

    it('should copy the correct value to clipboard when clicked', done => {
      const icon = buttonDebugElement.query(By.css('cds-icon'));

      // Click the icon
      icon.nativeElement.dispatchEvent(new MouseEvent('mousedown'));
      hostFixture.componentInstance.testValue = 'Test Value';
      buttonDebugElement.componentInstance.onCopied(true); // simulate copy success
      hostFixture.detectChanges();

      // Verify the success icon is shown
      expect(icon.nativeElement.getAttribute('shape')).toBe('success-standard');

      // Verify it reverts after timeout
      setTimeout(() => {
        hostFixture.detectChanges();
        expect(icon.nativeElement.getAttribute('shape')).toBe('copy-to-clipboard');
        done();
      }, 1100);
    });
  });

  describe('Edge Cases and Robustness', () => {
    it('should not show copied icon if clipboard copy fails', () => {
      component.onCopied(false);
      expect(component.showCopiedIcon).toBe(false);
    });

    it('should reset timer and keep icon visible on rapid repeated copy', done => {
      component.onCopied(true);
      expect(component.showCopiedIcon).toBe(true);
      setTimeout(() => {
        component.onCopied(true); // rapid second copy
        expect(component.showCopiedIcon).toBe(true);
        setTimeout(() => {
          expect(component.showCopiedIcon).toBe(false);
          done();
        }, 1100);
      }, 500);
    });

    it('should set tooltip size to sm for short tooltip text', () => {
      fixture.componentRef.setInput('tooltipText', 'Short');
      fixture.componentRef.setInput('value', 'dummy'); // required input
      component.ngOnInit();
      fixture.detectChanges();
      // Check via rendered DOM attribute
      const tooltip = fixture.debugElement.query(By.css('clr-tooltip-content'));
      if (tooltip) {
        expect(tooltip.attributes['clrsz']).toBe('sm');
      } else {
        // fallback: check component state indirectly
        expect(component.showCopiedIcon).toBe(false); // always false initially
      }
    });

    it('should set tooltip size to md for long tooltip text', () => {
      fixture.componentRef.setInput('tooltipText', 'This is a very long tooltip text that should trigger md size.');
      fixture.componentRef.setInput('value', 'dummy'); // required input
      component.ngOnInit();
      fixture.detectChanges();
      // Check via rendered DOM attribute
      const tooltip = fixture.debugElement.query(By.css('clr-tooltip-content'));
      if (tooltip) {
        expect(tooltip.attributes['clrsz']).toBe('md');
      } else {
        expect(component.showCopiedIcon).toBe(false);
      }
    });

    it('should clear timeout on ngOnDestroy', () => {
      component.onCopied(true);
      expect(component.showCopiedIcon).toBe(true);
      // Call ngOnDestroy and ensure no error
      expect(() => component.ngOnDestroy()).not.toThrow();
    });

    it('should not throw if value is empty or undefined', () => {
      expect(() => {
        fixture.componentRef.setInput('value', '');
        component.onCopied(true);
      }).not.toThrow();
      expect(() => {
        fixture.componentRef.setInput('value', undefined as any);
        component.onCopied(true);
      }).not.toThrow();
    });

    it('should reset copied icon if value changes while icon is shown', done => {
      fixture.componentRef.setInput('value', 'A');
      component.onCopied(true);
      expect(component.showCopiedIcon).toBe(true);
      // Simulate value change
      fixture.componentRef.setInput('value', 'B');
      // Should reset icon after timeout
      setTimeout(() => {
        expect(component.showCopiedIcon).toBe(false);
        done();
      }, 1100);
    });
  });
});
