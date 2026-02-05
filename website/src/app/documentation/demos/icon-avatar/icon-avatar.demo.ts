/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';

const HTML_EXAMPLE = `
<div class="parent">
    <clr-icon-avatar class="demo-avatar"></clr-icon-avatar>
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
    <clr-icon-avatar class="demo-avatar avatar-large" clrSize="48"></clr-icon-avatar>
    <span>John Doe</span>
</div>
`;

const HTML_EXAMPLE3 = `
<div class="parent">
    <clr-icon-avatar class="demo-avatar avatar-large" clrSize="48" clrShape="factory"></clr-icon-avatar>
    <span>Smith Inc.</span>
</div>
`;

@Component({
  selector: 'clr-icon-avatar-demo',
  templateUrl: './icon-avatar.demo.html',
  styleUrls: ['./icon-avatar.demo.scss'],
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
  standalone: false,
})
export class IconAvatarDemo extends ClarityDocComponent {
  htmlExample = HTML_EXAMPLE;
  htmlExample2 = HTML_EXAMPLE2;
  htmlExample3 = HTML_EXAMPLE3;

  constructor() {
    super('icon-avatar');
  }
}
