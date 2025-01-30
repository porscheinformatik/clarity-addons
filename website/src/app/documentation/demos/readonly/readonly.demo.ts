/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { ClarityDocComponent } from '../clarity-doc';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { share } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

const HTML_CHECKBOX_EXAMPLE = `
<clr-checkbox-container readonly>
    ...
</clr-checkbox-container>

<clr-checkbox-container readonly show-only-selected="true">
    ...
</clr-checkbox-container>
`;

const HTML_RADIOBUTTON_EXAMPLE = `
<clr-radiobutton-container readonly>
    ...
</clr-radiobutton-container>

<clr-radiobutton-container readonly show-only-selected="true">
    ...
</clr-radiobutton-container>
`;

const HTML_RADIO_EXAMPLE_DANGER = `
<clr-checkbox-container readonly class="readonly-danger">
    ...
</clr-checkbox-container>
`;

const HTML_READONLY_CONDITIONAL = `
<clr-checkbox-container [attr.readonly]="shouldCheckboxesBeReadOnly || null">
...
</clr-checkbox-container>
`;

const HTML_READONLY_ELEMENT = `
<element [clrReadonly]="true"></element>
`;

const HTML_READONLY_READONLYPROPERTY = `
<clr-combobox-container>
   <label>ComboBox MultiSelect (Readonly)</label>
   <clr-combobox [(ngModel)]="selectionReadOnly" name="multiSelect" clrMulti="true" clrReadonly [clrReadOnlyProperty]="'name'">
      ...
   </clr-combobox>
</clr-combobox-container>`;

@Component({
  selector: 'clr-readonly-demo',
  templateUrl: './readonly.demo.html',
  styleUrls: ['./readonly.demo.scss'],
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
  standalone: false,
})
export class ReadonlyDemo extends ClarityDocComponent {
  htmlCheckboxExample = HTML_CHECKBOX_EXAMPLE;
  htmlRadiobuttonExample = HTML_RADIOBUTTON_EXAMPLE;
  htmlRadioExampleDanger = HTML_RADIO_EXAMPLE_DANGER;
  htmlReadonlyConditional = HTML_READONLY_CONDITIONAL;
  htmlReadonlyElement = HTML_READONLY_ELEMENT;
  htmlReadonlyReadonlyProperty = HTML_READONLY_READONLYPROPERTY;
  activeFragment;

  //View-Edit
  editMode1 = false;

  sectionTitle: string = 'View/Edit Section';
  input: string = 'Value';
  select: string = 'Option 1';
  combobox: string = 'Option 2';
  comboboxMulti: State[] = [
    {
      name: 'Alabama',
      abbreviation: 'AL',
    },
    {
      name: 'Alaska',
      abbreviation: 'AK',
    },
  ];
  numeric = 1030;
  date = new Date().toLocaleDateString('en-US');
  time = '11:00';

  radioValue: number = 1;
  checkValue1: boolean = true;
  checkValue2: boolean = false;
  checkValue3: boolean = true;

  sectionSubmitted(): boolean {
    if (this.exampleForm.valid) {
      this.input = this.exampleForm.value.editInput;
      this.select = this.exampleForm.value.editSelect;
      this.combobox = this.exampleForm.value.editCombobox;
      this.comboboxMulti = this.exampleForm.value.editComboboxMulti;
      this.numeric = this.exampleForm.value.editNumeric;
      this.date = this.exampleForm.value.editDate;
      this.time = this.exampleForm.value.editTime;

      this.radioValue = this.exampleForm.value.editRadioValue;

      this.checkValue1 = this.exampleForm.value.editCheckValue1;
      this.checkValue2 = this.exampleForm.value.editCheckValue2;
      this.checkValue3 = this.exampleForm.value.editCheckValue3;

      return true;
    }
    return false;
  }

  sectionCancelled() {
    this.exampleForm.reset({
      editInput: this.input,
      editSelect: this.select,
      editCombobox: this.combobox,
      editComboboxMulti: this.comboboxMulti,
      editNumeric: this.numeric,
      editDate: this.date,
      editTime: this.time,
      editRadioValue: this.radioValue,
      editCheckValue1: this.checkValue1,
      editCheckValue2: this.checkValue2,
      editCheckValue3: this.checkValue3,
    });
  }

  onFormSubmit() {
    (<HTMLElement>document.activeElement).blur();
    this.editMode1 = !this.sectionSubmitted();
  }

  exampleForm = new FormGroup({
    editInput: new FormControl(this.input, {
      validators: [Validators.required],
      updateOn: 'blur',
    }),
    editSelect: new FormControl(this.select, {
      validators: [Validators.required],
      updateOn: 'blur',
    }),
    editCombobox: new FormControl(this.combobox),
    editComboboxMulti: new FormControl(this.comboboxMulti),
    editNumeric: new FormControl(this.numeric),
    editDate: new FormControl(this.date),
    editTime: new FormControl(this.time),

    editRadioValue: new FormControl(this.radioValue),

    editCheckValue1: new FormControl(this.checkValue1),
    editCheckValue2: new FormControl(this.checkValue2),
    editCheckValue3: new FormControl(this.checkValue3),
  });

  // Value for the demo Page
  inputControlValue = 'Shelf A21';

  inputValue = 'Test Value 1';
  selectValue = 'one';
  textareaText =
    'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam volu';
  comboBoxValue = 'Option 1';
  numericValue = 456456;

  states = states;
  selection: State[] = [
    {
      name: 'Alabama',
      abbreviation: 'AL',
    },
    {
      name: 'Alaska',
      abbreviation: 'AK',
    },
  ];

  selectionReadOnly: State[] = [
    {
      name: 'Alabama',
      abbreviation: 'AL',
    },
    {
      name: 'Alaska',
      abbreviation: 'AK',
    },
  ];

  dateValue = new Date().toLocaleDateString('en-US');
  timeValue = '11:00';

  constructor(public route: ActivatedRoute) {
    super('readonly');
    this.activeFragment = this.route.fragment.pipe(share());
  }
}

export interface State {
  name: string;
  abbreviation: string;
}

export const states: State[] = [
  {
    name: 'Alabama',
    abbreviation: 'AL',
  },
  {
    name: 'Alaska',
    abbreviation: 'AK',
  },
];
