/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {Component} from "@angular/core";
import {ClarityDocComponent} from "../clarity-doc";

const HTML_CHECKBOX_EXAMPLE = `
<clr-checkbox-container readonly>
    ...
</clr-checkbox-container>

<clr-checkbox-container readonly show-only-selected="true">
    ...
</clr-checkbox-container>
`;

const HTML_RADIOBUTTON_EXAMPLE = `
<clr-radiobutton-container readonly>
    ...
</clr-radiobutton-container>

<clr-radiobutton-container readonly show-only-selected="true">
    ...
</clr-radiobutton-container>
`;

const HTML_RADIO_EXAMPLE_DANGER = `
<clr-checkbox-container readonly class="readonly-danger">
    ...
</clr-checkbox-container>
`;

@Component({
    selector: "clr-readonly-demo",
    templateUrl: "./readonly.demo.html",
    host: {
        "[class.content-area]": "true",
        "[class.dox-content-panel]": "true"
    }
})
export class ReadonlyDemo extends ClarityDocComponent {
    htmlCheckboxExample = HTML_CHECKBOX_EXAMPLE;
    htmlRadiobuttonExample = HTML_RADIOBUTTON_EXAMPLE;
    htmlRadioExampleDanger = HTML_RADIO_EXAMPLE_DANGER;

    radioValue: number = 1;
    checkValue1: boolean = true;
    checkValue2: boolean;
    checkValue3: boolean = true;

    constructor() {
        super("readonly");
    }
}
