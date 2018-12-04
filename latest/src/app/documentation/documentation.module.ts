import { CommonModule, DatePipe, CurrencyPipe, DecimalPipe } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ClarityModule } from "@clr/angular";

import { UtilsModule } from "../utils/utils.module";
import { DocumentationRoutingModule } from "./documentation-routing.module";
import { DocumentationComponent } from "./documentation.component";
import { DocumentationNavLinksComponent } from "./documentation-nav-links.component";
import { InternationalizationComponent } from "./internationalization/internationalization.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        UtilsModule,
        ClarityModule,
        HttpClientModule,
        DocumentationRoutingModule
    ],
    declarations: [
        DocumentationComponent,
        DocumentationNavLinksComponent,
        InternationalizationComponent
    ],
    providers: [
        DatePipe,
        CurrencyPipe,
        DecimalPipe
    ]
})
export class DocumentationModule {
}
