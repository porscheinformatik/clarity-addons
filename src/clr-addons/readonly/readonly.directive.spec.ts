import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ClrReadonlyDirectiveModule } from '@porscheinformatik/clr-addons';
import { ClarityModule } from '@clr/angular';

@Component({
  template: `
    <form [formGroup]="form">
      <div>
        <clr-input-container>
          <input
            id="input"
            clrInput
            [formControl]="control"
            [clrReadonly]="isReadOnly"
            [clrReadOnlyProperty]="property"
          />
        </clr-input-container>
        <clr-input-container>
          <input
            id="numeric"
            clrInput
            clrNumeric
            [formControl]="controlNumeric"
            [clrReadonly]="isReadOnly"
            clrUnitPosition="left"
            [clrReadOnlyProperty]="property"
            [clrUnit]="'$'"
          />
        </clr-input-container>
        <clr-select-container>
          <select clrSelect formControlName="selectControl" [clrReadonly]="isReadOnly">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
          </select>
        </clr-select-container>
      </div>
    </form>
  `,
  standalone: false,
})
class TestComponent {
  form: FormGroup;
  control = new FormControl('Test Value');
  controlNumeric = new FormControl('100');
  isReadOnly = true;
  property: string | null = null;

  constructor() {
    this.form = new FormGroup({
      selectControl: new FormControl('1'),
    });
  }
}

describe('ClrReadonlyDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [ReactiveFormsModule, ClarityModule, FormsModule, ClrReadonlyDirectiveModule],
      teardown: { destroyAfterEach: false },
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    return fixture.whenStable();
  });

  it('should replace the input with a readonly span element', () => {
    const input = fixture.debugElement.query(By.css('input'));
    const parent = input.nativeElement.parentElement;

    fixture.detectChanges(); // Trigger change detection for the directive.

    const span = parent.querySelector('span');
    expect(span).toBeTruthy();
    expect(span.textContent).toBe('Test Value');
    expect(span.classList).toContain('clr-readonly');
    expect(parent.classList).toContain('clr-readonly-parent');
    expect(getComputedStyle(input.nativeElement).display).toBe('none');
  });

  it('should format numeric values based on the unit position', () => {
    const input = fixture.debugElement.query(By.css('#numeric'));

    const span = input.nativeElement.parentElement.querySelector('span');
    expect(span.textContent).toBe('$ 100');
  });

  it('should display selected option text for a select element', () => {
    const select = fixture.debugElement.query(By.css('select'));
    fixture.componentInstance.isReadOnly = true;
    fixture.componentInstance.control.setValue('1');
    fixture.detectChanges();

    const span = select.nativeElement.parentElement.querySelector('span');
    expect(span.textContent).toBe('Option 1');
  });

  it('should not replace the input with a span when clrReadOnly is false', () => {
    fixture.componentInstance.isReadOnly = false;
    fixture.detectChanges();

    const input = fixture.debugElement.query(By.css('#input'));
    const span = input.nativeElement.parentElement.querySelector('span');
    expect(span).toBeNull(); // No span should be created.
    expect(getComputedStyle(input.nativeElement).display).not.toBe('none');
  });
});
