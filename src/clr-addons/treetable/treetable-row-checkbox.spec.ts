/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ClrTreetableRowCheckbox } from './treetable-row-checkbox';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClrTreetableColumn } from './treetable-column';
import { ClrTreetableSelectedState } from './enums/selection-type';
import { By } from '@angular/platform-browser';

describe('ClrTreetableRowCheckbox', () => {
  let component: ClrTreetableRowCheckbox;
  let fixture: ComponentFixture<ClrTreetableRowCheckbox>;

  let checkboxElement: HTMLInputElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClrTreetableColumn],
    });

    fixture = TestBed.createComponent(ClrTreetableRowCheckbox);
    component = fixture.componentInstance;

    checkboxElement = fixture.debugElement.query(By.css('[data-testId="clrTtRowCheckbox"]')).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('input: clrTtSelectionState', () => {
    it('should set the checkbox to UNSELECTED if no input is given', () => {
      expect(checkboxElement.checked).toBeFalse();
    });

    it('should set the checkbox to UNSELECTED if unselect is given as input', () => {
      const testState = ClrTreetableSelectedState.UNSELECTED;
      fixture.componentRef.setInput('clrTtSelectionState', testState);
      expect(checkboxElement.checked).toBeFalse();
    });

    it('should set the checkbox to UNSELECTED and be INDETERMINATE if indeterminate is given as input', () => {
      const testState = ClrTreetableSelectedState.INDETERMINATE;
      fixture.componentRef.setInput('clrTtSelectionState', testState);
      fixture.detectChanges();
      expect(checkboxElement.checked).toBeFalse();
      expect(checkboxElement.indeterminate).toBeTrue();
    });

    it('should set the checkbox to SELECTED if selected is given as input', () => {
      const testState = ClrTreetableSelectedState.SELECTED;
      fixture.componentRef.setInput('clrTtSelectionState', testState);
      fixture.detectChanges();
      expect(checkboxElement.checked).toBeTrue();
    });
  });

  describe('output: clrTtSelectionStateChange', () => {
    it('should not emit, if no click event is triggered on the checkbox', () => {
      const testState = ClrTreetableSelectedState.SELECTED;
      fixture.componentRef.setInput('clrTtSelectionState', testState);
      expect(component.clrTtSelectionState()).toBe(ClrTreetableSelectedState.SELECTED);
    });

    it('should emit SELECTED, if the unselected checkbox is clicked', () => {
      const testState = ClrTreetableSelectedState.UNSELECTED;
      fixture.componentRef.setInput('clrTtSelectionState', testState);
      checkboxElement.click();
      expect(component.clrTtSelectionState()).toBe(ClrTreetableSelectedState.SELECTED);
    });

    it('should emit UNSELECTED, if the selected checkbox is clicked', () => {
      const testState = ClrTreetableSelectedState.SELECTED;
      fixture.componentRef.setInput('clrTtSelectionState', testState);
      checkboxElement.click();
      expect(component.clrTtSelectionState()).toBe(ClrTreetableSelectedState.UNSELECTED);
    });

    it('should emit SELECTED, if the indeterminate checkbox is clicked', () => {
      const testState = ClrTreetableSelectedState.INDETERMINATE;
      fixture.componentRef.setInput('clrTtSelectionState', testState);
      checkboxElement.click();
      expect(component.clrTtSelectionState()).toBe(ClrTreetableSelectedState.SELECTED);
    });
  });
});
