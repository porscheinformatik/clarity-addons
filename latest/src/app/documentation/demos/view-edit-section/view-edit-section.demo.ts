/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {Component} from "@angular/core";
import {ClarityDocComponent} from "../clarity-doc";

const HTML_EXAMPLE_SIDE_BY_SIDE = `
<div class="col-xs-12 col-lg-6">
    <clr-view-edit-section [clrTitle]="sectionTitle" (clrSectionSubmitted)="sectionSubmitted()" (clrSectionEditCancelled)="sectionCancelled()">
        <div view-block>
            <div class="form-group row">
                <div class="col-lg-4">
                    <label for="first">First name</label>
                </div>
                <div class="col-lg-8">
                    <span class="text-truncate">{{first || "&nbsp;"}}</span>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-lg-4">
                    <label for="last">Last name</label>
                </div>
                <div class="col-lg-8">
                    <span class="text-truncate">{{last || "&nbsp;"}}</span>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-lg-4">
                    <label for="email">E-mail</label>
                </div>
                <div class="col-lg-8">
                    <span class="text-truncate">{{email || "&nbsp;"}}</span>
                </div>
            </div>
        </div>
        <div edit-block>
            <div class="form-group row">
                <div class="col-lg-4">
                    <label for="first">First name</label>
                </div>
                <div class="col-lg-8">
                    <input id="first" type="text" [(ngModel)]="editFirst" name="first">
                </div>
            </div>
            <div class="form-group row">
                <div class="col-lg-4">
                    <label for="last">Last name</label>
                </div>
                <div class="col-lg-8">
                    <input id="last" type="text" [(ngModel)]="editLast" name="last">
                </div>
            </div>
            <div class="form-group row">
                <div class="col-lg-4">
                    <label for="email">E-mail</label>
                </div>
                <div class="col-lg-8">
                    <input id="email" type="text" [(ngModel)]="editEmail" name="email">
                </div>
            </div>
        </div>
    </clr-view-edit-section>
</div>
`

const HTML_EXAMPLE_FULL_ICON = `
<div class="col-xs-12">
    <clr-view-edit-section [clrTitle]="compSectionTitle" [clrEditIcon]="compEditIcon" (clrSectionSubmitted)="compSectionSubmitted()" (clrSectionEditCancelled)="compSectionCancelled()">
        <div view-block>
            ...
        </div>
        <div edit-block>
            ...
        </div>
    </clr-view-edit-section>
</div>
`

const HTML_EXAMPLE_FULL_ICON_ANGULAR = `
compEditIcon: string = "cog";
`
@Component({
    selector: "clr-view-edit-section-demo",
    templateUrl: "./view-edit-section.demo.html",
    host: {
        "[class.content-area]": "true",
        "[class.dox-content-panel]": "true"
    }
})
export class ViewEditSectionDemo extends ClarityDocComponent{
    htmlExampleSideBySide = HTML_EXAMPLE_SIDE_BY_SIDE;
    htmlExampleFullIcon = HTML_EXAMPLE_FULL_ICON;
    htmlExampleFullIconAngular = HTML_EXAMPLE_FULL_ICON_ANGULAR;

    birthdate: string = "06/14/2018";
    gender: string = "male";
    status: string = "Active";
    terms: boolean;
    editBirthdate: string = this.birthdate;
    editGender: string = this.gender;
    editStatus: number = 1;
    editTerms: boolean;

    first: string = "Max";
    last: string = "Mustermann";
    email: string = "m.mustermann@mail.com";
    editFirst: string = this.first;
    editLast: string = this.last;
    editEmail: string = this.email;

    hobby: string;
    licence: string;
    editHobby: string;
    editLicence: string;

    compSectionTitle: string = "Different components";
    sectionTitle: string = "Personal Data";
    addSectionTitle: string = "Additional Data";

    compEditIcon: string = "cog";

    constructor() {
        super("view-edit-section");
    }

    compSectionSubmitted() {
        this.birthdate = this.editBirthdate;
        this.gender = this.editGender;
        this.status = this.editStatus === 1 ? "Active" : "Inactive";
        this.terms = this.editTerms;
    }
    
    compSectionCancelled() {
        this.editBirthdate = this.birthdate;
        this.editGender = this.gender;
        this.editStatus = this.status === "Active" ? 1 : 2;
        this.editTerms = this.terms;
    }

    getTermsText() {
        return this.terms ? "I agreed" : "I disagreed";
    }

    sectionSubmitted() {
        this.first = this.editFirst;
        this.last = this.editLast;
        this.email = this.editEmail;
    }

    sectionCancelled() {
        this.editFirst = this.first;
        this.editLast = this.last;
        this.editEmail = this.email;
    }

    addSectionSubmitted() {
        this.hobby = this.editHobby;
        this.licence = this.editLicence;
    }

    addSectionCancelled() {
        this.editHobby = this.hobby;
        this.editLicence = this.licence;
    }
}
