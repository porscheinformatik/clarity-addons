import { Component } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';
import { ClrGenericQuickListItem, ClrQuickListValue } from '@porscheinformatik/clr-addons';

const HTML_EXAMPLE1 = `
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
`;

const HTML_EXAMPLE2 = `
import { ClrQuickListValue } from '@porscheinformatik/clr-addons';

...

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
`;

const HTML_EXAMPLE_GENERIC = `
<clr-generic-quick-list [clrAddLabel]="'ADD'" [clrAddPossible]="form.valid" [clrAllItems]="allItemsGeneric"
    [clrMandatory]="'true'" class="clr-row" clrControlClasses="clr-col-md-6 clr-col-xl-4">

    <!-- Label in front of the control -->
    <label class="clr-control-label clr-col-md-2 required">Generic Quick List</label>

    <!-- Optional header row -->
    <div class="header-container">
        <div class="required">Salutation</div>
        <div class="required">Name</div>
    </div>

    <!-- Custom row template -->
    <ng-template let-item>
        <clr-select-container>
          <label [hidden]="true"></label>
          <select required clrSelect class="clr-col-12" [name]="'salutation' + item.id"
                  [(ngModel)]="item.salutation">
              <option value="mr">Mr.</option>
              <option value="mrs">Mrs.</option>
              <option value="ms">Ms.</option>
          </select>
          <clr-control-error *clrIfError="'required'">Please select a value</clr-control-error>
        </clr-select-container>
        <clr-input-container>
            <label [hidden]="true"></label>
            <input class="clr-col-12" placeholder="Name*" clrInput [(ngModel)]="item.name"
            required [name]="'last' + item.id" />
            <clr-control-error *clrIfError="'required'">Please enter a value</clr-control-error>
        </clr-input-container>
    </ng-template>
</clr-generic-quick-list>
`;

const ANGULAR_EXAMPLE_GENERIC = `
import { ClrGenericQuickListItem } from '@porscheinformatik/clr-addons';

interface ClrNameQuickListItem extends ClrGenericQuickListItem {
    salutation: string;
    name: string;
};

allItemsGeneric = [<ClrNameQuickListItem>{ id: 1 }];
`;

interface ClrNameQuickListItem extends ClrGenericQuickListItem {
  salutation: string;
  name: string;
}

@Component({
  selector: 'app-quick-list',
  templateUrl: './quick-list.demo.html',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
})
export class QuickListDemo extends ClarityDocComponent {
  htmlExample1 = HTML_EXAMPLE1;
  htmlExample2 = HTML_EXAMPLE2;
  htmlExampleGeneric = HTML_EXAMPLE_GENERIC;
  angularExampleGeneric = ANGULAR_EXAMPLE_GENERIC;

  BLANK_OPTION: ClrQuickListValue<string> = { id: '-BLANK-', label: '- Select -', value: null };
  options: Array<string> = ['First option', 'Second option', 'Third Option', 'Fourth option', 'Fifth option'];
  possibleOptions: Array<ClrQuickListValue<string>> = this.options.map(
    op =>
      new (class implements ClrQuickListValue<string> {
        id = op.substr(0, 3);
        label = op;
        value = op;
      })()
  );

  selectedOptionsMandatory: Array<ClrQuickListValue<string>> = [];
  selectedOptionsNotMandatory: Array<ClrQuickListValue<string>> = [];
  selectedOptionsCompact: Array<ClrQuickListValue<string>> = [];
  selectedOptionsCompactMandatory: Array<ClrQuickListValue<string>> = [];

  allItemsGeneric = [<ClrNameQuickListItem>{ id: 1 }];
  allItemsGenericCM = [<ClrNameQuickListItem>{ id: 1 }];
  allItemsGenericCMMandatory = [<ClrNameQuickListItem>{ id: 1 }];

  constructor() {
    super('quick-list');
  }

  getAddLabel(): string {
    return 'ADD OPTION';
  }
}
