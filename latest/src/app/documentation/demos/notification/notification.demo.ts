/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ViewChildren, QueryList } from "@angular/core";
import { ClarityDocComponent } from "../clarity-doc";
import { ClrNotificationService } from "@porscheinformatik/clr-addons";

const CODE_EXAMPLE = `
<button class="btn btn-success-outline"(click)="openNotify(exampleSuccess, { timeout: 3000,
    notificationType: 'success', dismissable: true, progressbar: true })">Show Success Notification</button>
<ng-template #exampleSuccess>
    <ng-container clr-notification-message>
        Success
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
}
