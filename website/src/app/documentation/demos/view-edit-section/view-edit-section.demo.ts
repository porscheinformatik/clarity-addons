/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClarityDocComponent } from '../clarity-doc';
import { ClarityIcons, ellipsisVerticalIcon } from '@cds/core/icon';

ClarityIcons.addIcons(ellipsisVerticalIcon);

const HTML_EXAMPLE_SIDE_BY_SIDE = `
<div class="clr-col-12 clr-col-lg-6">
    <clr-view-edit-section [(clrEditMode)]="editMode1" [clrPreventModeChangeOnSave]="!exampleForm.valid" [clrTitle]="sectionTitle"
        (clrSectionSubmitted)="sectionSubmitted()" (clrSectionEditCancelled)="sectionCancelled()"
        [clrViewRef]="viewBlock1" [clrEditRef]="editBlock1">
        <ng-template #viewBlock1>
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
        </ng-template>
        <ng-template #editBlock1>
            <form clrForm clrLayout="horizontal" [formGroup]="exampleForm" (submit)="onFormSubmit()">
              <clr-input-container>
                  <label class="clr-col-md-4 required">First name</label>
                  <input class="clr-col-md-8" clrInput type="text" formControlName="editFirst" name="first"/>
                  <clr-control-error>You must enter a first name.</clr-control-error>
              </clr-input-container>
              <clr-input-container>
                  <label class="clr-col-md-4 required">Last name</label>
                  <input class="clr-col-md-8" clrInput type="text" formControlName="editLast" name="last"/>
                  <clr-control-error>You must enter a last name.</clr-control-error>
              </clr-input-container>
              <clr-input-container>
                  <label class="clr-col-md-4">E-mail</label>
                  <input class="clr-col-md-8" clrInput type="text" formControlName="editEmail" name="email"/>
              </clr-input-container>
              <input type="submit" style="display: none">
            </form>
        </ng-template>
    </clr-view-edit-section>
</div>
`;

const HTML_EXAMPLE_FULL_ICON = `
<div class="clr-col-12">
    <clr-view-edit-section [clrTitle]="compSectionTitle" [clrEditIcon]="compEditIcon"
    clrSaveText="Save it" clrCancelText="Cancel it" (clrSectionSubmitted)="compSectionSubmitted()"
    (clrSectionEditCancelled)="compSectionCancelled()" [clrViewRef]="viewBlock5" [clrEditRef]="editBlock5">
        <ng-template #viewBlock5>
            ...
        </ng-template>
        <ng-template #editBlock5>
            ...
        </ng-template>
    </clr-view-edit-section>
</div>
`;

const HTML_EXAMPLE_FULL_ICON_ANGULAR = `
compEditIcon: string = "cog";
`;

const HTML_EXAMPLE_CUSTOM_ACTIONS = `
<clr-view-edit-section [(clrEditMode)]="editMode" [clrTitle]="customActionsTitle"
    (clrSectionSubmitted)="compSectionSubmitted()" (clrSectionEditCancelled)="compSectionCancelled()"
    [clrViewRef]="viewBlock3" [clrEditRef]="editBlock3">
    <div action-block>
        <clr-dropdown *ngIf="!editMode">
          <button type="button" class="btn btn-icon btn-link ves-action dropdown-toggle" clrDropdownTrigger>
            <cds-icon shape="ellipsis-vertical"></cds-icon>
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
<clr-view-edit-section clrTitle="Not Editable" [clrEditable]="false" [clrViewRef]="viewBlock4">
    <ng-template #viewBlock4>
        ...
    </ng-template>
</clr-view-edit-section>
`;

const HTML_EXAMPLE_FORM_SUBMIT = `
<clr-view-edit-section [(clrEditMode)]="editMode" (clrSectionSubmitted)="sectionSubmitted()" [clrEditRef]="editBlock">
    ...
    <ng-template #editBlock>
        <form ... (submit)="onFormSubmit()">
            ...
            <input type="submit" style="display: none">
        </form>
    </ng-template>
</clr-view-edit-section>
`;

