/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, DOCUMENT, Inject, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { APP_ROUTES } from './app.routing';

import { RouteHistoryService } from './route-history.service';
import { angleIcon, ClarityIcons, cogIcon, shoppingCartIcon, userIcon } from '@clr/angular/icon';

ClarityIcons.addIcons(angleIcon, cogIcon, userIcon, shoppingCartIcon);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
})
export class AppComponent implements OnInit {
  public routes: Route[] = APP_ROUTES;

  themes = [
    { name: 'PHS', cdsTheme: 'phs' },
    { name: 'Clarity (light)', cdsTheme: 'light' },
    { name: 'Clarity (dark)', cdsTheme: 'dark' },
  ];

  constructor(@Inject(DOCUMENT) private document: Document, private routeHistoryService: RouteHistoryService) {}

  ngOnInit(): void {
    this.routeHistoryService.init();
  }

  setTheme(theme: { cdsTheme: string; name: string }): void {
    this.document.body.setAttribute('cds-theme', theme.cdsTheme);
  }
}
