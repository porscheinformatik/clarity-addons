/*
 * Copyright (c) 2018-2020 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  Injectable,
  Injector,
  TemplateRef,
} from '@angular/core';
import { take } from 'rxjs/operators';
import { ClrNotification } from './notification';
import { ClrContentRef, ClrNotificationRef } from './notification-ref';

export interface ClrNotificationOptions {
  timeout?: number;
  notificationType?: string;
  dismissable?: boolean;
  progressbar?: boolean;
  /* If your notification is a ng-template with variables, the variables must be set in the ngTemplateOutletContext */
  ngTemplateOutletContext?: Record<string, any>;
}

@Injectable()
export class ClrNotificationService {
  private _notificationAttributes = ['timeout', 'notificationType', 'dismissable', 'progressbar'];
  private elements = new Set<ClrNotification>();

  constructor(
    private _injector: Injector,
    private _applicationRef: ApplicationRef,
    private _componentFactoryResolver: ComponentFactoryResolver,
    @Inject(DOCUMENT) private _document: Document
  ) {}

  openNotification(content: any, options: ClrNotificationOptions = {}): ClrNotificationRef {
    const contentRef = this._getContentRef(content, options);
    const notificationCmptRef: ComponentRef<ClrNotification> = this._attachWindowComponent(
      this._document.body,
      contentRef
    );
    const notificationRef: ClrNotificationRef = new ClrNotificationRef(notificationCmptRef, contentRef);

    this._applyWindowOptions(notificationCmptRef.instance, options);
    notificationCmptRef.instance.closed
      .pipe(take(1))
      .subscribe(this._afterClose.bind(this, notificationCmptRef.instance));

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

  private _afterClose(notification: ClrNotification): void {
    this.elements.delete(notification);

    this.elements.forEach(el => {
      if (el.translate > notification.translate) {
        el.moveUp(notification.height);
      }
    });
  }

  private _getContentRef(content: any, options: ClrNotificationOptions): ClrContentRef {
    if (content instanceof TemplateRef) {
      return this._createFromTemplateRef(content, options.ngTemplateOutletContext);
    } else if (typeof content === 'string') {
      return this._createFromString(content);
    }

    return new ClrContentRef([]);
  }

  private _createFromTemplateRef(content: TemplateRef<any>, context: Object): ClrContentRef {
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

  private _applyWindowOptions(notificationInstance: any, options: Record<string, any>): void {
    this._notificationAttributes.forEach((optionName: string) => {
      if (options[optionName] !== undefined && options[optionName] != null) {
        notificationInstance[optionName] = options[optionName];
      }
    });
  }
}
