/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from "@angular/core";

const CODE_EXAMPLE = `
<form clrForm [clrLayout]="'horizontal'" class="clr-row">
    <h4 class="clr-col-12">Personal Data</h4>
    <clr-input-container class="clr-col-12 clr-col-lg-6">
        <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">First name</label>
        <input clrInput type="text" class="clr-col-12 clr-col-sm-4 clr-col-lg-6"/>
    </clr-input-container>
    <clr-input-container class="clr-col-12 clr-col-lg-6">
        <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">Last name</label>
        <input clrInput type="text" class="clr-col-12 clr-col-sm-4 clr-col-lg-6"/>
    </clr-input-container>
    <clr-radio-container class="clr-col-12 clr-col-lg-6">
        <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">Gender</label>
        <clr-radio-wrapper>
            <label>Male</label>
            <input clrRadio class="clr-col-12 clr-col-sm-4 clr-col-lg-6" type="radio" name="gender"/>
        </clr-radio-wrapper>
        <clr-radio-wrapper>
            <label>Female</label>
            <input clrRadio class="clr-col-12 clr-col-sm-4 clr-col-lg-6" type="radio" name="gender"/>
        </clr-radio-wrapper>
    </clr-radio-container>
    <clr-select-container class="clr-col-12 clr-col-lg-6">
        <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">Country</label>
        <select clrSelect class="clr-col-12 clr-col-sm-3 clr-col-lg-5">
            <option>Austria</option>
            <option>Germany</option>
            <option>United States of America</option>
        </select>
    </clr-select-container>
    <clr-date-container class="clr-col-12 clr-col-lg-6">
        <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">Date of Birth</label>
        <input clrDate type="text" class="clr-col-12 clr-col-sm-6 clr-col-lg-6"/>
    </clr-date-container>
    <clr-input-container class="clr-col-12 clr-col-lg-6">
        <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">E-Mail</label>
        <input clrInput type="text" class="clr-col-12 clr-col-sm-4 clr-col-lg-6"/>
    </clr-input-container>
    <clr-input-container class="clr-col-12 clr-col-lg-6">
        <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">Phone</label>
        <input clrInput type="text" class="clr-col-12 clr-col-sm-4 clr-col-lg-6"/>
    </clr-input-container>

    <h4 class="clr-col-12">User Data</h4>
    <clr-input-container class="clr-col-12 clr-col-lg-6">
        <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">Username</label>
        <input clrInput type="text" class="clr-col-12 clr-col-sm-4 clr-col-lg-6"/>
    </clr-input-container>
    <clr-password-container class="clr-col-12 clr-col-lg-6">
        <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">Password</label>
        <input clrPassword type="password" class="clr-col-12 clr-col-sm-4 clr-col-lg-6"/>
    </clr-password-container>

    <h4 class="clr-col-12">Other Data</h4>
    <clr-date-time-container class="clr-col-12 clr-col-lg-6 clr-row">
        <clr-date-container>
            <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">Start date & time</label>
            <input clrDate type="text" class="clr-col-12 clr-col-sm-10 clr-col-lg-9"/>
        </clr-date-container>
        <input clrTime type="time" />
    </clr-date-time-container>
    <clr-input-container class="clr-col-12 clr-col-lg-6">
        <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">End time</label>
        <input clrInput type="time" class="clr-col-12 clr-col-sm-3 clr-col-lg-5"/>
    </clr-input-container>
    <clr-input-container class="clr-col-12 clr-col-lg-6">
        <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">Daily Donation</label>
        <input clrInput clrNumeric [clrUnit]="'€'" type="text" class="clr-col-12 clr-col-sm-3 clr-col-lg-5"/>
    </clr-input-container>
    <clr-checkbox-container class="clr-col-12 clr-col-lg-6">
        <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">Newsletter Subscriptions</label>
        <clr-checkbox-wrapper>
            <label>Weekly</label>
            <input clrCheckbox class="clr-col-12 clr-col-sm-6 clr-col-lg-6" type="checkbox"/>
        </clr-checkbox-wrapper>
        <clr-checkbox-wrapper>
            <label>Monthly</label>
            <input clrCheckbox class="clr-col-12 clr-col-sm-6 clr-col-lg-6" type="checkbox"/>
        </clr-checkbox-wrapper>
    </clr-checkbox-container>
    <clr-textarea-container class="clr-col-12 clr-col-lg-6">
        <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">Comment / Feedback</label>
        <textarea clrTextarea type="text" class="clr-col-12 clr-col-sm-10 clr-col-lg-9"></textarea>
    </clr-textarea-container>
</form>
`;

@Component({
    selector: "clr-forms-layout-demo",
    templateUrl: "./forms-layout.demo.html"
})
export class FormsLayout {
    codeExample = CODE_EXAMPLE;
}
