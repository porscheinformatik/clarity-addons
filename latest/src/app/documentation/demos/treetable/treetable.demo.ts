/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {ClarityDocComponent} from "../clarity-doc";
import {Component} from "@angular/core";

const HTML_EXAMPLE_CLICKABLE_ROWS = `
<clr-treetable>
    <clr-datagrid>
        <clr-dg-column>Name</clr-dg-column>
        <clr-dg-column>Role</clr-dg-column>
        <clr-dg-column>Random Number</clr-dg-column>
        <clr-dg-column>Random Date</clr-dg-column>

        <clr-tt-row>
            <clr-dg-cell>David Wallace</clr-dg-cell>
            <clr-dg-cell>CFO</clr-dg-cell>
            <clr-dg-cell>2</clr-dg-cell>
            <clr-dg-cell>2nd of August</clr-dg-cell>

            <clr-tt-row>
                <clr-dg-cell>Michael Scott</clr-dg-cell>
                <clr-dg-cell>Regional Manager</clr-dg-cell>
                <clr-dg-cell>19</clr-dg-cell>
                <clr-dg-cell>3rd of April</clr-dg-cell>

                <clr-tt-row>
                    <clr-dg-cell>Dwight K. Schrute</clr-dg-cell>
                    <clr-dg-cell>Assistant to the Regional Manager</clr-dg-cell>
                    <clr-dg-cell>290</clr-dg-cell>
                    <clr-dg-cell>17th of May</clr-dg-cell>
                </clr-tt-row>
                ...
            </clr-tt-row>
        </clr-tt-row>
    </clr-datagrid>
</clr-treetable>`;

const HTML_EXAMPLE_CLICKABLE_CARET = `
<clr-treetable [clrClickableRows]="false">
    <clr-datagrid>
        <clr-dg-column>Name</clr-dg-column>
        <clr-dg-column>Role</clr-dg-column>
        <clr-dg-column>Actor</clr-dg-column>

        <clr-tt-row [clrExpanded]="true">
            <clr-dg-cell>David Wallace</clr-dg-cell>
            <clr-dg-cell>CFO</clr-dg-cell>
            <clr-dg-cell><a target="_blank" href="https://www.google.com">Some actor</a></clr-dg-cell>
        </clr-tt-row>
        ...
    </clr-datagrid>
</clr-treetable>`;

const HTML_EXAMPLE_NOSCROLL = `
<clr-treetable class="clr-treetable-noscroll">
    <clr-datagrid>
        <clr-dg-column class="col-xs-9">Some column</clr-dg-column>
        <clr-dg-column class="col-xs-3">Some other column</clr-dg-column>

        <clr-tt-row>
            ...
        </clr-tt-row>
    </clr-datagrid>
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
    htmlExampleNoscroll = HTML_EXAMPLE_NOSCROLL;

    constructor() {
        super("treetable");
    }
}
