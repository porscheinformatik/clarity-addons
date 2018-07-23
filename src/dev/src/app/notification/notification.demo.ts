/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ViewChild } from '@angular/core';
import { ClrNotification } from '@porscheinformatik/clr-addons';

@Component({
  selector: 'clr-notification-demo',
  styleUrls: ['./notification.demo.scss'],
  templateUrl: './notification.demo.html',
})
export class NotificationDemo {
  @ViewChild(ClrNotification) clrNotification: ClrNotification;

  notificationClick(): void {
    this.clrNotification.open();
  }

  onClose(): void {
    console.log('notification closed');
  }

  showAlert(): void {
    alert('Button was clicked');
  }
}
