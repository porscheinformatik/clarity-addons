/*
 * Copyright (c) 2018-2021 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { ClrNumericField } from './numeric-field';

import { ClrNumericFieldModule } from './numeric-field.module';

@Component({
  template: `
    <clr-input-container>
      <label>Amount</label>
      <input
        clrInput
        clrNumeric
        type="text"
        clrDecimalSep=","
        clrGroupingSep="."
        [clrDecimalPlaces]="decimalPlaces"
        [clrRoundDisplayValue]="rounded"
        [clrAutofillDecimals]="autofill"
        [(clrNumericValue)]="input"
      />
    </clr-input-container>
  `,
})
class TestComponent {
  @ViewChild(ClrNumericField, { static: true }) component;
  input: number;
  decimalPlaces = 3;
  autofill = false;
  rounded = false;
}

describe('NumericComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClarityModule, FormsModule, BrowserAnimationsModule, ClrNumericFieldModule],
      declarations: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    fixture.componentInstance.component.onTouched = (): void => {};
    inputEl = fixture.debugElement.query(By.css('input'));
    fixture.detectChanges();
  });

  function addKey(key: string, keyCode: number): void {
    inputEl.triggerEventHandler('keydown', { key: key, keyCode: keyCode, target: inputEl.nativeElement });
    if (keyCode === 8) {
      inputEl.nativeElement.value = inputEl.nativeElement.value.substring(0, inputEl.nativeElement.value.length - 1);
    } else {
      inputEl.nativeElement.value += key;
    }
    inputEl.triggerEventHandler('keyup', { key: key, keyCode: keyCode, target: inputEl.nativeElement });
  }

  it('Grouping separator', () => {
    addKey('1', 49);
    addKey('2', 50);
    addKey('3', 51);
    addKey('4', 52);
    fixture.detectChanges();

    expect(fixture.componentInstance.component.displayValue).toBe('1.234');
    expect(fixture.componentInstance.input).toBe(1234);
  });

  it('Multiple grouping separator', () => {
    addKey('1', 49);
    addKey('0', 48);
    addKey('0', 48);
    addKey('0', 48);
    addKey('0', 48);
    addKey('0', 48);
    addKey('0', 48);
    fixture.detectChanges();

    expect(fixture.componentInstance.component.displayValue).toBe('1.000.000');
    expect(fixture.componentInstance.input).toBe(1000000);
  });

  it('Decimal separator', () => {
    addKey('1', 49);
    addKey('2', 50);
    addKey('3', 51);
    addKey(',', 188);
    addKey('4', 52);
    fixture.detectChanges();

    expect(fixture.componentInstance.component.displayValue).toBe('123,4');
    expect(fixture.componentInstance.input).toBe(123.4);
  });

  it('Grouping and decimal separator', () => {
    addKey('1', 49);
    addKey('2', 50);
    addKey('3', 51);
    addKey('4', 52);
    addKey(',', 188);
    addKey('5', 53);
    fixture.detectChanges();

    expect(fixture.componentInstance.component.displayValue).toBe('1.234,5');
    expect(fixture.componentInstance.input).toBe(1234.5);
  });

  it('Add negative sign in front', () => {
    addKey('-', 189);
    addKey('1', 49);
    addKey('2', 50);
    addKey('3', 51);
    addKey('4', 52);
    addKey(',', 188);
    addKey('5', 53);
    fixture.detectChanges();

    expect(fixture.componentInstance.component.displayValue).toBe('-1.234,5');
    expect(fixture.componentInstance.input).toBe(-1234.5);
  });

  it('Add invalid negative in between', () => {
    addKey('1', 49);
    addKey('2', 50);
    addKey('3', 51);
    addKey('-', 189);
    addKey('4', 52);
    addKey(',', 188);
    addKey('5', 53);
    fixture.detectChanges();

    expect(fixture.componentInstance.component.displayValue).toBe('1.234,5');
    expect(fixture.componentInstance.input).toBe(1234.5);
  });

  it('Decimal places check', () => {
    addKey('1', 49);
    addKey('2', 50);
    addKey('3', 51);
    addKey(',', 188);
    addKey('4', 52);
    addKey('4', 52);
    addKey('4', 52);
    addKey('4', 52);
    fixture.detectChanges();

    expect(fixture.componentInstance.component.displayValue).toBe('123,444');
    expect(fixture.componentInstance.input).toBe(123.444);
  });

  it('No Decimal places, prevent entering decimal separator', () => {
    fixture.componentInstance.decimalPlaces = 0;
    fixture.detectChanges();
    addKey('1', 49);
    addKey('2', 50);
    addKey('3', 51);
    addKey(',', 188);
    fixture.detectChanges();

    expect(fixture.componentInstance.component.displayValue).toBe('123');
    expect(fixture.componentInstance.input).toBe(123);
  });

  it('Autofill decimal places without separator', () => {
    fixture.componentInstance.autofill = true;
    fixture.detectChanges();
    addKey('1', 49);
    addKey('2', 50);
    addKey('3', 51);
    inputEl.triggerEventHandler('blur', { target: inputEl.nativeElement });
    fixture.detectChanges();

    expect(fixture.componentInstance.component.displayValue).toBe('123,000');
    expect(fixture.componentInstance.input).toBe(123);
  });

  it('Autofill decimal places with separator', () => {
    fixture.componentInstance.autofill = true;
    fixture.detectChanges();
    addKey('1', 49);
    addKey('2', 50);
    addKey('3', 51);
    addKey(',', 188);
    addKey('2', 50);
    inputEl.triggerEventHandler('blur', { target: inputEl.nativeElement });
    fixture.detectChanges();

    expect(fixture.componentInstance.component.displayValue).toBe('123,200');
    expect(fixture.componentInstance.input).toBe(123.2);
  });

  it('Autofill zero before decimal separator, positive value', () => {
    fixture.componentInstance.autofill = true;
    fixture.detectChanges();
    addKey(',', 188);
    addKey('2', 50);
    inputEl.triggerEventHandler('blur', { target: inputEl.nativeElement });
    fixture.detectChanges();

    expect(fixture.componentInstance.component.displayValue).toBe('0,200');
    expect(fixture.componentInstance.input).toBe(0.2);
  });

  it('Autofill zero before decimal separator, negative value', () => {
    fixture.componentInstance.autofill = true;
    fixture.detectChanges();
    addKey('-', 189);
    addKey(',', 188);
    addKey('2', 50);
    inputEl.triggerEventHandler('blur', { target: inputEl.nativeElement });
    fixture.detectChanges();

    expect(fixture.componentInstance.component.displayValue).toBe('-0,200');
    expect(fixture.componentInstance.input).toBe(-0.2);
  });

  it('Truncate input value', fakeAsync(() => {
    fixture.componentInstance.decimalPlaces = 2;
    fixture.componentInstance.input = 123.99999;
    fixture.componentInstance.rounded = false;
    fixture.componentInstance.autofill = true;
    fixture.detectChanges();

    tick(10);

    expect(inputEl.nativeElement.value).toBe('123,99');
    expect(fixture.componentInstance.component.displayValue).toBe('123,99');
    expect(fixture.componentInstance.input).toBe(123.99999);

    inputEl.triggerEventHandler('blur', { target: inputEl.nativeElement });
    fixture.detectChanges();

    expect(inputEl.nativeElement.value).toBe('123,99');
    expect(fixture.componentInstance.component.displayValue).toBe('123,99');
    expect(fixture.componentInstance.input).toBe(123.99999);

    addKey('Backspace', 8);

    expect(inputEl.nativeElement.value).toBe('123,9');
    expect(fixture.componentInstance.component.displayValue).toBe('123,9');
    expect(fixture.componentInstance.input).toBe(123.9);
  }));

  it('Round input value', fakeAsync(() => {
    fixture.componentInstance.decimalPlaces = 2;
    fixture.componentInstance.input = 123.99999;
    fixture.componentInstance.rounded = true;
    fixture.componentInstance.autofill = true;
    fixture.detectChanges();

    tick(10);

    expect(inputEl.nativeElement.value).toBe('124,00');
    expect(fixture.componentInstance.component.displayValue).toBe('124,00');
    expect(fixture.componentInstance.input).toBe(123.99999);

    inputEl.triggerEventHandler('blur', { target: inputEl.nativeElement });
    fixture.detectChanges();

    expect(inputEl.nativeElement.value).toBe('124,00');
    expect(fixture.componentInstance.component.displayValue).toBe('124,00');
    expect(fixture.componentInstance.input).toBe(123.99999);

    addKey('Backspace', 8);

    expect(inputEl.nativeElement.value).toBe('124,0');
    expect(fixture.componentInstance.component.displayValue).toBe('124,0');
    expect(fixture.componentInstance.input).toBe(124);
  }));

  it('Issue #1378', fakeAsync(() => {
    fixture.componentInstance.decimalPlaces = 2;
    fixture.componentInstance.input = 1.13;
    fixture.componentInstance.rounded = false;
    fixture.componentInstance.autofill = true;
    fixture.detectChanges();

    tick(10);

    expect(inputEl.nativeElement.value).toBe('1,13');
    expect(fixture.componentInstance.component.displayValue).toBe('1,13');
    expect(fixture.componentInstance.input).toBe(1.13);
  }));

  it('Simulate pasted value from clipboard', () => {
    fixture.componentInstance.autofill = true;
    fixture.detectChanges();
    inputEl.nativeElement.value = '123,2';
    inputEl.triggerEventHandler('blur', { target: inputEl.nativeElement });
    fixture.detectChanges();

    expect(fixture.componentInstance.component.displayValue).toBe('123,200');
    expect(fixture.componentInstance.input).toBe(123.2);
  });
});
