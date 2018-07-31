/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ViewChildren, QueryList } from '@angular/core';
import { ClrNotification, ClrNotificationService } from '@porscheinformatik/clr-addons';

@Component({
  selector: 'clr-notification-demo',
  styleUrls: ['./notification.demo.scss'],
  templateUrl: './notification.demo.html',
})
export class NotificationDemo {
  @ViewChildren(ClrNotification) clrNotifications: QueryList<ClrNotification>;

  constructor(private clrNotificationService: ClrNotificationService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.clrNotificationService.setElements(this.clrNotifications.toArray());
  }

  onClose(): void {
    console.log('notification closed');
  }

  showAlert(): void {
    alert('Button was clicked');
  }

  openNotify(id): void {
    this.clrNotificationService.openNotification(id);
  }
}
