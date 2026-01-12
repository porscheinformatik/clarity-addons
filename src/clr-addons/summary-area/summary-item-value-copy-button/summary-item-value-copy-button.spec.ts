import { ComponentFixture, TestBed } from '@angular/core/testing';
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

describe('SummaryItemValueCopyButtonComponent', () => {
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
      expect(component.showValueCopiedIcon.size).toBe(0);
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
      expect(icon.nativeElement.classList.contains('cng-generic-card-attribute-was-copied-color')).toBe(false);
    });
  });

  describe('Copy Functionality', () => {
    it('should add value to showValueCopiedIcon set when copyAttributeClicked is called', () => {
      const testValue = 'test value';
      component.copyValueClicked(testValue);

      expect(component.showValueCopiedIcon.has(testValue)).toBe(true);
    });

    it('should display success-standard icon after copy is clicked', () => {
      fixture.componentRef.setInput('value', 'test');
      fixture.detectChanges();

      const icon = fixture.debugElement.query(By.css('cds-icon'));
      icon.nativeElement.dispatchEvent(new MouseEvent('mousedown'));
      fixture.detectChanges();

      expect(icon.nativeElement.getAttribute('shape')).toBe('success-standard');
    });

    it('should add copied color class after copy is clicked', () => {
      fixture.componentRef.setInput('value', 'test');
      fixture.detectChanges();

      const icon = fixture.debugElement.query(By.css('cds-icon'));
      icon.nativeElement.dispatchEvent(new MouseEvent('mousedown'));
      fixture.detectChanges();

      expect(icon.nativeElement.classList.contains('cng-generic-card-attribute-was-copied-color')).toBe(true);
    });

    it('should remove value from showValueCopiedIcon set after 1 second', done => {
      const testValue = 'test value';
      fixture.componentRef.setInput('value', testValue);
      fixture.detectChanges();

      component.copyValueClicked(testValue);

      expect(component.showValueCopiedIcon.has(testValue)).toBe(true);

      setTimeout(() => {
        expect(component.showValueCopiedIcon.has(testValue)).toBe(false);
        done();
      }, 1100);
    });

    it('should revert to copy-to-clipboard icon after 1 second', done => {
      fixture.componentRef.setInput('value', 'test');
      fixture.detectChanges();

      const icon = fixture.debugElement.query(By.css('cds-icon'));
      icon.nativeElement.dispatchEvent(new MouseEvent('mousedown'));
      fixture.detectChanges();

      expect(icon.nativeElement.getAttribute('shape')).toBe('success-standard');

      setTimeout(() => {
        fixture.detectChanges();
        expect(icon.nativeElement.getAttribute('shape')).toBe('copy-to-clipboard');
        done();
      }, 1100);
    });

    it('should remove copied color class after 1 second', done => {
      fixture.componentRef.setInput('value', 'test');
      fixture.detectChanges();

      const icon = fixture.debugElement.query(By.css('cds-icon'));
      icon.nativeElement.dispatchEvent(new MouseEvent('mousedown'));
      fixture.detectChanges();

      expect(icon.nativeElement.classList.contains('cng-generic-card-attribute-was-copied-color')).toBe(true);

      setTimeout(() => {
        fixture.detectChanges();
        expect(icon.nativeElement.classList.contains('cng-generic-card-attribute-was-copied-color')).toBe(false);
        done();
      }, 1100);
    });

    it('should do nothing if copyAttributeClicked is called when value is already in the set', () => {
      const testValue = 'test value';
      component.showValueCopiedIcon.add(testValue);

      const initialSize = component.showValueCopiedIcon.size;
      component.copyValueClicked(testValue);

      expect(component.showValueCopiedIcon.size).toBe(initialSize);
    });
  });

  describe('Multiple Values', () => {
    it('should handle multiple different values in showValueCopiedIcon set', () => {
      const value1 = 'value1';
      const value2 = 'value2';

      component.copyValueClicked(value1);
      component.copyValueClicked(value2);

      expect(component.showValueCopiedIcon.has(value1)).toBe(true);
      expect(component.showValueCopiedIcon.has(value2)).toBe(true);
      expect(component.showValueCopiedIcon.size).toBe(2);
    });

    it('should remove values independently after timeout', done => {
      const value1 = 'value1';
      const value2 = 'value2';

      // Set a value to prevent NG0950 error
      fixture.componentRef.setInput('value', value1);
      fixture.detectChanges();

      component.copyValueClicked(value1);

      setTimeout(() => {
        component.copyValueClicked(value2);

        expect(component.showValueCopiedIcon.has(value1)).toBe(true);
        expect(component.showValueCopiedIcon.has(value2)).toBe(true);

        setTimeout(() => {
          expect(component.showValueCopiedIcon.has(value1)).toBe(false);
          expect(component.showValueCopiedIcon.has(value2)).toBe(true);

          setTimeout(() => {
            expect(component.showValueCopiedIcon.has(value2)).toBe(false);
            done();
          }, 600);
        }, 600);
      }, 500);
    });
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

  describe('Edge Cases', () => {
    it('should handle empty string value', done => {
      fixture.componentRef.setInput('value', '');
      fixture.detectChanges();

      component.copyValueClicked('');
      expect(component.showValueCopiedIcon.has('')).toBe(true);

      setTimeout(() => {
        expect(component.showValueCopiedIcon.has('')).toBe(false);
        done();
      }, 1100);
    });

    it('should handle very long string value', done => {
      const longValue = 'a'.repeat(1000);
      fixture.componentRef.setInput('value', longValue);
      fixture.detectChanges();

      component.copyValueClicked(longValue);
      expect(component.showValueCopiedIcon.has(longValue)).toBe(true);

      setTimeout(() => {
        expect(component.showValueCopiedIcon.has(longValue)).toBe(false);
        done();
      }, 1100);
    });

    it('should handle special characters in value', done => {
      const specialValue = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      fixture.componentRef.setInput('value', specialValue);
      fixture.detectChanges();

      component.copyValueClicked(specialValue);
      expect(component.showValueCopiedIcon.has(specialValue)).toBe(true);

      setTimeout(() => {
        expect(component.showValueCopiedIcon.has(specialValue)).toBe(false);
        done();
      }, 1100);
    });
  });
});
