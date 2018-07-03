/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {Component, Inject, PLATFORM_ID} from "@angular/core";
import { DOCUMENT, isPlatformBrowser } from "@angular/common";

@Component({
    selector: "clr-demo-menu",
    templateUrl: "./demo-menu.html"
})
export class DemoMenu {
    linkRef: HTMLLinkElement;

    themes = [
        { name: "Clarity (light)", href: "styles/clr-ui.min.css" },
        { name: "Clarity (dark)", href: "styles/clr-ui-dark.min.css" },
        { name: "VU3", href: "styles/clr-addons-vu3.min.css" },
        { name: "MVAP", href: "styles/clr-addons-mvap.min.css" }];

    constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: Object) {
        if (isPlatformBrowser(this.platformId)) {
            this.linkRef = <HTMLLinkElement> this.document.getElementById("theme");
        }
    }

    setTheme(theme) {
        this.linkRef.href = theme.href;
    }
}
