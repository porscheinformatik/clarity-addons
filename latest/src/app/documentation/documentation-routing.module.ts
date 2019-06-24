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
                loadChildren: () => import("./get-started/get-started.module").then(m => m.GetStartedModule),
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
                loadChildren: () => import("./demos/cards/cards.demo.module").then(m => m.CardsDemoModule),
                data: {
                    browserTitle: "Cards"
                }
            },
            {
                path: "collapse-expand-section",
                loadChildren: () => import("./demos/collapse-expand-section/collapse-expand-section.demo.module")
                    .then(m => m.CollapseExpandSectionDemoModule),
                data: {
                    browserTitle: "Collapse/Expand Section"
                }
            },
            {
                path: "generic-pager",
                loadChildren: () => import("./demos/generic-pager/generic-pager.demo.module").then(m => m.GenericPagerDemoModule),
                data: {
                    browserTitle: "Generic Pager"
                }
            },
            {
                path: "dot-pager",
                loadChildren: () => import("./demos/dot-pager/dot-pager.demo.module").then(m => m.DotPagerDemoModule),
                data: {
                    browserTitle: "Dot Pager"
                }
            },
            {
                path: "paged-search-result-list",
                loadChildren: () => import("./demos/paged-search-result-list/paged-search-result-list.demo.module")
                    .then(m => m.PagedSearchResultListDemoModule),
                data: {
                    browserTitle: "Paged Search Result List"
                }
            },
            {
                path: "view-edit-section",
                loadChildren: () => import("./demos/view-edit-section/view-edit-section.demo.module")
                    .then(m => m.ViewEditSectionDemoModule),
                data: {
                    browserTitle: "View/Edit Section"
                }
            },
            {
                path: "basepage-layout",
                loadChildren: () => import("./demos/basepage-layout/basepage-layout.demo.module").then(m => m.BasePageLayoutDemoModule),
                data: {
                    browserTitle: "Base Pagelayout"
                }
            },
            {
                path: "content-panel-layout",
                loadChildren: () => import("./demos/content-panel-layout/content-panel-layout.demo.module")
                    .then(m => m.ContentPanelLayoutDemoModule),
                data: {
                    browserTitle: "Content Panel"
                }
            },
            {
                path: "flow-bar-layout",
                loadChildren: () => import("./demos/flow-bar-layout/flow-bar-layout.demo.module").then(m => m.FlowBarLayoutDemoModule),
                data: {
                    browserTitle: "Flow Bar Layout"
                }
            },
            {
                path: "sticky-footer-layout",
                loadChildren: () => import("./demos/sticky-footer-layout/sticky-footer-layout.demo.module")
                    .then(m => m.StickyFooterLayoutDemoModule),
                data: {
                    browserTitle: "Sticky Footer Layout"
                }
            },
            {
                path: "sidebarpage-layout",
                loadChildren: () => import("./demos/sidebarpage-layout/sidebarpage-layout.demo.module")
                    .then(m => m.SidebarPageLayoutDemoModule),
                data: {
                    browserTitle: "Sidebar Pagelayout"
                }
            },
            {
                path: "main-nav-group",
                loadChildren: () => import("./demos/main-nav-group/main-nav-group.demo.module").then(m => m.MainNavGroupDemoModule),
                data: {
                    browserTitle: "Main Navigation"
                }
            },
            {
                path: "breadcrumb",
                loadChildren: () => import("./demos/breadcrumb/breadcrumb.demo.module").then(m => m.BreadcrumbDemoModule),
                data: {
                    browserTitle: "Breadcrumb"
                }
            },
            {
                path: "notification",
                loadChildren: () => import("./demos/notification/notification.demo.module").then(m => m.NotificationDemoModule),
                data: {
                    browserTitle: "Notification"
                }
            },
            {
                path: "full-screen-dialog",
                loadChildren: () => import("./demos/full-screen-dialog/full-screen-dialog.demo.module")
                    .then(m => m.FullScreenDialogDemoModule),
                data: {
                    browserTitle: "Full Screen Dialog"
                }
            },
            {
                path: "numericfield",
                loadChildren: () => import("./demos/numericfield/numericfield.demo.module").then(m => m.NumericFieldDemoModule),
                data: {
                    browserTitle: "Numeric Field"
                }
            },
            {
                path: "search-field",
                loadChildren: () => import("./demos/search-field/search-field.demo.module").then(m => m.SearchFieldDemoModule),
                data: {
                    browserTitle: "Search Field"
                }
            },
            {
                path: "treetable",
                loadChildren: () => import("./demos/treetable/treetable.demo.module").then(m => m.TreetableDemoModule),
                data: {
                    browserTitle: "Treetable"
                }
            },
            {
                path: "progress-spinner",
                loadChildren: () => import("./demos/progress-spinner/progress-spinner.demo.module").then(m => m.ProgressSpinnerDemoModule),
                data: {
                    browserTitle: "Progress Spinner"
                }
            },
            {
                path: "quick-list",
                loadChildren: () => import("./demos/quick-list/quick-list.demo.module").then(m => m.QuickListDemoModule),
                data: {
                    browserTitle: "Quick List"
                }
            },
            {
                path: "datagrid",
                loadChildren: () => import("./demos/datagrid/datagrid.demo.module").then(m => m.DatagridDemoModule),
                data: {
                    browserTitle: "Datagrid"
                }
            },
            {
                path: "forms",
                loadChildren: () => import("./demos/forms/forms.demo.module").then(m => m.FormsDemoModule),
                data: {
                    browserTitle: "Forms"
                }
            },
            {
                path: "combobox",
                loadChildren: () => import("./demos/combobox/combobox.demo.module").then(m => m.ComboboxDemoModule),
                data: {
                    browserTitle: "Combobox"
                }
            },
            {
                path: "readonly",
                loadChildren: () => import("./demos/readonly/readonly.demo.module").then(m => m.ReadonlyDemoModule),
                data: {
                    browserTitle: "Readonly"
                }
            },
            {
                path: "letter-avatar",
                loadChildren: () => import("./demos/letter-avatar/letter-avatar.demo.module").then(m => m.LetterAvatarDemoModule),
                data: {
                    browserTitle: "Letter Avatar"
                }
            },
            {
                path: "multilingual-input",
                loadChildren: () => import("./demos/multilingual-input/multilingual-input.demo.module")
                    .then(m => m.MultilingualInputDemoModule),
                data: {
                    browserTitle: "Multilingual Input"
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
