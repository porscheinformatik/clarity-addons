/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { ComponentRef, ViewRef } from '@angular/core';
import { ClrNotification } from './notification';
import { take } from 'rxjs/operators';

/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

/**
 * A reference to an active (currently opened) notification.
 */
export class ClrActiveNotification {}

export class ClrContentRef {
  constructor(public nodes: any[], public viewRef?: ViewRef, public componentRef?: ComponentRef<any>) {}
}

/**
 * A reference to a newly opened notification.
 */
export class ClrNotificationRef {
  private _resolve: () => void;

  /**
   * A promise that is resolved when a notification is closed.
   */
  result: Promise<any>;

  constructor(private _notificationCmptRef: ComponentRef<ClrNotification>, private _contentRef: ClrContentRef) {
    _notificationCmptRef.instance.closed.pipe(take(1)).subscribe(() => {
      this.close();
    });

    this.result = new Promise(resolve => {
      this._resolve = resolve;
    });
    this.result.then(null);
  }

  /**
   * Can be used to close a notification
   */
  close(): void {
    if (this._notificationCmptRef) {
      this._resolve();
      this._removeModalElements();
    }
  }

  private _removeModalElements() {
    const notificationNativeEl = this._notificationCmptRef.location.nativeElement;
    notificationNativeEl.parentNode.removeChild(notificationNativeEl);
    this._notificationCmptRef.destroy();

    if (this._contentRef && this._contentRef.viewRef) {
      this._contentRef.viewRef.destroy();
    }

    this._notificationCmptRef = null;
    this._contentRef = null;
  }
}
