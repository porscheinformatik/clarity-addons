/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { ClrAddonsModule, ClrNotificationService } from '@porscheinformatik/clr-addons';
import { AppComponent } from './app.component';
import { ROUTING } from './app.routing';
import { AppContentContainerComponent } from './content-container.component';
import { LandingComponent } from './landing.component';

@NgModule({
  declarations: [AppComponent, LandingComponent, AppContentContainerComponent],
  imports: [BrowserAnimationsModule, CommonModule, FormsModule, ClarityModule, ClrAddonsModule, ROUTING],
  bootstrap: [AppComponent],
  providers: [ClrNotificationService],
})
export class AppModule {}
