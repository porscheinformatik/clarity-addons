/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {Component} from "@angular/core";
import {ClarityDocComponent} from "../clarity-doc";

@Component({
    selector: "clr-search-result-list-demo",
    templateUrl: "./search-result-list.demo.html",
    host: {
        "[class.content-area]": "true",
        "[class.dox-content-panel]": "true"
    }
})
export class SearchResultListDemo extends ClarityDocComponent {
    expanded: boolean = true;

    constructor() {
        super("search-result-list");
    }
}
