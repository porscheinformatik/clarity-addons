/*
 * Copyright (c) 2018-2020 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ElementRef } from '@angular/core';
import { ClrPopoverToggleService } from '@clr/angular';
import { ClrOption } from '../option';
import { OptionSelectionService } from './option-selection.service';
import { tick, fakeAsync } from '@angular/core/testing';

describe('Option Selection Service', () => {
  let optionSelectionService: OptionSelectionService<string>;
  let fakeOption1: ClrOption<string>;
  let fakeOption2: ClrOption<string>;

  beforeEach(() => {
    optionSelectionService = new OptionSelectionService();
    fakeOption1 = new ClrOption(new ClrPopoverToggleService(), new ElementRef(null), null, optionSelectionService);
    fakeOption2 = new ClrOption(new ClrPopoverToggleService(), new ElementRef(null), null, optionSelectionService);
  });

  it('provides an observable to notify that selected option has been changed', () => {
    expect(optionSelectionService.selectionChanged).toBeDefined();
  });

  it('notifies that the option has changed', fakeAsync(() => {
    let selectedOption: ClrOption<string>;
    const subscription = optionSelectionService.selectionChanged.subscribe((option: ClrOption<string>) => {
      selectedOption = option;
    });

    optionSelectionService.setSelection(fakeOption1);
    tick(5);
    expect(selectedOption).toBe(fakeOption1);

    optionSelectionService.setSelection(fakeOption2);
    tick(5);
    expect(selectedOption).toBe(fakeOption2);

    subscription.unsubscribe();
  }));

  it('does not notify when the selected option remains the same', fakeAsync(() => {
    let count = 0;
    const sub = optionSelectionService.selectionChanged.subscribe(() => {
      count++;
    });

    optionSelectionService.setSelection(fakeOption1);
    tick(5);
    expect(count).toBe(1);

    optionSelectionService.setSelection(fakeOption1);
    tick(5);
    expect(count).toBe(1);

    sub.unsubscribe();
  }));

  it('provides an observable to notify that user given search value has changed', () => {
    expect(optionSelectionService.searchValueChanged).toBeDefined();
  });

  it('notifies that the user search value has changed', () => {
    let searchValue: string;
    const subscription = optionSelectionService.searchValueChanged.subscribe((value: string) => {
      searchValue = value;
    });

    optionSelectionService.setSearchValue('fakeSearch1');
    expect(searchValue).toBe('fakeSearch1');

    optionSelectionService.setSearchValue('fakeSearch2');
    expect(searchValue).toBe('fakeSearch2');

    subscription.unsubscribe();
  });

  it('does not notify when the user search value remains the same', () => {
    let count = -1; // as it's a BehaviorSubject ignore the first call
    const sub = optionSelectionService.searchValueChanged.subscribe(() => {
      count++;
    });

    optionSelectionService.setSearchValue('fakeSearch1');
    expect(count).toBe(1);

    optionSelectionService.setSearchValue('fakeSearch1');
    expect(count).toBe(1);

    sub.unsubscribe();
  });

  it('notifies that the option has reset, when user enters a search value', fakeAsync(() => {
    let selectedOption: ClrOption<string>;
    const selectionSub = optionSelectionService.selectionChanged.subscribe((option: ClrOption<string>) => {
      selectedOption = option;
    });

    let searchValue: string;
    const searchSub = optionSelectionService.searchValueChanged.subscribe((value: string) => {
      searchValue = value;
    });

    optionSelectionService.setSelection(fakeOption1);
    tick(5);
    expect(selectedOption).toBe(fakeOption1);
    expect(searchValue).toBeNull();

    optionSelectionService.setSearchValue('fakeSearch2');
    tick(5);
    expect(selectedOption).toBe(undefined);
    expect(searchValue).toBe('fakeSearch2');

    selectionSub.unsubscribe();
    searchSub.unsubscribe();
  }));
});
