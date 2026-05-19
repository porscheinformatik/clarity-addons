import { enableProdMode, provideZoneChangeDetection } from '@angular/core';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { platformBrowser } from '@angular/platform-browser';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowser().bootstrapModule(AppModule, { applicationProviders: [provideZoneChangeDetection()] });
});
