/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  ClarityModule, ɵbg as ControlIdService, ɵbh as LayoutService, ɵbo as ControlClassService,
  ɵe as IfOpenService, ɵi as POPOVER_HOST_ANCHOR, ɵt as AbstractPopover
} from '@clr/angular';
import { ClrComboboxModule } from './combobox.module';
import { ClrOption } from './option';
import { MobileBehaviourMode } from './utils/constants';


@Component({
  template: `
    <clr-combobox
      class="clr-col-12"
      [clrPreselectedValue]="'Option 3'"
      (clrSelectedOption)="selectedOption = $event"
      (clrEnteredValue)="enteredValue = $event"
      [clrMobileBehaviourMode]="mobileBehaviourMode"
      [clrAllowUserEntry]="allowUserEntry"
    >
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
  mobileBehaviourMode: MobileBehaviourMode = MobileBehaviourMode.DEFAULT;
  allowUserEntry: boolean = false;
}

describe('ComboboxComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let inputEl: DebugElement;
  let selectEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClarityModule, ClrComboboxModule],
      declarations: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    inputEl = fixture.debugElement.query(By.css('.clr-combobox-input'));
    selectEl = fixture.debugElement.query(By.css('.clr-combobox-input.select-element'));
    fixture.detectChanges();
  });

  function selectIsShown() {
    return (
      inputEl.nativeElement.classList.contains('hidden-sm') && selectEl.nativeElement.classList.contains('visible-sm')
    );
  }

  it('Preselect option', () => {
    fixture.detectChanges();

    expect(fixture.componentInstance.selectedOption.value).toBe('Option 3');
  });

  it('Select element shown by default - user entries allowed', () => {
    fixture.componentInstance.mobileBehaviourMode = MobileBehaviourMode.DEFAULT;
    fixture.componentInstance.allowUserEntry = false;
    fixture.detectChanges();

    expect(selectIsShown()).toBe(true);
  });

  it('Select element shown by default - user entries not allowed', () => {
    fixture.componentInstance.mobileBehaviourMode = MobileBehaviourMode.DEFAULT;
    fixture.componentInstance.allowUserEntry = true;
    fixture.detectChanges();

    expect(selectIsShown()).toBe(false);
  });

  it('Select element shown when forced select - user entries not allowed', () => {
    fixture.componentInstance.mobileBehaviourMode = MobileBehaviourMode.FORCE_SELECT;
    fixture.componentInstance.allowUserEntry = false;
    fixture.detectChanges();

    expect(selectIsShown()).toBe(true);
  });

  it('Select element shown when forced select - user entries allowed', () => {
    fixture.componentInstance.mobileBehaviourMode = MobileBehaviourMode.FORCE_SELECT;
    fixture.componentInstance.allowUserEntry = true;
    fixture.detectChanges();

    expect(selectIsShown()).toBe(true);
  });

  it('Select element not shown when forced autocomplete - user entries not allowed', () => {
    fixture.componentInstance.mobileBehaviourMode = MobileBehaviourMode.FORCE_AUTOCOMPLETE;
    fixture.componentInstance.allowUserEntry = false;
    fixture.detectChanges();

    expect(selectIsShown()).toBe(false);
  });

  it('Select element not shown when forced autocomplete - user entries allowed', () => {
    fixture.componentInstance.mobileBehaviourMode = MobileBehaviourMode.FORCE_AUTOCOMPLETE;
    fixture.componentInstance.allowUserEntry = true;
    fixture.detectChanges();

    expect(selectIsShown()).toBe(false);
  });

  it('check correct obfuscated imports', () => {
    expect(new IfOpenService().constructor.name).toBe('IfOpenService');
    expect(new ControlIdService().constructor.name).toBe('ControlIdService');
    expect(new LayoutService().constructor.name).toBe('LayoutService');
    expect(new ControlClassService().constructor.name).toBe('ControlClassService');
    expect(AbstractPopover.toString()).toContain('AbstractPopover');
    expect(POPOVER_HOST_ANCHOR.toString()).toContain('POPOVER_HOST_ANCHOR');
  });
});
