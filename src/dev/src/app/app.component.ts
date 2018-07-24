/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, PLATFORM_ID, Inject, ViewChild } from '@angular/core';
import { Route } from '@angular/router';
import { APP_ROUTES } from './app.routing';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
import { ClrNotification } from '@porscheinformatik/clr-addons';
import { NotificationService } from './notification/notification.service';

@Component({ selector: 'app-root', templateUrl: './app.component.html' })
export class AppComponent {
  @ViewChild(ClrNotification) clrNotification: ClrNotification;
  public routes: Route[] = APP_ROUTES;
  linkRef: HTMLLinkElement;

  themes = [
    { name: 'Clarity (light)', href: 'assets/styles/clr-ui.css' },
    { name: 'Clarity (dark)', href: 'assets/styles/clr-ui-dark.css' },
    { name: 'VU3', href: 'assets/styles/clr-addons-vu3.css' },
    { name: 'MVAP', href: 'assets/styles/clr-addons-mvap.css' },
  ];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private notificationService: NotificationService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.linkRef = this.document.createElement('link');
      this.linkRef.rel = 'stylesheet';
      this.linkRef.href = this.themes[0].href;
      this.document.querySelector('head').appendChild(this.linkRef);
    }
  }

  ngOnInit() {
    this.notificationService.change.subscribe(() => {
      this.clrNotification.open();
    });
  }

  onClose(): void {
    console.log('notification closed');
  }

  showAlert(): void {
    alert('Button was clicked');
  }

  setTheme(theme) {
    this.linkRef.href = theme.href;
  }
}
