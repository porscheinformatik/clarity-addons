/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, ViewChild } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';

const HTML_EXAMPLE = `
  <clr-action-panel-container>
    <clr-action-panel-container-content>
      <h1>Heading 1</h1>
      <p>
        Lorem ipsum <b>dolor sit amet</b>, consetetur sadipscing <i>elitr</i>, sed diam nonumy eirmod tempor invidunt ut
        labore et dolore magna aliquyam erat, sed diam voluptua. <br />
      </p>
    </clr-action-panel-container-content>
    <clr-action-panel>
      <ng-container clr-action-panel-title>Title2</ng-container>
      <ng-container clr-action-panel-content>
        <h1>Heading 1</h1>
        <p>Lorem <b>ipsum</b> dolor sit amet.</p>
        <h2>Heading 2</h2>
        <p>Lorem <b>ipsum</b> dolor sit amet.</p>
        <h3>Heading 3</h3>
        <p>Lorem <b>ipsum</b> dolor sit amet.</p>
        <h4>Heading 4</h4>
        <p>Lorem <b>ipsum</b> dolor sit amet.</p>
        <h5>Heading 5</h5>
        <p>Lorem <b>ipsum</b> dolor sit amet.</p>
      </ng-container>
    </clr-action-panel>
  </clr-action-panel-container>
`;

@Component({
  selector: 'clr-action-panel-demo',
  templateUrl: './action-panel.demo.html',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
  standalone: false,
})
export class ActionPanelDemo extends ClarityDocComponent {
  value: string;
  htmlExample = HTML_EXAMPLE;
  constructor() {
    super('action-panel');
  }
}
