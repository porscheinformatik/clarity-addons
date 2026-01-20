import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'clr-summary-area-settings-page-demo',
  template: `
    <div class="settings-header">
      <h3 style="margin-top: 0">Settings for John Doe</h3>
      <p>Manage your preferences and account options.</p>
    </div>

    <form
      clrForm
      [clrLayout]="'horizontal'"
      class="clr-row clr-col-xl-5 clr-col-lg-6 clr-col-md-6 clr-col-sm-8 clr-col-12"
    >
      <clr-toggle-container class="clr-col-12">
        <clr-toggle-wrapper>
          <input type="checkbox" clrToggle value="yes" name="options" />
          <label>Enable Email Notifications</label>
        </clr-toggle-wrapper>
        <clr-toggle-wrapper>
          <input type="checkbox" clrToggle value="no" name="options" />
          <label>Enable SMS Alerts</label>
        </clr-toggle-wrapper>
      </clr-toggle-container>
      <clr-select-container class="clr-col-12">
        <label>Theme</label>
        <select clrSelect [(ngModel)]="theme" name="theme">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="auto">Auto</option>
        </select>
      </clr-select-container>
      <clr-input-container class="clr-col-12">
        <label>Language</label>
        <input clrInput [(ngModel)]="language" name="language" type="text" value="English" />
      </clr-input-container>
    </form>
  `,
  standalone: false,
})
export class SidebarSettingsPageDemo {
  theme: string = 'light';
  language: string = 'en';
}
