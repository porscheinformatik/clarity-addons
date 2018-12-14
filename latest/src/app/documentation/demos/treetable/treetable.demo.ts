/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {ClarityDocComponent} from "../clarity-doc";
import {Component} from "@angular/core";

const HTML_EXAMPLE_CLICKABLE_ROWS = `
<clr-treetable>
    <clr-tt-column>Name</clr-tt-column>
    <clr-tt-column>Role</clr-tt-column>
    <clr-tt-column>Random Number</clr-tt-column>
    <clr-tt-column>Random Date</clr-tt-column>

    <clr-tt-row>
        <clr-tt-cell>David Wallace</clr-tt-cell>
        <clr-tt-cell>CFO</clr-tt-cell>
        <clr-tt-cell>2</clr-tt-cell>
        <clr-tt-cell>2nd of August</clr-tt-cell>

        <clr-tt-row>
            <clr-tt-cell>Michael Scott</clr-tt-cell>
            <clr-tt-cell>Regional Manager</clr-tt-cell>
            <clr-tt-cell>19</clr-tt-cell>
            <clr-tt-cell>3rd of April</clr-tt-cell>

            <clr-tt-row>
                <clr-tt-cell>Dwight K. Schrute</clr-tt-cell>
                <clr-tt-cell>Assistant to the Regional Manager</clr-tt-cell>
                <clr-tt-cell>290</clr-tt-cell>
                <clr-tt-cell>17th of May</clr-tt-cell>
            </clr-tt-row>
            ...
        </clr-tt-row>
    </clr-tt-row>
</clr-treetable>`;

const HTML_EXAMPLE_CLICKABLE_CARET = `
<clr-treetable [clrClickableRows]="false">
    <clr-tt-column>Name</clr-tt-column>
    <clr-tt-column>Role</clr-tt-column>
    <clr-tt-column>Actor</clr-tt-column>

    <clr-tt-row [clrExpanded]="true">
        <clr-tt-cell>David Wallace</clr-tt-cell>
        <clr-tt-cell>CFO</clr-tt-cell>
        <clr-tt-cell><a target="_blank" href="https://www.google.com">Some actor</a></clr-tt-cell>
    </clr-tt-row>
    ...
</clr-treetable>`;

const HTML_EXAMPLE_CUSTOM_SIZE = `
<clr-treetable>
    <clr-tt-column class="clr-col-9">Some column</clr-tt-column>
    <clr-tt-column class="clr-col-3">Some other column</clr-tt-column>
    <clr-tt-row clrExpandable="true">
        ...
    </clr-tt-row>
</clr-treetable>`;

@Component({
    selector: "clr-treetable-demo",
    templateUrl: "./treetable.demo.html",
    host: {
        "[class.content-area]": "true",
        "[class.dox-content-panel]": "true"
    }
})
export class TreetableDemo extends ClarityDocComponent {
    htmlExampleClickableRows = HTML_EXAMPLE_CLICKABLE_ROWS;
    htmlExampleClickableCaret = HTML_EXAMPLE_CLICKABLE_CARET;
    htmlExampleCustomSize = HTML_EXAMPLE_CUSTOM_SIZE;

    constructor() {
        super("treetable");
    }
}
