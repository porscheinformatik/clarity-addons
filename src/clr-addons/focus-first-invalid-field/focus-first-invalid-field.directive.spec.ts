import { ClrFocusFirstInvalidFieldDirective } from './focus-first-invalid-field.directive';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ClrDatagridModule, ClrInputModule, ClrSelectModule } from '@clr/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

/**
 * Test host component template layout (DOM order):
 *   1. inputField1 — required (first invalid input)
 *   2. inputField2 — not required (always valid)
 *   3. textAreaInput1 — not required (always valid)
 *   4. textAreaInput2 — required (first invalid textarea if inputField1 is filled)
 *   5. inputField3 — required (next invalid input after textAreaInput2 is filled)
 *   6. textAreaInput3 — not required (always valid)
 *   7. selectField1 — required (first invalid select once all inputs/text areas are filled)
 *   8. customControl — div with tabindex, no child input/textarea/select (for parent-focus test)
 *   9. submit button
 */
@Component({
  template: `
    <form ngForm clrFocusFirstInvalidField #form="ngForm">
      <input name="inputField1" type="text" [(ngModel)]="inputValue1" required data-testid="input-field-1" />
      <input name="inputField2" type="text" [(ngModel)]="inputValue2" data-testid="input-field-2" />

      <textarea name="textAreaInput1" [(ngModel)]="textValue1" data-testid="textarea-1"> </textarea>
      <textarea name="textAreaInput2" [(ngModel)]="textValue2" required data-testid="textarea-2"> </textarea>

      <input name="inputField3" type="text" [(ngModel)]="inputValue3" required data-testid="input-field-3" />

      <textarea name="textAreaInput3" [(ngModel)]="textValue3" data-testid="textarea-3"> </textarea>

      <select name="selectField1" [(ngModel)]="selectValue1" required data-testid="select-1">
        <option value="" disabled>Select...</option>
        <option value="optionA">Option A</option>
        <option value="optionB">Option B</option>
      </select>

      <div class="custom-control" tabindex="0" data-testid="custom-control"></div>

      <clr-datagrid>
        <clr-dg-column>Input</clr-dg-column>
        <clr-dg-column>Select</clr-dg-column>
        <clr-dg-row [clrDgItem]="item" *clrDgItems="let item of dataDatagrid">
          <clr-dg-cell>
            <clr-input-container>
              <label>Datagrid Input</label>
              <input
                clrInput
                name="datagrid-input"
                type="text"
                [(ngModel)]="item.text"
                required
                data-testid="datagrid-input-field"
              />
            </clr-input-container>
          </clr-dg-cell>
          <clr-dg-cell>
            <clr-select-container>
              <label>Datagrid Select</label>
              <select
                clrSelect
                name="datagrid-select"
                [(ngModel)]="item.selectValue"
                required
                data-testid="datagrid-select-field"
              >
                <option value="">Select...</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </select>
            </clr-select-container>
          </clr-dg-cell>
        </clr-dg-row>
      </clr-datagrid>
      <button type="submit" class="btn btn-primary" data-testid="submit-button">Submit</button>
    </form>
  `,
  standalone: false,
})
class TestComponent {
  inputValue1: string;
  inputValue2: string;
  inputValue3: string;
  textValue1: string;
  textValue2: string;
  textValue3: string;
  selectValue1 = '';

  dataDatagrid = [{ text: '', selectValue: '' }];
}

describe('ClrFocusFirstInvalidFieldDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directiveElement: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ClrDatagridModule, ClrInputModule, ClrSelectModule, ClrFocusFirstInvalidFieldDirective],
      declarations: [TestComponent],
      providers: [provideAnimations()],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    directiveElement = fixture.debugElement.query(By.directive(ClrFocusFirstInvalidFieldDirective));
  });

  function submitForm(): void {
    const button: HTMLButtonElement = directiveElement.nativeElement.querySelector('[data-testid="submit-button"]');
    button.click();
    fixture.detectChanges();
  }

  async function setInputsAndStabilize(fields: Record<string, string>): Promise<void> {
    Object.entries(fields).forEach(([key, value]) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (fixture.componentInstance as any)[key] = value;
    });
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
  }

  describe('Directive instantiation', () => {
    it('should find the directive on the host form element', () => {
      expect(directiveElement).toBeTruthy();
    });

    it('should be an instance of ClrFocusFirstInvalidFieldDirective', () => {
      const directiveInstance = directiveElement.injector.get(ClrFocusFirstInvalidFieldDirective);
      expect(directiveInstance).toBeInstanceOf(ClrFocusFirstInvalidFieldDirective);
    });
  });

  describe('Focus first invalid <input> on submit', () => {
    it('should focus the first invalid input when form is submitted', async () => {
      // inputField1 is the first required field and is empty → it should receive focus
      submitForm();
      await fixture.whenStable();

      const input1: HTMLInputElement = directiveElement.nativeElement.querySelector('[data-testid="input-field-1"]');
      expect(document.activeElement).toBe(input1);
    });

    it('should focus the FIRST invalid field in DOM order, not the second', async () => {
      // Fill inputField1 → next invalid in DOM order is textAreaInput2 (required, before inputField3)
      await setInputsAndStabilize({ inputValue1: 'filled' });

      submitForm();
      await fixture.whenStable();

      const textarea2: HTMLTextAreaElement = directiveElement.nativeElement.querySelector('[data-testid="textarea-2"]');
      expect(document.activeElement).toBe(textarea2);
    });
  });

  describe('Focus first invalid <textarea> on submit', () => {
    it('should focus the textarea when first invalid field contains a textarea', async () => {
      // Fill inputField1 → next required in DOM order is textAreaInput2
      await setInputsAndStabilize({ inputValue1: 'filled' });

      submitForm();
      await fixture.whenStable();

      const textarea2: HTMLTextAreaElement = directiveElement.nativeElement.querySelector('[data-testid="textarea-2"]');
      expect(document.activeElement).toBe(textarea2);
    });
  });

  describe('Focus first invalid <select> on submit', () => {
    it('should focus the select when all inputs and text areas are valid but select is invalid', async () => {
      await setInputsAndStabilize({
        inputValue1: 'filled',
        inputValue3: 'filled',
        textValue2: 'filled',
      });

      submitForm();
      await fixture.whenStable();

      const select: HTMLSelectElement = directiveElement.nativeElement.querySelector('[data-testid="select-1"]');
      expect(document.activeElement).toBe(select);
    });
  });

  describe('Skip valid fields and focus next invalid', () => {
    it('should skip the first valid required field and focus the next invalid required field', async () => {
      // Fill inputField1 → next invalid is textAreaInput2
      await setInputsAndStabilize({ inputValue1: 'filled' });

      submitForm();
      await fixture.whenStable();

      const textarea2: HTMLTextAreaElement = directiveElement.nativeElement.querySelector('[data-testid="textarea-2"]');
      expect(document.activeElement).toBe(textarea2);
    });

    it('should advance focus to the next remaining invalid field as fields are progressively filled', async () => {
      // Fill first two required fields (inputField1, textAreaInput2) → next invalid is inputField3
      await setInputsAndStabilize({ inputValue1: 'filled', textValue2: 'filled' });

      submitForm();
      await fixture.whenStable();

      const input3: HTMLInputElement = directiveElement.nativeElement.querySelector('[data-testid="input-field-3"]');
      expect(document.activeElement).toBe(input3);

      // Now fill inputField3 too → next invalid is selectField1
      await setInputsAndStabilize({ inputValue3: 'filled' });

      submitForm();
      await fixture.whenStable();

      const select: HTMLSelectElement = directiveElement.nativeElement.querySelector('[data-testid="select-1"]');
      expect(document.activeElement).toBe(select);
    });
  });

  describe('All fields valid — no focus change', () => {
    it('should NOT change focus to any field when all required fields are filled', async () => {
      // Fill all required fields including datagrid fields
      await setInputsAndStabilize({
        inputValue1: 'filled',
        inputValue3: 'filled',
        textValue2: 'filled',
        selectValue1: 'optionA',
      });

      // Fill datagrid fields
      fixture.componentInstance.dataDatagrid[0].text = 'filled';
      fixture.componentInstance.dataDatagrid[0].selectValue = 'option1';
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      // Blur everything so activeElement is body
      (document.activeElement as HTMLElement)?.blur();
      const activeBeforeSubmit = document.activeElement;

      submitForm();
      await fixture.whenStable();

      // Focus should not have moved to any form field
      expect(document.activeElement).toBe(activeBeforeSubmit);
    });

    it('should not throw errors when there are no .ng-invalid elements', async () => {
      // Fill all required fields including datagrid fields
      await setInputsAndStabilize({
        inputValue1: 'filled',
        inputValue3: 'filled',
        textValue2: 'filled',
        selectValue1: 'optionA',
      });

      // Fill datagrid fields
      fixture.componentInstance.dataDatagrid[0].text = 'filled';
      fixture.componentInstance.dataDatagrid[0].selectValue = 'option1';
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(() => submitForm()).not.toThrow();
    });
  });

  describe('Datagrid validation', () => {
    it('should set focus to controls within datagrid elements when they are invalid', async () => {
      await setInputsAndStabilize({
        inputValue1: 'filled',
        inputValue3: 'filled',
        textValue2: 'filled',
        selectValue1: 'optionA',
      });

      submitForm();
      await fixture.whenStable();
      fixture.detectChanges();

      const datagridInput: HTMLInputElement = directiveElement.nativeElement.querySelector(
        '[data-testid="datagrid-input-field"]'
      );
      expect(document.activeElement).toBe(datagridInput);
    });

    it('should focus datagrid select when datagrid input is valid but select is invalid', async () => {
      await setInputsAndStabilize({
        inputValue1: 'filled',
        inputValue3: 'filled',
        textValue2: 'filled',
        selectValue1: 'optionA',
      });

      fixture.componentInstance.dataDatagrid[0].text = 'filled';
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      submitForm();
      await fixture.whenStable();
      fixture.detectChanges();

      const datagridSelect: HTMLSelectElement = directiveElement.nativeElement.querySelector(
        '[data-testid="datagrid-select-field"]'
      );
      expect(document.activeElement).toBe(datagridSelect);
    });
  });

  describe('Parent element focused when no child input/textarea/select exists', () => {
    it('should focus the .ng-invalid element itself when it has no input/textarea/select child', async () => {
      // Fill all standard required fields so no form controls are invalid
      await setInputsAndStabilize({
        inputValue1: 'filled',
        inputValue3: 'filled',
        textValue2: 'filled',
        selectValue1: 'optionA',
      });

      // Manually add .ng-invalid to the custom div to simulate an invalid custom control
      const customDiv: HTMLDivElement = directiveElement.nativeElement.querySelector('[data-testid="custom-control"]');
      customDiv.classList.add('ng-invalid');

      submitForm();
      await fixture.whenStable();

      expect(document.activeElement).toBe(customDiv);
    });
  });

  describe('Async correctness', () => {
    it('should use async/await with whenStable() and properly evaluate assertions', async () => {
      // This test verifies that assertions are actually evaluated by using a concrete expectation
      // If we were using .then() without await, this assertion might silently not execute
      submitForm();
      await fixture.whenStable();

      const input1: HTMLInputElement = directiveElement.nativeElement.querySelector('[data-testid="input-field-1"]');
      expect(document.activeElement).toBe(input1);
    });

    it('should correctly fail when an assertion would fail (not silently pass)', async () => {
      // Verify the async test infrastructure works: after submit with invalid fields, focus should move
      submitForm();
      await fixture.whenStable();

      // After submit with empty required fields, activeElement should NOT be body
      expect(document.activeElement).not.toBe(document.body);
    });
  });
});
