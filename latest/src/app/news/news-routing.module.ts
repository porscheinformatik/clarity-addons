import {NgModule}             from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {NewsComponent} from "./news.component";
import { Docu300Component } from "../../releases/3/3.0.0";

const newsRoutes: Routes = [
    {
        path: "",
        component: NewsComponent,
        data: {
            bodyClass: "layout-news",
            browserTitle: "Releases"
        },
        children: [
            {
                path: "3.0.0",
                component: Docu300Component,
                data: {
                    browserTitle: "3.0.0"
                }
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(newsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class NewsRoutingModule {
}
