import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NewsComponent } from "./news.component";

const newsRoutes: Routes = [
    {
        path: "",
        component: NewsComponent,
        data: {
            bodyClass: "layout-news",
            browserTitle: "Release information"
        }
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
