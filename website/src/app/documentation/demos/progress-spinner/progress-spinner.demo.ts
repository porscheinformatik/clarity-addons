/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { DocWrapperModule } from '../_doc-wrapper/doc-wrapper.module';
import { UtilsModule } from '../../../utils/utils.module';
import { ClarityModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';
import { DocWrapper } from '../_doc-wrapper/doc-wrapper';
import { ClrProgressSpinnerComponent } from '@porscheinformatik/clr-addons';
import { CodeSnippet } from '../../../utils/code-snippet';

const HTML_EXAMPLE = `
<div class="clr-row">
    <div class="clr-col-6">
        <div class="card">
            <clr-progress-spinner [clrShowSpinner]="cardLoadingState"></clr-progress-spinner>
            ...
        </div>
    </div>
</div>
<button class="btn btn-primary" (click)="cardLoadingState = !cardLoadingState">Toggle Loading</button>
`;

const HTML_EXAMPLE2 = `
<div>
  <clr-progress-spinner [clrShowSpinner]="loadingState" clrSize="md"></clr-progress-spinner>
  <h2>Content Title</h2>
    <p>...</p>
</div>

<button class="btn btn-primary" (click)="loadingState = !loadingState">Toggle Loading</button>
`;

@Component({
  selector: 'clr-progress-spinner-demo',
  templateUrl: './progress-spinner.demo.html',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
  imports: [
    DocWrapper,
    ClrProgressSpinnerComponent,
    CodeSnippet,
    CommonModule,
    FormsModule,
    ClarityModule,
    UtilsModule,
    DocWrapperModule,
  ],
})
export class ProgressSpinnerDemo extends ClarityDocComponent {
  htmlExample = HTML_EXAMPLE;
  htmlExample2 = HTML_EXAMPLE2;

  loadingState: boolean;
  cardLoadingState: boolean;

  constructor() {
    super('progress-spinner');
  }
}
