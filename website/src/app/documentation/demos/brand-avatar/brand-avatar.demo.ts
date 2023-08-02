/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';

const HTML_EXAMPLE = `
<div class="parent">
    <clr-brand-avatar class="demo-avatar" [clrBrand]="'Volkswagen'"></clr-brand-avatar>
    <a href="#">Volkswagen</a>
</div>

.parent {
    cursor: pointer;
    display: flex;
    align-items: center;
}

.demo-avatar {
    margin-right: .5rem;
}
`;

const HTML_EXAMPLE_LARGER = `
<div class="parent">
    <clr-brand-avatar class="demo-avatar" [clrSize]="48" [clrBrand]="'Volkswagen'"></clr-brand-avatar>
    <a href="#">Volkswagen</a>
</div>

.parent {
    cursor: pointer;
    display: flex;
    align-items: center;
}

.demo-avatar {
    margin-right: .5rem;
}
`;

const HTML_EXAMPLE2 = `
<div class="parent">
    <clr-brand-avatar class="demo-avatar"></clr-brand-avatar>
    <a href="#">No brand set</a>
</div>
`;

@Component({
  selector: 'clr-brand-avatar-demo',
  templateUrl: './brand-avatar.demo.html',
  styleUrls: ['./brand-avatar.demo.scss'],
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
})
export class BrandAvatarDemo extends ClarityDocComponent {
  htmlExample = HTML_EXAMPLE;
  htmlExampleLarger = HTML_EXAMPLE_LARGER;
  htmlExample2 = HTML_EXAMPLE2;

  constructor() {
    super('brand-avatar');
  }
}
