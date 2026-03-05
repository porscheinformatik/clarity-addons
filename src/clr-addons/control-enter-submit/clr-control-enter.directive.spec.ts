import { ClrControlEnterSubmitDirective } from './clr-control-enter-submit.directive';
import { Component, DebugElement } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClrForm } from '@clr/angular';
import { By } from '@angular/platform-browser';
import { Platform } from '@angular/cdk/platform';

@Component({
  template: `
    <form ngForm clrControlEnterSubmit>
      <input name="inputField" />
      <textarea name="textareaField" data-testid="textarea-3999097830581068"></textarea>
      <button type="submit" class="submit-btn">Submit</button>
    </form>
  `,
  standalone: false,
})
class TestComponent {}

@Component({
  template: `
    <form ngForm clrControlEnterSubmit>
      <input name="input1" class="input1" />
    </form>
  `,
  standalone: false,
})
class TestComponentNoButton {}

@Component({
  template: `
    <form ngForm clrControlEnterSubmit>
      <input name="input1" class="input1" />
      <button type="submit" class="submit-btn">Submit</button>
    </form>
    <form ngForm clrControlEnterSubmit>
      <input name="input2" class="input2" />
      <button type="submit" class="submit-btn">Submit</button>
    </form>
  `,
  standalone: false,
})
class TestMultipleFormsComponent {}

@Component({
  template: `
    <form ngForm [clrControlEnterSubmit]="'Tooltip Text'">
      <input name="inputField" />
      <button type="submit" class="submit-btn">Submit</button>
    </form>
  `,
  standalone: false,
})
class TestComponentWithTooltip {}

@Component({
  template: `
    <form ngForm [clrControlEnterSubmit]="''">
      <input name="inputField" />
      <button type="submit" class="submit-btn">Submit</button>
    </form>
  `,
  standalone: false,
})
class TestComponentWithEmptyTooltip {}

