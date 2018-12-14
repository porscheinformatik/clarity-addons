/*
 * Copyright (c) 2018 Porsche Informatik. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ClarityModule, ClrFormsModule} from "@clr/angular";
import {ClrAddonsModule} from "@porscheinformatik/clr-addons";

import {ViewEditSectionDemo} from "./view-edit-section.demo"
import {DocWrapperModule} from "../_doc-wrapper/doc-wrapper.module";
import {RouterModule} from "@angular/router";
import {UtilsModule} from "../../../utils/utils.module";

@NgModule({
    imports: [
        CommonModule,
        UtilsModule,
        DocWrapperModule,
        ReactiveFormsModule,
        RouterModule.forChild([{path: "", component: ViewEditSectionDemo}]),
        FormsModule,
        ClrFormsModule,
        ClarityModule,
        ClrAddonsModule
    ],
    declarations: [
        ViewEditSectionDemo
    ],
    exports: [
        ViewEditSectionDemo
    ]
})
export class ViewEditSectionDemoModule {
}
