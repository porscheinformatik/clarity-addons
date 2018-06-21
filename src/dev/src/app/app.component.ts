/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { Route } from '@angular/router';
import { APP_ROUTES } from './app.routing';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';

@Component({ selector: 'app-root', templateUrl: './app.component.html' })
export class AppComponent {
  public routes: Route[] = APP_ROUTES;
  linkRef: HTMLLinkElement;

  themes = [
    { name: 'Clarity (light)', href: 'styles/clr-ui.min.css' },
    { name: 'Clarity (dark)', href: 'styles/clr-ui-dark.min.css' },
    { name: 'VU3', href: 'styles/clr-addons-vu3.css' },
    { name: 'MVAP', href: 'styles/clr-addons-mvap.css' },
  ];

  constructor(@Inject(DOCUMENT) private document: Document, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.linkRef = this.document.createElement('link');
      this.linkRef.rel = 'stylesheet';
      this.linkRef.href = this.themes[0].href;
      this.document.querySelector('head').appendChild(this.linkRef);
    }
  }

  setTheme(theme) {
    this.linkRef.href = theme.href;
  }
}
