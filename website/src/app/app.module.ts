import { APP_ID, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { ClrAddonsModule } from '@porscheinformatik/clr-addons';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FullPageLayoutsRoutingModule } from './documentation/demos/full-page-layouts/full-page-layouts-routing.module';
import { DocumentationModule } from './documentation/documentation.module';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-scss';

@NgModule({
  declarations: [AppComponent, HomeComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    ClrAddonsModule,
    DocumentationModule,
    FullPageLayoutsRoutingModule,
    AppRoutingModule,
  ],
  providers: [
    Title,
    {
      provide: APP_ID,
      useValue: 'clarity',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
