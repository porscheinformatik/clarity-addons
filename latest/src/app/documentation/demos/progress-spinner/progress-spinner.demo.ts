/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from "@angular/core";
import { ClarityDocComponent } from "../clarity-doc";

const HTML_EXAMPLE = `
<div class="card" clrProgressSpinner [loadingState]="loadingState">Loadable card</div>
`;

const HTML_EXAMPLE2 = `
<div clrProgressSpinner [loadingState]="loadingState" [clrSize]="md">some content</div>
`;

@Component({
    selector: "clr-progress-spinner-demo",
    templateUrl: "./progress-spinner.demo.html",
    host: {
        "[class.content-area]": "true",
        "[class.dox-content-panel]": "true"
    }
})
export class ProgressSpinnerDemo extends ClarityDocComponent {
    htmlExample = HTML_EXAMPLE;
    htmlExample2 = HTML_EXAMPLE2;

    loadingState: boolean;
    cardLoadingState: boolean;

    constructor() {
        super("progress-spinner");
    }
}
