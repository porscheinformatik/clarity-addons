import { ClrFocusFirstInvalidFieldDirective } from './focus-first-invalid-field.directive';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <div>
      <!-- Form 1 -->
      <form ngForm clrFocusFirstInvalidField #form1="ngForm" data-testid="form-1">
        <input name="form1Input" type="text" [(ngModel)]="form1InputValue" required data-testid="form1-input" />
        <button type="submit" data-testid="form1-submit">Submit Form 1</button>
      </form>

      <!-- Form 2 -->
      <form ngForm clrFocusFirstInvalidField #form2="ngForm" data-testid="form-2">
        <input name="form2Input" type="text" [(ngModel)]="form2InputValue" required data-testid="form2-input" />
        <button type="submit" data-testid="form2-submit">Submit Form 2</button>
      </form>
    </div>
  `,
  imports: [FormsModule, ClrFocusFirstInvalidFieldDirective],
})
class MultiFormTestComponent {
  form1InputValue: string;
  form2InputValue: string;
}

describe('ClrFocusFirstInvalidFieldDirective - Multiple independent forms on same page', () => {
  let fixture: ComponentFixture<MultiFormTestComponent>;
  let form1Element: DebugElement;
  let form2Element: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiFormTestComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    form1Element = fixture.debugElement.query(By.css('[data-testid="form-1"]'));
    form2Element = fixture.debugElement.query(By.css('[data-testid="form-2"]'));
  });

  it('should focus on the first form input when form 1 is submitted', async () => {
    const form1Submit: HTMLButtonElement = form1Element.nativeElement.querySelector('[data-testid="form1-submit"]');
    form1Submit.click();
    await fixture.whenStable();

    const form1Input: HTMLInputElement = form1Element.nativeElement.querySelector('[data-testid="form1-input"]');
    expect(document.activeElement).toBe(form1Input);
  });

  it('should focus on the second form input when form 2 is submitted', async () => {
    const form2Submit: HTMLButtonElement = form2Element.nativeElement.querySelector('[data-testid="form2-submit"]');
    form2Submit.click();
    await fixture.whenStable();

    const form2Input: HTMLInputElement = form2Element.nativeElement.querySelector('[data-testid="form2-input"]');
    expect(document.activeElement).toBe(form2Input);
  });

  it('should handle independent validation - only validate the submitted form', async () => {
    // Fill form 1 but not form 2
    fixture.componentInstance.form1InputValue = 'filled';
    fixture.detectChanges();
    await fixture.whenStable();

    // Submit form 2 - should focus on form 2 input, not use form 1 state
    const form2Submit: HTMLButtonElement = form2Element.nativeElement.querySelector('[data-testid="form2-submit"]');
    form2Submit.click();
    await fixture.whenStable();

    const form2Input: HTMLInputElement = form2Element.nativeElement.querySelector('[data-testid="form2-input"]');
    expect(document.activeElement).toBe(form2Input);
  });

  it('should not affect other forms when one form is invalid', async () => {
    // Submit form 1 (invalid)
    const form1Submit: HTMLButtonElement = form1Element.nativeElement.querySelector('[data-testid="form1-submit"]');
    form1Submit.click();
    await fixture.whenStable();

    // Focus should be on form 1 input
    const form1Input: HTMLInputElement = form1Element.nativeElement.querySelector('[data-testid="form1-input"]');
    expect(document.activeElement).toBe(form1Input);

    // Now submit form 2 (also invalid)
    const form2Submit: HTMLButtonElement = form2Element.nativeElement.querySelector('[data-testid="form2-submit"]');
    form2Submit.click();
    await fixture.whenStable();

    // Focus should move to form 2 input, not stay on form 1
    const form2Input: HTMLInputElement = form2Element.nativeElement.querySelector('[data-testid="form2-input"]');
    expect(document.activeElement).toBe(form2Input);
    expect(document.activeElement).not.toBe(form1Input);
  });
});
