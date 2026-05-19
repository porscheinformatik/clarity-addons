/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import {
  AfterViewInit,
  ComponentRef,
  Directive,
  ElementRef,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  ViewContainerRef,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClarityIcons, searchIcon, timesIcon } from '@clr/angular/icon';
import { ClrIcon } from '@clr/angular';

ClarityIcons.addIcons(timesIcon, searchIcon);

@Directive({
  selector: '[clrSearch]',
  host: { '[class.search-input]': 'true' },
  standalone: false,
})
export class ClrSearchField implements OnInit, OnDestroy, AfterViewInit {
  private keyupListener: () => void;

  private deleteIconRef: ComponentRef<ClrIcon>;
  private searchIconRef: ComponentRef<ClrIcon>;
  private deleteButton: HTMLElement;

  destroyed = new Subject<void>();

  constructor(
    private renderer: Renderer2,
    private inputEl: ElementRef,
    private viewContainerRef: ViewContainerRef,
    @Optional() private ngControl: NgControl
  ) {}

  ngOnInit(): void {
    this.setHasValueClass(!!this.inputEl.nativeElement.value);

    // use angular form control for change detection and input listener as fallback
    if (this.ngControl) {
      this.ngControl.valueChanges.pipe(takeUntil(this.destroyed)).subscribe(value => this.setHasValueClass(!!value));
    } else {
      this.keyupListener = this.renderer.listen(this.inputEl.nativeElement, 'input', event =>
        this.setHasValueClass(!!event.target.value)
      );
    }
  }

  ngAfterViewInit(): void {
    this.addClassToWrapper(this.inputEl.nativeElement.parentNode);
    this.injectSearchIcon();
    this.injectDeleteIcon();
  }

  ngOnDestroy(): void {
    this.detachListener();
    this.destroyed.next();
    this.destroyed.complete();
    this.deleteIconRef?.destroy();
    this.searchIconRef?.destroy();
  }

  clearSearchInput(): void {
    this.renderer.setProperty(this.inputEl.nativeElement, 'value', '');
    this.setHasValueClass(false);
    const event = new CustomEvent('input', { bubbles: false, cancelable: false });
    this.inputEl.nativeElement.dispatchEvent(event);
    this.inputEl.nativeElement.focus();
  }

  private setHasValueClass(active: boolean): void {
    if (active) {
      this.renderer.addClass(this.inputEl.nativeElement.parentNode, 'has-value');
    } else {
      this.renderer.removeClass(this.inputEl.nativeElement.parentNode, 'has-value');
    }
  }

  private injectDeleteIcon(): void {
    const inputWrapper = this.inputEl.nativeElement.parentNode;

    if (!this.deleteIconRef) {
      this.deleteButton = this.renderer.createElement('button');
      this.renderer.setAttribute(this.deleteButton, 'type', 'button');
      this.renderer.addClass(this.deleteButton, 'btn');
      this.renderer.addClass(this.deleteButton, 'btn-link');
      this.renderer.addClass(this.deleteButton, 'btn-icon');
      this.renderer.addClass(this.deleteButton, 'delete-button');
      this.deleteButton.addEventListener('click', () => this.clearSearchInput());

      this.deleteIconRef = this.viewContainerRef.createComponent(ClrIcon);
      this.deleteIconRef.instance.shape = 'times';
      const deleteIconEl = this.deleteIconRef.location.nativeElement;
      this.renderer.appendChild(this.deleteButton, deleteIconEl);
      this.renderer.appendChild(inputWrapper, this.deleteButton);
    }
  }

  private injectSearchIcon(): void {
    const inputWrapper = this.inputEl.nativeElement.parentNode;

    if (!this.searchIconRef) {
      this.searchIconRef = this.viewContainerRef.createComponent(ClrIcon);
      this.searchIconRef.instance.shape = 'search';
      const searchIconEl = this.searchIconRef.location.nativeElement;
      this.renderer.addClass(searchIconEl, 'search-symbol');
      this.renderer.insertBefore(inputWrapper, searchIconEl, this.inputEl.nativeElement);
    }
  }

  private addClassToWrapper(inputWrapper: any): void {
    this.renderer.addClass(inputWrapper, 'search-input-wrapper');
  }

  private detachListener(): void {
    if (this.keyupListener) {
      this.keyupListener();
      delete this.keyupListener;
    }
  }
}
