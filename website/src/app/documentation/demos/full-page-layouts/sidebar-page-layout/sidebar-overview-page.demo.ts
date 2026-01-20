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
    <p>This is the overview page for your profile. Here you can quickly access your most important information.</p>

    <div class="overview-highlights">
      <ul>
        <li><strong>Status:</strong> Active</li>
        <li><strong>Role:</strong> Admin</li>
        <li><strong>Last Login:</strong> 2026-06-01 10:00</li>
        <li><strong>Open Tasks:</strong> 5</li>
      </ul>
    </div>
  `,
  standalone: false,
})
export class SidebarOverviewPageDemo {}
