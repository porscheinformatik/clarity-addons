/*
 * Copyright (c) 2018-2022 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'clr-content-panel',
  templateUrl: './content-panel.html',
  animations: [
    trigger('slideIn', [
      transition(':enter', [style({ opacity: 0, width: 0 }), animate('0.2s', style({ opacity: 1, width: '*' }))]),
      transition(':leave', [style({ opacity: 1, width: '*' }), animate('0.2s', style({ opacity: 0, width: 0 }))]),
    ]),
    trigger('fade', [
      transition(':enter', [style({ opacity: 0 }), animate('0.2s ease-in-out', style({ opacity: 0.85 }))]),
      transition(':leave', [animate('0.2s ease-in-out', style({ opacity: 0 }))]),
    ]),
  ],
  host: {
    '[class.content-panel]': 'true',
  },
})
export class ClrContentPanel {
  _open = false;

  @Output('clrOpened') opened: EventEmitter<any> = new EventEmitter();
  @Output('clrClosed') closed: EventEmitter<any> = new EventEmitter();

  public isOpen(): boolean {
    return this._open;
  }

  public open(): void {
    if (this._open) {
      return;
    }
    this._open = true;
    this.opened.emit();
  }

  public close(): void {
    if (!this._open) {
      return;
    }
    this._open = false;
    this.closed.emit();
  }

  public toggle(): void {
    if (this._open) {
      this.close();
    } else {
      this.open();
    }
  }

  resizeWindow(): void {
    // this event is used by the tree table to adjust the colomns width
    window.dispatchEvent(new Event('resize'));
  }
}
