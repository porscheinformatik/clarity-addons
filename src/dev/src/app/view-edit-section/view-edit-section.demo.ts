/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';

@Component({
  selector: 'clr-view-edit-section-demo',
  styleUrls: ['./view-edit-section.demo.scss'],
  templateUrl: './view-edit-section.demo.html',
})
export class ViewEditSectionDemo {
  birthdate: string;
  gender: string;
  status: string = 'Active';
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

  compSectionTitle: string = 'Different components';
  sectionTitle: string = 'Personal Data';
  addSectionTitle: string = 'Additional Data';

  compEditIcon: string = 'cog';

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
