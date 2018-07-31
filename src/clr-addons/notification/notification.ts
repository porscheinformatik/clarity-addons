/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { animate, style, transition, trigger, state } from '@angular/animations';
import { timer, Subscription } from 'rxjs';
import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

const initState = { value: 'currentPositon', params: { percents: 0 } };

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
    trigger('move', [
      state('currentPosition', style({ transform: 'translateY({{percents}}%)' }), { params: { percents: '0' } }),
      state('moveUp', style({ transform: 'translateY({{percents}}%)' }), { params: { percents: '0' } }),
      state('moveDown', style({ transform: 'translateY({{percents}}%)' }), { params: { percents: '0' } }),
      transition('* => moveDown', animate('0.3s ease-in')),
      transition('* => moveUp', animate('0.3s ease-in')),
    ]),
    trigger('fade', [transition(':leave', [animate('0.5s ease-in-out', style({ opacity: 0 }))])]),
  ],
  host: {
    '[class.notification]': 'true',
  },
})
export class ClrNotification implements OnInit {
  progressStatus: number = 0;

  private opened: boolean = false;
  private step: number = 1;
  private timer: Subscription;
  private state: any = initState;

  private _translate = 0;
  get translate() {
    return this._translate;
  }

  @Input('clrId') id: string = '';
  @Input('clrTimeout') timeout: number = 2000;
  @Input('clrNotificationType') notificationType: string = 'info'; // "info", "warning", "success" and "danger"
  @Input('clrDismissable') dismissable: boolean = false;
  @Input('clrProgressbar') progressbar: boolean = false;

  @Output('clrClosed') closed: EventEmitter<any> = new EventEmitter();

  ngOnInit() {}

  private setCurrentPosition() {
    // Change animation state to currentPosition after 300 ms
    timer(300).subscribe(() => (this.state = { value: 'currentPosition', params: { percents: this._translate } }));
  }

  public isOpen(): boolean {
    return this.opened;
  }

  public open(): void {
    if (this.opened) {
      return;
    }
    this.opened = true;
    this._translate = 0;
    this.state = initState;
    if (this.progressbar) {
      interval((this.timeout - 100) / (100 / this.step))
        .pipe(takeWhile(() => this.opened === true))
        .subscribe(() => this.updateProgressStatus());
    }
    this.timer = timer(this.timeout).subscribe(() => this.close());
  }

  public updateProgressStatus(): void {
    this.progressStatus += this.step;
  }

  public close(): void {
    if (!this.opened) {
      return;
    }
    this.timer.unsubscribe();
    this.opened = false;
    this.progressStatus = 0;
    this.closed.emit();
  }

  public moveDown(): void {
    this._translate += 110;
    this.state = { value: 'moveDown', params: { percents: this._translate } };
    this.setCurrentPosition();
  }

  public moveUp(): void {
    this._translate -= 110;
    this.state = { value: 'moveUp', params: { percents: this._translate } };
    this.setCurrentPosition();
  }

  public toggle(): void {
    if (this.opened) {
      this.close();
    } else {
      this.open();
    }
  }
}
