/*
 * Copyright (c) 2018-2022 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

import { ClrQuickList } from './quick-list';
import { ClrQuickListValue } from '@porscheinformatik/clr-addons';
import { ClrAddOption } from './add-option';

describe('QuickListComponent', () => {
  let component: ClrQuickList<any>;
  let fixture: ComponentFixture<ClrQuickList<any>>;
  let el1, el2: ClrQuickListValue<any>;
  let allValues: Array<ClrQuickListValue<any>>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ClrQuickList, ClrAddOption],
      imports: [ClarityModule, FormsModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    el1 = { id: '1', label: 'one', value: 1 };
    el2 = { id: '2', label: 'two', value: 2 };
    allValues = [el1, el2];
    fixture = TestBed.createComponent(ClrQuickList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add be not possible', () => {
    component.allValues = allValues;
    component.values = allValues;
    expect(component.addNotPossible).toBeTruthy();
  });

  it('should item be removed', () => {
    component.allValues = allValues;
    component.values = allValues;
    component.onRemoveValue(0);
    expect(component.values.length).toBe(1);
    expect(component.values[0]).toBe(allValues[0]);
    component.onRemoveValue(0);
    expect(component.values.length).toBe(0);
  });

  it('should add be possible', () => {
    spyOn(component.emptyOptionAdded, 'emit');
    component.allValues = allValues;
    component.values = allValues;
    component.onRemoveValue(0);
    component.addBlankOption();
    expect(component.emptyOptionAdded.emit).toHaveBeenCalledTimes(1);
  });

  it('should selected values change', () => {
    component.allValues = allValues;
    component.onValueChanged(allValues[1], 0);
    expect(component.values[0]).toBe(allValues[1]);
  });
});
