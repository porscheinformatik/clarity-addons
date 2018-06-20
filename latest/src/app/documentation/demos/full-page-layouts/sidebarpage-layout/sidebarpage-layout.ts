/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {Component} from "@angular/core";

@Component({
    selector: "clr-sidebarpage-layout-demo",
    templateUrl: "./sidebarpage-layout.demo.html",
    styles: [
        ".content-header { border-bottom: 1px solid #CCC; padding-top:0.5rem; padding-left:1rem; display: flex }",
        ".content-header > h2 { margin-top:0px }",
        ".command-bar {display: flex; flex: 1 0 auto; justify-content: flex-end}"],
    host: {'class':'main-container'}  //only needed in demo as the demo component adds an additional element which destroys css selectors
})
export class SidebarpageLayoutDemo {

    constructor() {
    }
}
