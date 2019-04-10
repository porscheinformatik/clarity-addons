/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ClarityModule, ClrFormsModule } from "@clr/angular";
import { ClrAddonsModule } from "@porscheinformatik/clr-addons";
import { UtilsModule } from "../../../utils/utils.module";
import { DocWrapperModule } from "../_doc-wrapper/doc-wrapper.module";
import { SearchFieldDemo } from "./search-field.demo";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ClarityModule,
        ClrFormsModule,
        UtilsModule,
        DocWrapperModule,
        RouterModule.forChild([{ path: "", component: SearchFieldDemo }]),
        ClrAddonsModule
    ],
    declarations: [
        SearchFieldDemo
    ],
    exports: [
        SearchFieldDemo
    ]
})
export class SearchFieldDemoModule {
    value: string;
}
