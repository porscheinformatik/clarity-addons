/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'clr-progress-spinner',
  template: `
    <span [class]="'spinner-'+size+' spinner'" *ngIf="_showSpinner"></span>
  `,
  host: {
    '[class.progress-spinner-overlay]': '_showSpinner',
  },
})
export class ClrProgressSpinnerComponent implements OnDestroy {
  private static readonly MINIMUM_VISIBLE_DURATION = 200;
  private startTimestamp: number;
  private hideTimeout: any;

  @Input('clrSize') size: string = 'sm';

  _showSpinner: boolean;

  @Input('clrShowSpinner')
  set showSpinner(value: boolean) {
    if (value) {
      this.show();
    } else {
      this.hide();
    }
  }

  constructor() {}

  ngOnDestroy(): void {
    clearTimeout(this.hideTimeout);
  }

  private show(): void {
    clearTimeout(this.hideTimeout);
    this._showSpinner = true;
    this.startTimestamp = new Date().getTime();
  }

  private hide(): void {
    this.hideTimeout = setTimeout(() => {
      this.startTimestamp = undefined;
      this._showSpinner = false;
    }, this.getRemainingVisibleTime());
  }

  private getRemainingVisibleTime(): number {
    return Math.max(0, ClrProgressSpinnerComponent.MINIMUM_VISIBLE_DURATION - this.getVisibleTime());
  }

  private getVisibleTime(): number {
    if (!this.startTimestamp) {
      return 0;
    } else {
      return new Date().getTime() - this.startTimestamp;
    }
  }
}
