/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {Component} from "@angular/core";
import {ClarityDocComponent} from "../clarity-doc";

const HTML_EXAMPLE_SIDE_BY_SIDE = `
<div class="clr-col-12 clr-col-lg-6">
    <clr-view-edit-section [clrTitle]="sectionTitle" (clrSectionSubmitted)="sectionSubmitted()" (clrSectionEditCancelled)="sectionCancelled()">
        <div view-block>
            <form clrForm clrLayout="horizontal">
              <div class="clr-form-control clr-row">
                  <label class="clr-col-md-4 clr-control-label">First name</label>
                  <span class="text-truncate clr-col-md-8">{{first || "&nbsp;"}}</span>
              </div>
              <div class="clr-form-control clr-row">
                  <label class="clr-col-md-4 clr-control-label">Last name</label>
                  <span class="text-truncate clr-col-md-8">{{last || "&nbsp;"}}</span>
              </div>
              <div class="clr-form-control clr-row">
                  <label class="clr-col-md-4 clr-control-label">E-mail</label>
                  <span class="text-truncate clr-col-md-8">{{email || "&nbsp;"}}</span>
              </div>
            </form>
        </div>
        <div edit-block>
            <form clrForm clrLayout="horizontal">
              <clr-input-container>
                  <label class="clr-col-md-4">First name</label>
                  <input class="clr-col-md-8" clrInput type="text" [(ngModel)]="editFirst" name="first"/>
              </clr-input-container>
              <clr-input-container>
                  <label class="clr-col-md-4">Last name</label>
                  <input class="clr-col-md-8" clrInput type="text" [(ngModel)]="editLast" name="last"/>
              </clr-input-container>
              <clr-input-container>
                  <label class="clr-col-md-4">E-mail</label>
                  <input class="clr-col-md-8" clrInput type="text" [(ngModel)]="editEmail" name="email"/>
              </clr-input-container>
            </form>
        </div>
    </clr-view-edit-section>
</div>
`;

const HTML_EXAMPLE_FULL_ICON = `
<div class="clr-col-12">
    <clr-view-edit-section [clrTitle]="compSectionTitle" [clrEditIcon]="compEditIcon"
    clrSaveText="Save it" clrCancelText="Cancel it"
    (clrSectionSubmitted)="compSectionSubmitted()" (clrSectionEditCancelled)="compSectionCancelled()">
        <div view-block>
            ...
        </div>
        <div edit-block>
            ...
        </div>
    </clr-view-edit-section>
</div>
`;

const HTML_EXAMPLE_FULL_ICON_ANGULAR = `
compEditIcon: string = "cog";
`;

const HTML_EXAMPLE_CUSTOM_ACTIONS = `
<clr-view-edit-section [(clrEditMode)]="editMode" [clrTitle]="customActionsTitle"
    (clrSectionSubmitted)="compSectionSubmitted()" (clrSectionEditCancelled)="compSectionCancelled()">
    <div action-block>
        <clr-dropdown *ngIf="!editMode">
          <button type="button" class="btn btn-icon btn-link ves-action dropdown-toggle" clrDropdownTrigger>
            <clr-icon shape="ellipsis-vertical"></clr-icon>
          </button>
          <clr-dropdown-menu clrPosition="bottom-right" *clrIfOpen>
            <button type="button" (click)="onEdit()" clrDropdownItem>
              Edit
            </button>
            <button type="button" clrDropdownItem>
              Duplicate
            </button>
            <button type="button" clrDropdownItem>
              Delete
            </button>
          </clr-dropdown-menu>
        </clr-dropdown>
    </div>
    ...
</clr-view-edit-section>
`;

const HTML_EXAMPLE_NOT_EDITABLE = `
<clr-view-edit-section clrTitle="Not Editable" [clrEditable]="false">
    <div view-block>
        ...
    </div>
</clr-view-edit-section>
`;

@Component({
    selector: "clr-view-edit-section-demo",
    templateUrl: "./view-edit-section.demo.html",
    host: {
        "[class.content-area]": "true",
        "[class.dox-content-panel]": "true"
    }
})
export class ViewEditSectionDemo extends ClarityDocComponent {
    htmlExampleSideBySide = HTML_EXAMPLE_SIDE_BY_SIDE;
    htmlExampleFullIcon = HTML_EXAMPLE_FULL_ICON;
    htmlExampleFullIconAngular = HTML_EXAMPLE_FULL_ICON_ANGULAR;
    htmlExampleCustomActions = HTML_EXAMPLE_CUSTOM_ACTIONS;
    htmlExampleNotEditable = HTML_EXAMPLE_NOT_EDITABLE;

    birthdate: string;
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
    customActionsTitle: string = "Example with multiple actions";

    compEditIcon: string = "cog";

    editMode: boolean;

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

    onEdit() {
        this.editMode = true;
    }
}
