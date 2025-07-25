/*
 * Copyright (c) 2018-2025 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import {
  ClrAddonsModule,
  ClrHistoryService,
  ClrNotificationService,
  HISTORY_TOKEN,
} from '@porscheinformatik/clr-addons';
import { AppComponent } from './app.component';
import { ROUTING } from './app.routing';
import { AppContentContainerComponent } from './content-container.component';
import { LandingComponent } from './landing.component';
import { RouteHistoryService } from './route-history.service';
import { MockClrHistoryHttpService } from './_mocks/history.http.mock.service';

@NgModule({
  declarations: [AppComponent, LandingComponent, AppContentContainerComponent],
  imports: [BrowserAnimationsModule, CommonModule, FormsModule, ClarityModule, ClrAddonsModule, ROUTING],
  bootstrap: [AppComponent],
  providers: [
    ClrNotificationService,
    {
      provide: HISTORY_TOKEN,
      useClass: MockClrHistoryHttpService,
    },
    ClrHistoryService,
    RouteHistoryService,
  ],
})
export class AppModule {}
