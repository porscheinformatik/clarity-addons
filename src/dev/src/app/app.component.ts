/*
 * Copyright (c) 2018-2024 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, Inject, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { APP_ROUTES } from './app.routing';
import { DOCUMENT } from '@angular/common';
import { RouteHistoryService } from './route-history.service';
import { angleIcon, ClarityIcons, cogIcon, userIcon } from '@cds/core/icon';

ClarityIcons.addIcons(angleIcon, cogIcon, userIcon);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
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

  setTheme(theme: { cdsTheme: string; href: string }): void {
    this.document.body.setAttribute('cds-theme', theme.cdsTheme);
  }
}
