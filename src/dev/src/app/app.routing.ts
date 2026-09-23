/*
 * Copyright (c) 2018-2026 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing.component';

export const APP_ROUTES: Routes = [
  { path: '', component: LandingComponent },
  {
    path: 'bar-chart',
    loadComponent: () => import('./bar-chart/bar-chart.demo').then(m => m.BarChartDemo),
    data: { navGroup: 'Charts' },
  },
  {
    path: 'grouped-bar-chart',
    loadComponent: () => import('./grouped-bar-chart/grouped-bar-chart.demo').then(m => m.GroupedBarChartDemo),
    data: { navGroup: 'Charts' },
  },
  {
    path: 'line-chart',
    loadComponent: () => import('./line-chart/line-chart.demo').then(m => m.LineChartDemo),
    data: { navGroup: 'Charts' },
  },
  {
    path: 'pie-chart',
    loadComponent: () => import('./pie-chart/pie-chart.demo').then(m => m.PieChartDemo),
    data: { navGroup: 'Charts' },
  },
  {
    path: 'area-chart',
    loadComponent: () => import('./area-chart/area-chart.demo').then(m => m.AreaChartDemo),
    data: { navGroup: 'Charts' },
  },
  {
    path: 'combo-chart',
    loadComponent: () => import('./combo-chart/combo-chart.demo').then(m => m.ComboChartDemo),
    data: { navGroup: 'Charts' },
  },
  {
    path: 'funnel-chart',
    loadComponent: () => import('./funnel-chart/funnel-chart.demo').then(m => m.FunnelChartDemo),
    data: { navGroup: 'Charts' },
  },
  {
    path: 'action-panel',
    loadChildren: () => import('./action-panel/action-panel.demo.module').then(m => m.ActionPanelDemoModule),
    data: { navGroup: 'Layout & Panels' },
  },
  {
    path: 'back-button',
    loadChildren: () => import('./back-button/back-button.demo.module').then(m => m.BackButtonDemoModule),
    data: { navGroup: 'Layout & Panels' },
  },
  {
    path: 'cards',
    loadChildren: () => import('./cards/cards.demo.module').then(m => m.CardsDemoModule),
    data: { navGroup: 'Layout & Panels' },
  },
  {
    path: 'combobox',
    loadComponent: () => import('./combobox/combobox.demo').then(m => m.ComboboxDemo),
    data: { navGroup: 'Forms & Inputs' },
  },
  {
    path: 'view-edit-section',
    loadChildren: () =>
      import('./view-edit-section/view-edit-section.demo.module').then(m => m.ViewEditSectionDemoModule),
    data: { navGroup: 'Layout & Panels' },
  },
  {
    path: 'control-warning',
    loadChildren: () => import('./control-warning/control-warning.demo.module').then(m => m.ControlWarningDemoModule),
    data: { navGroup: 'Forms & Inputs' },
  },
  {
    path: 'clarity',
    loadChildren: () => import('./clarity/clarity.demo.module').then(m => m.ClarityDemoModule),
    data: { navGroup: 'Misc' },
  },
  {
    path: 'pager',
    loadChildren: () => import('./pager/pager.demo.module').then(m => m.PagerDemoModule),
    data: { navGroup: 'Layout & Panels' },
  },
  {
    path: 'dot-pager',
    loadChildren: () => import('./dot-pager/dot-pager.demo.module').then(m => m.DotPagerDemoModule),
    data: { navGroup: 'Layout & Panels' },
  },
  {
    path: 'paged-search-result-list',
    loadChildren: () =>
      import('./paged-search-result-list/paged-search-result-list.demo.module').then(
        m => m.PagedSearchResultListDemoModule
      ),
    data: { navGroup: 'Datagrid & Lists' },
  },
  {
    path: 'collapse-expand-section',
    loadChildren: () =>
      import('./collapse-expand-section/collapse-expand-section.demo.module').then(
        m => m.CollapseExpandSectionDemoModule
      ),
    data: { navGroup: 'Layout & Panels' },
  },
  {
    path: 'content-panel',
    loadChildren: () => import('./content-panel/content-panel.demo.module').then(m => m.ContentPanelDemoModule),
    data: { navGroup: 'Layout & Panels' },
  },
  {
    path: 'flow-bar',
    loadChildren: () => import('./flow-bar/flow-bar.demo.module').then(m => m.FlowBarDemoModule),
    data: { navGroup: 'Layout & Panels' },
  },
  {
    path: 'flow-bar-content-panel',
    loadChildren: () =>
      import('./flow-bar-content-panel/flow-bar-content-panel.demo.module').then(m => m.FlowBarContentPanelDemoModule),
    data: { navGroup: 'Layout & Panels' },
  },
  {
    path: 'breadcrumb',
    loadChildren: () => import('./breadcrumb/breadcrumb.demo.module').then(m => m.BreadcrumbDemoModule),
    data: { navGroup: 'Layout & Panels' },
  },
  {
    path: 'progress-spinner',
    loadChildren: () =>
      import('./progress-spinner/progress-spinner.demo.module').then(m => m.ProgressSpinnerDemoModule),
    data: { navGroup: 'Layout & Panels' },
  },
  {
    path: 'location-bar',
    loadChildren: () => import('./location-bar/location-bar.demo.module').then(m => m.LocationBarDemoModule),
    data: { navGroup: 'Layout & Panels' },
  },

  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.demo.module').then(m => m.NotificationDemoModule),
    data: { navGroup: 'Layout & Panels' },
  },
  {
    path: 'numericfield',
    loadChildren: () => import('./numericfield/numericfield.demo.module').then(m => m.NumericFieldDemoModule),
    data: { navGroup: 'Forms & Inputs' },
  },
  {
    path: 'searchfield',
    loadChildren: () => import('./searchfield/searchfield.demo.module').then(m => m.SearchFieldDemoModule),
    data: { navGroup: 'Forms & Inputs' },
  },
  {
    path: 'treetable',
    loadChildren: () => import('./treetable/treetable.demo.module').then(m => m.TreetableDemoModule),
    data: { navGroup: 'Datagrid & Lists' },
  },
  {
    path: 'readonly',
    loadChildren: () => import('./readonly/readonly.demo.module').then(m => m.ReadonlyDemoModule),
    data: { navGroup: 'Forms & Inputs' },
  },
  {
    path: 'date-time-container',
    loadChildren: () =>
      import('./date-time-container/date-time-container.demo.module').then(m => m.DateTimeContainerDemoModule),
    data: { navGroup: 'Forms & Inputs' },
  },
  {
    path: 'quick-list-container',
    loadChildren: () => import('./quick-list/quick-list.demo.module').then(m => m.QuickListModule),
    data: { navGroup: 'Datagrid & Lists' },
  },
  {
    path: 'brand-avatar',
    loadChildren: () => import('./brand-avatar/brand-avatar.demo.module').then(m => m.BrandAvatarDemoModule),
    data: { navGroup: 'Avatars' },
  },
  {
    path: 'letter-avatar',
    loadChildren: () => import('./letter-avatar/letter-avatar.demo.module').then(m => m.LetterAvatarDemoModule),
    data: { navGroup: 'Avatars' },
  },
  {
    path: 'icon-avatar',
    loadChildren: () => import('./icon-avatar/icon-avatar.demo.module').then(m => m.IconAvatarDemoModule),
    data: { navGroup: 'Avatars' },
  },
  {
    path: 'multilingual-input',
    loadChildren: () =>
      import('./multilingual-input/multilingual-input.demo.module').then(m => m.MultilingualInputDemoModule),
    data: { navGroup: 'Forms & Inputs' },
  },
  {
    path: 'generic-quick-list',
    loadChildren: () =>
      import('./generic-quick-list/generic-quick-list.demo.module').then(m => m.GenericQuickListModule),
    data: { navGroup: 'Datagrid & Lists' },
  },
  {
    path: 'icons',
    loadChildren: () => import('./icons/icons.demo.module').then(m => m.IconsDemoModule),
    data: { navGroup: 'Icons' },
  },
  {
    path: 'kitchen-sink',
    loadChildren: () => import('./kitchen-sink/kitchen-sink.module').then(m => m.KitchenSinkModule),
    data: { navGroup: 'Misc' },
  },
  {
    path: 'copy-to-clipboard',
    loadComponent: () => import('./copy-to-clipboard/copy-to-clipboard.demo').then(m => m.CopyToClipboardDemo),
    data: { navGroup: 'Utilities' },
  },
  {
    path: 'dropdown',
    loadChildren: () => import('./dropdown/dropdown.demo.module').then(m => m.DropdownDemoModule),
    data: { navGroup: 'Forms & Inputs' },
  },
  {
    path: 'datagrid-filters',
    loadChildren: () =>
      import('./datagrid-filters/datagrid-filters.demo.module').then(m => m.DatagridFiltersDemoModule),
    data: { navGroup: 'Datagrid & Lists' },
  },
  {
    path: 'datagrid-highlight',
    loadChildren: () =>
      import('./datagrid-highlight/datagrid-highlight.demo.module').then(m => m.DatagridHighlightDemoModule),
    data: { navGroup: 'Datagrid & Lists' },
  },
  {
    path: 'datagrid-reorder',
    loadComponent: () => import('./datagrid-reorder/datagrid-reorder.demo').then(m => m.DatagridReorderDemo),
    data: { navGroup: 'Datagrid & Lists' },
  },
  {
    path: 'datagrid-state-persistence',
    loadChildren: () =>
      import('./datagrid-state-persistence/datagrid-state-persistence.demo.module').then(
        m => m.DatagridStatePersistenceDemoModule
      ),
    data: { navGroup: 'Datagrid & Lists' },
  },
  {
    path: 'datagrid-detail-datagrid',
    loadChildren: () =>
      import('./datagrid-detail-datagrid/datagrid-detail-datagrid.demo.module').then(
        m => m.DatagridDetailDatagridDemoModule
      ),
    data: { navGroup: 'Datagrid & Lists' },
  },
  {
    path: 'enum-filter',
    loadChildren: () => import('./enum-filter/enum-filter.demo.module').then(m => m.EnumFilterDemoModule),
    data: { navGroup: 'Datagrid & Lists' },
  },
  {
    path: 'string-filter',
    loadChildren: () => import('./string-filter/string-filter.demo.module').then(m => m.StringFilterDemoModule),
    data: { navGroup: 'Datagrid & Lists' },
  },
  {
    path: 'numeric-filter',
    loadChildren: () => import('./numeric-filter/numeric-filter.demo.module').then(m => m.NumericFilterDemoModule),
    data: { navGroup: 'Datagrid & Lists' },
  },
  {
    path: 'daterangepicker',
    loadChildren: () => import('./daterangepicker/daterangepicker.demo.module').then(m => m.DaterangepickerDemoModule),
    data: { navGroup: 'Forms & Inputs' },
  },
  {
    path: 'exportable-datagrid',
    loadChildren: () =>
      import('./exportable-datagrid/exportable-datagrid.module').then(m => m.ExportableDatagridModule),
    data: { navGroup: 'Datagrid & Lists' },
  },
  {
    path: 'focus-first-invalid-field',
    loadChildren: () =>
      import('./focus-first-invalid-field/focus-first-invalid-field.demo.module').then(
        m => m.FocusFirstInvalidFieldDemoModule
      ),
    data: { navGroup: 'Forms & Inputs' },
  },
  {
    path: 'ctrl-enter',
    loadChildren: () => import('./ctrl-enter/ctrl-enter.demo.module').then(m => m.CtrlEnterDemoModule),
    data: { navGroup: 'Forms & Inputs' },
  },
  {
    path: 'keyboard-nav',
    loadComponent: () => import('./keyboard-nav/keyboard-nav.demo').then(m => m.KeyboardNavDemo),
    data: { navGroup: 'Utilities' },
  },
  {
    path: 'image-gallery',
    loadComponent: () => import('./image-gallery/image-gallery.demo').then(m => m.ImageGalleryDemo),
    data: { navGroup: 'Media' },
  },
  {
    path: 'image-gallery-in-modal',
    loadComponent: () => import('./image-gallery/image-gallery-in-modal.demo').then(m => m.ImageGalleryInModalDemo),
    data: { navGroup: 'Media' },
  },
];

export const ROUTING: ModuleWithProviders<RouterModule> = RouterModule.forRoot(APP_ROUTES);
