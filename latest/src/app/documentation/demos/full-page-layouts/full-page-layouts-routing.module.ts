import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

const fullPageLayoutsRoutes: Routes = [
    {
        path: `full-page-layouts`,
        data: {
            noHeader: true
        },
        children: [
            {
                path: `basepage-layout`,
                loadChildren: "app/documentation/demos/full-page-layouts/basepage-layout/basepage-layout.demo.module#BasepageLayoutDemoModule",
                data: {
                    browserTitle: "Base Page Layout",
                }
            },
            {
                path: `basepage-layout-command`,
                loadChildren: "app/documentation/demos/full-page-layouts/basepage-layout/basepage-layout.demo.module#BasepageLayoutDemoModule",
                data: {
                    browserTitle: "Base Page Layout",
                    withCommand: true
                }
            },
            {
                path: `content-panel`,
                loadChildren: "app/documentation/demos/full-page-layouts/basepage-layout/basepage-layout.demo.module#BasepageLayoutDemoModule",
                data: {
                    browserTitle: "Content Panel Layout",
                    withCommand: true,
                    withPanel: true
                }
            },
            {
                path: `sidebarpage-layout`,
                children: [
                    {
                        path: "",
                        redirectTo: "one",
                        pathMatch: "full"
                    },
                    {
                        path: `one`,
                        loadChildren: "app/documentation/demos/full-page-layouts/sidebarpage-layout/sidebarpage-layout.demo.module#SidebarpageLayoutDemoModule",
                        data: {
                            browserTitle: "Sidebar Page Layout",
                            id: 1
                        }
                    },
                    {
                        path: `two`,
                        loadChildren: "app/documentation/demos/full-page-layouts/sidebarpage-layout/sidebarpage-layout.demo.module#SidebarpageLayoutDemoModule",
                        data: {
                            browserTitle: "Sidebar Page Layout",
                            id: 2
                        }
                    },
                    {
                        path: `three`,
                        loadChildren: "app/documentation/demos/full-page-layouts/sidebarpage-layout/sidebarpage-layout.demo.module#SidebarpageLayoutDemoModule",
                        data: {
                            browserTitle: "Sidebar Page Layout",
                            id: 3
                        }
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(fullPageLayoutsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class FullPageLayoutsRoutingModule {
}