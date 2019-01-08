import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ClarityModule } from "@clr/angular";
import { Docu310Component } from "../../releases/3/3.1.0";
import { Docu300Component } from "../../releases/3/3.0.0";
import { NewsRoutingModule } from "./news-routing.module";
import { NewsComponent } from "./news.component";
import {Docu400Component} from "../../releases/4/4.0.0";

@NgModule({
    declarations: [
        NewsComponent,
        Docu300Component,
        Docu310Component,
        Docu400Component
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
