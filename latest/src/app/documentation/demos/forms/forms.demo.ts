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
<div class="clr-form-horizontal">
    <div class="clr-form-control">
        <label class="clr-control-label">Firstname</label>
        <span>John</span>
    </div>
    <div class="clr-form-control">
        <label class="clr-control-label">Lastname</label>
        <span>Doe</span>
    </div>
</div>
`

const CODE_EXAMPLE_RO_VERTICAL = `
<div>
    <div class="clr-form-control">
        <label class="clr-control-label">Firstname</label>
        <span>John</span>
    </div>
    <div class="clr-form-control">
        <label class="clr-control-label">Lastname</label>
        <span>Doe</span>
    </div>
</div>
`

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
    codeExampleROVertical = CODE_EXAMPLE_RO_VERTICAL;
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
