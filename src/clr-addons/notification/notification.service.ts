/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {
  Injectable,
  ComponentFactoryResolver,
  Injector,
  TemplateRef,
  ApplicationRef,
  ComponentRef,
  Inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ClrNotification } from './notification';
import { ClrActiveNotification, ClrContentRef, ClrNotificationRef } from './notification-ref';

export interface ClrNotificationOptions {
  timeout?: number;
  notificationType?: string;
  dismissable?: boolean;
  progressbar?: boolean;
}

@Injectable()
export class ClrNotificationService {
  private _notificationAttributes = ['timeout', 'notificationType', 'dismissable', 'progressbar'];
  private elements = new Set<ClrNotification>();

  constructor(
    private _injector: Injector,
    private _applicationRef: ApplicationRef,
    private _componentFactoryResolver: ComponentFactoryResolver,
    @Inject(DOCUMENT) private _document
  ) {}

  openNotification(content: any, options: ClrNotificationOptions = {}): ClrNotificationRef {
    const activeNotification = new ClrActiveNotification();
    const contentRef = this._getContentRef(content, activeNotification);
    const notificationCmptRef: ComponentRef<ClrNotification> = this._attachWindowComponent(
      this._document.body,
      contentRef
    );
    const notificationRef: ClrNotificationRef = new ClrNotificationRef(notificationCmptRef, contentRef);

    this._applyWindowOptions(notificationCmptRef.instance, options);
    notificationCmptRef.instance.closed.subscribe(this._afterClose.bind(this, notificationCmptRef.instance));

    notificationCmptRef.instance.heightInitalized.then(() =>
      this.elements.forEach(el => {
        if (el !== notificationCmptRef.instance) {
          el.moveDown(notificationCmptRef.instance.height);
        }
      })
    );
    this.elements.add(notificationCmptRef.instance);

    return notificationRef;
  }

  private _afterClose(notification: ClrNotification) {
    this.elements.delete(notification);

    this.elements.forEach(el => {
      if (el.translate > notification.translate) {
        el.moveUp(notification.height);
      }
    });
  }

  private _getContentRef(content: any, context: ClrActiveNotification): ClrContentRef {
    if (content instanceof TemplateRef) {
      return this._createFromTemplateRef(content, context);
    } else if (typeof content === 'string') {
      return this._createFromString(content);
    }

    return new ClrContentRef([]);
  }

  private _createFromTemplateRef(content: TemplateRef<any>, context: ClrActiveNotification): ClrContentRef {
    const viewRef = content.createEmbeddedView(context);
    this._applicationRef.attachView(viewRef);
    return new ClrContentRef([viewRef.rootNodes], viewRef);
  }

  private _createFromString(content: string): ClrContentRef {
    const component = this._document.createTextNode(`${content}`);
    return new ClrContentRef([[component]]);
  }

  private _attachWindowComponent(containerEl: any, contentRef: ClrContentRef): ComponentRef<ClrNotification> {
    const containerFactory = this._componentFactoryResolver.resolveComponentFactory(ClrNotification);
    const containerCmptRef = containerFactory.create(this._injector, contentRef.nodes);
    this._applicationRef.attachView(containerCmptRef.hostView);
    containerEl.appendChild(containerCmptRef.location.nativeElement);
    return containerCmptRef;
  }

  private _applyWindowOptions(notificationInstance: ClrNotification, options: Object): void {
    this._notificationAttributes.forEach((optionName: string) => {
      if (options[optionName] !== undefined && options[optionName] != null) {
        notificationInstance[optionName] = options[optionName];
      }
    });
  }
}
