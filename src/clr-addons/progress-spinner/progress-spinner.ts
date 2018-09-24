/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[clrProgressSpinner]',
})
export class ClrProgressSpinnerDirective implements OnInit, OnChanges, OnDestroy {
  static readonly MINIMUM_VISIBLE_DURATION = 200;
  @Input('clrProgressSpinner') showSpinner: boolean;
  @Input('clrSize') size: string = 'sm';

  loadingSpinnerVisible: boolean = false;
  startTimestamp: number;
  hideTimeout: any;

  spinnerElement: any;
  loadingOverlay: any;

  constructor(private element: ElementRef, private renderer: Renderer2) {
    this.spinnerElement = this.renderer.createElement('span');
    this.loadingOverlay = this.renderer.createElement('div');
    this.renderer.addClass(this.loadingOverlay, 'loading-overlay');
    this.renderer.addClass(this.spinnerElement, 'spinner');
    this.renderer.appendChild(this.loadingOverlay, this.spinnerElement);

    this.renderer.setStyle(this.loadingOverlay, 'display', 'none');
    this.renderer.insertBefore(this.element.nativeElement, this.loadingOverlay, this.element.nativeElement.children[0]);
  }

  reloadState(): void {
    if (this.showSpinner) {
      this.show();
    } else {
      this.hide();
    }
  }

  show(): void {
    clearTimeout(this.hideTimeout);
    this.loadingSpinnerVisible = true;
    this.renderer.setStyle(this.loadingOverlay, 'display', 'flex');
    this.startTimestamp = new Date().getTime();
  }

  hide(): void {
    this.hideTimeout = setTimeout(() => {
      this.renderer.setStyle(this.loadingOverlay, 'display', 'none');
      this.loadingSpinnerVisible = false;
      this.startTimestamp = undefined;
    }, this.getRemainingVisibleTime());
  }

  getRemainingVisibleTime(): number {
    return Math.max(0, ClrProgressSpinnerDirective.MINIMUM_VISIBLE_DURATION - this.getVisibleTime());
  }

  getVisibleTime(): number {
    if (!this.startTimestamp) {
      return 0;
    } else {
      return new Date().getTime() - this.startTimestamp;
    }
  }

  ngOnInit(): void {
    this.reloadState();
    this.renderer.addClass(this.spinnerElement, 'spinner-' + this.size);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.reloadState();
  }

  ngOnDestroy(): void {
    clearTimeout(this.hideTimeout);
  }
}
