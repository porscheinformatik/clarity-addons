import { Component, OnInit } from '@angular/core';
import {ClarityDocComponent} from "../clarity-doc";
import {ClrQuickListValue} from "@porscheinformatik/clr-addons";

const HTML_EXAMPLE1 = `
<clr-quick-list class="clr-form-control clr-col-12 clr-row"
                clrControlClasses="clr-col-lg-3 clr-col-md-4 clr-col-sm-5"
                [clrAllValues]="possibleOptions" [(clrValues)]="selectedOptionsMandatory"
                [clrAddLabel]="getAddLabel()" [clrBlankOption]="BLANK_OPTION"  [clrMandatory]="true">
  <label class="clr-control-label  clr-col-md-2 clr-col-sm-3 required">Option list</label>
</clr-quick-list>
`;

const HTML_EXAMPLE2 = `
BLANK_OPTION: ClrQuickListValue<string> = { id: '-BLANK-', label: '- Select -', value: null };
options: Array<string> = [
  'First option',
  'Second option',
  'Third Option',
  'Fourth option',
  'Fifth option'
];
possibleOptions: Array<ClrQuickListValue<string>> = this.options.map(op=>
  new class implements ClrQuickListValue<string> {
    id = op.substr(0, 3);
    label = op;
    value = op;
  }());
`

@Component({
  selector: 'app-quick-list',
  templateUrl: './quick-list.demo.html',
    host: {
        "[class.content-area]": "true",
        "[class.dox-content-panel]": "true"
    }
})
export class QuickListDemo extends ClarityDocComponent{
  htmlExample1 = HTML_EXAMPLE1;
  htmlExample2 = HTML_EXAMPLE2;
  BLANK_OPTION: ClrQuickListValue<string> = { id: '-BLANK-', label: '- Select -', value: null };
    options: Array<string> = [
        'First option',
        'Second option',
        'Third Option',
        'Fourth option',
        'Fifth option'
    ];
  possibleOptions: Array<ClrQuickListValue<string>> =
      this.options.map(op=>new class implements ClrQuickListValue<string> {
            id = op.substr(0, 3);
            label = op;
            value = op;
          }());

  selectedOptionsMandatory: Array<ClrQuickListValue<string>> = [];
  selectedOptionsNotMandatory: Array<ClrQuickListValue<string>> = [];

  constructor() {
    super("quick-list");
  }

  getAddLabel(): string {
      return 'ADD OPTION';
  }
}
