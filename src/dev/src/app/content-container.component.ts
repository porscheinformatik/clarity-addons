/*
 * Copyright (c) 2018-2023 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Route, Router } from '@angular/router';

import { APP_ROUTES } from './app.routing';
import { ClrBreadcrumbService } from '@porscheinformatik/clr-addons';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'my-app-content-container',
  template: `
    <main class="content-area">
      <clr-breadcrumb></clr-breadcrumb>
      <router-outlet></router-outlet>
    </main>

    <clr-vertical-nav [clrVerticalNavCollapsible]="true" [clrVerticalNavCollapsed]="false" [clr-nav-level]="2">
      <ng-container *ngFor="let route of routes">
        <a clrVerticalNavLink *ngIf="route.path != ''" [routerLink]="[route.path]" [routerLinkActive]="['active']">
          {{ route.path }}
        </a>
      </ng-container>
    </clr-vertical-nav>

    <!--DO NOT DELETE THE COMMENTS BELOW. Needed for testing the Vertical Nav-->
    <!--<clr-vertical-nav [clrVerticalNavCollapsible]="true" [clrVerticalNavCollapsed]="false" [clr-nav-level]="2">
        <clr-vertical-nav-group>
            <clr-icon shape="home" clrVerticalNavIcon></clr-icon>
            Home
            <ng-container *ngFor="let route of routes" ngProjectAs="[clrVerticalNavLink]">
                <a clrVerticalNavLink *ngIf="route.path != ''"
                   [routerLink]="[route.path]"
                   [routerLinkActive]="['active']">
                    {{route.path}}
                </a>
            </ng-container>
        </clr-vertical-nav-group>
    </clr-vertical-nav>-->
  `,
})
export class AppContentContainerComponent implements OnDestroy {
  private static readonly ROOT_BREADCRUMB_ELEMENT = { label: 'Home', url: '/' };
  private static readonly TEST_BREADCRUMB_ELEMENT = { label: 'breadcrumb', url: 'breadcrumb' };

  public routes: Route[] = APP_ROUTES;
  destroyed = new Subject<void>();

  constructor(private breadcrumbService: ClrBreadcrumbService, private router: Router) {
    this.router.events.pipe(takeUntil(this.destroyed)).subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.breadcrumbService.updateBreadcrumb([
          AppContentContainerComponent.ROOT_BREADCRUMB_ELEMENT,
          AppContentContainerComponent.TEST_BREADCRUMB_ELEMENT,
          { label: val.urlAfterRedirects.substr(1) },
        ]);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
