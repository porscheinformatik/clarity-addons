import { CommonModule } from "@angular/common";
/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ClarityModule, ClrFormsModule } from "@clr/angular";
import { ClrNumericFieldModule, ClrDateTimeModule, ClrComboboxModule } from "@porscheinformatik/clr-addons";
import { UtilsModule } from "../../../utils/utils.module";
import { DocWrapperModule } from "../_doc-wrapper/doc-wrapper.module";

import { FormsDemo } from "./forms.demo";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ClarityModule,
        ClrFormsModule,
        ClrNumericFieldModule,
        ClrDateTimeModule,
        ClrComboboxModule,
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
