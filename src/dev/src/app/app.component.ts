/*
 * Copyright (c) 2018-2021 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, PLATFORM_ID, Inject, OnInit } from '@angular/core';
import { Route } from '@angular/router';
import { APP_ROUTES } from './app.routing';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { RouteHistoryService } from './route-history.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public routes: Route[] = APP_ROUTES;
  linkRef: HTMLLinkElement;

  themes = [
    { name: 'PHS', cdsTheme: 'phs' },
    { name: 'Clarity (light)', cdsTheme: 'light' },
    { name: 'Clarity (dark)', href: 'assets/styles/clr-ui-dark.css' },
  ];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Record<string, any>,
    private routeHistoryService: RouteHistoryService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.linkRef = this.document.createElement('link');
      this.linkRef.rel = 'stylesheet';
      this.linkRef.href = this.themes[0].href;
      this.document.querySelector('head').appendChild(this.linkRef);
    }
  }

  ngOnInit(): void {
    this.routeHistoryService.init();
  }

  setTheme(theme: { cdsTheme: string; href: string }): void {
    this.document.documentElement.setAttribute('cds-theme', theme.cdsTheme);
    this.linkRef.href = theme.href;
  }
}
