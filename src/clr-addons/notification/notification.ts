/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'clr-notification',
  templateUrl: './notification.html',
  animations: [],
  host: {
    '[class.notification]': 'true',
    '[class.top]': 'direction === "top"',
  },
})
export class ClrNotification implements OnInit {
  _open: boolean = false;

  ngOnInit() {}

  public isOpen(): boolean {
    return this._open;
  }

  public open(): void {
    if (this._open) {
      return;
    }
    this._open = true;
  }

  public close(): void {
    if (!this._open) {
      return;
    }
    this._open = false;
  }

  public toggle(): void {
    if (this._open) {
      this.close();
    } else {
      this.open();
    }
  }
}
