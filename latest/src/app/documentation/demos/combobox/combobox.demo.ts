/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from "@angular/core";
import { ClarityDocComponent } from "../clarity-doc";
import { ClrOption } from "@porscheinformatik/clr-addons";

const USER_NOT_ALLOWED = `
<clr-combobox class="clr-col-12" (clrSelectedOption)="selectedOption = $event" (clrEnteredValue)="enteredValue = $event">
    <label>Force selection</label>
    <clr-options>
        <clr-option [clrValue]="'Option 1'">Option 1</clr-option>
        <clr-option [clrValue]="'Option 2'">Option 2</clr-option>
        <clr-option [clrValue]="'Option 3'">Option 3</clr-option>
        <div class="clr-no-results">No search results found</div>
    </clr-options>
    <clr-control-error>Select a value</clr-control-error>
</clr-combobox>
`;

const USER_ALLOWED = `
<clr-combobox class="clr-col-12" [clrAllowUserEntry]="true" (clrSelectedOption)="selectedOptionUser = $event" (clrEnteredValue)="enteredValueUser = $event">
    <label>Allow user entry</label>
    <clr-options>
        <clr-option [clrValue]="'Option 1'">Option 1</clr-option>
        <clr-option [clrValue]="'Option 2'">Option 2</clr-option>
        <clr-option [clrValue]="'Option 3'">Option 3</clr-option>
        <div class="clr-no-results">No search results found</div>
    </clr-options>
</clr-combobox>
`;


@Component({
    templateUrl: "./combobox.demo.html",
    host: {
        "[class.content-area]": "true",
        "[class.dox-content-panel]": "true"
    }
})
export class ComboboxDemo extends ClarityDocComponent {
    userNotAllowed = USER_NOT_ALLOWED;
    userAllowed = USER_ALLOWED;

    selectedOption: ClrOption<string>;
    selectedOptionUser: ClrOption<string>;
    enteredValue: string;
    enteredValueUser: string;

    constructor() {
        super("combobox");
    }
}
