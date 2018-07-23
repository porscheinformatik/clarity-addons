/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { timer } from 'rxjs';

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

  @Input('clrTimeout') timeout: number = 2000;
  @Input('clrNotificationType') notificationType: string = 'info'; // "info", "warning", "success" and "danger"
  @Input('clrDismissable') dismissable: boolean = false;
  @Input('clrProgressbar') progressbar: boolean = false;

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
    timer(this.timeout).subscribe(() => this.close());
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
