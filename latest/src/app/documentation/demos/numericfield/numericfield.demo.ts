/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ClrNumericFieldValidators } from "@porscheinformatik/clr-addons";
import { ClarityDocComponent } from "../clarity-doc";

const HTML_EXAMPLE = `
<form clrForm clrLayout="vertical" [formGroup]="exampleForm">
    <clr-input-container>
        <label>Money</label>
        <input clrInput clrNumeric
               type="text"
               formControlName="money"
               [clrUnit]="'€'"
               [clrAutofillDecimals]="true"/>
        <clr-control-error>Please enter a value between 0 and 10.000</clr-control-error>
    </clr-input-container>
    <clr-input-container>
        <label>Percentage</label>
        <input clrInput clrNumeric
               type="text"
               formControlName="percentage"
               [clrUnit]="'%'"
               [clrDecimalPlaces]="0"/>
        <clr-control-error>Please enter a value between 0 and 100</clr-control-error>
    </clr-input-container>
</form>
`;

const HTML_EXAMPLE2 = `
<form clrForm>
    <clr-input-container>
        <label>Money</label>
        <input clrInput clrNumeric
               class="clr-col-xl-2 clr-col-md-3 clr-col-sm-12"
               type="text"
               [clrUnit]="'€'"
               [(ngModel)]="money"
               [clrAutofillDecimals]="true"/>
        <clr-control-error>Please enter a value between 0 and 10.000</clr-control-error>
    </clr-input-container>
    <clr-input-container>
        <label>Percentage</label>
        <input clrInput clrNumeric
               class="clr-col-xl-2 clr-col-md-3 clr-col-sm-12"
               type="text"
               [clrUnit]="'%'"
               [(ngModel)]="percentage"
               [clrDecimalPlaces]="0"/>
        <clr-control-error>Please enter a value between 0 and 100</clr-control-error>
    </clr-input-container>
</form>
`;

const HTML_EXAMPLE3 = `
<form clrForm>
    <clr-input-container>
        <label>Money</label>
        <input clrInput clrNumeric
               class="clr-col-xl-2 clr-col-md-3 clr-col-sm-12"
               type="text"
               [clrUnit]="'€'"
               [clrUnitPosition]="'left'"
               [clrAutofillDecimals]="true"/>
        <clr-control-error>Please enter a value between 0 and 10.000</clr-control-error>
    </clr-input-container>
</form>
`;

const HTML_EXAMPLE4 = `
<form clrForm [formGroup]="exampleForm2">
    <clr-input-container>
        <label>Rounded Value</label>
        <input clrInput clrNumeric
               class="clr-col-xl-2 clr-col-md-3 clr-col-sm-12"
               type="text"
               formControlName="money1"
               [clrUnit]="'€'"
               [clrRoundDisplayValue]="true"
               [clrAutofillDecimals]="true"/>
        <clr-control-error>Please enter a value between 0 and 100</clr-control-error>
    </clr-input-container>
    <clr-input-container>
        <label>Original Value</label>
        <input clrInput clrNumeric
               class="clr-col-xl-2 clr-col-md-3 clr-col-sm-12"
               type="text"
               formControlName="money2"
               [clrUnit]="'€'"
               [clrDecimalPlaces]="5"
               [clrAutofillDecimals]="true"/>
        <clr-control-error>Please enter a value between 0 and 100</clr-control-error>
    </clr-input-container>
</form>
`;

const TS_EXAMPLE = `
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ClrNumericFieldValidators } from "@porscheinformatik/clr-addons";

exampleForm = new FormGroup({
    money: new FormControl(undefined, {
        validators: [ClrNumericFieldValidators.min(0, ".", ","), ClrNumericFieldValidators.max(10000, ".", ","), Validators.required],
        updateOn: "blur",
    }),
    percentage: new FormControl(undefined, {
        validators: [ClrNumericFieldValidators.min(0, ".", ","), ClrNumericFieldValidators.max(100, ".", ","), Validators.required],
        updateOn: "blur",
    }),
});
`;

@Component({
    selector: "clr-numericfield-demo",
    templateUrl: "./numericfield.demo.html",
    host: {
        "[class.content-area]": "true",
        "[class.dox-content-panel]": "true"
    }
})
export class NumericFieldDemo extends ClarityDocComponent {
    htmlExample = HTML_EXAMPLE;
    htmlExample2 = HTML_EXAMPLE2;
    htmlExample3 = HTML_EXAMPLE3;
    htmlExample4 = HTML_EXAMPLE4;
    tsExample = TS_EXAMPLE;

    moneyTemplate: number;
    percentageTemplate: number;

    exampleForm = new FormGroup({
        money: new FormControl(undefined, {
            validators: [ClrNumericFieldValidators.min(0, ".", ","), ClrNumericFieldValidators.max(10000, ".", ","), Validators.required],
            updateOn: "blur",
        }),
        percentage: new FormControl(undefined, {
            validators: [ClrNumericFieldValidators.min(0, ".", ","), ClrNumericFieldValidators.max(100, ".", ","), Validators.required],
            updateOn: "blur",
        }),
    });

    exampleForm2 = new FormGroup({
        money1: new FormControl(89.99999, {
            validators: [ClrNumericFieldValidators.min(0, ".", ","), ClrNumericFieldValidators.max(100, ".", ","), Validators.required],
            updateOn: "blur",
        }),
        money2: new FormControl(89.99999, {
            validators: [ClrNumericFieldValidators.min(0, ".", ","), ClrNumericFieldValidators.max(100, ".", ","), Validators.required],
            updateOn: "blur",
        })
    });

    usageForm = new FormGroup({
        money: new FormControl(undefined, {
            validators: [ClrNumericFieldValidators.min(0, ".", ","), Validators.required],
            updateOn: "blur",
        }),
        weight: new FormControl(undefined, {
            validators: [ClrNumericFieldValidators.min(0, ".", ","), Validators.required],
            updateOn: "blur",
        }),
        emission: new FormControl(undefined, {
            validators: [ClrNumericFieldValidators.min(0, ".", ","), Validators.required],
            updateOn: "blur",
        }),
        kilometres: new FormControl(undefined, {
            validators: [ClrNumericFieldValidators.min(0, ".", ","), Validators.required],
            updateOn: "blur",
        }),
        cubic: new FormControl(undefined, {
            validators: [ClrNumericFieldValidators.min(0, ".", ","), Validators.required],
            updateOn: "blur",
        }),
        millimetres: new FormControl(undefined, {
            validators: [Validators.required],
            updateOn: "blur",
        }),
        kilowatt: new FormControl(undefined, {
            validators: [ClrNumericFieldValidators.min(0, ".", ","), Validators.required],
            updateOn: "blur",
        }),
        timeunit: new FormControl(undefined, {
            validators: [ClrNumericFieldValidators.min(0, ".", ","), Validators.required],
            updateOn: "blur",
        }),
        horsepower: new FormControl(undefined, {
            validators: [ClrNumericFieldValidators.min(0, ".", ","), Validators.required],
            updateOn: "blur",
        }),
        percentage: new FormControl(undefined, {
            validators: [ClrNumericFieldValidators.min(0, ".", ","), ClrNumericFieldValidators.max(100, ".", ","), Validators.required],
            updateOn: "blur",
        }),
    });

    constructor() {
        super("numericfield");
    }
}
