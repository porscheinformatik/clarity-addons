/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';
import { ClarityIcons, ellipsisVerticalIcon } from '@cds/core/icon';

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

const HTML_EXAMPLE_PLACEHOLDER = `
<div class="card card-placeholder">
    <div class="card-header">
        Placeholder card
    </div>
    <div class="card-block">
        Card block
        <div>
            <a class="btn btn-link">Action</a>
        </div>
    </div>
</div>
`;

const HTML_EXAMPLE_CUSTOM_ACTIONS = `
<div class="card">
    <div class="card-header">
        Card header with custom actions
        <clr-dropdown class="card-actions">
            <button type="button" class="btn btn-icon btn-link card-action dropdown-toggle" clrDropdownTrigger>
                <cds-icon shape="ellipsis-vertical"></cds-icon>
            </button>
            <clr-dropdown-menu clrPosition="bottom-right" *clrIfOpen>
                ...
            </clr-dropdown-menu>
        </clr-dropdown>
    </div>
    <div class="card-block">
        Card Block
    </div>
</div>
`;

ClarityIcons.addIcons(ellipsisVerticalIcon);

interface Card {
  title: string;
  active: boolean;
}

@Component({
  selector: 'clr-cards-demo',
  templateUrl: './cards.demo.html',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
})
export class CardsDemo extends ClarityDocComponent {
  htmlExample = HTML_EXAMPLE;
  htmlExamplePlaceholder = HTML_EXAMPLE_PLACEHOLDER;
  htmlExampleCustomActions = HTML_EXAMPLE_CUSTOM_ACTIONS;

  cards: Card[] = [
    { title: 'Selectable card', active: true },
    { title: 'Selectable card', active: false },
    { title: 'Selectable card', active: false },
  ];

  activateCard(index: number): void {
    for (let card of this.cards) {
      card.active = false;
    }
    this.cards[index].active = true;
  }

  constructor() {
    super('cards');
  }
}