describe('ControlEnterDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directiveElement: DebugElement;
  let clrFormMock: jasmine.SpyObj<ClrForm>;
  let platformMock: { isBrowser: boolean };

  beforeEach(async () => {
    clrFormMock = jasmine.createSpyObj('ClrForm', ['markAsTouched']);
    platformMock = { isBrowser: true };

    await TestBed.configureTestingModule({
      declarations: [ClrControlEnterSubmitDirective, TestComponent, TestComponentNoButton],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: ClrForm,
          useValue: clrFormMock,
        },
        {
          provide: Platform,
          useValue: platformMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    directiveElement = fixture.debugElement.query(By.directive(ClrControlEnterSubmitDirective));
  });

  function dispatchKeydown(options: Partial<KeyboardEvent> = {}, target?: HTMLElement): KeyboardEvent {
    const event = new KeyboardEvent('keydown', {
      key: 'Enter',
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
      ...options,
    });
    (target || directiveElement.nativeElement).dispatchEvent(event);
    return event;
  }

  describe('Directive instantiation', () => {
    it('should find the directive on the host form element', () => {
      expect(directiveElement).toBeTruthy();
    });

    it('should be an instance of ControlEnterDirective', () => {
      const directiveInstance = directiveElement.injector.get(ClrControlEnterSubmitDirective);
      expect(directiveInstance).toBeInstanceOf(ClrControlEnterSubmitDirective);
    });
  });

  describe('Default Tooltip Behavior', () => {
    it('should NOT add a title attribute by default (no key provided)', () => {
      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
      expect(submitButton.getAttribute('title')).toBeNull();
    });
  });

  describe('No submit button', () => {
    it('should not throw error if no submit button exists', () => {
      const fixtureNoBtn = TestBed.createComponent(TestComponentNoButton);
      expect(() => fixtureNoBtn.detectChanges()).not.toThrow();
    });
  });

  describe('Form submission on Ctrl+Enter', () => {
    it('should call requestSubmit() exactly once when Ctrl+Enter is dispatched', () => {
      spyOn(directiveElement.nativeElement, 'requestSubmit');

      dispatchKeydown();

      expect(directiveElement.nativeElement.requestSubmit).toHaveBeenCalledTimes(1);
    });

    it('should NOT call requestSubmit() when only Enter is dispatched without ctrlKey', () => {
      spyOn(directiveElement.nativeElement, 'requestSubmit');

      dispatchKeydown({ ctrlKey: false });

      expect(directiveElement.nativeElement.requestSubmit).not.toHaveBeenCalled();
    });

    it('should NOT call requestSubmit() when Ctrl+A is dispatched (wrong key)', () => {
      spyOn(directiveElement.nativeElement, 'requestSubmit');

      dispatchKeydown({ key: 'a' });

      expect(directiveElement.nativeElement.requestSubmit).not.toHaveBeenCalled();
    });

    it('should NOT call requestSubmit() when Alt+Enter is dispatched (wrong modifier)', () => {
      spyOn(directiveElement.nativeElement, 'requestSubmit');

      dispatchKeydown({ ctrlKey: false, altKey: true });

      expect(directiveElement.nativeElement.requestSubmit).not.toHaveBeenCalled();
    });

    it('should NOT call requestSubmit() when Shift+Enter is dispatched (wrong modifier)', () => {
      spyOn(directiveElement.nativeElement, 'requestSubmit');

      dispatchKeydown({ ctrlKey: false, shiftKey: true });

      expect(directiveElement.nativeElement.requestSubmit).not.toHaveBeenCalled();
    });

    it('should call requestSubmit() exactly once when Cmd+Enter (metaKey) is dispatched', () => {
      spyOn(directiveElement.nativeElement, 'requestSubmit');

      dispatchKeydown({ ctrlKey: false, metaKey: true });

      expect(directiveElement.nativeElement.requestSubmit).toHaveBeenCalledTimes(1);
    });

    it('should NOT call requestSubmit() when Cmd+Shift+Enter is dispatched', () => {
      spyOn(directiveElement.nativeElement, 'requestSubmit');

      dispatchKeydown({ ctrlKey: false, metaKey: true, shiftKey: true });

      expect(directiveElement.nativeElement.requestSubmit).not.toHaveBeenCalled();
    });

    it('should NOT call requestSubmit() when Ctrl+Shift+Enter is dispatched', () => {
      spyOn(directiveElement.nativeElement, 'requestSubmit');

      dispatchKeydown({ ctrlKey: true, shiftKey: true });

      expect(directiveElement.nativeElement.requestSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Event propagation is stopped', () => {
    it('should call event.stopPropagation() when Ctrl+Enter is dispatched', () => {
      spyOn(directiveElement.nativeElement, 'requestSubmit');

      const event = new KeyboardEvent('keydown', {
        key: 'Enter',
        ctrlKey: true,
        bubbles: true,
        cancelable: true,
      });
      spyOn(event, 'stopPropagation').and.callThrough();
      directiveElement.nativeElement.dispatchEvent(event);

      expect(event.stopPropagation).toHaveBeenCalled();
    });
  });

  describe('ClrForm.markAsTouched() is called', () => {
    it('should call clrForm.markAsTouched() exactly once when Ctrl+Enter is dispatched', () => {
      spyOn(directiveElement.nativeElement, 'requestSubmit');

      dispatchKeydown();

      expect(clrFormMock.markAsTouched).toHaveBeenCalledTimes(1);
    });
  });

  describe('Active element is blurred', () => {
    it('should blur a focused textarea when Ctrl+Enter is dispatched', () => {
      spyOn(directiveElement.nativeElement, 'requestSubmit');
      const textarea: HTMLTextAreaElement = directiveElement.nativeElement.querySelector('textarea');
      textarea.focus();
      expect(document.activeElement).toBe(textarea);

      dispatchKeydown();

      expect(document.activeElement).not.toBe(textarea);
    });

    it('should blur a focused input when Ctrl+Enter is dispatched', () => {
      spyOn(directiveElement.nativeElement, 'requestSubmit');
      const input: HTMLInputElement = directiveElement.nativeElement.querySelector('input');
      input.focus();
      expect(document.activeElement).toBe(input);

      dispatchKeydown();

      expect(document.activeElement).not.toBe(input);
    });

    it('should not throw and should still call requestSubmit() when no element is explicitly focused', () => {
      spyOn(directiveElement.nativeElement, 'requestSubmit');
      // Ensure activeElement is body (no explicit focus)
      (document.activeElement as HTMLElement)?.blur();

      expect(() => dispatchKeydown()).not.toThrow();
      expect(directiveElement.nativeElement.requestSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe('Order of operations', () => {
    it('should call markAsTouched() before requestSubmit()', () => {
      const callOrder: string[] = [];

      spyOn(directiveElement.nativeElement, 'requestSubmit').and.callFake(() => {
        callOrder.push('requestSubmit');
      });

      const clrFormInstance = directiveElement.injector.get(ClrForm) as jasmine.SpyObj<ClrForm>;
      clrFormInstance.markAsTouched.and.callFake(() => {
        callOrder.push('markAsTouched');
      });

      dispatchKeydown();

      expect(callOrder).toEqual(['markAsTouched', 'requestSubmit']);
    });
  });
});

describe('ControlEnterDirective with multiple forms', () => {
  let fixture: ComponentFixture<TestMultipleFormsComponent>;
  let directiveElements: DebugElement[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClrControlEnterSubmitDirective, TestMultipleFormsComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: ClrForm,
          useValue: jasmine.createSpyObj('ClrForm', ['markAsTouched']),
        },
        {
          provide: Platform,
          useValue: { isBrowser: true },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestMultipleFormsComponent);
    fixture.detectChanges();
    directiveElements = fixture.debugElement.queryAll(By.directive(ClrControlEnterSubmitDirective));
  });

  it('should submit ONLY the focused form when Ctrl+Enter is dispatched', () => {
    const form1 = directiveElements[0].nativeElement as HTMLFormElement;
    const form2 = directiveElements[1].nativeElement as HTMLFormElement;

    spyOn(form1, 'requestSubmit');
    spyOn(form2, 'requestSubmit');

    const input1 = form1.querySelector('.input1') as HTMLInputElement;
    const input2 = form2.querySelector('.input2') as HTMLInputElement;

    const event = new KeyboardEvent('keydown', {
      key: 'Enter',
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    });

    // Dispatch on input inside form1
    input1.dispatchEvent(event);

    expect(form1.requestSubmit).toHaveBeenCalledTimes(1);
    expect(form2.requestSubmit).not.toHaveBeenCalled();

    // Reset calls
    (form1.requestSubmit as jasmine.Spy).calls.reset();
    (form2.requestSubmit as jasmine.Spy).calls.reset();

    // Dispatch on input inside form2
    input2.dispatchEvent(event);

    expect(form1.requestSubmit).not.toHaveBeenCalled();
    expect(form2.requestSubmit).toHaveBeenCalledTimes(1);
  });
});

describe('ControlEnterDirective Tooltip Behavior', () => {
  let fixture: ComponentFixture<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClrControlEnterSubmitDirective, TestComponentWithTooltip, TestComponentWithEmptyTooltip],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: ClrForm,
          useValue: jasmine.createSpyObj('ClrForm', ['markAsTouched']),
        },
        {
          provide: Platform,
          useValue: { isBrowser: true },
        },
      ],
    }).compileComponents();
  });

  it('should set title attribute when tooltip text is provided', () => {
    fixture = TestBed.createComponent(TestComponentWithTooltip);
    fixture.detectChanges();
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.getAttribute('title')).toBe('Tooltip Text');
  });

  it('should NOT set title attribute when tooltip text is empty', () => {
    fixture = TestBed.createComponent(TestComponentWithEmptyTooltip);
    fixture.detectChanges();
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.getAttribute('title')).toBeNull();
  });
});
