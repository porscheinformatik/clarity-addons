import { Component, OnInit } from '@angular/core';
import {ClarityDocComponent} from "../clarity-doc";
import {ClrQuickListValue} from "@porscheinformatik/clr-addons";

const HTML_EXAMPLE = `
<clr-quick-list class="clr-col-4"
                [clrAllValues]="possibleOptions" 
                [(clrValues)]="selectedOptions"
                [clrAddLabel]="ADD OPTIONS"
                [clrBlankOption]="BLANK_OPTION" 
                [clrMandatory]="true">
</clr-quick-list>
`;

@Component({
  selector: 'app-quick-list',
  templateUrl: './quick-list.demo.html',
    host: {
        "[class.content-area]": "true",
        "[class.dox-content-panel]": "true"
    }
})
export class QuickListDemo extends ClarityDocComponent implements OnInit {
  htmlExample = HTML_EXAMPLE;
  BLANK_OPTION: ClrQuickListValue<string> = { id: '-BLANK-', label: '- Select an option -', value: null };
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
