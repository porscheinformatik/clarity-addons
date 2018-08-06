import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

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
                path: `basepage-layout-sub1`,
                children: [
                    {
                        path: "one",
                        loadChildren: "app/documentation/demos/full-page-layouts/basepage-layout/basepage-layout.demo.module#BasepageLayoutDemoModule",
                        data: {
                            browserTitle: "Base Page Layout",
                            id: 1
                        }
                    },
                    {
                        path: "two",
                        loadChildren: "app/documentation/demos/full-page-layouts/basepage-layout/basepage-layout.demo.module#BasepageLayoutDemoModule",
                        data: {
                            browserTitle: "Base Page Layout",
                            id: 2
                        }
                    },
                    {
                        path: "three",
                        loadChildren: "app/documentation/demos/full-page-layouts/basepage-layout/basepage-layout.demo.module#BasepageLayoutDemoModule",
                        data: {
                            browserTitle: "Base Page Layout",
                            id: 3
                        }
                    },
                    {
                        path: "four",
                        loadChildren: "app/documentation/demos/full-page-layouts/basepage-layout/basepage-layout.demo.module#BasepageLayoutDemoModule",
                        data: {
                            browserTitle: "Base Page Layout",
                            id: 4
                        }
                    },
                ],
            },
            {
                path: `basepage-layout-sub2`,
                children: [
                    {
                        path: "five",
                        loadChildren: "app/documentation/demos/full-page-layouts/basepage-layout/basepage-layout.demo.module#BasepageLayoutDemoModule",
                        data: {
                            browserTitle: "Base Page Layout",
                            id: 5
                        }
                    },
                    {
                        path: "six",
                        loadChildren: "app/documentation/demos/full-page-layouts/basepage-layout/basepage-layout.demo.module#BasepageLayoutDemoModule",
                        data: {
                            browserTitle: "Base Page Layout",
                            id: 6
                        }
                    }
                ]
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
                path: `flow-bar`,
                loadChildren: "app/documentation/demos/full-page-layouts/flow-bar-layout/flow-bar-layout.demo.module#FlowBarLayoutDemoModule",
                data: {
                    browserTitle: "Flow Bar Layout",
                }
            },
            {
                path: `sticky-footer`,
                loadChildren: "app/documentation/demos/full-page-layouts/sticky-footer-layout/sticky-footer-layout.demo.module#StickyFooterLayoutDemoModule",
                data: {
                    browserTitle: "Sticky Footer Layout",
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