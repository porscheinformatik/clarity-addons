/*
 * Copyright (c) 2018-2020 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { ClrNotificationService } from '@porscheinformatik/clr-addons';

@Component({
  selector: 'clr-notification-demo',
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

  openInfo(content: any): void {
    this.clrNotificationService
      .openNotification(content, { timeout: 100000, notificationType: 'info', dismissable: true, progressbar: true })
      .result.then(this.onClose);
  }

  openWarning(content: any): void {
    this.clrNotificationService
      .openNotification(content, {
        timeout: 20000,
        notificationType: 'warning',
        dismissable: true,
        progressbar: true,
        ngTemplateOutletContext: { variable1: 123, variable2: 456 },
      })
      .result.then(this.onClose);
  }

  openSuccess(content: any): void {
    this.clrNotificationService
      .openNotification(content, { timeout: 30000, notificationType: 'success', dismissable: true, progressbar: true })
      .result.then(this.onClose);
  }

  openDanger(content: any): void {
    this.clrNotificationService
      .openNotification(content, { timeout: 40000, notificationType: 'danger', dismissable: true, progressbar: true })
      .result.then(this.onClose);
  }
}
