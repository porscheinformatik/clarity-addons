/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { ClrSearchField } from './Search-field';

import { ClrSearchFieldModule } from './Search-field.module';

@Component({
  template: `
    <clr-input-container>
      <label>Search SPEC</label>
      <input clrInput clrSearch type="text" [(clrSearchValue)]="input"/>
    </clr-input-container>
  `,
})
class TestComponent {
  @ViewChild(ClrSearchField) component;
  input: string;
  autofill = false;
  rounded = false;
}

describe('SearchComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClarityModule, FormsModule, BrowserAnimationsModule, ClrSearchFieldModule],
      declarations: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    inputEl = fixture.debugElement.query(By.css('input'));
    fixture.detectChanges();
  });

  function addKey(key: string, keyCode: number) {
    inputEl.triggerEventHandler('keydown', { key: key, keyCode: keyCode, target: inputEl.nativeElement });
    if (keyCode === 8) {
      inputEl.nativeElement.value = inputEl.nativeElement.value.substring(0, inputEl.nativeElement.value.length - 1);
    } else {
      inputEl.nativeElement.value += key;
    }
    inputEl.triggerEventHandler('keyup', { key: key, keyCode: keyCode, target: inputEl.nativeElement });
  }

  it(
    'Truncate input value',
    fakeAsync(() => {
      fixture.componentInstance.input = 'testInput';
      fixture.componentInstance.rounded = false;
      fixture.componentInstance.autofill = true;
      fixture.detectChanges();

      tick(10);

      expect(inputEl.nativeElement.value).toBe('testInput');
      expect(fixture.componentInstance.component.displayValue).toBe('testInput');

      inputEl.triggerEventHandler('blur', { target: inputEl.nativeElement });
      fixture.detectChanges();

      expect(inputEl.nativeElement.value).toBe('testInput');
      expect(fixture.componentInstance.component.displayValue).toBe('testInput');

      addKey('Backspace', 5);

      expect(inputEl.nativeElement.value).toBe('test');
      expect(fixture.componentInstance.component.displayValue).toBe('test');
    })
  );
});
