import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { ClarityIcons } from '@clr/icons';
import { AllShapes } from '@clr/icons/shapes/all-shapes';
import { ClrAddonsModule, ClrAddonsIconShapes } from '@porscheinformatik/clr-addons';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FullPageLayoutsRoutingModule } from './documentation/demos/full-page-layouts/full-page-layouts-routing.module';
import { DocumentationModule } from './documentation/documentation.module';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export function loadIcons() {
  return (): void => {
    // All shapes are added currently, could be reduced to only the shape categories needed
    ClarityIcons.add(AllShapes);
    ClarityIcons.add(ClrAddonsIconShapes);
  };
}

@NgModule({
  declarations: [AppComponent, HomeComponent, PageNotFoundComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'clarity' }),
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
      provide: APP_INITIALIZER,
      useFactory: loadIcons,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
