/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { ClrAutocompleteOff } from './autocomplete-off.directive';
import { ClrAddonsLabel } from '../abstract-form-component/label';

@Component({
  template: `
    <clr-input-container>
      <label>Name</label>
      <input #noAutoComplete clrInput type="text" />
    </clr-input-container>
    <clr-input-container>
      <label>Name</label>
      <input #hasAutoComplete autocomplete="name" clrInput type="text" />
    </clr-input-container>
  `,
  imports: [ClarityModule, FormsModule, ClrAutocompleteOff, ClrAddonsLabel],
})
class TestComponent {
  @ViewChild('noAutoComplete') noAutocomplete: ElementRef;
  @ViewChild('hasAutoComplete') hasAutocomplete: ElementRef;
}

describe('AutocompleteOffDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClarityModule, FormsModule, BrowserAnimationsModule, ClrAutocompleteOff, ClrAddonsLabel, TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('Added autocomplete=off attribute', () => {
    expect(fixture.componentInstance.noAutocomplete.nativeElement.attributes['autocomplete'].value).toBe('off');
  });

  it("Didn't add autocomplete attribute when already present", () => {
    expect(fixture.componentInstance.hasAutocomplete.nativeElement.attributes['autocomplete'].value).toBe('name');
  });
});
