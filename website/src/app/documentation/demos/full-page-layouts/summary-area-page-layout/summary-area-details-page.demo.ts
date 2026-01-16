import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'clr-summary-area-details-page-demo',
  template: `
    <div class="details-header">
      <h3 style="margin-top: 0">Profile Details: John Doe</h3>
      <p>View and edit detailed information about this person.</p>
    </div>

    <div class="details-content">
      <form clrForm [clrLayout]="'horizontal'" class="clr-row">
        <h4 class="clr-col-12">Personal Data</h4>
        <clr-input-container class="clr-col-12 clr-col-lg-6">
          <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">First name</label>
          <input clrInput type="text" class="clr-col-12 clr-col-sm-4 clr-col-lg-6" value="John" />
        </clr-input-container>
        <clr-input-container class="clr-col-12 clr-col-lg-6">
          <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">Last name</label>
          <input clrInput type="text" class="clr-col-12 clr-col-sm-4 clr-col-lg-6" value="Doe" />
        </clr-input-container>
        <clr-radio-container class="clr-col-12 clr-col-lg-6">
          <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">Gender</label>
          <clr-radio-wrapper>
            <label>Male</label>
            <input clrRadio class="clr-col-12 clr-col-sm-4 clr-col-lg-6" type="radio" name="gender" />
          </clr-radio-wrapper>
          <clr-radio-wrapper>
            <label>Female</label>
            <input clrRadio class="clr-col-12 clr-col-sm-4 clr-col-lg-6" type="radio" name="gender" />
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
          <input clrDate type="text" class="clr-col-12 clr-col-sm-6 clr-col-lg-6" />
        </clr-date-container>
        <clr-input-container class="clr-col-12 clr-col-lg-6">
          <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">E-Mail</label>
          <input clrInput type="text" class="clr-col-12 clr-col-sm-4 clr-col-lg-6" value="john@example.com" />
        </clr-input-container>
        <clr-input-container class="clr-col-12 clr-col-lg-6">
          <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">Phone</label>
          <input clrInput type="text" class="clr-col-12 clr-col-sm-4 clr-col-lg-6" value="+43 1234 5678" />
        </clr-input-container>

        <h4 class="clr-col-12">Department</h4>
        <clr-input-container class="clr-col-12 clr-col-lg-6">
          <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">Name</label>
          <input
            clrInput
            type="text"
            class="clr-col-12 clr-col-sm-4 clr-col-lg-6"
            value="Global Strategic Innovation and Advanced Research & Development Operations for Emerging Technologies and Digital Transformation Initiatives"
          />
        </clr-input-container>
        <clr-input-container class="clr-col-12 clr-col-lg-6">
          <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">Function</label>
          <input clrInput type="text" class="clr-col-12 clr-col-sm-4 clr-col-lg-6" value="Engineering" />
        </clr-input-container>
        <clr-input-container class="clr-col-12 clr-col-lg-6">
          <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">Manager</label>
          <input clrInput type="text" class="clr-col-12 clr-col-sm-4 clr-col-lg-6" value="Jane Smith" />
        </clr-input-container>

        <h4 class="clr-col-12">Other Data</h4>
        <clr-date-time-container class="clr-col-12 clr-col-lg-6 clr-row">
          <clr-date-container>
            <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">Start date & time</label>
            <input clrDate type="text" class="clr-col-12 clr-col-sm-10 clr-col-lg-9" />
          </clr-date-container>
          <input clrTime type="time" />
        </clr-date-time-container>
        <clr-input-container class="clr-col-12 clr-col-lg-6">
          <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">End time</label>
          <input clrInput type="time" class="clr-col-12 clr-col-sm-3 clr-col-lg-5" />
        </clr-input-container>
        <clr-textarea-container class="clr-col-12 clr-col-lg-6">
          <label class="clr-col-12 clr-col-sm-2 clr-col-lg-3">Comment / Feedback</label>
          <textarea clrTextarea type="text" class="clr-col-12 clr-col-sm-10 clr-col-lg-9"></textarea>
        </clr-textarea-container>
      </form>
    </div>
  `,
  standalone: false,
})
export class SummaryAreaDetailsPageDemo {
  private readonly router: Router = inject(Router);
}
