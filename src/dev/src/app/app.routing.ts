/*
 * Copyright (c) 2018-2024 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing.component';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const APP_ROUTES: Routes = [
  { path: '', component: LandingComponent },
  {
    path: 'back-button',
    loadChildren: () => import('./back-button/back-button.demo.module').then(m => m.BackButtonDemoModule),
  },
  { path: 'cards', loadChildren: () => import('./cards/cards.demo.module').then(m => m.CardsDemoModule) },
  {
    path: 'view-edit-section',
    loadChildren: () =>
      import('./view-edit-section/view-edit-section.demo.module').then(m => m.ViewEditSectionDemoModule),
  },
  { path: 'clarity', loadChildren: () => import('./clarity/clarity.demo.module').then(m => m.ClarityDemoModule) },
  { path: 'pager', loadChildren: () => import('./pager/pager.demo.module').then(m => m.PagerDemoModule) },
  {
    path: 'dot-pager',
    loadChildren: () => import('./dot-pager/dot-pager.demo.module').then(m => m.DotPagerDemoModule),
  },
  {
    path: 'paged-search-result-list',
    loadChildren: () =>
      import('./paged-search-result-list/paged-search-result-list.demo.module').then(
        m => m.PagedSearchResultListDemoModule
      ),
  },
  {
    path: 'collapse-expand-section',
    loadChildren: () =>
      import('./collapse-expand-section/collapse-expand-section.demo.module').then(
        m => m.CollapseExpandSectionDemoModule
      ),
  },
  {
    path: 'content-panel',
    loadChildren: () => import('./content-panel/content-panel.demo.module').then(m => m.ContentPanelDemoModule),
  },
  { path: 'flow-bar', loadChildren: () => import('./flow-bar/flow-bar.demo.module').then(m => m.FlowBarDemoModule) },
  {
    path: 'flow-bar-content-panel',
    loadChildren: () =>
      import('./flow-bar-content-panel/flow-bar-content-panel.demo.module').then(m => m.FlowBarContentPanelDemoModule),
  },
  {
    path: 'breadcrumb',
    loadChildren: () => import('./breadcrumb/breadcrumb.demo.module').then(m => m.BreadcrumbDemoModule),
  },
  {
    path: 'progress-spinner',
    loadChildren: () =>
      import('./progress-spinner/progress-spinner.demo.module').then(m => m.ProgressSpinnerDemoModule),
  },
  {
    path: 'location-bar',
    loadChildren: () => import('./location-bar/location-bar.demo.module').then(m => m.LocationBarDemoModule),
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.demo.module').then(m => m.NotificationDemoModule),
  },
  {
    path: 'numericfield',
    loadChildren: () => import('./numericfield/numericfield.demo.module').then(m => m.NumericFieldDemoModule),
  },
  {
    path: 'searchfield',
    loadChildren: () => import('./searchfield/searchfield.demo.module').then(m => m.SearchFieldDemoModule),
  },
  {
    path: 'treetable',
    loadChildren: () => import('./treetable/treetable.demo.module').then(m => m.TreetableDemoModule),
  },
  { path: 'readonly', loadChildren: () => import('./readonly/readonly.demo.module').then(m => m.ReadonlyDemoModule) },
  {
    path: 'date-time-container',
    loadChildren: () =>
      import('./date-time-container/date-time-container.demo.module').then(m => m.DateTimeContainerDemoModule),
  },
  {
    path: 'quick-list-container',
    loadChildren: () => import('./quick-list/quick-list.demo.module').then(m => m.QuickListModule),
  },
  {
    path: 'brand-avatar',
    loadChildren: () => import('./brand-avatar/brand-avatar.demo.module').then(m => m.BrandAvatarDemoModule),
  },
  {
    path: 'letter-avatar',
    loadChildren: () => import('./letter-avatar/letter-avatar.demo.module').then(m => m.LetterAvatarDemoModule),
  },
  {
    path: 'multilingual-input',
    loadChildren: () =>
      import('./multilingual-input/multilingual-input.demo.module').then(m => m.MultilingualInputDemoModule),
  },
  {
    path: 'generic-quick-list',
    loadChildren: () =>
      import('./generic-quick-list/generic-quick-list.demo.module').then(m => m.GenericQuickListModule),
  },
  {
    path: 'icons',
    loadChildren: () => import('./icons/icons.demo.module').then(m => m.IconsDemoModule),
  },
  {
    path: 'kitchen-sink',
    loadChildren: () => import('./kitchen-sink/kitchen-sink.module').then(m => m.KitchenSinkModule),
  },
  { path: 'dropdown', loadChildren: () => import('./dropdown/dropdown.demo.module').then(m => m.DropdownDemoModule) },
  {
    path: 'datagrid-filters',
    loadChildren: () =>
      import('./datagrid-filters/datagrid-filters.demo.module').then(m => m.DatagridFiltersDemoModule),
  },
  {
    path: 'datagrid-state-persistence',
    loadChildren: () =>
      import('./datagrid-state-persistence/datagrid-state-persistence.demo.module').then(
        m => m.DatagridStatePersistenceDemoModule
      ),
  },
  {
    path: 'enum-filter',
    loadChildren: () => import('./enum-filter/enum-filter.demo.module').then(m => m.EnumFilterDemoModule),
  },
  {
    path: 'daterangepicker',
    loadChildren: () => import('./daterangepicker/daterangepicker.demo.module').then(m => m.DaterangepickerDemoModule),
  },
  {
    path: 'html-editor',
    loadChildren: () => import('./html-editor/html-editor.demo.module').then(m => m.HtmlEditorDemoModule),
  },
];

export const ROUTING: ModuleWithProviders<RouterModule> = RouterModule.forRoot(APP_ROUTES);
