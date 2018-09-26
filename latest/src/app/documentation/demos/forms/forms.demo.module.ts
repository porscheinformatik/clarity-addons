/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ClarityModule, ClrFormsNextModule } from "@clr/angular";

import { FormsDemo } from "./forms.demo";
import { DocWrapperModule } from "../_doc-wrapper/doc-wrapper.module";
import { RouterModule } from "@angular/router";
import { UtilsModule } from "../../../utils/utils.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ClarityModule,
        ClrFormsNextModule,
        UtilsModule,
        DocWrapperModule,
        RouterModule.forChild([{ path: "", component: FormsDemo }])
    ],
    declarations: [
        FormsDemo
    ],
    exports: [
        FormsDemo
    ]
})
export class FormsDemoModule {
}
