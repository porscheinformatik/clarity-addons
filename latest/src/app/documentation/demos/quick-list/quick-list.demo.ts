import {Component} from "@angular/core";
import {ClarityDocComponent} from "../clarity-doc";
import {ClrQuickListValue, ClrGenericQuickListItem} from "@porscheinformatik/clr-addons";

const HTML_EXAMPLE1 = `
<form clrForm>
  <clr-quick-list
      [clrAddLabel]="getAddLabel()"
      [clrAllValues]="possibleOptions"
      [clrBlankOption]="BLANK_OPTION"
      [clrMandatory]="true"
      [clrValues]="selectedOptionsMandatory"
      class="clr-form-control clr-row"
      clrControlClasses="clr-col-lg-3 clr-col-md-4 clr-col-sm-5">
    <label class="clr-control-label clr-col-md-2 clr-col-sm-3 required">Option list</label>
  </clr-quick-list>
</form>
`;

const HTML_EXAMPLE2 = `
BLANK_OPTION: ClrQuickListValue<string> = { id: "-BLANK-", label: "- Select -", value: null };
options: Array<string> = [
  "First option",
  "Second option",
  "Third Option",
  "Fourth option",
  "Fifth option"
];
possibleOptions: Array<ClrQuickListValue<string>> = this.options.map(op=>
  new class implements ClrQuickListValue<string> {
    id = op.substr(0, 3);
    label = op;
    value = op;
  }());
`

const HTML_EXAMPLE_GENERIC = `
<form clrForm>
    <clr-generic-quick-list [clrAddLabel]="'ADD'" [clrAllItems]="allItemsGeneric"
        [clrRequired]="'true'" class="clr-row" clrControlClasses="clr-col-md-10">
        <label class="clr-control-label clr-col-md-2">Generic Quick List</label>
        <ng-template let-item>
            <!-- Custom content below -->
            <clr-input-container>
                <label [hidden]="true"></label>
                <input class="clr-col-12" clrInput [(ngModel)]="item.firstname" required [name]="'first' + item.id" />
                <clr-control-error *clrIfError="'required'">Please enter a value</clr-control-error>
            </clr-input-container>
            <clr-input-container>
                <label [hidden]="true"></label>
                <input class="clr-col-12" clrInput [(ngModel)]="item.lastname" required [name]="'last' + item.id" />
                <clr-control-error *clrIfError="'required'">Please enter a value</clr-control-error>
            </clr-input-container>
            <!-- Custom content above -->
        </ng-template>
    </clr-generic-quick-list>
</form>
`;

const ANGULAR_EXAMPLE_GENERIC = `
interface ClrNameQuickListItem extends ClrGenericQuickListItem {
    firstname: string;
    lastname: string;
};

allItemsGeneric = [<ClrNameQuickListItem>{ id: 1, firstname: "John", lastname: "Doe" },
    <ClrNameQuickListItem>{id: 2, firstname: "Richard", lastname: "Roe" }];
`

interface ClrNameQuickListItem extends ClrGenericQuickListItem {
    firstname: string;
    lastname: string;
};

@Component({
  selector: "app-quick-list",
  templateUrl: "./quick-list.demo.html",
    host: {
        "[class.content-area]": "true",
        "[class.dox-content-panel]": "true"
    }
})
export class QuickListDemo extends ClarityDocComponent{
  htmlExample1 = HTML_EXAMPLE1;
  htmlExample2 = HTML_EXAMPLE2;
  htmlExampleGeneric = HTML_EXAMPLE_GENERIC;
  angularExampleGeneric = ANGULAR_EXAMPLE_GENERIC;

  BLANK_OPTION: ClrQuickListValue<string> = { id: "-BLANK-", label: "- Select -", value: null };
    options: Array<string> = [
        "First option",
        "Second option",
        "Third Option",
        "Fourth option",
        "Fifth option"
    ];
  possibleOptions: Array<ClrQuickListValue<string>> =
      this.options.map(op => new class implements ClrQuickListValue<string> {
            id = op.substr(0, 3);
            label = op;
            value = op;
          }());

  selectedOptionsMandatory: Array<ClrQuickListValue<string>> = [];
  selectedOptionsNotMandatory: Array<ClrQuickListValue<string>> = [];

  allItemsGeneric = [<ClrNameQuickListItem>{ id: 1, firstname: "John", lastname: "Doe" },
    <ClrNameQuickListItem>{id: 2, firstname: "Richard", lastname: "Roe" }];

  constructor() {
    super("quick-list");
  }

  getAddLabel(): string {
      return "ADD OPTION";
  }
}
