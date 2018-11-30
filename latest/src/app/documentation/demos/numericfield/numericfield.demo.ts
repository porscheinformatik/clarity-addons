/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ClarityDocComponent } from "../clarity-doc";

const HTML_EXAMPLE = `
<h4>Vertical Form</h4>
<form clrForm clrLayout="vertical" [formGroup]="exampleForm">
    <clr-input-container>
        <label>Price</label>
        <input clrInput clrNumeric type="text" [(clrNumericValue)]="price" [clrUnit]="'€'"
               [clrUnitPosition]="'left'" formControlName="price"/>
        <clr-control-error>Please enter a value between 1.000 and 10.000</clr-control-error>
    </clr-input-container>
    <clr-input-container>
        <label>Discount</label>
        <input clrInput clrNumeric type="text" [(clrNumericValue)]="discount" [clrUnit]="'%'"
               [clrTextAlign]="'right'" formControlName="discount"/>
        <clr-control-helper>The discount to be applied</clr-control-helper>
        <clr-control-error>Please enter a value between 0 and 100</clr-control-error>
    </clr-input-container>
</form>
<h4>Horizontal Form</h4>
<form clrForm [formGroup]="exampleForm2">
    <clr-input-container>
        <label>Price</label>
        <input clrInput clrNumeric type="text" [(clrNumericValue)]="price2" [clrUnit]="'€'"
               [clrTextAlign]="'right'" formControlName="price2"/>
        <clr-control-error>Please enter a value between 1.000 and 10.000</clr-control-error>
    </clr-input-container>
    <clr-input-container>
        <label>Discount</label>
        <input clrInput clrNumeric type="text" [(clrNumericValue)]="discount2" [clrUnit]="'%'"
               [clrTextAlign]="'right'" formControlName="discount2"/>
        <clr-control-helper>The discount to be applied</clr-control-helper>
        <clr-control-error>Please enter a value between 0 and 100</clr-control-error>
    </clr-input-container>
</form>
`;

const TS_EXAMPLE = `
price: number;
discount: number;
exampleForm = new FormGroup({
    price: new FormControl(this.price, {
        validators: [Validators.min(1000), Validators.max(10000), Validators.required],
        // The 'updateOn: blue' triggers the validation after the input field lost focus, instead of after every input
        updateOn: "blur",
    }),
    discount: new FormControl(this.discount, {
        validators: [Validators.min(0), Validators.max(100), Validators.required],
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
    tsExample = TS_EXAMPLE;
    price: number;
    discount: number;
    exampleForm = new FormGroup({
        price: new FormControl(this.price, {
            validators: [Validators.min(1000), Validators.max(10000), Validators.required],
            updateOn: "blur",
        }),
        discount: new FormControl(this.discount, {
            validators: [Validators.min(0), Validators.max(100), Validators.required],
            updateOn: "blur",
        }),
    });

    price2: number;
    discount2: number;
    exampleForm2 = new FormGroup({
        price2: new FormControl(this.price2, {
            validators: [Validators.min(1000), Validators.max(10000), Validators.required],
            updateOn: "blur",
        }),
        discount2: new FormControl(this.discount2, {
            validators: [Validators.min(0), Validators.max(100), Validators.required],
            updateOn: "blur",
        }),
    });

    constructor() {
        super("numericfield");
    }
}
