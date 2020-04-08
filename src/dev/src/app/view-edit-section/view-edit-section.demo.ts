/*
 * Copyright (c) 2018-2019 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';

@Component({
  selector: 'clr-view-edit-section-demo',
  templateUrl: './view-edit-section.demo.html',
})
export class ViewEditSectionDemo {
  birthdate: string;
  gender: string;
  status = 'Active';
  terms: boolean;
  editBirthdate: string = this.birthdate;
  editGender: string;
  editStatus = 1;
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

  compSectionTitle = 'Different components';
  sectionTitle = 'Example with multiple actions';
  addSectionTitle = 'Additional Data';

  compEditIcon = 'cog';

  editMode: boolean;

  compSectionSubmitted(): void {
    this.birthdate = this.editBirthdate;
    this.gender = this.editGender;
    this.status = this.editStatus === 1 ? 'Active' : 'Inactive';
    this.terms = this.editTerms;
  }

  compSectionCancelled(): void {
    this.editBirthdate = this.birthdate;
    this.editGender = this.gender;
    this.editStatus = this.status === 'Active' ? 1 : 2;
    this.editTerms = this.terms;
  }

  sectionSubmitted(): void {
    this.first = this.editFirst;
    this.last = this.editLast;
    this.email = this.editEmail;
  }

  sectionCancelled(): void {
    this.editFirst = this.first;
    this.editLast = this.last;
    this.editEmail = this.email;
  }

  addSectionSubmitted(): void {
    this.hobby = this.editHobby;
    this.licence = this.editLicence;
  }

  addSectionCancelled(): void {
    this.editHobby = this.hobby;
    this.editLicence = this.licence;
  }

  onEdit(): void {
    this.editMode = true;
  }
}
