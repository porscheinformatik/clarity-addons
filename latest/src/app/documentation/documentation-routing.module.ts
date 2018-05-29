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
                    bodyClass: "page-generic-pager",
                    browserTitle: "Generic Pager"
                }
            },
            {
                path: "search-result-list",
                loadChildren: "app/documentation/demos/search-result-list/search-result-list.demo.module#SearchResultListDemoModule",
                data: {
                    bodyClass: "page-search-result-list",
                    browserTitle: "Search Result List"
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
