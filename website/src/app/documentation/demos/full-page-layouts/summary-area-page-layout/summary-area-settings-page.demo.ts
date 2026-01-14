import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'clr-summary-area-settings-page-demo',
  template: `
    <div class="settings-header">
      <h3>Settings for John Doe</h3>
      <p>Manage your preferences and account options.</p>
    </div>

    <form clrForm [clrLayout]="'horizontal'" class="clr-row clr-col-lg-6">
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
    <br />
    <div class="settings-actions">
      <button class="btn" type="button" (click)="saveSettings()">Save Changes</button>
      <button class="btn" type="button" (click)="resetSettings()">Reset to Default</button>
    </div>
  `,
  standalone: false,
})
export class SummaryAreaSettingsPageDemo {
  private readonly router: Router = inject(Router);

  emailNotifications: boolean = true;
  smsAlerts: boolean = false;
  theme: string = 'light';
  language: string = 'en';

  saveSettings() {
    alert('Settings have been saved.');
  }

  resetSettings() {
    this.emailNotifications = true;
    this.smsAlerts = false;
    this.theme = 'light';
    this.language = 'English';
    alert('Settings have been reset to default.');
  }
}
