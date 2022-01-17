/*
 * Copyright (c) 2018-2022 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { CommonModule } from '@angular/common';
import { APP_INITIALIZER } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { ClarityIcons } from '@clr/icons';
import { AllShapes } from '@clr/icons/shapes/all-shapes';
import {
  ClrAddonsModule,
  ClrHistoryService,
  ClrNotificationService,
  ClrAddonsIconShapes,
} from '@porscheinformatik/clr-addons';
import { AppComponent } from './app.component';
import { ROUTING } from './app.routing';
import { AppContentContainerComponent } from './content-container.component';
import { LandingComponent } from './landing.component';
import { RouteHistoryService } from './route-history.service';

export function loadIcons() {
  return (): void => {
    // Add all available shapes from clarity, per default only the core-shapes are loaded.
    ClarityIcons.add(AllShapes);
    // Add our custom shapes
    ClarityIcons.add(ClrAddonsIconShapes);
  };
}

@NgModule({
  declarations: [AppComponent, LandingComponent, AppContentContainerComponent],
  imports: [BrowserAnimationsModule, CommonModule, FormsModule, ClarityModule, ClrAddonsModule, ROUTING],
  bootstrap: [AppComponent],
  providers: [
    ClrNotificationService,
    ClrHistoryService,
    RouteHistoryService,
    {
      provide: APP_INITIALIZER,
      useFactory: loadIcons,
      multi: true,
    },
  ],
})
export class AppModule {}
