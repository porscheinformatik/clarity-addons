/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { ClrNotificationService } from '@porscheinformatik/clr-addons';

@Component({
  selector: 'clr-notification-demo',
  styleUrls: ['./notification.demo.scss'],
  templateUrl: './notification.demo.html',
})
export class NotificationDemo {
  constructor(private clrNotificationService: ClrNotificationService) {}

  onClose(): void {
    console.log('notification closed');
  }

  showAlert(): void {
    alert('Button was clicked');
  }

  openInfo(content): void {
    this.clrNotificationService
      .openNotification(content, { timeout: 100000, notificationType: 'info', dismissable: true, progressbar: true })
      .result.then(this.onClose);
  }

  openWarning(content): void {
    this.clrNotificationService
      .openNotification(content, { timeout: 20000, notificationType: 'warning', dismissable: true, progressbar: true })
      .result.then(this.onClose);
  }

  openSuccess(content): void {
    this.clrNotificationService
      .openNotification(content, { timeout: 30000, notificationType: 'success', dismissable: true, progressbar: true })
      .result.then(this.onClose);
  }

  openDanger(content): void {
    this.clrNotificationService
      .openNotification(content, { timeout: 40000, notificationType: 'danger', dismissable: true, progressbar: true })
      .result.then(this.onClose);
  }
}
