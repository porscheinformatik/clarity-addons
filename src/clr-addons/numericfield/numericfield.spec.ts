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
import { ClrNumericField } from './numericfield';

import { ClrNumericFieldModule } from './numericfield.module';

@Component({
  template: `
    <clr-input-container>
      <label>Amount</label>
      <input clrInput clrNumeric type="text" clrDecimalSep="," clrGroupingSep="." clrDecimalPlaces="3"
             [(clrNumericValue)]="input"/>
    </clr-input-container>
  `,
})
class TestComponent {
  @ViewChild(ClrNumericField) component;
  input: number;
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
    addKey('2', 50);
    addKey('3', 51);
    addKey('4', 52);
    addKey('5', 53);
    addKey('6', 54);
    addKey('7', 55);
    fixture.detectChanges();

    expect(fixture.componentInstance.component.displayValue).toBe('1.234.567');
    expect(fixture.componentInstance.input).toBe(1234567);
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

  it('Toggle negative', () => {
    addKey('1', 49);
    addKey('2', 50);
    addKey('3', 51);
    addKey('-', 189);
    addKey('4', 52);
    addKey(',', 188);
    addKey('5', 53);
    fixture.detectChanges();

    expect(fixture.componentInstance.component.displayValue).toBe('-1.234,5');
    expect(fixture.componentInstance.input).toBe(-1234.5);
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
});
