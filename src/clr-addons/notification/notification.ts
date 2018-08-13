/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, EventEmitter, Input, OnInit, Output, ElementRef, ViewChild } from '@angular/core';
import { animate, style, transition, trigger, state } from '@angular/animations';
import { timer, Subscription } from 'rxjs';
import { interval } from 'rxjs';
import { ClrAlert } from '@clr/angular';

@Component({
  selector: 'clr-notification',
  templateUrl: './notification.html',
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ transform: 'translateY(-200%)' }),
        animate('0.5s', style({ transform: 'translateY(0%)' })),
      ]),
    ]),
    trigger('move', [
      state('currentPosition', style({ transform: 'translateY({{absolute}}px)' }), { params: { absolute: '0' } }),
      state('moveUp', style({ transform: 'translateY({{absolute}}px)' }), { params: { absolute: '0' } }),
      state('moveDown', style({ transform: 'translateY({{absolute}}px)' }), { params: { absolute: '0' } }),
      transition('* => moveDown', animate('0.3s')),
      transition('* => moveUp', animate('0.3s')),
    ]),
    trigger('fade', [
      state('fadeOut', style({ transform: 'translateY({{absolute}}px)', opacity: 0 }), { params: { absolute: '0' } }),
      transition('* => fadeOut', animate('0.3s')),
    ]),
  ],
  host: {
    '[class.notification]': 'true',
  },
})
export class ClrNotification implements OnInit {
  @ViewChild(ClrAlert) clrAlert: ClrAlert;
  progressStatus: number = 0;

  private step: number = 100;
  private startTime: number;
  state: any;
  private timer: Subscription;
  private interval: Subscription;

  private _translate = 0;
  get translate() {
    return this._translate;
  }

  private _height = 0;
  get height() {
    return this._height + 10;
  }

  private _heightInitalized: () => void;
  heightInitalized = new Promise(resolve => {
    this._heightInitalized = resolve;
  });

  @Input() timeout: number = 2000;
  @Input() notificationType: string = 'info'; // "info", "warning", "success" and "danger"
  @Input() dismissable: boolean = false;
  @Input() progressbar: boolean = false;

  @Output() closed: EventEmitter<any> = new EventEmitter();

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    timer(0).subscribe(() => {
      this._height = this.elementRef.nativeElement.children[0].offsetHeight;
      this._heightInitalized();
    });

    if (this.timeout > 0) {
      if (this.progressbar) {
        this.startTime = new Date().getTime();
        this.interval = interval(this.timeout / (this.timeout / this.step)).subscribe(() =>
          this.updateProgressStatus()
        );
      }

      this.timer = timer(this.timeout).subscribe(() => this.close());
    }
  }

  public updateProgressStatus(): void {
    this.progressStatus = new Date().getTime() - this.startTime;
  }

  public close(): void {
    if (this.interval) {
      this.interval.unsubscribe();
    }
    if (this.timer) {
      this.timer.unsubscribe();
    }
    this.clrAlert._closed = false;
    this.state = { value: 'fadeOut', params: { absolute: this._translate } };
    timer(300).subscribe(() => this.closed.emit());
  }

  public moveDown(translateValue: number): void {
    this._translate += translateValue;
    this.state = { value: 'moveDown', params: { absolute: this._translate } };
    this.setCurrentPosition();
  }

  public moveUp(translateValue: number): void {
    this._translate -= translateValue;
    this.state = { value: 'moveUp', params: { absolute: this._translate } };
    this.setCurrentPosition();
  }

  private setCurrentPosition() {
    timer(300).subscribe(() => (this.state = { value: 'currentPosition', params: { absolute: this._translate } }));
  }
}
