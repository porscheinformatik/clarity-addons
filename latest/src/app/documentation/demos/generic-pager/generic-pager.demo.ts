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
                   [clrTotalItems]="allItems.length"
                   (clrPageChange)="onPageChanged($event)"></clr-pager>
    </div>
</div>
            
`;

@Component({
    selector: "clr-generic-pager-demo",
    templateUrl: "./generic-pager.demo.html",
    host: {
        "[class.content-area]": "true",
        "[class.dox-content-panel]": "true"
    }
})
export class GenericPagerDemo extends ClarityDocComponent {
    htmlExample = HTML_EXAMPLE;

    allItems: string[] = [
        "Nelson",
        "Graham",
        "Olene",
        "Dorian",
        "Nidia",
        "Keenan",
        "Luna",
        "Letisha",
        "Lenny",
        "Jeana",
        "Alica",
        "Sheridan",
        "Georgia",
        "Brad",
        "Ellen",
        "Brynn",
        "Roslyn",
        "Rhona",
        "Marcella",
        "Sibyl",
        "Shenika",
        "Desirae",
        "Beverly",
        "Johnson",
        "Kaitlin",
        "Lucius",
        "Darla",
        "Debby",
        "Lottie",
        "Genoveva",
    ];
    pageSize: number = 5;
    pagedItems: string[] = [];

    onPageChanged(page: any): void {
        const startIndex = (page - 1) * this.pageSize;
        const endIndex = Math.min(startIndex + this.pageSize - 1, this.allItems.length - 1);

        setTimeout(() => (this.pagedItems = this.allItems.slice(startIndex, endIndex + 1)), 0);
    }

    constructor() {
        super("generic-pager");
    }
}
