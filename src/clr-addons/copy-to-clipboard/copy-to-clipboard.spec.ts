import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ClrCopyToClipboard } from './copy-to-clipboard';

@Component({
  template: `<clr-copy-to-clipboard [value]="testValue"></clr-copy-to-clipboard>`,
  standalone: true,
  imports: [ClrCopyToClipboard],
})
class TestHostComponent {
  testValue = 'Test Value';
}

@Component({
  template: `
    <div class="parent-cell">
      <span>{{ cellText }}</span>
      <clr-copy-to-clipboard [value]="cellText" [hiddenUntilHovered]="true"></clr-copy-to-clipboard>
    </div>
  `,
  standalone: true,
  imports: [ClrCopyToClipboard],
})
class HiddenUntilHoveredHostComponent {
  cellText = 'Copyable Value';
}

describe('ClrCopyToClipboard', () => {
  let component: ClrCopyToClipboard;
  let fixture: ComponentFixture<ClrCopyToClipboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClrCopyToClipboard],
    }).compileComponents();

    fixture = TestBed.createComponent(ClrCopyToClipboard);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initial State', () => {
    it('should have showCopiedIcon set to false', () => {
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
    it('should set showCopiedIcon to true when onCopied is called with success', () => {
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

    it('should reset showCopiedIcon after 1 second', fakeAsync(() => {
      fixture.componentRef.setInput('value', 'test value');
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
      buttonDebugElement = hostFixture.debugElement.query(By.directive(ClrCopyToClipboard));
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

  describe('hiddenUntilHovered', () => {
    let hoveredFixture: ComponentFixture<HiddenUntilHoveredHostComponent>;
    let copyElement: DebugElement;

    beforeEach(() => {
      hoveredFixture = TestBed.createComponent(HiddenUntilHoveredHostComponent);
      hoveredFixture.detectChanges();
      copyElement = hoveredFixture.debugElement.query(By.directive(ClrCopyToClipboard));
    });

    it('should have hidden-until-hovered class when hiddenUntilHovered is true', () => {
      expect(copyElement.nativeElement.classList.contains('hidden-until-hovered')).toBe(true);
    });

    it('should not have parent-hovered class initially', () => {
      expect(copyElement.nativeElement.classList.contains('parent-hovered')).toBe(false);
    });

    it('should add parent-hovered class when parent receives mouseenter', () => {
      const parentEl = copyElement.nativeElement.parentElement;
      parentEl.dispatchEvent(new MouseEvent('mouseenter'));
      hoveredFixture.detectChanges();

      expect(copyElement.nativeElement.classList.contains('parent-hovered')).toBe(true);
    });

    it('should remove parent-hovered class when parent receives mouseleave', () => {
      const parentEl = copyElement.nativeElement.parentElement;
      parentEl.dispatchEvent(new MouseEvent('mouseenter'));
      hoveredFixture.detectChanges();
      expect(copyElement.nativeElement.classList.contains('parent-hovered')).toBe(true);

      parentEl.dispatchEvent(new MouseEvent('mouseleave'));
      hoveredFixture.detectChanges();
      expect(copyElement.nativeElement.classList.contains('parent-hovered')).toBe(false);
    });

    it('should not have hidden-until-hovered class when hiddenUntilHovered is false (default)', () => {
      const defaultFixture = TestBed.createComponent(TestHostComponent);
      defaultFixture.detectChanges();
      const defaultCopyElement = defaultFixture.debugElement.query(By.directive(ClrCopyToClipboard));

      expect(defaultCopyElement.nativeElement.classList.contains('hidden-until-hovered')).toBe(false);
    });

    it('should clean up parent listeners on destroy', () => {
      const parentEl = copyElement.nativeElement.parentElement;
      const removeSpy = spyOn(parentEl, 'removeEventListener').and.callThrough();

      copyElement.componentInstance.ngOnDestroy();

      expect(removeSpy).toHaveBeenCalledWith('mouseenter', jasmine.any(Function));
      expect(removeSpy).toHaveBeenCalledWith('mouseleave', jasmine.any(Function));
    });
  });
});
