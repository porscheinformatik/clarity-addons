/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { enableProdMode, provideZoneChangeDetection } from '@angular/core';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { platformBrowser } from '@angular/platform-browser';

if (environment.production) {
  enableProdMode();
}

platformBrowser()
  .bootstrapModule(AppModule, { applicationProviders: [provideZoneChangeDetection()] })
  .catch(err => console.log(err));
