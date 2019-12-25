/*
 * Copyright (c) 2018-2019 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { isPlatformBrowser } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import {
  ClrLabel,
  ɵbg as ControlIdService,
  ɵbh as LayoutService,
  ɵbo as ControlClassService,
  ɵe as IfOpenService,
  ɵi as POPOVER_HOST_ANCHOR,
} from '@clr/angular';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ClrOption } from './option';
import { ClrOptions } from './options';
import { OptionSelectionService } from './providers/option-selection.service';
import { ComboboxDomAdapter } from './utils/combobox-dom-adapter.service';
import { ComboboxNoopDomAdapter } from './utils/combobox-noop-dom-adapter.service';
import { DOWN_ARROW, ENTER, TAB, UP_ARROW } from './utils/constants';
import { MobileBehaviourMode } from './utils/mobile-behaviour-mode';

// Fixes build error
// @dynamic (https://github.com/angular/angular/issues/19698#issuecomment-338340211)
export function comboboxDomAdapterFactory(platformId: Object) {
  if (isPlatformBrowser(platformId)) {
    return new ComboboxDomAdapter();
  } else {
    return new ComboboxNoopDomAdapter();
  }
}

@Component({
  selector: 'clr-combobox',
  templateUrl: './combobox.html',
  providers: [
    IfOpenService,
    { provide: POPOVER_HOST_ANCHOR, useExisting: ElementRef },
    OptionSelectionService,
    { provide: ComboboxDomAdapter, useFactory: comboboxDomAdapterFactory, deps: [PLATFORM_ID] },
    ControlClassService,
    LayoutService,
    ControlIdService,
  ],
  host: {
    '[class.clr-combobox]': 'true',
  },
})
export class ClrCombobox<T> implements OnInit, AfterContentInit, OnDestroy {
  @Input('clrControlClasses') controlClasses: string;
  @Input('clrAllowUserEntry') allowUserEntry: boolean = false;
  @Input('clrPreselectedValue') preselectedValue: T;
  @Input('clrMobileBehaviourMode') mobileBehaviourMode: MobileBehaviourMode = MobileBehaviourMode.DEFAULT;
  @Output('clrSelectedOption') selectedOption: EventEmitter<ClrOption<T>> = new EventEmitter<ClrOption<T>>();
  @Output('clrEnteredValue') enteredValue: EventEmitter<string> = new EventEmitter<string>();

  @HostBinding('class.clr-empty') noSearchResults: boolean;

  @ViewChild('input', { static: true }) input: ElementRef;
  @ContentChild(ClrOptions, { static: true }) options: ClrOptions<T>;
  @ContentChild(ClrLabel, { static: true }) label: ClrLabel;
  invalid: boolean = false;
  keyHandled: boolean = false;
  private subscriptions: Subscription[] = [];
  selectedValue: T = this.preselectedValue;

  constructor(
    private ifOpenService: IfOpenService,
    private optionSelectionService: OptionSelectionService<T>,
    @Optional() private layoutService: LayoutService,
    private domAdapter: ComboboxDomAdapter,
    private controlClassService: ControlClassService
  ) {}

  private initializeSubscriptions(): void {
    this.subscriptions.push(
      this.optionSelectionService.selectionChanged.subscribe((option: ClrOption<T>) => {
        this.renderSelection(option);
      })
    );
    this.subscriptions.push(
      this.optionSelectionService.searchValueChanged.subscribe((value: string) => {
        if (this.allowUserEntry) {
          this.enteredValue.emit(value);
        }
        if (value !== null) {
          this.ifOpenService.open = true;
        }
      })
    );
    this.subscriptions.push(
      this.optionSelectionService.navigatableOptionsChanged.subscribe((count: number) => {
        this.noSearchResults = count === 0;
      })
    );
  }

  private renderSelection(selectedOption: ClrOption<T>): void {
    this.selectedOption.emit(selectedOption);
    if (this.input && selectedOption) {
      this.selectedValue = selectedOption.value;
      this.input.nativeElement.innerText = selectedOption.getDisplayedText();
      this.validateInput();
    }
  }

  private registerPopoverIgnoredInput() {
    if (this.input) {
      this.ifOpenService.registerIgnoredElement(this.input);
    }
  }

  toggleOptionsMenu(event: MouseEvent): void {
    this.ifOpenService.toggleWithEvent(event);
  }

  @HostListener('click')
  focusInput() {
    if (this.input) {
      this.domAdapter.focus(this.input.nativeElement);
    }
  }

  keydown(event: KeyboardEvent) {
    if (event) {
      this.keyHandled = this.navigateOptions(event);
      this.keyHandled = this.keyHandled || this.closeMenuOnTabPress(event);
    }
  }

  navigateOptions(event: KeyboardEvent): boolean {
    if (event.keyCode === DOWN_ARROW) {
      this.ifOpenService.open = true;
      this.optionSelectionService.navigateToNextOption();
      return true;
    } else if (event.keyCode === UP_ARROW) {
      this.ifOpenService.open = true;
      this.optionSelectionService.navigateToPreviousOption();
      return true;
    } else if (event.keyCode === ENTER) {
      this.optionSelectionService.selectActiveOption();
      event.preventDefault();
      return true;
    }
    return false;
  }

  closeMenuOnTabPress(event: KeyboardEvent): boolean {
    if (event.keyCode === TAB) {
      this.ifOpenService.open = false;
      return true;
    }
    return false;
  }

  search() {
    if (!this.keyHandled) {
      this.optionSelectionService.setSearchValue(this.input.nativeElement.textContent.trim());
    }
    this.keyHandled = false;
  }

  blur() {
    if (!this.allowUserEntry) {
      if (!this.ifOpenService.open) {
        this.validateInput();
      } else {
        // Wait for validation until dropdown is closed, as a click on a dropdown menu loses focus too early
        this.ifOpenService.openChange.pipe(take(1)).subscribe(() => {
          this.validateInput();
        });
      }
    }
  }

  validateInput() {
    let selectedOption: ClrOption<T>;
    let searchValue: string;

    this.optionSelectionService.selectionChanged
      .subscribe((selected: ClrOption<T>) => {
        selectedOption = selected;
      })
      .unsubscribe();

    this.optionSelectionService.searchValueChanged
      .subscribe((value: string) => {
        searchValue = value;
      })
      .unsubscribe();
    if (!selectedOption && searchValue && searchValue.length > 0) {
      this.invalid = true;
    } else {
      this.invalid = false;
    }
  }

  addGrid() {
    if (this.layoutService && !this.layoutService.isVertical()) {
      return true;
    }
    return false;
  }

  controlClass() {
    return this.controlClasses
      ? this.controlClasses
      : this.controlClassService.controlClass(this.invalid, this.addGrid());
  }

  // Lifecycle methods
  ngOnInit() {
    this.initializeSubscriptions();
  }

  ngAfterContentInit() {
    this.registerPopoverIgnoredInput();
    this.optionSelectionService.setOptions(this.options);
    this.optionsUpdatedByUser();
    this.subscriptions.push(
      this.options.options.changes.subscribe(() => {
        this.optionsUpdatedByUser();
      })
    );
  }

  optionsUpdatedByUser() {
    if (this.options.options.length > 0 && !!this.preselectedValue) {
      const option = this.options.options.find(o => o.value === this.preselectedValue);
      if (!!option) {
        this.optionSelectionService.setSelection(option);
      }
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  showSelect() {
    switch (this.mobileBehaviourMode) {
      case MobileBehaviourMode.FORCE_SELECT:
        return true;
      case MobileBehaviourMode.FORCE_AUTOCOMPLETE:
        return false;
      default:
        return !this.allowUserEntry;
    }
  }

  getOptionsAsArray(): Array<ClrOption<T>> {
    if (this.options.options) {
      return this.options.options.toArray();
    }
    return [];
  }

  selectedValueChange() {
    const option = this.options.options.find(o => o.value === this.selectedValue);
    this.optionSelectionService.setSelection(option);
  }
}
