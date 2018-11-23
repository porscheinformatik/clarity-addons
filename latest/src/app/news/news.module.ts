import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {ClarityModule} from "@clr/angular";

import {NewsRoutingModule} from "./news-routing.module";
import {NewsComponent} from "./news.component";
import {Docu300Component} from "../../releases/3/3.0.0";

@NgModule({
    declarations: [
        NewsComponent,
        Docu300Component,
    ],
    imports: [
        CommonModule,
        ClarityModule,
        NewsRoutingModule
    ],
    providers: []
})
export class NewsModule {
}
