/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class ClrNotificationService {
  elements = [];

  setElements(elements) {
    this.elements = elements;
    this.setEventListener();
  }

  setEventListener() {
    this.elements.forEach(el => {
      el.closed.subscribe(this.afterClose.bind(this, el));
    });
  }

  afterClose(notification) {
    const olderElems = this.elements.filter(el => el.translate > notification.translate);
    olderElems.forEach(el => el.moveUp());
  }

  openNotification(id) {
    const notification = this.elements.find(el => el.id === id);
    if (notification) {
      if (!notification._open) {
        const openNotifications = this.elements.filter(el => el._open);
        const hasEmptySpace = openNotifications.length && openNotifications.every(el => el.translate >= 110);
        if (!hasEmptySpace) {
          openNotifications.forEach(el => el.moveDown());
        }
        notification.open();
      }
    }
  }
}
