/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Injectable } from '@angular/core';
import { ClrNotification } from './notification';

@Injectable()
export class ClrNotificationService {
  private elements = [];

  private subscribeElement(el) {
    el.closed.subscribe(this.afterClose.bind(this, el));
  }

  setElements(elements: ClrNotification[]) {
    this.elements = elements;
    this.setEventListener();
  }

  addElements(elements: ClrNotification[]) {
    elements.forEach(this.subscribeElement.bind(this));
    this.elements = this.elements.concat(elements);
  }

  setEventListener() {
    this.elements.forEach(this.subscribeElement.bind(this));
  }

  afterClose(notification) {
    const olderElems = this.elements.filter(el => el.translate > notification.translate);
    olderElems.forEach(el => el.moveUp());
  }

  openNotification(id) {
    const notification = this.elements.find(el => el.id === id);
    if (notification) {
      if (!notification.isOpen()) {
        const openNotifications = this.elements.filter(el => el.isOpen());
        const hasEmptySpace = openNotifications.length && openNotifications.every(el => el.translate >= 110);
        if (!hasEmptySpace) {
          openNotifications.forEach(el => el.moveDown());
        }
        notification.open();
      }
    }
  }
}