const HTML_EXAMPLE_COLLAPSIBLE = `
<clr-view-edit-section [(clrEditMode)]="editMode5" clrTitle="Collapsible - Expanded"
                       [clrViewRef]="viewBlock1" [clrEditRef]="editBlock1"
                       [clrPreventModeChangeOnSave]="!exampleForm.valid"
                       (clrSectionSubmitted)="sectionSubmitted()" (clrSectionEditCancelled)="sectionCancelled()"
                       [clrIsCollapsible]="true">
    <ng-template #viewBlock1>
        ...
    </ng-template>
    <ng-template #editBlock1>
        ...
    </ng-template>
</clr-view-edit-section>
<clr-view-edit-section [(clrEditMode)]="editMode6" clrTitle="Starts Collapsed"
                       [clrViewRef]="viewBlock1" [clrEditRef]="editBlock1"
                       [clrPreventModeChangeOnSave]="!exampleForm.valid"
                       (clrSectionSubmitted)="sectionSubmitted()" (clrSectionEditCancelled)="sectionCancelled()"
                       [clrIsCollapsible]="true" [clrIsCollapsed]="true">
    <ng-template #viewBlock1>
        ...
    </ng-template>
    <ng-template #editBlock1>
        ...
    </ng-template>
</clr-view-edit-section>
`;

const ANGULAR_EXAMPLE_FORM_SUBMIT = `
editMode = false;

onFormSubmit() {
    this.sectionSubmitted();
    this.editMode = false;
}
`;

@Component({
  selector: 'clr-view-edit-section-demo',
  templateUrl: './view-edit-section.demo.html',
  host: {
    '[class.content-area]': 'true',
    '[class.dox-content-panel]': 'true',
  },
})
export class ViewEditSectionDemo extends ClarityDocComponent {
  htmlExampleSideBySide = HTML_EXAMPLE_SIDE_BY_SIDE;
  htmlExampleFullIcon = HTML_EXAMPLE_FULL_ICON;
  htmlExampleFullIconAngular = HTML_EXAMPLE_FULL_ICON_ANGULAR;
  htmlExampleCustomActions = HTML_EXAMPLE_CUSTOM_ACTIONS;
  htmlExampleNotEditable = HTML_EXAMPLE_NOT_EDITABLE;
  htmlExampleFormSubmit = HTML_EXAMPLE_FORM_SUBMIT;
  htmlExampleCollapsible = HTML_EXAMPLE_COLLAPSIBLE;
  angularExampleFormSubmit = ANGULAR_EXAMPLE_FORM_SUBMIT;

  editMode1 = false;
  editMode2 = false;
  editMode3 = false;
  editMode4 = false;
  editMode5 = false;
  editMode6 = false;

  birthdate: string;
  gender: string = 'male';
  status: string = 'Active';
  terms: boolean;
  editBirthdate: string;
  editGender: string = this.gender;
  editStatus: number = 1;
  editTerms: boolean;

  first: string = 'Max';
  last: string = 'Mustermann';
  email: string = 'm.mustermann@mail.com';

  hobby: string;
  licence: string;
  editHobby: string;
  editLicence: string;

  compSectionTitle: string = 'Different components';
  sectionTitle: string = 'Personal Data';
  addSectionTitle: string = 'Additional Data';
  customActionsTitle: string = 'Example with multiple actions';

  compEditIcon: string = 'cog';

  exampleForm = new FormGroup({
    editFirst: new FormControl(this.first, {
      validators: [Validators.required],
      updateOn: 'blur',
    }),
    editLast: new FormControl(this.last, {
      validators: [Validators.required],
      updateOn: 'blur',
    }),
    editEmail: new FormControl(this.email),
  });

  constructor() {
    super('view-edit-section');
  }

  onCompFormSubmit() {
    (<HTMLElement>document.activeElement).blur();
    this.compSectionSubmitted();
    this.editMode3 = false;
    this.editMode4 = false;
  }

  compSectionSubmitted() {
    this.birthdate = this.editBirthdate;
    this.gender = this.editGender;
    this.status = this.editStatus === 1 ? 'Active' : 'Inactive';
    this.terms = this.editTerms;
  }

  compSectionCancelled() {
    this.editBirthdate = this.birthdate;
    this.editGender = this.gender;
    this.editStatus = this.status === 'Active' ? 1 : 2;
    this.editTerms = this.terms;
  }

  getTermsText() {
    return this.terms ? 'I agreed' : 'I disagreed';
  }

  onFormSubmit() {
    (<HTMLElement>document.activeElement).blur();
    this.editMode1 = !this.sectionSubmitted();
  }

  sectionSubmitted(): boolean {
    if (this.exampleForm.valid) {
      this.first = this.exampleForm.value.editFirst;
      this.last = this.exampleForm.value.editLast;
      this.email = this.exampleForm.value.editEmail;
      return true;
    }
    return false;
  }

  sectionCancelled() {
    this.exampleForm.reset({ editFirst: this.first, editLast: this.last, editEmail: this.email });
  }

  onAddFormSubmit() {
    (<HTMLElement>document.activeElement).blur();
    this.addSectionSubmitted();
    this.editMode2 = false;
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
    this.editMode3 = true;
  }
}
