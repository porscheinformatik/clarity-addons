/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {Component} from "@angular/core";
import { ClarityDocComponent } from "../clarity-doc";

const NO_SELECT_ALL_HTML = `
<clr-datagrid class="datagrid-no-select-all" [(clrDgSelected)]="selected">
    <clr-dg-column>Description</clr-dg-column>
    <clr-dg-row clrDgItem="1"><clr-dg-cell>Item 1</clr-dg-cell></clr-dg-row>
    <clr-dg-row clrDgItem="2"><clr-dg-cell>Item 2</clr-dg-cell></clr-dg-row>
    <clr-dg-row clrDgItem="3"><clr-dg-cell>Item 3</clr-dg-cell></clr-dg-row>
    <clr-dg-row clrDgItem="4"><clr-dg-cell>Item 4</clr-dg-cell></clr-dg-row>
    <clr-dg-row clrDgItem="5"><clr-dg-cell>Item 5</clr-dg-cell></clr-dg-row>
</clr-datagrid>`

@Component({
    selector: "clr-datagrid-demo-docu",
    templateUrl: "./datagrid.demo.html",
    host: {
        "[class.content-area]": "true",
        "[class.dox-content-panel]": "true"
    }
})
export class DatagridDemo extends ClarityDocComponent {
    noSelectAllExample = NO_SELECT_ALL_HTML;
    selected: any[] = [];

    constructor() {
        super("datagrid");
    }
}
