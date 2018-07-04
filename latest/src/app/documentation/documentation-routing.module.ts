import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { environment } from "../../environments/environment";

import { DocumentationComponent } from "./documentation.component";
import { ComponentStatusComponent } from "./component-status/component-status.component";
import { InternationalizationComponent } from "./internationalization/internationalization.component";

const documentationRoutes: Routes = [
    {
        path: "documentation",
        redirectTo: `/documentation/${environment.version}`,
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
                component: ComponentStatusComponent,
                data: {
                    bodyClass: "page-documentation",
                    browserTitle: "Documentation"
                }
            },
            {
                path: "internationalization",
                component: InternationalizationComponent,
                data: {
                    browserTitle: "Internationalization"
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
                    browserTitle: "Base Page Layout"
                }
            },
            {
                path: "content-panel-layout",
                loadChildren: "app/documentation/demos/content-panel-layout/content-panel-layout.demo.module#ContentPanelLayoutDemoModule",
                data: {
                    browserTitle: "Content Panel Layout"
                }
            },
            {
                path: "sidebarpage-layout",
                loadChildren: "app/documentation/demos/sidebarpage-layout/sidebarpage-layout.demo.module#SidebarPageLayoutDemoModule",
                data: {
                    browserTitle: "Sidebar Page Layout"
                }
            },
            {
                path: "main-nav-group",
                loadChildren: "app/documentation/demos/main-nav-group/main-nav-group.demo.module#MainNavGroupDemoModule",
                data: {
                    browserTitle: "Main Navigation Group"
                }
            },
            {
                path: "breadcrumb",
                loadChildren: "app/documentation/demos/breadcrumb/breadcrumb.demo.module#BreadcrumbDemoModule",
                data: {
                    browserTitle: "Breadcrumb"
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
