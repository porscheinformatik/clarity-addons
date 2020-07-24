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
                loadChildren: () => import("./basepage-layout/basepage-layout.demo.module").then(m => m.BasepageLayoutDemoModule),
                data: {
                    browserTitle: "Base Page Layout",
                }
            },
            {
                path: `basepage-layout-sub1`,
                children: [
                    {
                        path: "forms",
                        loadChildren: () => import("./forms-layout/forms-layout.demo.module").then(m => m.FormsLayoutDemoModule),
                        data: {
                            browserTitle: "Forms Layout"
                        }
                    },
                    {
                        path: "ves",
                        loadChildren: () => import("./view-edit-section-layout/view-edit-section-layout.demo.module")
                            .then(m => m.ViewEditSectionLayoutDemoModule),
                        data: {
                            browserTitle: "View Edit Section Layout"
                        }
                    }
                ],
            },
            {
                path: `basepage-layout-sub2`,
                children: [
                    {
                        path: "five",
                        loadChildren: () => import("./basepage-layout/basepage-layout.demo.module").then(m => m.BasepageLayoutDemoModule),
                        data: {
                            browserTitle: "Base Page Layout",
                            id: 5
                        }
                    },
                    {
                        path: "six",
                        loadChildren: () => import("./basepage-layout/basepage-layout.demo.module").then(m => m.BasepageLayoutDemoModule),
                        data: {
                            browserTitle: "Base Page Layout",
                            id: 6
                        }
                    }
                ]
            },
            {
                path: `basepage-layout-command`,
                loadChildren: () => import("./basepage-layout/basepage-layout.demo.module").then(m => m.BasepageLayoutDemoModule),
                data: {
                    browserTitle: "Base Page Layout",
                    withCommand: true
                }
            },
            {
                path: `content-panel`,
                loadChildren: () => import("./basepage-layout/basepage-layout.demo.module").then(m => m.BasepageLayoutDemoModule),
                data: {
                    browserTitle: "Content Panel Layout",
                    withCommand: true,
                    withPanel: true
                }
            },
            {
                path: `content-with-history`,
                loadChildren: () => import("./basepage-layout/basepage-layout.demo.module").then(m => m.BasepageLayoutDemoModule),
                data: {
                    browserTitle: "Content Panel Layout",
                    withCommand: true,
                    withPanel: true,
                    withHistory: true
                }
            },
            {
                path: `flow-bar`,
                loadChildren: () => import("./flow-bar-layout/flow-bar-layout.demo.module").then(m => m.FlowBarLayoutDemoModule),
                data: {
                    browserTitle: "Flow Bar Layout",
                }
            },
            {
                path: `sticky-footer`,
                loadChildren: () => import("./sticky-footer-layout/sticky-footer-layout.demo.module")
                    .then(m => m.StickyFooterLayoutDemoModule),
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
                        loadChildren: () => import("./sidebarpage-layout/sidebarpage-layout.demo.module")
                            .then(m => m.SidebarpageLayoutDemoModule),
                        data: {
                            browserTitle: "Sidebar Page Layout",
                            id: 1
                        }
                    },
                    {
                        path: `two`,
                        loadChildren: () => import("./sidebarpage-layout/sidebarpage-layout.demo.module")
                            .then(m => m.SidebarpageLayoutDemoModule),
                        data: {
                            browserTitle: "Sidebar Page Layout",
                            id: 2
                        }
                    },
                    {
                        path: `three`,
                        loadChildren: () => import("./sidebarpage-layout/sidebarpage-layout.demo.module")
                            .then(m => m.SidebarpageLayoutDemoModule),
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
