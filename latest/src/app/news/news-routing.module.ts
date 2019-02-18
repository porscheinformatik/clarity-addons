import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Docu300Component } from "../../releases/3/3.0.0";
import { Docu310Component } from "../../releases/3/3.1.0";
import { Docu500Component } from "../../releases/5/5.0.0";
import { Docu511Component } from "../../releases/5/5.1.1";
import { NewsComponent } from "./news.component";
import {Docu400Component} from "../../releases/4/4.0.0";

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
            },
            {
                path: "3.1.0",
                component: Docu310Component,
                data: {
                    browserTitle: "3.1.0"
                }
            },
            {
                path: "4.0.0",
                component: Docu400Component,
                data: {
                    browserTitle: "4.0.0"
                }
            },
            {
                path: "5.0.0",
                component: Docu500Component,
                data: {
                    browserTitle: "5.0.0"
                }
            },
            {
                path: "5.1.1",
                component: Docu511Component,
                data: {
                    browserTitle: "5.1.1"
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
