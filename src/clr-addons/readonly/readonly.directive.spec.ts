import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ClrReadonlyDirective } from './clr-readonly.directive';

@Component({
  template: `
    <div>
      <input
        [formControl]="control"
        clrReadonly
        [clrReadOnly]="isReadOnly"
        [clrMulti]="isMultiSelect"
        [clrUnitPosition]="unitPosition"
        [clrReadOnlyProperty]="arrayPosition"
      />
      <select formControlName="selectControl" clrReadonly [clrReadOnly]="isReadOnly">
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </select>
    </div>
  `,
})
class TestComponent {
  control = new FormControl('Test Value');
  isReadOnly = true;
  isMultiSelect = false;
  unitPosition: 'left' | 'right' = 'right';
  arrayPosition: string | null = null;
}

describe('ClrReadonlyDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, ClrReadonlyDirective],
      imports: [ReactiveFormsModule, FormsModule],
    });

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
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
    const input = fixture.debugElement.query(By.css('input'));
    input.nativeElement.setAttribute('clrnumeric', '');

    fixture.componentInstance.control.setValue('100');
    fixture.componentInstance.unitPosition = 'left';
    input.nativeElement.setAttribute('clrunit', '$');

    fixture.detectChanges();

    const span = input.nativeElement.parentElement.querySelector('span');
    expect(span.textContent).toBe('$ 100');
  });

  it('should display multi-select values correctly', () => {
    const input = fixture.debugElement.query(By.css('input'));
    fixture.componentInstance.isMultiSelect = true;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    fixture.componentInstance.control.setValue([{ name: 'One' }, { name: 'Two' }]);
    fixture.componentInstance.arrayPosition = 'name';

    fixture.detectChanges();

    const span = input.nativeElement.parentElement.querySelector('span');
    expect(span.textContent).toBe('One, Two');
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

    const input = fixture.debugElement.query(By.css('input'));
    const span = input.nativeElement.parentElement.querySelector('span');
    expect(span).toBeNull(); // No span should be created.
    expect(getComputedStyle(input.nativeElement).display).not.toBe('none');
  });
});
