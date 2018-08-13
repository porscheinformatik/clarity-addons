/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ViewChildren, QueryList } from "@angular/core";
import { ClarityDocComponent } from "../clarity-doc";
import { ClrNotificationService } from "@porscheinformatik/clr-addons";

const CODE_EXAMPLE = `

<button class="btn" (click)="openNotify(example, { timeout: clrExampleTimeout, notificationType: clrExampleType,
    dismissable: clrExampleDismissable, progressbar: clrExampleProgressbar })">Show Notification</button>
<ng-template #example>
    <ng-container clr-notification-message>
        Some Information
        <button class="btn btn-info-outline" (click)="showAlert()">Show Alert</button>
    </ng-container>
</ng-template>
`;

const CODE_EXAMPLE_TS = `
onClose(): void {
    console.log("notification closed");
}

openNotify(content, options): void {
    this.notificationService.openNotification(content, options).result.then(this.onClose);
}
`

const CODE_EXAMPLE_STRING = `
<button class="btn" (click)="openString()">Show Notification from String</button>
`

const CODE_EXAMPLE_STRING_TS = `
openString(): void {
    this.notificationService.openNotification("This is a string message", {progressbar: true, dismissable: true});
}
`

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
    codeExampleTS = CODE_EXAMPLE_TS;
    codeExampleString = CODE_EXAMPLE_STRING;
    codeExampleStringTS = CODE_EXAMPLE_STRING_TS;
    clrExampleTimeout = 2000;
    clrExampleType = "info";
    clrExampleDismissable = true;
    clrExampleProgressbar = true;


    constructor(private notificationService: ClrNotificationService) {
        super("notification");
    }

    onClose(): void {
        console.log("notification closed");
    }

    openNotify(content, options): void {
        this.notificationService.openNotification(content, options).result.then(this.onClose);
    }

    openString(): void {
        this.notificationService.openNotification("This is a string message", {progressbar: true, dismissable: true});
    }

    log() {
        console.log("log from notification");
    }
}
