/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

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
    '[class.left]': 'direction === "left"',
  },
})
export class ClrContentPanel implements OnInit {
  _open: boolean = false;
  @Input('clrDirection') direction: string = 'right';

  @Output('clrOpened') opened: EventEmitter<any> = new EventEmitter();
  @Output('clrClosed') closed: EventEmitter<any> = new EventEmitter();

  ngOnInit() {}

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
    // this event is used by the tree table to adjust the colomns width
    // 220 is for the animation to finish.
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 220);
  }

  public toggle(): void {
    if (this._open) {
      this.close();
    } else {
      this.open();
    }
  }
}
