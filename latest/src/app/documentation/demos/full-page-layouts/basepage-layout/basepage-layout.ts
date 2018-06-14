/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {Component} from "@angular/core";

@Component({
    selector: "clr-basepage-layout-demo",
    templateUrl: "./basepage-layout.demo.html",
    styles: [".content-area { overflow-x:hidden }", 
    ".content-header {border-bottom: 1px solid #CCC; margin: 0 -9999rem;padding: 0 9999rem;}",
    ".content-header > h2 {margin-top:0px}"]
})
export class BasepageLayoutDemo {

    constructor() {
    }
}
