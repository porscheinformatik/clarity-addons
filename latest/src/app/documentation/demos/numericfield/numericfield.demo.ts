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
<h4>Vertical Form</h4>
<p>In the following section you can find some examples with validation.</p>
<form clrForm clrLayout="vertical" [formGroup]="exampleForm">
    <clr-input-container>
        <label>Money</label>
        <input clrInput clrNumeric type="text" [(clrNumericValue)]="money" clrUnit="€"
               [clrAutofillDecimals]="true" formControlName="money"/>
        <clr-control-error>Please enter a value between 0 and 10.000</clr-control-error>
    </clr-input-container>
    <clr-input-container>
        <label>Percentage</label>
        <input clrInput clrNumeric type="text" [(clrNumericValue)]="percentage" clrUnit="%"
               formControlName="percentage" [clrDecimalPlaces]="0"/>
        <clr-control-error>Please enter a value between 0 and 100</clr-control-error>
    </clr-input-container>
</form>
<h4>Horizontal Form</h4>
<form clrForm [formGroup]="exampleForm">
    <clr-input-container>
        <label>Money</label>
        <input clrInput clrNumeric type="text" [(clrNumericValue)]="money" clrUnit="€"
               [clrAutofillDecimals]="true" formControlName="money"/>
        <clr-control-error>Please enter a value between 0 and 10.000</clr-control-error>
    </clr-input-container>
    <clr-input-container>
        <label>Percentage</label>
        <input clrInput clrNumeric type="text" [(clrNumericValue)]="percentage" clrUnit="%"
               formControlName="percentage" [clrDecimalPlaces]="0"/>
        <clr-control-error>Please enter a value between 0 and 100</clr-control-error>
    </clr-input-container>
</form>
`;

const HTML_EXAMPLE2 = `
<form clrForm [formGroup]="exampleForm">
    <clr-input-container>
        <label>Money</label>
        <input clrInput clrNumeric type="text" [(clrNumericValue)]="money" clrUnit="€"
               clrUnitPosition="left" [clrAutofillDecimals]="true" formControlName="money"/>
        <clr-control-error>Please enter a value between 0 and 10.000</clr-control-error>
    </clr-input-container>
    <clr-input-container>
        <label>Percentage</label>
        <input clrInput clrNumeric type="text" [(clrNumericValue)]="percentage" clrUnit="%"
               clrUnitPosition="left" clrTextAlign="left" formControlName="percentage" [clrDecimalPlaces]="0"/>
        <clr-control-error>Please enter a value between 0 and 100</clr-control-error>
    </clr-input-container>
</form>
`;

const HTML_EXAMPLE3 = `
<form clrForm [formGroup]="exampleForm">
    <clr-input-container>
        <label>Rounded Value</label>
        <input clrInput clrNumeric type="text" [(clrNumericValue)]="money" clrUnit="€"
               [clrRoundDisplayValue]="true" [clrAutofillDecimals]="true" formControlName="money1"/>
        <clr-control-error>Please enter a value between 0 and 100</clr-control-error>
    </clr-input-container>
    <clr-input-container>
        <label>Original Value</label>
        <input clrInput clrNumeric type="text" [(clrNumericValue)]="money" clrUnit="€"
               [clrDecimalPlaces]="5" [clrAutofillDecimals]="true" formControlName="money2"/>
        <clr-control-error>Please enter a value between 0 and 100</clr-control-error>
    </clr-input-container>
</form>
`;

const TS_EXAMPLE = `
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ClrNumericFieldValidators } from "@porscheinformatik/clr-addons";

