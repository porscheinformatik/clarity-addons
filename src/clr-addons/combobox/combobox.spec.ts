/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';

import { ClrComboboxModule } from './combobox.module';
import { ClrOption } from './option';

@Component({
  template: `
    <clr-combobox class="clr-col-12" [clrPreselectedValue]="'Option 3'" (clrSelectedOption)="selectedOption = $event" (clrEnteredValue)="enteredValue = $event" [clrAllowUserEntry]="false">
      <label>Preselected value</label>
      <clr-options>
          <clr-option [clrValue]="'Option 1'">Option 1</clr-option>
          <clr-option [clrValue]="'Option 2'">Option 2</clr-option>
          <clr-option [clrValue]="'Option 3'">Option 3</clr-option>
          <div class="clr-no-results">No search results found</div>
      </clr-options>
      <clr-control-error>Select a value</clr-control-error>
    </clr-combobox>
  `,
})
class TestComponent {
  selectedOption: ClrOption<string>;
  enteredValue: string;
}

describe('ComboboxComponent', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClarityModule, ClrComboboxModule],
      declarations: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('Preselect option', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance.selectedOption.value).toBe('Option 3');
  });
});
