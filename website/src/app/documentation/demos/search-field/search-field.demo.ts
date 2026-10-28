/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { DocWrapperModule } from '../_doc-wrapper/doc-wrapper.module';
import { UtilsModule } from '../../../utils/utils.module';
import { ClarityModule, ClrCommonFormsModule, ClrFormsModule, ClrInputModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';
import { DocWrapper } from '../_doc-wrapper/doc-wrapper';
import { FormsModule } from '@angular/forms';
import { ClrAddonsLabel, ClrAutocompleteOff, ClrSearchField } from '@porscheinformatik/clr-addons';
import { CodeSnippet } from '../../../utils/code-snippet';

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
  imports: [
    DocWrapper,
    FormsModule,
    ClrCommonFormsModule,
    ClrInputModule,
    ClrAddonsLabel,
    ClrAutocompleteOff,
    ClrSearchField,
    CodeSnippet,
    CommonModule,
    ReactiveFormsModule,
    ClarityModule,
    ClrFormsModule,
    UtilsModule,
    DocWrapperModule,
  ],
})
export class SearchFieldDemo extends ClarityDocComponent {
  value: string;
  htmlExample = HTML_EXAMPLE;

  constructor() {
    super('search-field');
  }
}
