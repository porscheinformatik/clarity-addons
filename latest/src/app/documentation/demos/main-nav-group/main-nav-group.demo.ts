/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from "@angular/core";
import { ClarityDocComponent } from "../clarity-doc";

const HTML_EXAMPLE = `
<clr-main-nav-group clrTitle="Layouts" routerLinkActive="active">
    <a class="nav-link" routerLink="/full-page-layouts/basepage-layout" routerLinkActive="active">Base Pagelayout</a>
    <a class="nav-link" routerLink="/full-page-layouts/sidebarpage-layout" routerLinkActive="active">Sidebar Pagelayout</a>
    <a class="nav-link" routerLink="/full-page-layouts/content-panel" routerLinkActive="active">Content Panel Layout</a>
</clr-main-nav-group>
`

@Component({
    selector: "clr-main-nav-group-demo",
    templateUrl: "./main-nav-group.demo.html",
    host: {
        "[class.content-area]": "true",
        "[class.dox-content-panel]": "true"
    }
})
export class MainNavGroupDemo extends ClarityDocComponent {
    htmlExample = HTML_EXAMPLE;

    constructor() {
        super("main-nav-group");
    }
}
