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
            <option value="three">Three</option>
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
    <clr-date-container>
        <label>Date2 label</label>
        <input type="date" [clrDate]="date">
    </clr-date-container>
    <div class="clr-form-control clr-row">
        <label class="clr-control-label">Checkbox label</label>
        <clr-checkbox-container class="clr-control-container clr-col-md-10">
            <label>Option</label>
            <input clrCheckbox type="checkbox" [(ngModel)]="checkboxValue" name="checkboxName" />
        </clr-checkbox-container>
    </div>
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
        <label class="clr-control-label clr-col-md-2">Firstname</label>
        <span class="clr-col-md-10">John</span>
    </div>
    <div class="clr-row">
        <label class="clr-control-label clr-col-md-2">Lastname</label>
        <span class="clr-col-md-10">Doe</span>
    </div>
</div>
`;

const CODE_EXAMPLE_RO_HORIZONTAL2 = `
<div class="clr-form-compact clr-row">
    <div class="clr-row clr-col-md-6">
        <label class="clr-control-label clr-col-md-3">Firstname</label>
        <span class="clr-col-md-9">John</span>
    </div>
    <div class="clr-row clr-col-md-6">
        <label class="clr-control-label clr-col-md-3">Lastname</label>
        <span class="clr-col-md-9">Doe</span>
    </div>
    <div class="clr-row clr-col-md-6">
        <label class="clr-control-label clr-col-md-3">Email</label>
        <span class="clr-col-md-9">john.doe@mail.com</span>
    </div>
    <div class="clr-row clr-col-md-6">
        <label class="clr-control-label clr-col-md-3">Phone</label>
        <span class="clr-col-md-9">1234567890123</span>
    </div>
</div>
`;

const CODE_EXAMPLE_RO_HORIZONTAL3 = `
<div class="clr-form-compact clr-row">
    <div class="clr-row clr-col-md-4">
        <label class="clr-control-label clr-col-md-5">Firstname</label>
        <span class="clr-col-md-7">John</span>
    </div>
    <div class="clr-row clr-col-md-4">
        <label class="clr-control-label clr-col-md-5">Lastname</label>
        <span class="clr-col-md-7">Doe</span>
    </div>
    <div class="clr-row clr-col-md-4">
        <label class="clr-control-label clr-col-md-5">Email</label>
        <span class="clr-col-md-7">john.doe@mail.com</span>
    </div>
    <div class="clr-row clr-col-md-4">
        <label class="clr-control-label clr-col-md-5">Phone</label>
        <span class="clr-col-md-7">1234567890123</span>
    </div>
    <div class="clr-row clr-col-md-4">
        <label class="clr-control-label clr-col-md-5">Street</label>
        <span class="clr-col-md-7">Baker Street</span>
    </div>
    <div class="clr-row clr-col-md-4">
        <label class="clr-control-label clr-col-md-5">City</label>
        <span class="clr-col-md-7">London</span>
    </div>
</div>
`;

const CODE_EXAMPLE_RO_VERTICAL = `
<div class="clr-row clr-form-compact">
    <div class="clr-form-control clr-row clr-flex-md-column clr-col-md-12">
        <label class="clr-control-label clr-col-md-12">Firstname</label>
        <span class="clr-col-md-12">John</span>
    </div>
    <div class="clr-form-control clr-row clr-flex-md-column clr-col-md-12">
        <label class="clr-control-label clr-col-md-12">Lastname</label>
        <span class="clr-col-md-12">Doe</span>
    </div>
</div>
`;

const CODE_EXAMPLE_RO_VERTICAL2 = `
<div class="clr-row clr-form-compact">
    <div class="clr-form-control clr-row clr-flex-md-column clr-col-md-6">
        <label class="clr-control-label clr-col-md-12">Firstname</label>
        <span class="clr-col-md-12">John</span>
    </div>
    <div class="clr-form-control clr-row clr-flex-md-column clr-col-md-6">
        <label class="clr-control-label clr-col-md-12">Lastname</label>
        <span class="clr-col-md-12">Doe</span>
    </div>
    <div class="clr-form-control clr-row clr-flex-md-column clr-col-md-6">
        <label class="clr-control-label clr-col-md-12">Email</label>
        <span class="clr-col-md-12">john.doe@mail.com</span>
    </div>
    <div class="clr-form-control clr-row clr-flex-md-column clr-col-md-6">
        <label class="clr-control-label clr-col-md-12">Phone</label>
        <span class="clr-col-md-12">1234567890123</span>
    </div>
</div>
`;

const CODE_EXAMPLE_RO_VERTICAL3 = `
<div class="clr-row clr-form-compact">
    <div class="clr-form-control clr-row clr-flex-md-column clr-col-md-4">
        <label class="clr-control-label clr-col-md-12">Firstname</label>
        <span class="clr-col-md-12">John</span>
    </div>
    <div class="clr-form-control clr-row clr-flex-md-column clr-col-md-4">
        <label class="clr-control-label clr-col-md-12">Lastname</label>
        <span class="clr-col-md-12">Doe</span>
    </div>
    <div class="clr-form-control clr-row clr-flex-md-column clr-col-md-4">
        <label class="clr-control-label clr-col-md-12">Email</label>
        <span class="clr-col-md-12">john.doe@mail.com</span>
    </div>
    <div class="clr-form-control clr-row clr-flex-md-column clr-col-md-4">
        <label class="clr-control-label clr-col-md-12">Phone</label>
        <span class="clr-col-md-12">1234567890123</span>
    </div>
    <div class="clr-form-control clr-row clr-flex-md-column clr-col-md-4">
        <label class="clr-control-label clr-col-md-12">Street</label>
        <span class="clr-col-md-12">Baker Street</span>
    </div>
    <div class="clr-form-control clr-row clr-flex-md-column clr-col-md-4">
        <label class="clr-control-label clr-col-md-12">City</label>
        <span class="clr-col-md-12">London</span>
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
    codeExampleROHorizontal3 = CODE_EXAMPLE_RO_HORIZONTAL3;
    codeExampleROVertical = CODE_EXAMPLE_RO_VERTICAL;
    codeExampleROVertical2 = CODE_EXAMPLE_RO_VERTICAL2;
    codeExampleROVertical3 = CODE_EXAMPLE_RO_VERTICAL3;
    inputText: string;
    textareaText: string;
    passwordText: string;
    toggleValue: boolean;
    checkboxValue: boolean;
    date: string;
    radioOption: string;
    selectOption: string;
    isDisabled: boolean;

    constructor() {
        super("forms");
    }
}
