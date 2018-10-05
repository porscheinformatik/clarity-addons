/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from "@angular/core";
import { ClarityDocComponent } from "../clarity-doc";

const HTML_EXAMPLE = `
<clr-numeric clrLabel="Amount" [(clrNumericValue)]="amount"></clr-numeric>
`;

@Component({
    selector: "clr-numericfield-demo",
    templateUrl: "./numericfield.demo.html",
    host: {
        "[class.content-area]": "true",
        "[class.dox-content-panel]": "true"
    }
})
export class NumericFieldDemo extends ClarityDocComponent {
    htmlExample = HTML_EXAMPLE;

    amount: number;

    constructor() {
        super("numericfield");
    }
}
