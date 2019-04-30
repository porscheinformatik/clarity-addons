import { Component, OnInit } from '@angular/core';
import {ClarityDocComponent} from "../clarity-doc";
import {ClrQuickListValue} from "@porscheinformatik/clr-addons";

const HTML_EXAMPLE1 = `
<div class="clr-col-3">
    <clr-quick-list [clrAllValues]="possibleOptions" 
                    [(clrValues)]="selectedOptions"
                    [clrAddLabel]="ADD OPTION"
                    [clrBlankOption]="BLANK_OPTION" 
                    [clrMandatory]="true">
    </clr-quick-list>
</div>
`;

const HTML_EXAMPLE2 = `
BLANK_OPTION: ClrQuickListValue<string> = { id: '-BLANK-', label: '- Select -', value: null };
selectedOptions: Array<ClrQuickListValue<string>> = [];
possibleOptions: Array<ClrQuickListValue<string>> = [];
options: Array<string> = [
  'First option',
  'Second option',
  'Third Option',
  'Fourth option',
  'Fifth option'
];

ngOnInit() {
  this.selectedOptions = [this.BLANK_OPTION];
  this.possibleOptions = this.options.map(op => this.map(op));
}

private map(op: string): ClrQuickListValue<string> {
  return new class implements ClrQuickListValue<string> {
    id = op.substr(0, 2);
    label = op;
    value = op;
  }();
}
`

@Component({
  selector: 'app-quick-list',
  templateUrl: './quick-list.demo.html',
    host: {
        "[class.content-area]": "true",
        "[class.dox-content-panel]": "true"
    }
})
export class QuickListDemo extends ClarityDocComponent implements OnInit {
    htmlExample1 = HTML_EXAMPLE1;
    htmlExample2 = HTML_EXAMPLE2;
  BLANK_OPTION: ClrQuickListValue<string> = { id: '-BLANK-', label: '- Select -', value: null };
  selectedOptions: Array<ClrQuickListValue<string>> = [];
  possibleOptions: Array<ClrQuickListValue<string>> = [];
  options: Array<string> = [
      'First option',
      'Second option',
      'Third Option',
      'Fourth option',
      'Fifth option'
  ];
  constructor() {
    super("quick-list");
  }

  ngOnInit() {
      this.selectedOptions = [this.BLANK_OPTION];
      this.possibleOptions = this.options.map(op => this.map(op));
  }

  private map(op: string): ClrQuickListValue<string> {
    return new class implements ClrQuickListValue<string> {
        id = op.substr(0, 2);
        label = op;
        value = op;
    }();
  }

  getAddLabel(): string {
      return 'ADD OPTION';
  }
}
