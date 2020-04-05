import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ClarityModule } from "@clr/angular";
import { NewsRoutingModule } from "./news-routing.module";
import { NewsComponent } from "./news.component";

@NgModule({
    declarations: [
        NewsComponent
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
