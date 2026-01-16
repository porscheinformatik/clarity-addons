/*
 * Copyright (c) 2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  ClarityIcons,
  pencilIcon,
  userIcon,
  envelopeIcon,
  administratorIcon,
  mobileIcon,
  mapMarkerIcon,
  loginIcon,
} from '@cds/core/icon';

ClarityIcons.addIcons(userIcon, envelopeIcon, pencilIcon, administratorIcon, mobileIcon, mapMarkerIcon, loginIcon);

@Component({
  selector: 'clr-summary-area-overview-page-demo',
  template: `
    <h3 style="margin-top: 0">Welcome, John Doe!</h3>
    <p>
      This is the overview page for your profile. Here you can quickly access your most important information and
      actions.
    </p>

    <div class="overview-highlights">
      <ul>
        <li><strong>Status:</strong> Active</li>
        <li><strong>Role:</strong> Admin</li>
        <li><strong>Last Login:</strong> 2026-06-01 10:00</li>
        <li><strong>Open Tasks:</strong> 5</li>
      </ul>
    </div>

    <br />
    <div class="overview-actions">
      <button class="btn" (click)="sendEmail('john@example.com')">Send Email</button>
      <button class="btn" (click)="callPhone('+4312345678')">Call</button>
      <button class="btn" (click)="navigateInternally('details')">View Details</button>
    </div>
  `,
  standalone: false,
})
export class SummaryAreaOverviewPageDemo {
  private readonly router: Router = inject(Router);

  navigateInternally(page: string) {
    this.router.navigate(['/full-page-layouts/summary-area-page-layout', { outlets: { fullpage: page } }]);
  }

  sendEmail(email: string) {
    globalThis.location.href = `mailto:${email}`;
  }

  callPhone(number: string) {
    globalThis.location.href = `tel:${number}`;
  }
}
