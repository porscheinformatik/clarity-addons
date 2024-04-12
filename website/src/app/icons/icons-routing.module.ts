import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IconsGetStartedComponent } from './icons-get-started/icons-get-started.component';
import { IconsSetsComponent } from './icons-sets/icons-sets.component';
import { IconsComponent } from './icons.component';
import { IconsLogosComponent } from './icons-logos/icons-logos.component';

const newsRoutes: Routes = [
  {
    path: '',
    component: IconsComponent,
    data: {
      bodyClass: 'layout-icons',
      browserTitle: 'Icons',
    },
    children: [
      { path: '', redirectTo: 'icon-sets' },
      { path: 'icon-sets', component: IconsSetsComponent },
      { path: 'get-started', component: IconsGetStartedComponent },
      { path: 'icons-logos', component: IconsLogosComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(newsRoutes)],
  exports: [RouterModule],
})
export class IconsRoutingModule {}
