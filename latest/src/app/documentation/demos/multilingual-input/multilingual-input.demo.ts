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
<clr-multilingual-input class="clr-col-12 clr-row" clrSelectedLang="EN" [(ngModel)]="data1"
    [ngModelOptions]="{ updateOn: 'blur' }" clrRequiredAllMultilang clrControlClasses="clr-col-md-5" name="template1">
    <label class="clr-col-md-2 required">Template</label>
    <clr-control-error>Please translate in every language!</clr-control-error>
    <clr-control-helper>Helper text</clr-control-helper>
</clr-multilingual-input>
<clr-multilingual-textarea class="clr-col-12 clr-row" clrSelectedLang="EN" [(ngModel)]="data2"
    [ngModelOptions]="{ updateOn: 'blur' }" clrRequiredAllMultilang clrControlClasses="clr-col-md-5" name="template2">
    <label class="clr-col-md-2 required">Template</label>
    <clr-control-error>Please translate in every language!</clr-control-error>
    <clr-control-helper>Helper text</clr-control-helper>
</clr-multilingual-textarea>
`;

const TEMPLATE_TS_EXAMPLE = `
data1 = new Map();
this.data1.set("EN", "english text");
this.data1.set("DE", "deutscher text");
this.data1.set("FR", "texte français");
`

const REACTIVE_EXAMPLE = `
<form clrForm [formGroup]="exampleForm">
    <clr-multilingual-input class="clr-col-12 clr-row" clrSelectedLang="EN" formControlName="sample1"
        clrControlClasses="clr-col-md-5" name="reactive1">

        <label class="clr-col-md-2 required">Reactive</label>
        <clr-control-helper>Helper text</clr-control-helper>
        <clr-control-error>Please translate in every language!</clr-control-error>
    </clr-multilingual-input>
    <clr-multilingual-textarea class="clr-col-12 clr-row" clrSelectedLang="EN" formControlName="sample2"
        clrControlClasses="clr-col-md-5" name="reactive2">

        <label class="clr-col-md-2 required">Reactive</label>
        <clr-control-helper>Helper text</clr-control-helper>
        <clr-control-error>Please translate in every language!</clr-control-error>
    </clr-multilingual-textarea>
</form>
`;

const REACTIVE_TS_EXAMPLE = `
reactiveData1 = new Map();
this.reactiveData1.set("EN", "english text");
this.reactiveData1.set("DE", "deutscher text");
this.reactiveData1.set("FR", "texte français");

exampleForm = new FormGroup({
  sample1: new FormControl(this.reactiveData1, {
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
    templateTSExample = TEMPLATE_TS_EXAMPLE;
    reactiveExample = REACTIVE_EXAMPLE;
    reactiveTSExample = REACTIVE_TS_EXAMPLE;

    data1 = new Map();
    data2 = new Map();
    reactiveData1 = new Map();
    reactiveData2 = new Map();

    exampleForm = new FormGroup({
      sample1: new FormControl(this.reactiveData1, {
        updateOn: "blur",
        validators: [ClrMultilingualInputValidators.requiredAll()]
      }),
      sample2: new FormControl(this.reactiveData2, {
        updateOn: "blur",
        validators: [ClrMultilingualInputValidators.requiredAll()]
      })
    });

    constructor() {
        super("multilingual-input");
    }

    ngOnInit() {
        this.data1.set("EN", "english text");
        this.data1.set("DE", "deutscher text");
        this.data1.set("FR", "texte français");
        this.data2.set("EN", "english text\nSecond line with a little more text");
        this.data2.set("DE", "deutscher text\nZweite Zeile mit etwas mehr Text");
        this.data2.set("FR", "texte français\nDeuxième ligne avec un peu plus de texte");
        this.reactiveData1.set("EN", "english text");
        this.reactiveData1.set("DE", "deutscher text");
        this.reactiveData1.set("FR", "texte français");
        this.reactiveData2.set("EN", "english text\nSecond line with a little more text");
        this.reactiveData2.set("DE", "deutscher text\nZweite Zeile mit etwas mehr Text");
        this.reactiveData2.set("FR", "texte français\nDeuxième ligne avec un peu plus de texte");
      }
}
