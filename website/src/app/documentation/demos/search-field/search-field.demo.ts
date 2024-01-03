/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';

const HTML_EXAMPLE = `
<form clrForm>
    <clr-input-container>
        <label>Search for any value:</label>
        <input class="clr-col-md-4" clrInput clrSearch placeholder="Seach for Name, Address, Email, ..."  type="text" name="search" [(ngModel)]="value"/>
    </clr-input-container>
</form>
`;

@Component({
  selector: 'clr-search-field-demo',
  templateUrl: './search-field.demo.html',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
})
export class SearchFieldDemo extends ClarityDocComponent {
  value: string;
  htmlExample = HTML_EXAMPLE;

  constructor() {
    super('search-field');
  }
}
