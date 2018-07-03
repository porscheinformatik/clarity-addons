/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from "@angular/core";
import { ClarityDocComponent } from "../clarity-doc";

const CODE_EXAMPLE = `
<div class="btn-group">
    <button class="btn" (click)="leftContentPanel.toggle()">Show/Hide Left</button>
    <button class="btn" (click)="rightContentPanel.toggle()">Show/Hide Right</button>
</div>

<clr-content-panel-container>
    <h2>This is the page title</h2>
    <span>This is the page content</span>
    <clr-content-panel #leftContentPanel clrDirection="left">
        <ng-container clr-content-panel-title>Left Content Panel</ng-container>
        <ng-container clr-content-panel-content>Content</ng-container>
    </clr-content-panel>
    <clr-content-panel #rightContentPanel>
        <ng-container clr-content-panel-title>Right Content Panel</ng-container>
        <ng-container clr-content-panel-content>Content</ng-container>
    </clr-content-panel>
</clr-content-panel-container>
`;

@Component({
    selector: "clr-content-panel-layout-demo-docu",
    templateUrl: "./content-panel-layout.demo.html",
    host: {
        "[class.content-area]": "true",
        "[class.dox-content-panel]": "true"
    }
})
export class ContentPanelLayoutDemo extends ClarityDocComponent {
    codeExample = CODE_EXAMPLE;

    constructor() {
        super("content-panel-layout");
    }
}
