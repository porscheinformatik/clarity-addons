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
      transition('void => right', [style({ opacity: 0, transform: 'translate(50%, 0)' }), animate('0.2s ease-in-out')]),
      transition('right => void', [animate('0.2s ease-in-out', style({ opacity: 0, transform: 'translate(50%, 0)' }))]),
      transition('void => left', [style({ opacity: 0, transform: 'translate(-50%, 0)' }), animate('0.2s ease-in-out')]),
      transition('left => void', [animate('0.2s ease-in-out', style({ opacity: 0, transform: 'translate(-50%, 0)' }))]),
    ]),
    trigger('fade', [
      transition(':enter', [style({ opacity: 0 }), animate('0.2s ease-in-out', style({ opacity: 0.85 }))]),
      transition(':leave', [animate('0.2s ease-in-out', style({ opacity: 0 }))]),
    ]),
  ],
  host: {
    '[class.clr-content-panel]': 'true',
    '[class.right]': 'direction === "right"',
    '[class.left]': 'direction === "left"',
  },
})
export class ClrContentPanel implements OnInit {
  private _open: boolean = false;
  @Input('clrContentPanelDirection') direction: string = 'right';

  @Output('clrContentPanelOpened') opened: EventEmitter<any> = new EventEmitter();
  @Output('clrContentPanelClosed') closed: EventEmitter<any> = new EventEmitter();

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
  }

  public toggle(): void {
    if (this._open) {
      this.close();
    } else {
      this.open();
    }
  }
}
