/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ViewChildren, QueryList  } from "@angular/core";
import { ClarityDocComponent } from "../clarity-doc";
// import { ClrNotification, NotificationService } from '@porscheinformatik/clr-addons';

const CODE_EXAMPLE = `
<div class="btn-group">
    <button class="btn" (click)="openNotify('myNotification')">Show Info Notification</button>
</div>

<clr-notification
  [clrTimeout]="50000"
  [clrNotificationType]="'info'"
  [clrDismissable]="true"
  [clrProgressbar]="true"
  (clrClosed)="onClose()"
  [clrId]="'myNotification'">
  <ng-container clr-notification-message>
    Some Information
    <button class="btn btn-info-outline" (click)="showAlert()">Show Alert</button>
  </ng-container>
</clr-notification>
`;

@Component({
    selector: "clr-notification-demo-docu",
    templateUrl: "./notification.demo.html",
    host: {
        "[class.content-area]": "true",
        "[class.dox-content-panel]": "true"
    }
})
export class NotificationDemo extends ClarityDocComponent {
    // @ViewChildren(ClrNotification) clrNotifications: QueryList<ClrNotification>;
    codeExample = CODE_EXAMPLE;

    // constructor(private notificationService: NotificationService) {
    constructor() {
        super("notification");
    }
    // ngAfterViewInit() {
    //     this.notificationService.elements = this.clrNotifications.toArray();
    // }

    // onClose(): void {
    //     console.log('notification closed');
    // }

    // showAlert(): void {
    //     alert('Button was clicked');
    // }

    // openNotify(id): void {
    //     this.notificationService.openNotification(id);
    // }
}
