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
import { ClrLetterAvatar } from '@porscheinformatik/clr-addons';
import { CodeSnippet } from '../../../utils/code-snippet';

const HTML_EXAMPLE = `
<div class="parent">
    <clr-letter-avatar class="demo-avatar" clrName="John Doe"></clr-letter-avatar>
    <span>John Doe</span>
</div>

.parent {
    display: flex;
    align-items: center;
}

.demo-avatar {
    margin-right: .5rem;
}
`;

const HTML_EXAMPLE2 = `
<div class="parent">
    <clr-letter-avatar class="demo-avatar avatar-large" clrName="John Doe" clrSize="48"></clr-letter-avatar>
    <span>John Doe</span>
</div>

.avatar-large {
    font-size: 1rem;
}
`;

@Component({
  selector: 'clr-letter-avatar-demo',
  templateUrl: './letter-avatar.demo.html',
  styleUrls: ['./letter-avatar.demo.scss'],
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
  imports: [
    DocWrapper,
    ClrLetterAvatar,
    CodeSnippet,
    CommonModule,
    FormsModule,
    ClarityModule,
    UtilsModule,
    DocWrapperModule,
  ],
})
export class LetterAvatarDemo extends ClarityDocComponent {
  htmlExample = HTML_EXAMPLE;
  htmlExample2 = HTML_EXAMPLE2;

  constructor() {
    super('letter-avatar');
  }
}
