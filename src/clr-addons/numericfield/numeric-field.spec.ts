/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
      <input clrInput clrNumeric type="text" clrDecimalSep="," clrGroupingSep="." [clrDecimalPlaces]="decimalPlaces"
          [clrAutofillDecimals]="autofill" [(clrNumericValue)]="input"/>
    </clr-input-container>
  `,
})
class TestComponent {
  @ViewChild(ClrNumericField) component;
  input: number;
  decimalPlaces = 3;
  autofill = false;
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
    inputEl = fixture.debugElement.query(By.css('input'));
    fixture.detectChanges();
  });

  function addKey(key: string, keyCode: number) {
    inputEl.triggerEventHandler('keydown', { key: key, keyCode: keyCode, target: inputEl.nativeElement });
    inputEl.nativeElement.value += key;
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
    inputEl.triggerEventHandler('change', { target: inputEl.nativeElement });
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
    inputEl.triggerEventHandler('change', { target: inputEl.nativeElement });
    fixture.detectChanges();

    expect(fixture.componentInstance.component.displayValue).toBe('123,200');
    expect(fixture.componentInstance.input).toBe(123.2);
  });
});
