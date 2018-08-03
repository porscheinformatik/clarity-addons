/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ViewChildren, QueryList } from "@angular/core";
import { ClarityDocComponent } from "../clarity-doc";
import { ClrNotificationService } from "@porscheinformatik/clr-addons";

const CODE_EXAMPLE = `
<div class="btn-group">
    <button class="btn" (click)="openNotify(content)">Show Info Notification</button>
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
    },
    providers: [ClrNotificationService],
    styleUrls: ["./notification.demo.scss"],
})
export class NotificationDemo extends ClarityDocComponent {
    codeExample = CODE_EXAMPLE;
    clrExampleTimeout = 2000;
    clrExampleType = "info";
    clrExampleDismissable = true;
    clrExampleProgressbar = true;
    basic = false;


    constructor(private notificationService: ClrNotificationService) {
        super("notification");
    }

    onClose(): void {
        console.log("notification closed");
    }

    showAlert(): void {
        this.basic = true;
    }

    openNotify(content, options): void {
        this.notificationService.openNotification(content, options);
    }
}
