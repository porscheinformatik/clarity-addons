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
                path: "pager",
                loadChildren: () => import("./demos/pager/pager.demo.module").then(m => m.PagerDemoModule),
                data: {
                    browserTitle: "Pager"
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
                path: "page-layouts",
                loadChildren: () => import("./demos/page-layouts/page-layouts.demo.module").then(m => m.PageLayoutsDemoModule),
                data: {
                    browserTitle: "Page layouts"
                }
            },
            {
                path: "navigation",
                loadChildren: () => import("./demos/navigation/navigation.demo.module").then(m => m.NavigationDemoModule),
                data: {
                    browserTitle: "Navigation"
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
                path: "location-bar",
                loadChildren: () => import("./demos/location-bar/location-bar.demo.module").then(m => m.LocationBarDemoModule),
                data: {
                    browserTitle: "Location Bar"
                }
            },
            {
                path: "brand-avatar",
                loadChildren: () => import("./demos/brand-avatar/brand-avatar.demo.module").then(m => m.BrandAvatarDemoModule),
                data: {
                    browserTitle: "Brand Avatar"
                }
            },
            {
                path: "multilingual-input",
                loadChildren: () => import("./demos/multilingual-input/multilingual-input.demo.module")
                    .then(m => m.MultilingualInputDemoModule),
                data: {
                    browserTitle: "Multilingual Input"
                }
            },
            {
                path: "history",
                loadChildren: () => import("./demos/history/history.demo.module").then(m => m.HistoryDemoModule),
                data: {
                    browserTitle: "History"
                }
            },
            {
                path: "angular-grid",
                loadChildren: () => import("./demos/angular-grid/angular-grid.demo.module").then(m => m.AngularGridDemoModule),
                data: {
                    browserTitle: "Angular Grid"
                }
            },
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
