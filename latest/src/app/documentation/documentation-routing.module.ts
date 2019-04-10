import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { environment } from "../../environments/environment";

import { DocumentationComponent } from "./documentation.component";
import { InternationalizationComponent } from "./internationalization/internationalization.component";

const documentationRoutes: Routes = [
    {
        path: "documentation",
        redirectTo: `/documentation/${environment.version}/get-started`,
        pathMatch: "full"
    },
    {
        path: `documentation/${environment.version}`,
        component: DocumentationComponent,
        data: {
            bodyClass: "layout-documentation",
            browserTitle: "Documentation"
        },
        children: [
            {
                path: "",
                redirectTo: "get-started",
                pathMatch: "full"
            },
            {
                path: "get-started",
                loadChildren: "app/documentation/get-started/get-started.module#GetStartedModule",
            },
            {
                path: "internationalization",
                component: InternationalizationComponent,
                data: {
                    browserTitle: "Internationalization"
                }
            },
            {
                path: "cards",
                loadChildren: "app/documentation/demos/cards/cards.demo.module#CardsDemoModule",
                data: {
                    browserTitle: "Cards"
                }
            },
            {
                path: "collapse-expand-section",
                loadChildren: "app/documentation/demos/collapse-expand-section/collapse-expand-section.demo.module#CollapseExpandSectionDemoModule",
                data: {
                    browserTitle: "Collapse/Expand Section"
                }
            },
            {
                path: "generic-pager",
                loadChildren: "app/documentation/demos/generic-pager/generic-pager.demo.module#GenericPagerDemoModule",
                data: {
                    browserTitle: "Generic Pager"
                }
            },
            {
                path: "dot-pager",
                loadChildren: "app/documentation/demos/dot-pager/dot-pager.demo.module#DotPagerDemoModule",
                data: {
                    browserTitle: "Dot Pager"
                }
            },
            {
                path: "paged-search-result-list",
                loadChildren: "app/documentation/demos/paged-search-result-list/paged-search-result-list.demo.module#PagedSearchResultListDemoModule",
                data: {
                    browserTitle: "Paged Search Result List"
                }
            },
            {
                path: "view-edit-section",
                loadChildren: "app/documentation/demos/view-edit-section/view-edit-section.demo.module#ViewEditSectionDemoModule",
                data: {
                    browserTitle: "View/Edit Section"
                }
            },
            {
                path: "basepage-layout",
                loadChildren: "app/documentation/demos/basepage-layout/basepage-layout.demo.module#BasePageLayoutDemoModule",
                data: {
                    browserTitle: "Base Pagelayout"
                }
            },
            {
                path: "content-panel-layout",
                loadChildren: "app/documentation/demos/content-panel-layout/content-panel-layout.demo.module#ContentPanelLayoutDemoModule",
                data: {
                    browserTitle: "Content Panel"
                }
            },
            {
                path: "flow-bar-layout",
                loadChildren: "app/documentation/demos/flow-bar-layout/flow-bar-layout.demo.module#FlowBarLayoutDemoModule",
                data: {
                    browserTitle: "Flow Bar Layout"
                }
            },
            {
                path: "sticky-footer-layout",
                loadChildren: "app/documentation/demos/sticky-footer-layout/sticky-footer-layout.demo.module#StickyFooterLayoutDemoModule",
                data: {
                    browserTitle: "Sticky Footer Layout"
                }
            },
            {
                path: "sidebarpage-layout",
                loadChildren: "app/documentation/demos/sidebarpage-layout/sidebarpage-layout.demo.module#SidebarPageLayoutDemoModule",
                data: {
                    browserTitle: "Sidebar Pagelayout"
                }
            },
            {
                path: "main-nav-group",
                loadChildren: "app/documentation/demos/main-nav-group/main-nav-group.demo.module#MainNavGroupDemoModule",
                data: {
                    browserTitle: "Main Navigation"
                }
            },
            {
                path: "breadcrumb",
                loadChildren: "app/documentation/demos/breadcrumb/breadcrumb.demo.module#BreadcrumbDemoModule",
                data: {
                    browserTitle: "Breadcrumb"
                }
            },
            {
                path: "notification",
                loadChildren: "app/documentation/demos/notification/notification.demo.module#NotificationDemoModule",
                data: {
                    browserTitle: "Notification"
                }
            },
            {
                path: "full-screen-dialog",
                loadChildren: "app/documentation/demos/full-screen-dialog/full-screen-dialog.demo.module#FullScreenDialogDemoModule",
                data: {
                    browserTitle: "Full Screen Dialog"
                }
            },
            {
                path: "numericfield",
                loadChildren: "app/documentation/demos/numericfield/numericfield.demo.module#NumericFieldDemoModule",
                data: {
                    browserTitle: "Numeric Field"
                }
            },
            {
                path: "search-field",
                loadChildren: "app/documentation/demos/search-field/search-field.demo.module#SearchFieldDemoModule",
                data: {
                    browserTitle: "Search Field"
                }
            },
            {
                path: "treetable",
                loadChildren: "app/documentation/demos/treetable/treetable.demo.module#TreetableDemoModule",
                data: {
                    browserTitle: "Treetable"
                }
            },
            {
                path: "progress-spinner",
                loadChildren: "app/documentation/demos/progress-spinner/progress-spinner.demo.module#ProgressSpinnerDemoModule",
                data: {
                    browserTitle: "Progress Spinner"
                }
            },
            {
                path: "datagrid",
                loadChildren: "app/documentation/demos/datagrid/datagrid.demo.module#DatagridDemoModule",
                data: {
                    browserTitle: "Datagrid"
                }
            },
            {
                path: "forms",
                loadChildren: "app/documentation/demos/forms/forms.demo.module#FormsDemoModule",
                data: {
                    browserTitle: "Forms"
                }
            },
            {
                path: "combobox",
                loadChildren: "app/documentation/demos/combobox/combobox.demo.module#ComboboxDemoModule",
                data: {
                    browserTitle: "Combobox"
                }
            },
            {
                path: "readonly",
                loadChildren: "app/documentation/demos/readonly/readonly.demo.module#ReadonlyDemoModule",
                data: {
                    browserTitle: "Readonly"
                }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(documentationRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class DocumentationRoutingModule {
}
