/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { timer, Subscription } from 'rxjs';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'clr-notification',
  templateUrl: './notification.html',
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ transform: 'translateY(-1000%)' }),
        animate('0.7s', style({ transform: 'translateY(0%)' })),
      ]),
    ]),
    trigger('fade', [transition(':leave', [animate('0.5s ease-in-out', style({ opacity: 0 }))])]),
  ],
  host: {
    '[class.notification]': 'true',
  },
})
export class ClrNotification implements OnInit {
  _open: boolean = false;
  _progressStatus: number = 0;
  _step: number = 1;
  _timer: Subscription;
  _progressType: string = 'info';

  @Input('clrTimeout') timeout: number = 2000;
  @Input('clrNotificationType') notificationType: string = 'info'; // "info", "warning", "success" and "danger"
  @Input('clrDismissable') dismissable: boolean = false;
  @Input('clrProgressbar') progressbar: boolean = false;

  @Output('clrClosed') closed: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this._progressType = this.notificationType === 'warning' ? 'danger' : this.notificationType;
  }

  public isOpen(): boolean {
    return this._open;
  }

  public open(): void {
    if (this._open) {
      return;
    }
    this._open = true;
    if (this.progressbar) {
      interval((this.timeout - 100) / (100 / this._step))
        .pipe(takeWhile(() => this._open === true))
        .subscribe(() => this.updateProgressStatus());
    }
    this._timer = timer(this.timeout).subscribe(() => this.close());
  }

  public updateProgressStatus(): void {
    this._progressStatus += this._step;
  }

  public close(): void {
    if (!this._open) {
      return;
    }
    this._timer.unsubscribe();
    this._open = false;
    this._progressStatus = 0;
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
