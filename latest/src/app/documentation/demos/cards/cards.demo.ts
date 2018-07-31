/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from "@angular/core";
import { ClarityDocComponent } from "../clarity-doc";

const HTML_EXAMPLE = `
<div class="clr-row">
    <div class="clr-col-4">
        <div class="card card-active clickable">
            <div class="card-header">
                I am an active card
            </div>
            <div class="card-block">
                I am also clickable
            </div>
        </div>
    </div>
    <div class="clr-col-4">
        <div class="card clickable">
            <div class="card-header">
                I am a non active card
            </div>
            <div class="card-block">
                But I am clickable
            </div>
        </div>
    </div>
    <div class="clr-col-4">
        <div class="card">
            <div class="card-header">
                I am a non active card
            </div>
            <div class="card-block">
                And I am also not clickable
            </div>
        </div>
    </div>
</div>
            
`;

interface Card {
    title: string;
    active: boolean;
}

@Component({
    selector: "clr-cards-demo",
    templateUrl: "./cards.demo.html",
    host: {
        "[class.content-area]": "true",
        "[class.dox-content-panel]": "true"
    }
})
export class CardsDemo extends ClarityDocComponent {
    htmlExample = HTML_EXAMPLE;

    cards: Card[] = [
        { title: 'Card 1', active: true },
        { title: 'Card 2', active: false },
        { title: 'Card 3', active: false }
    ];

    activateCard(index: number): void {
        for (let card of this.cards) {
            card.active = false;
        }
        this.cards[index].active = true;
    }

    constructor() {
        super("cards");
    }
}
