/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { ClrSearchFieldModule } from './search-field.module';
import { FormsModule } from '@angular/forms';

@Component({
  template: `
  <clr-input-container>
    <label>Search</label>
    <input clrInput clrSearch type="text" name="search" [(ngModel)]="value"/>
  </clr-input-container>
  `,
})
class TestComponent {
  value: string;
}

describe('SearchComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClarityModule, ClrSearchFieldModule, FormsModule],
      declarations: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    inputEl = fixture.debugElement.query(By.css('input'));
    fixture.detectChanges();
  });

  function addKey(key: string, keyCode: number) {
    if (keyCode === 8) {
      inputEl.nativeElement.value = inputEl.nativeElement.value.substring(0, inputEl.nativeElement.value.length - 1);
    } else {
      inputEl.nativeElement.value += key;
    }
    const event = document.createEvent('Event');
    event.initEvent('input', false, false);
    inputEl.nativeElement.dispatchEvent(event);
    inputEl.triggerEventHandler('keyup', { key: key, keyCode: keyCode, target: inputEl.nativeElement });
  }

  it('icon search rendered', () => {
    expect(inputEl.parent.query(By.css('[shape=search]'))).toBeTruthy();
  });

  it('icon remove invisible', () => {
    expect(getComputedStyle(inputEl.parent.query(By.css('[shape=times]')).parent.nativeElement).display).toBe('none');
  });

  it('icon remove visible', () => {
    addKey('1', 49);
    expect(getComputedStyle(inputEl.parent.query(By.css('[shape=times]')).parent.nativeElement).display).not.toBe(
      'none'
    );
  });

  it('icon remove working', () => {
    addKey('1', 49);
    const removeIcon = inputEl.parent.query(By.css('[shape=times]')).parent.nativeElement;
    expect(getComputedStyle(removeIcon).display).not.toBe('none');
    expect(fixture.componentInstance.value).toBe('1');

    removeIcon.click();

    expect(fixture.componentInstance.value).toBe('');
    expect(getComputedStyle(removeIcon).display).toBe('none');
  });
});