money1: number;
percentage1: number;
exampleForm = new FormGroup({
    money1: new FormControl(this.money1, {
        validators: [ClrNumericFieldValidators.min(0, ".", ","), ClrNumericFieldValidators.max(10000, ".", ","), Validators.required],
        updateOn: "blur",
    }),
    percentage1: new FormControl(this.percentage1, {
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
    tsExample = TS_EXAMPLE;
    money1: number;
    percentage1: number;
    exampleForm = new FormGroup({
        money1: new FormControl(this.money1, {
            validators: [ClrNumericFieldValidators.min(0, ".", ","), ClrNumericFieldValidators.max(10000, ".", ","), Validators.required],
            updateOn: "blur",
        }),
        percentage1: new FormControl(this.percentage1, {
            validators: [ClrNumericFieldValidators.min(0, ".", ","), ClrNumericFieldValidators.max(100, ".", ","), Validators.required],
            updateOn: "blur",
        }),
    });

    money2: number;
    percentage2: number;
    exampleForm2 = new FormGroup({
        money2: new FormControl(this.money2, {
            validators: [ClrNumericFieldValidators.min(0, ".", ","), ClrNumericFieldValidators.max(10000, ".", ","), Validators.required],
            updateOn: "blur",
        }),
        percentage2: new FormControl(this.percentage2, {
            validators: [ClrNumericFieldValidators.min(0, ".", ","), ClrNumericFieldValidators.max(100, ".", ","), Validators.required],
            updateOn: "blur",
        }),
    });

    money3: number;
    exampleForm3 = new FormGroup({
        money3: new FormControl(this.money3, {
            validators: [ClrNumericFieldValidators.min(0, ".", ","), ClrNumericFieldValidators.max(10000, ".", ","), Validators.required],
            updateOn: "blur",
        })
    });

    money4: number = 89.99999;
    exampleForm4 = new FormGroup({
        money4: new FormControl(this.money4, {
            validators: [ClrNumericFieldValidators.min(0, ".", ","), ClrNumericFieldValidators.max(100, ".", ","), Validators.required],
            updateOn: "blur",
        }),
        money5: new FormControl(this.money4, {
            validators: [ClrNumericFieldValidators.min(0, ".", ","), ClrNumericFieldValidators.max(100, ".", ","), Validators.required],
            updateOn: "blur",
        })
    });

    doMoney1: number;
    doMoney2: number;

    doForm = new FormGroup({
        doMoney1: new FormControl(this.doMoney1, {
            validators: [ClrNumericFieldValidators.min(0, ".", ","), Validators.required],
            updateOn: "blur",
        }),
        doMoney2: new FormControl(this.doMoney2, {
            validators: [ClrNumericFieldValidators.min(0, ".", ","), Validators.required],
            updateOn: "blur",
        }),
    });

    dontMoney1: number;
    dontMoney2: number;

    dontForm = new FormGroup({
        dontMoney2: new FormControl(this.dontMoney2, {
            validators: [ClrNumericFieldValidators.min(0, ".", ","), Validators.required],
            updateOn: "blur",
        })
    });

    money: number;
    weight: number;
    emission: number;
    kilometres: number;
    cubic: number;
    millimetres: number;
    kilowatt: number;
    timeunit: number;
    horsepower: number;
    percentage: number;

    usageForm = new FormGroup({
        money: new FormControl(this.money, {
            validators: [ClrNumericFieldValidators.min(0, ".", ","), Validators.required],
            updateOn: "blur",
        }),
        weight: new FormControl(this.weight, {
            validators: [ClrNumericFieldValidators.min(0, ".", ","), Validators.required],
            updateOn: "blur",
        }),
        emission: new FormControl(this.emission, {
            validators: [ClrNumericFieldValidators.min(0, ".", ","), Validators.required],
            updateOn: "blur",
        }),
        kilometres: new FormControl(this.kilometres, {
            validators: [ClrNumericFieldValidators.min(0, ".", ","), Validators.required],
            updateOn: "blur",
        }),
        cubic: new FormControl(this.cubic, {
            validators: [ClrNumericFieldValidators.min(0, ".", ","), Validators.required],
            updateOn: "blur",
        }),
        millimetres: new FormControl(this.millimetres, {
            validators: [Validators.required],
            updateOn: "blur",
        }),
        kilowatt: new FormControl(this.kilowatt, {
            validators: [ClrNumericFieldValidators.min(0, ".", ","), Validators.required],
            updateOn: "blur",
        }),
        timeunit: new FormControl(this.timeunit, {
            validators: [ClrNumericFieldValidators.min(0, ".", ","), Validators.required],
            updateOn: "blur",
        }),
        horsepower: new FormControl(this.horsepower, {
            validators: [ClrNumericFieldValidators.min(0, ".", ","), Validators.required],
            updateOn: "blur",
        }),
        percentage: new FormControl(this.percentage, {
            validators: [ClrNumericFieldValidators.min(0, ".", ","), ClrNumericFieldValidators.max(100, ".", ","), Validators.required],
            updateOn: "blur",
        }),
    });

    constructor() {
        super("numericfield");
    }
}
