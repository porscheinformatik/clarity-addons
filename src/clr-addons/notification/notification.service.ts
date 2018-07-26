/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class NotificationService {
  @Output() change: EventEmitter<any> = new EventEmitter();

  elements = [];

  openNotification(id) {
    const notification = this.elements.find(el => el.id === id);
    if (notification) {
      if (!notification._open) {
        const openNotifications = this.elements.filter(el => el._open);
        const hasEmptySpace = openNotifications.length && openNotifications.every(el => el.translate >= 110);
        if (!hasEmptySpace) {
          openNotifications.forEach(_notification => {
            if (_notification._open) {
              _notification.moveDown();
            }
          });
        }
        notification.open();
      }
    }
  }
}
