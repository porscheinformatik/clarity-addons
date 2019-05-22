/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ClrMultilingualInputValidators } from "@porscheinformatik/clr-addons";
import { ClarityDocComponent } from "../clarity-doc";

const TEMPLATE_EXAMPLE = `
<clr-multilingual-input class="clr-col-12 clr-row" clrSelectedLang="EN" [(ngModel)]="data"
    clrControlClasses="clr-col-md-3" name="template" clrRequiredAllMultilang>

    <label class="clr-col-md-2 required">Template</label>
    <clr-control-error>Please translate in every language!</clr-control-error>
    <clr-control-helper>Helper text</clr-control-helper>
</clr-multilingual-input>
`;

const REACTIVE_EXAMPLE = `
<form clrForm [formGroup]="exampleForm">
    <clr-multilingual-input class="clr-col-12 clr-row" clrSelectedLang="EN" formControlName="sample"
        clrControlClasses="clr-col-md-3" name="reactive">

        <label class="clr-col-md-2 required">Reactive</label>
        <clr-control-helper>Helper text</clr-control-helper>
        <clr-control-error>Please translate in every language!</clr-control-error>
    </clr-multilingual-input>
</form>
`;

const REACTIVE_TS_EXAMPLE = `
exampleForm = new FormGroup({
  sample: new FormControl(this.reactiveData, {
    updateOn: "blur",
    validators: [ClrMultilingualInputValidators.requiredAll()]
  })
});
`;

@Component({
    selector: "clr-multilingual-demo",
    templateUrl: "./multilingual-input.demo.html",
    host: {
        "[class.content-area]": "true",
        "[class.dox-content-panel]": "true"
    }
})
export class MultilingualInputDemo extends ClarityDocComponent implements OnInit {
    templateExample = TEMPLATE_EXAMPLE;
    reactiveExample = REACTIVE_EXAMPLE;
    reactiveTSExample = REACTIVE_TS_EXAMPLE;

    data = new Map();
    reactiveData = new Map();

    exampleForm = new FormGroup({
      sample: new FormControl(this.reactiveData, {
        updateOn: "blur",
        validators: [ClrMultilingualInputValidators.requiredAll()]
      })
    });

    constructor() {
        super("multilingual-input");
    }

    ngOnInit() {
        this.data.set("EN", "english text");
        this.data.set("DE", "deutscher text");
        this.data.set("FR", "texte français");
        this.reactiveData.set("EN", "english text");
        this.reactiveData.set("DE", "deutscher text");
        this.reactiveData.set("FR", "texte français");
      }
}
