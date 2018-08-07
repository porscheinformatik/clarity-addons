/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from "@angular/core";

@Component({
    selector: "clr-full-screen-dialog-demo",
    templateUrl: "./full-screen-dialog.demo.html"
})
export class FullScreenDialogDemo {
    overlayActive: boolean = false;

    constructor() {
    }

}
