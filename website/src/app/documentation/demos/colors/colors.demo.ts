import { Component } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';

const CODE_EXAMPLE = `
<clr-datagrid class="clr-max-width">
    <clr-dg-column>Description</clr-dg-column>
    <clr-dg-row clrDgItem="1">
        <clr-dg-cell>Item 1</clr-dg-cell>
    </clr-dg-row>
    <clr-dg-row clrDgItem="2">
        <clr-dg-cell>Item 2</clr-dg-cell>
    </clr-dg-row>
    <clr-dg-row clrDgItem="3">
        <clr-dg-cell>Item 3</clr-dg-cell>
    </clr-dg-row>
    <clr-dg-row clrDgItem="4">
        <clr-dg-cell>Item 4</clr-dg-cell>
    </clr-dg-row>
    <clr-dg-row clrDgItem="5">
        <clr-dg-cell>Item 5</clr-dg-cell>
    </clr-dg-row>
</clr-datagrid>
`;

@Component({
  selector: 'clr-colors-demo',
  templateUrl: './colors.demo.html',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
  styleUrls: ['./colors.demo.scss'],
})
export class ColorsDemo extends ClarityDocComponent {
  codeExample = CODE_EXAMPLE;

  constructor() {
    super('colors');
  }
}
