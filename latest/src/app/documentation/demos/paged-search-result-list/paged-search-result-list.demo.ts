/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from "@angular/core";
import { ClarityDocComponent } from "../clarity-doc";

const HTML_EXAMPLE = `
<clr-paged-search-result-list [clrItems]="pagedItems"
                              [clrPage]="currentPage"
                              [clrPageSize]="pageSize"
                              [clrTotalItems]="allItems.length"
                              (clrPageChange)="onPageChanged($event)">
    <ng-template let-item="item">
        <div class="col-xs-12">
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
    </ng-template>
</clr-paged-search-result-list>
            
`;

@Component({
    selector: "clr-search-result-list-demo",
    templateUrl: "./paged-search-result-list.demo.html",
    host: {
        "[class.content-area]": "true",
        "[class.dox-content-panel]": "true"
    }
})
export class PagedSearchResultListDemo extends ClarityDocComponent {
    htmlExample = HTML_EXAMPLE;

    allItems: string[] = [
        'Nelson',
        'Graham',
        'Olene',
        'Dorian',
        'Nidia',
        'Keenan',
        'Luna',
        'Letisha',
        'Lenny',
        'Jeana',
        'Alica',
        'Sheridan',
        'Georgia',
        'Brad',
        'Ellen',
        'Brynn',
        'Roslyn',
        'Rhona',
        'Marcella',
        'Sibyl',
        'Shenika',
        'Desirae',
        'Beverly',
        'Johnson',
        'Kaitlin',
        'Lucius',
        'Darla',
        'Debby',
        'Lottie',
        'Genoveva',
    ];
    pageSize: number = 5;
    pagedItems: string[] = [];
    currentPage: number = 1;

    onPageChanged(page: any): void {
        this.currentPage = page;
        const startIndex = (page - 1) * this.pageSize;
        const endIndex = Math.min(startIndex + this.pageSize - 1, this.allItems.length - 1);

        setTimeout(() => (this.pagedItems = this.allItems.slice(startIndex, endIndex + 1)), 0);
    }

    constructor() {
        super("paged-search-result-list");
    }
}
