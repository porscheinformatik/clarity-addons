import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ClarityModule } from "@clr/angular";
import { Docu300Component } from "../../releases/3/3.0.0";
import { Docu310Component } from "../../releases/3/3.1.0";
import { Docu400Component } from "../../releases/4/4.0.0";
import { Docu500Component } from "../../releases/5/5.0.0";
import { Docu511Component } from "../../releases/5/5.1.1";
import { NewsRoutingModule } from "./news-routing.module";
import { NewsComponent } from "./news.component";

@NgModule({
    declarations: [
        NewsComponent,
        Docu300Component,
        Docu310Component,
        Docu400Component,
        Docu500Component,
        Docu511Component
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
