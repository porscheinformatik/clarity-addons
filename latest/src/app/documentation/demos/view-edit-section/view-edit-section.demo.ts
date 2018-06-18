/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {Component} from "@angular/core";
import {ClarityDocComponent} from "../clarity-doc";

const HTML_EXAMPLE = `
<div class="col-xs-12 col-lg-6">
    <clr-view-edit-section [clrTitle]="sectionTitle" [clrEditIcon]="sectionEditIcon" (clrSectionSubmitted)="sectionSubmitted()" (clrSectionEditCancelled)="sectionCancelled()">
        <div view-block>
            <div class="form-group">
                <label for="first">First name</label>
                <span class="text-truncate">{{first || "&nbsp;"}}</span>
            </div>
            <div class="form-group">
                <label for="last">Last name</label>
                <span class="text-truncate">{{last || "&nbsp;"}}</span>
            </div>
            <div class="form-group">
                <label for="email">E-mail</label>
                <span class="text-truncate">{{email || "&nbsp;"}}</span>
            </div>
        </div>
        <div edit-block>
            <div class="form-group">
                <label for="first">First name</label>
                <input id="first" type="text" [(ngModel)]="editFirst" name="first">
            </div>
            <div class="form-group">
                <label for="last">Last name</label>
                <input id="last" type="text" [(ngModel)]="editLast" name="last">
            </div>
            <div class="form-group">
                <label for="email">E-mail</label>
                <input id="email" type="text" [(ngModel)]="editEmail" name="email">
            </div>
        </div>
    </clr-view-edit-section>
</div>
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
    htmlExample = HTML_EXAMPLE;

    birthdate: string = "06/14/2018";
    gender: string;
    status: string = "Active";
    terms: boolean;
    editBirthdate: string = this.birthdate;
    editGender: string;
    editStatus: number = 1;
    editTerms: boolean;

    first: string;
    last: string;
    email: string;
    editFirst: string;
    editLast: string;
    editEmail: string;

    hobby: string;
    licence: string;
    editHobby: string;
    editLicence: string;

    compSectionTitle: string = "Different components";
    sectionTitle: string = "Personal Data";
    addSectionTitle: string = "Additional Data";

    sectionEditIcon: string = "cog";

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
