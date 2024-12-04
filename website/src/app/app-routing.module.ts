import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      bodyClass: 'layout-home',
    },
  },
  {
    path: 'news',
    loadChildren: () => import('./news/news.module').then(m => m.NewsModule),
  },
  {
    path: 'icons',
    loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: {
      bodyClass: 'layout-error',
      browserTitle: 'Page Not Found',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules, anchorScrolling: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
