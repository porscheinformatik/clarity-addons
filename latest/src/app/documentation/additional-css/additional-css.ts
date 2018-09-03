/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {Component} from "@angular/core";

const NO_SELECT_ALL_HTML = `
<clr-datagrid class="datagrid-no-select-all" [(clrDgSelected)]="selected">
    <clr-dg-column>Col1</clr-dg-column>
    <clr-dg-row><clr-dg-cell>Test1</clr-dg-cell></clr-dg-row>
    <clr-dg-row><clr-dg-cell>Test2</clr-dg-cell></clr-dg-row>
</clr-datagrid>`

@Component({
    selector: "clr-additional-css-docu",
    templateUrl: "./additional-css.html",
    host: {
        "[class.content-area]": "true"
    }
})
export class AdditionalCss {
    noSelectAllExample = NO_SELECT_ALL_HTML;
    selected: any[] = [];
}
