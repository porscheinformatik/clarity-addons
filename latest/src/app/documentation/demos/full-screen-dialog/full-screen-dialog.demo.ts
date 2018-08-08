/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from "@angular/core";
import { ClarityDocComponent } from "../clarity-doc";

const HTML_EXAMPLE = `
<!-- This is the router outlet for full screen dialogs -->
<router-outlet name="overlay" (activate)="overlayActive = true" (deactivate)="overlayActive = false"></router-outlet>

<!-- This is the default router outlet for all of your default pages -->
<div [hidden]="overlayActive">
    <router-outlet></router-outlet>
</div>
`;

@Component({
    selector: "clr-full-screen-dialog-demo-docu",
    templateUrl: "./full-screen-dialog.demo.html",
    host: {
        "[class.content-area]": "true",
        "[class.dox-content-panel]": "true"
    }
})
export class FullScreenDialogDemo extends ClarityDocComponent {
    htmlExample = HTML_EXAMPLE;

    constructor() {
        super("full-screen-dialog");
    }
}
