/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from "@angular/core";
import { ClarityDocComponent } from "../clarity-doc";

const HTML_EXAMPLE = `
<div class="row" *ngFor="let item of pagedItems">
    <div class="col-lg-6 col-md-8 col-sm-12 col-xs-12">
        <div class="card">
            <div class="card-header">
                {{item}}
            </div>
            <div class="card-block">
                <div class="card-text">
                    This is an example card.
                </div>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-lg-6 margin-top-24">
        <clr-pager [clrPageSize]="pageSize"
                   [clrTotalItems]="totalItems"
                   (clrPageChange)="onPageChanged($event)"></clr-pager>
    </div>
</div>
`;

@Component({
    selector: "clr-full-screen-dialog-demo-docu",
    templateUrl: "./full-screen-dialog.demo.html",
    host: {
        "[class.content-area]": "true",
        "[class.dox-content-panel]": "true"
    }
})
export class FullScreenDialogDemo extends ClarityDocComponent {
    htmlExample = HTML_EXAMPLE;

    constructor() {
        super("full-screen-dialog");
    }
}
