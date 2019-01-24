/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from "@angular/core";
import { ClarityDocComponent } from "../clarity-doc";

const CODE_EXAMPLE_FULL_FORM = `
<form clrForm clrLayout="horizontal">
    <clr-input-container>
        <label class="required">Input label</label>
        <input clrInput type="text" [(ngModel)]="inputText" name="inputName" required minlength="5"/>
        <clr-control-helper>Helper text that shows while it is pristine and valid</clr-control-helper>
        <clr-control-error *clrIfError="'required'">Error message about being required</clr-control-error>
        <clr-control-error *clrIfError="'minlength'">Error message about requiring 5 characters</clr-control-error>
    </clr-input-container>
    <clr-textarea-container>
        <label class="required">Textarea label</label>
        <textarea clrTextarea [(ngModel)]="textareaText" name="description" required></textarea>
        <clr-control-error *clrIfError="'required'">Error message about being required</clr-control-error>
    </clr-textarea-container>
    <clr-password-container>
        <label>Password label</label>
        <input clrPassword placeholder="Password please!" type="text" [(ngModel)]="passwordText" name="passwordName" />
    </clr-password-container>
    <clr-select-container>
        <label class="required">Select label</label>
        <select clrSelect name="options" [(ngModel)]="selectOption">
            <option value="one">One</option>
            <option value="two">Two</option>
            <option value="three">Threeasdfa sdasd fasdfasdasdf</option>
        </select>
    </clr-select-container>
    <clr-radio-container>
        <label class="required">Radio label</label>
        <clr-radio-wrapper>
            <input type="radio" clrRadio name="options" value="1" required [(ngModel)]="radioOption" />
            <label>Option 1</label>
        </clr-radio-wrapper>
        <clr-radio-wrapper>
            <input type="radio" clrRadio name="options" value="2" required [(ngModel)]="radioOption" />
            <label>Option 2</label>
        </clr-radio-wrapper>
        <clr-control-helper>Helper text</clr-control-helper>
        <clr-control-error>This field is required!</clr-control-error>
    </clr-radio-container>
    <clr-date-container class="clr-row">
        <label>Date label</label>
        <input type="text" [(ngModel)]="date" name="date" clrDate>
    </clr-date-container>
    <clr-input-container class="clr-row">
        <label>Time label</label>
        <input type="time" [(ngModel)]="time" name="time" clrInput>
    </clr-input-container>
    <clr-input-container>
        <label>Money label</label>
        <input clrInput clrNumeric type="text" [(clrNumericValue)]="money" clrUnit="€"/>
    </clr-input-container>
    <clr-checkbox-container>
        <label>Checkbox label</label>
        <clr-checkbox-wrapper>
            <label class="clr-col-12">Option</label>
            <input clrCheckbox type="checkbox" [(ngModel)]="checkboxValue" name="checkboxName" />
        </clr-checkbox-wrapper>
    </clr-checkbox-container>
    <div class="clr-form-control clr-row">
        <label class="clr-control-label">Toggle label</label>
        <div class="clr-control-container clr-col-md-10">
            <div class="toggle-switch">
                <input type="checkbox" id="toggle" name="toggle" [(ngModel)]="toggleValue">
                <label for="toggle" class="clr-col-none"></label>
            </div>
        </div>
    </div>
</form>
`;

const CODE_EXAMPLE_RO_HORIZONTAL = `
<div class="clr-form-compact">
    <div class="clr-row">
        <label class="clr-control-label clr-col-2">Firstname</label>
        <span class="clr-col-10">John</span>
    </div>
    <div class="clr-row">
        <label class="clr-control-label clr-col-2">Lastname</label>
        <span class="clr-col-10">Doe</span>
    </div>
</div>
`;

const CODE_EXAMPLE_RO_HORIZONTAL2 = `
<div class="clr-form-compact clr-row">
    <div class="clr-row clr-col-6">
        <label class="clr-control-label clr-col-3">Firstname</label>
        <span class="clr-col-9">John</span>
    </div>
    <div class="clr-row clr-col-6">
        <label class="clr-control-label clr-col-3">Lastname</label>
        <span class="clr-col-9">Doe</span>
    </div>
    <div class="clr-row clr-col-6">
        <label class="clr-control-label clr-col-3">Email</label>
        <span class="clr-col-9">john.doe@mail.com</span>
    </div>
    <div class="clr-row clr-col-6">
        <label class="clr-control-label clr-col-3">Phone</label>
        <span class="clr-col-9">1234567890123</span>
    </div>
</div>
`;

const CODE_EXAMPLE_RO_VERTICAL = `
<div class="clr-form-compact">
    <div class="clr-form-control clr-flex-column">
        <label class="clr-control-label">Firstname</label>
        <span>John</span>
    </div>
    <div class="clr-form-control clr-flex-column">
        <label class="clr-control-label">Lastname</label>
        <span>Doe</span>
    </div>
</div>
`;

const CODE_EXAMPLE_RO_VERTICAL2 = `
<div class="clr-form-compact clr-row">
    <div class="clr-form-control clr-flex-column clr-col-6">
        <label class="clr-control-label">Firstname</label>
        <span>John</span>
    </div>
    <div class="clr-form-control clr-flex-column clr-col-6">
        <label class="clr-control-label">Lastname</label>
        <span>Doe</span>
    </div>
    <div class="clr-form-control clr-flex-column clr-col-6">
        <label class="clr-control-label">Email</label>
        <span>john.doe@mail.com</span>
    </div>
    <div class="clr-form-control clr-flex-column clr-col-6">
        <label class="clr-control-label">Phone</label>
        <span>1234567890123</span>
    </div>
</div>
`;

@Component({
    selector: "clr-forms-demo",
    templateUrl: "./forms.demo.html",
    host: {
        "[class.content-area]": "true",
        "[class.dox-content-panel]": "true"
    }
})
export class FormsDemo extends ClarityDocComponent {
    codeExampleFullForm = CODE_EXAMPLE_FULL_FORM;
    codeExampleROHorizontal = CODE_EXAMPLE_RO_HORIZONTAL;
    codeExampleROHorizontal2 = CODE_EXAMPLE_RO_HORIZONTAL2;
    codeExampleROVertical = CODE_EXAMPLE_RO_VERTICAL;
    codeExampleROVertical2 = CODE_EXAMPLE_RO_VERTICAL2;
    inputText: string;
    textareaText: string;
    passwordText: string;
    toggleValue: boolean;
    checkboxValue: boolean;
    date: string;
    time: string;
    money: number;
    radioOption: string;
    selectOption: string;
    isDisabled: boolean;

    constructor() {
        super("forms");
    }
}
