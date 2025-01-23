import { Component, ViewChild } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';

const HTML_EXAMPLE = `
 <clr-content-panel-container>
  <clr-content-panel-container-content>
    <h1>Heading 1</h1>
    <p>
      Lorem ipsum <b>dolor sit amet</b>, consetetur sadipscing <i>elitr</i>, sed diam nonumy eirmod tempor invidunt ut
      labore et dolore magna aliquyam erat, sed diam voluptua. <br /><sub
        >At vero eos et accusam et justo duo dolores et ea rebum.</sub
      >
    </p>
  </clr-content-panel-container-content>
  <clr-content-panel-container-footer> This is a footer </clr-content-panel-container-footer>
  <clr-content-panel>
    <ng-container clr-content-panel-title>Title2</ng-container>
    <ng-container clr-content-panel-content>
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
  </clr-content-panel>
</clr-content-panel-container>
`;

@Component({
  selector: 'clr-action-panel-demo',
  templateUrl: './content-panel.demo.html',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
  standalone: false,
})
export class ContentPanelDemo extends ClarityDocComponent {
  value: string;
  htmlExample = HTML_EXAMPLE;
  constructor() {
    super('content-panel');
  }
}
