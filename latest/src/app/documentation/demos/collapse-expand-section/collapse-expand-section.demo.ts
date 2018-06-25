/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from "@angular/core";
import { ClarityDocComponent } from "../clarity-doc";

const HTML_EXAMPLE = `
<clr-collapse-expand-section [clrIsCollapsed]="isCollapsed"
                             (clrCollapsed)="onCollapsed()"
                             (clrExpanded)="onExpanded()">
    <ng-container clr-ces-title>CES-Title</ng-container>
    <ng-container clr-ces-subtitle>CES-Subtitle</ng-container>
    <ng-container clr-ces-content>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
        accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
        Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
        accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
        Lorem ipsum dolor sit amet.
    </ng-container>
</clr-collapse-expand-section>         
`;

@Component({
    selector: "clr-collapse-expand-section-demo",
    templateUrl: "collapse-expand-section.demo.html",
    host: {
        "[class.content-area]": "true",
        "[class.dox-content-panel]": "true"
    }
})
export class CollapseExpandSectionDemo extends ClarityDocComponent {
    htmlExample = HTML_EXAMPLE;

    isCollapsed: boolean = false;

    onCollapsed() {
        console.log("Section collapsed!");
    }

    onExpanded() {
        console.log("Section expanded!");
    }

    constructor() {
        super("collapse-expand-section");
    }
}
