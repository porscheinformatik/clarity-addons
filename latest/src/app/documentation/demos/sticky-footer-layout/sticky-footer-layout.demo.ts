/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from "@angular/core";
import { ClarityDocComponent } from "../clarity-doc";

const CODE_EXAMPLE = `
<clr-main-container>
    <clr-demo-menu></clr-demo-menu>
    <div class="content-header">
        <h2>Sticky Footer Layout</h2>
    </div>
    <div class="content-container clr-flex-column">
        <div class="content-area">
            <h3>Content Area</h3>
            <p *ngFor="let a of [1, 2, 3, 4, 5, 6, 7, 8]">
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et
                ea rebum.
                Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
                amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
                aliquyam
                erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
                gubergren,
                no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
                sadipscing
                elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
                voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                takimata sanctus
                est
                Lorem ipsum dolor sit amet.
            </p>
        </div>
        <div class="content-area-footer">
            <h5>Sticky Footer</h5>
        </div>
    </div>
</clr-main-container>
`;

@Component({
    selector: "clr-sticky-footer-layout-demo",
    templateUrl: "./sticky-footer-layout.demo.html",
    host: {
        "[class.content-area]": "true",
        "[class.dox-content-panel]": "true"
    }
})
export class StickyFooterLayoutDemo extends ClarityDocComponent {
    codeExample = CODE_EXAMPLE;


    constructor() {
        super("sticky-footer-layout");
    }
}
