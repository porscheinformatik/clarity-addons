import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {environment} from "../../environments/environment";

import {DocumentationComponent} from "./documentation.component";
import {ComponentStatusComponent} from "./component-status/component-status.component";

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
                path: "generic-pager",
                loadChildren: "app/documentation/demos/generic-pager/generic-pager.demo.module#GenericPagerDemoModule",
                data: {
                    browserTitle: "Generic Pager"
                }
            },
            {
                path: "search-result-list",
                loadChildren: "app/documentation/demos/search-result-list/search-result-list.demo.module#SearchResultListDemoModule",
                data: {
                    browserTitle: "Search Result List"
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
                path: "sidebarpage-layout",
                loadChildren: "app/documentation/demos/sidebarpage-layout/sidebarpage-layout.demo.module#SidebarPageLayoutDemoModule",
                data: {
                    browserTitle: "Sidebar Page Layout"
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
